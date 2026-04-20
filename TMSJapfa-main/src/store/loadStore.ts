import { create } from 'zustand';

export interface ShipmentItem {
    type: 'egg' | 'chicken';
    count: number;
}

export interface Shipment {
    id: string;
    customer: string;
    block: string;
    items: ShipmentItem[];
    weight: number; // in kg
    priority: number;
}

export interface Violation {
    slotIndex: number;
    message: string;
    severity: 'warning' | 'error';
}

export type CapacityTier = '2T' | '2.7T' | '5T';

interface LoadState {
    shipments: Shipment[];
    slots: (Shipment | null)[];
    selectedShipmentId: string | null;
    truckCapacityTier: CapacityTier;
    sceneBackground: '#0d0d0d' | '#ffffff' | '#333333';
    selectedSlotIndex: number | null;
    violations: Violation[];

    // Actions
    setSceneBackground: (bg: '#0d0d0d' | '#ffffff' | '#333333') => void;
    setCapacityTier: (tier: CapacityTier) => void;
    selectShipment: (id: string | null) => void;
    setSelectedSlot: (index: number | null) => void;
    assignToSlot: (slotIndex: number) => void;
    removeFromSlot: (slotIndex: number) => void;
    resetSlots: () => void;
    setIsDragging: (isDragging: boolean) => void;
    setDragPosition: (pos: [number, number, number] | null) => void;
    validateLoad: () => void;

    isDragging: boolean;
    dragPosition: [number, number, number] | null;

    // Derived Helpers
    getWeightTotal: () => number;
    getMaxCapacity: () => number;
}

const initialShipments: Shipment[] = [
    {
        id: 'SHP-9821',
        customer: 'Acme Corp',
        block: 'A-Alpha',
        items: [{ type: 'egg', count: 48 }],
        weight: 240,
        priority: 1,
    },
    {
        id: 'SHP-9744',
        customer: 'Global Logistics',
        block: 'B-Beta',
        items: [{ type: 'chicken', count: 12 }],
        weight: 45,
        priority: 2,
    },
    {
        id: 'SHP-9801',
        customer: 'Nusantara Food',
        block: 'A-Alpha',
        items: [{ type: 'egg', count: 36 }, { type: 'chicken', count: 20 }],
        weight: 180,
        priority: 3,
    },
    {
        id: 'SHP-9755',
        customer: 'Maju Jaya',
        block: 'C-Gamma',
        items: [{ type: 'egg', count: 24 }],
        weight: 96,
        priority: 4,
    },
];

export const useLoadStore = create<LoadState>((set, get) => ({
    shipments: initialShipments,
    slots: Array(45).fill(null), // 3 layers: 0-14 (bottom), 15-29 (middle), 30-44 (top)
    selectedShipmentId: 'SHP-9821',
    truckCapacityTier: '5T',
    sceneBackground: '#0d0d0d',
    selectedSlotIndex: null,
    violations: [],

    setSceneBackground: (bg) => set({ sceneBackground: bg }),
    setCapacityTier: (tier) => set({ truckCapacityTier: tier, slots: Array(tier === '5T' ? 45 : tier === '2.7T' ? 30 : 24).fill(null) }),
    selectShipment: (id) => set({ selectedShipmentId: id }),
    setSelectedSlot: (index) => set({ selectedSlotIndex: index }),

    assignToSlot: (slotIndex) => set((state) => {
        if (!state.selectedShipmentId) return state;
        const shipment = state.shipments.find(s => s.id === state.selectedShipmentId);
        if (!shipment) return state;

        const newSlots = state.slots.map(s => s?.id === state.selectedShipmentId ? null : s);
        newSlots[slotIndex] = shipment;

        return { slots: newSlots };
    }),
    removeFromSlot: (slotIndex) => set((state) => {
        const newSlots = [...state.slots];
        newSlots[slotIndex] = null;
        return { slots: newSlots };
    }),
    resetSlots: () => set((state) => ({ slots: Array(state.slots.length).fill(null), violations: [] })),
    isDragging: false,
    dragPosition: null,
    setIsDragging: (isDragging) => set({ isDragging }),
    setDragPosition: (dragPosition) => set({ dragPosition }),

    validateLoad: () => {
        const { slots, getMaxCapacity } = get();
        const newViolations: Violation[] = [];

        const totalWeight = slots.reduce((acc: number, s: Shipment | null) => acc + (s?.weight || 0), 0);
        if (totalWeight > getMaxCapacity()) {
            newViolations.push({
                slotIndex: -1,
                message: `Total weight (${totalWeight}kg) exceeds truck capacity (${getMaxCapacity()}kg)`,
                severity: 'error'
            });
        }

        for (let i = 0; i < 15; i++) {
            const bottom = slots[i];
            const middle = slots[i + 15];
            const top = slots[i + 30];

            const column = [bottom, middle, top];

            for (let layer = 0; layer < 2; layer++) {
                const itemBelow = column[layer];
                const itemAbove = column[layer + 1];

                if (itemBelow && itemAbove) {
                    const isBelowFragile = itemBelow.items.some(i => i.type === 'egg');
                    if (isBelowFragile && itemAbove.weight > 5) {
                        newViolations.push({
                            slotIndex: i + (layer + 1) * 15,
                            message: "Heavy item placed over fragile shipment",
                            severity: 'error'
                        });
                    }

                    if (itemAbove.weight > itemBelow.weight * 1.5) {
                        newViolations.push({
                            slotIndex: i + (layer + 1) * 15,
                            message: "Unstable stack: Top item significantly heavier than base",
                            severity: 'warning'
                        });
                    }
                }
            }
        }

        set({ violations: newViolations });
    },

    // Derived
    getWeightTotal: () => {
        const slots = get().slots;
        return slots.reduce((total: number, s: Shipment | null) => total + (s?.weight || 0), 0);
    },
    getMaxCapacity: () => {
        const tier = get().truckCapacityTier;
        return tier === '5T' ? 5000 : tier === '2.7T' ? 2700 : 2000;
    }
}));

