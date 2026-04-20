import React, { useState } from 'react';
import { Text, Edges, Sphere } from '@react-three/drei';
import { useLoadStore } from '../../store/loadStore';

interface TruckSlotProps {
    position: [number, number, number];
    index: number;
}

const CargoItem: React.FC<{ type: 'egg' | 'chicken'; color: string; hovered: boolean; offset: [number, number, number] }> = ({ type, color, hovered, offset }) => {
    // Realistic dimensions: 61cm x 30.5cm x 34.3cm -> 0.61 x 0.305 x 0.343
    const args: [number, number, number] = [0.61, 0.34, 0.30];

    if (type === 'chicken') {
        return (
            <group position={offset}>
                <Sphere args={[0.2, 16, 16]} scale={[1.2, 0.8, 1.5]}>
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.2 : 0} />
                </Sphere>
                {/* Tied knot on top of sack */}
                <Sphere args={[0.05, 8, 8]} position={[0, 0.15, 0]} scale={[1, 0.5, 1]}>
                    <meshStandardMaterial color={color} />
                </Sphere>
            </group>
        );
    }

    return (
        <mesh position={offset} castShadow>
            <boxGeometry args={args} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.2 : 0} />
            <Edges color="white" />
        </mesh>
    );
};

const TruckSlot: React.FC<TruckSlotProps> = ({ position, index }) => {
    const {
        slots,
        assignToSlot,
        selectedShipmentId,
        selectShipment,
        selectedSlotIndex,
        setSelectedSlot,
        violations,
        validateLoad
    } = useLoadStore();
    const [hovered, setHovered] = useState(false);

    const shipment = slots[index];
    const isOccupied = !!shipment;
    const isSelected = selectedSlotIndex === index;
    const violation = violations.find(v => v.slotIndex === index);

    const getBaseColor = (itemType: string, block: string) => {
        if (block.startsWith('A')) return itemType === 'egg' ? '#FF7A00' : '#FF9D4D';
        if (block.startsWith('B')) return itemType === 'egg' ? '#3b82f6' : '#60a5fa';
        return '#10b981';
    };

    const handleClick = (e: any) => {
        e.stopPropagation();
        if (selectedShipmentId) {
            assignToSlot(index);
            validateLoad();
            setSelectedSlot(index);
        } else {
            setSelectedSlot(index);
            if (isOccupied) {
                selectShipment(shipment.id);
            }
        }
    };

    return (
        <group position={position}>
            {/* Slot Base/Glow */}
            <mesh
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={handleClick}
            >
                <boxGeometry args={[0.7, 0.05, 0.4]} />
                <meshStandardMaterial
                    color={violation ? (violation.severity === 'error' ? '#ef4444' : '#f59e0b') : (isSelected ? '#10b981' : (hovered ? '#FF7A00' : '#ffffff'))}
                    transparent
                    opacity={isSelected || violation ? 0.4 : (hovered ? 0.3 : 0.05)}
                    emissive={isSelected || violation ? (violation ? (violation.severity === 'error' ? '#ef4444' : '#f59e0b') : '#10b981') : 'black'}
                    emissiveIntensity={isSelected || violation ? 0.5 : 0}
                />
                <Edges color={violation ? (violation.severity === 'error' ? '#ef4444' : '#f59e0b') : (isSelected ? '#10b981' : (hovered ? '#FF7A00' : '#444444'))} />
            </mesh>

            {/* Violation Pulse Layer */}
            {violation && (
                <mesh scale={[1.1, 1, 1.1]}>
                    <boxGeometry args={[0.7, 0.06, 0.4]} />
                    <meshBasicMaterial
                        color={violation.severity === 'error' ? '#ef4444' : '#f59e0b'}
                        transparent
                        opacity={0.1}
                    />
                </mesh>
            )}

            {/* Occupied Cargo */}
            {isOccupied && (
                <group onClick={handleClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                    {shipment.items.map((item, idx) => (
                        <CargoItem
                            key={`${shipment.id}-${item.type}-${idx}`}
                            type={item.type as 'egg' | 'chicken'}
                            color={getBaseColor(item.type, shipment.block)}
                            hovered={hovered || isSelected}
                            offset={[0, 0.2 + idx * 0.35, 0]}
                        />
                    ))}

                    {/* ID Label */}
                    <Text
                        position={[0, 0.8 + (shipment.items.length - 1) * 0.35, 0]}
                        fontSize={0.12}
                        color={isSelected ? "#10b981" : "white"}
                        anchorY="middle"
                    >
                        {shipment.id}
                    </Text>
                </group>
            )}
        </group>
    );
};

export default TruckSlot;

