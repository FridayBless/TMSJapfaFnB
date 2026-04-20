import React from 'react';
import { useLoadStore } from '../../store/loadStore';
import {
    Info,
    AlertTriangle,
    Box,
    Thermometer,
    ShieldAlert,
    Truck,
    CheckCircle2,
    Layers,
    MoveUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SidebarInspector: React.FC = () => {
    const { slots, selectedSlotIndex, violations } = useLoadStore();

    const selectedShipment = selectedSlotIndex !== null ? slots[selectedSlotIndex] : null;
    const slotViolations = violations.filter(v => v.slotIndex === selectedSlotIndex);

    // Packaging Rules Engine
    const getPackagingRules = (type?: string) => {
        if (!type) return null;
        const t = type.toLowerCase();

        if (t.includes('egg')) {
            return {
                category: 'Fragile Foods',
                icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
                color: 'amber',
                specs: [
                    { label: 'Weight/Box', value: '25kg' },
                    { label: 'Stack Limit', value: '3 Layers' },
                    { label: 'Temp Req', value: 'Ambient' },
                ],
                instructions: [
                    'Vertical Orientation Only',
                    'No heavy items above',
                    'Anti-slip mat required'
                ]
            };
        }

        if (t.includes('chicken') || t.includes('frozen')) {
            return {
                category: 'Cold Chain',
                icon: <Thermometer className="w-5 h-5 text-blue-400" />,
                color: 'blue',
                specs: [
                    { label: 'Weight/Box', value: '18kg' },
                    { label: 'Stack Limit', value: '5 Layers' },
                    { label: 'Temp Req', value: '-18°C' },
                ],
                instructions: [
                    'Ensure seal integrity',
                    'Quick load priority',
                    'Keep away from heat sources'
                ]
            };
        }

        return {
            category: 'Standard Cargo',
            icon: <Box className="w-5 h-5 text-slate-400" />,
            color: 'slate',
            specs: [
                { label: 'Weight/Box', value: '20kg' },
                { label: 'Stack Limit', value: '8 Layers' },
                { label: 'Temp Req', value: 'Any' },
            ],
            instructions: [
                'Standard handing',
                'Secure with straps'
            ]
        };
    };

    const rules = getPackagingRules(selectedShipment?.items?.[0]?.type);

    return (
        <div className="w-full h-full bg-slate-50/80 dark:bg-slate-900/40 backdrop-blur-xl border-l border-slate-200 dark:border-white/10 p-6 flex flex-col gap-6 text-slate-900 dark:text-white overflow-y-auto">
            <header className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-slate-400 dark:text-white/40 text-[10px] font-bold uppercase tracking-[2px]">
                    <Info className="w-3 h-3" />
                    Slot Inspector
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                    {selectedSlotIndex !== null ? `Slot #${selectedSlotIndex + 1}` : 'Select a Slot'}
                </h2>
            </header>

            <AnimatePresence mode="wait">
                {selectedShipment ? (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex flex-col gap-8"
                    >
                        {/* Shipment Overview */}
                        <section className="bg-white/50 dark:bg-white/5 rounded-2xl p-5 border border-slate-200 dark:border-white/5">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-xs font-semibold text-slate-400 dark:text-white/40 uppercase mb-1">Shipment ID</div>
                                    <div className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400">{selectedShipment.id}</div>
                                </div>
                                <div className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${rules?.color === 'amber' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                                    {selectedShipment.items?.[0]?.type || 'Cargo'}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <div className="text-[10px] text-slate-400 dark:text-white/30 uppercase font-bold">Total Weight</div>
                                    <div className="text-base font-bold tabular-nums text-slate-900 dark:text-white">{selectedShipment.weight} kg</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-[10px] text-slate-400 dark:text-white/30 uppercase font-bold">Destination</div>
                                    <div className="text-base font-bold truncate text-slate-900 dark:text-white">Jakarta Central</div>
                                </div>
                            </div>
                        </section>

                        {/* Violations */}
                        {slotViolations.length > 0 && (
                            <section className="space-y-3">
                                <div className="flex items-center gap-2 text-red-400 text-[10px] font-black uppercase tracking-wider">
                                    <AlertTriangle className="w-4 h-4" />
                                    Constraint Violations
                                </div>
                                {slotViolations.map((v, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className={`p-3 rounded-lg border text-xs font-bold flex items-start gap-3 ${v.severity === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}
                                    >
                                        <div className="mt-0.5">•</div>
                                        {v.message}
                                    </motion.div>
                                ))}
                            </section>
                        )}

                        {/* Packaging Specs */}
                        {rules && (
                            <section className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-slate-400 dark:text-white/40 text-[10px] font-black uppercase tracking-wider">
                                        <Layers className="w-4 h-4" />
                                        Packaging Specs
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-white/80">
                                        {rules.icon}
                                        {rules.category}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    {rules.specs.map((spec, i) => (
                                        <div key={i} className="bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-3 text-center">
                                            <div className="text-[9px] text-slate-400 dark:text-white/30 uppercase font-bold mb-1">{spec.label}</div>
                                            <div className="text-xs font-bold whitespace-nowrap text-slate-900 dark:text-white">{spec.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Handling Instructions */}
                        {rules && (
                            <section className="space-y-3">
                                <div className="flex items-center gap-2 text-slate-400 dark:text-white/40 text-[10px] font-black uppercase tracking-wider">
                                    <MoveUp className="w-4 h-4" />
                                    Handling Instructions
                                </div>
                                <div className="space-y-2">
                                    {rules.instructions.map((inst, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-white/50 dark:bg-white/5 p-3 rounded-xl border border-slate-200 dark:border-white/5 group hover:border-slate-300 dark:hover:border-white/10 transition-colors">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                            <span className="text-xs text-slate-600 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{inst}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-30 select-none"
                    >
                        <div className="bg-slate-200/50 dark:bg-white/5 p-8 rounded-full mb-6 text-slate-400 dark:text-white">
                            <Truck className="w-16 h-16" />
                        </div>
                        <p className="text-sm font-bold uppercase tracking-widest leading-loose text-slate-400 dark:text-white/30">
                            Click a slot in the truck<br />to inspect contents
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
