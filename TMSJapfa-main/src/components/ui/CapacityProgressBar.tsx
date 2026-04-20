import React from 'react';
import { motion } from 'framer-motion';
import { useLoadStore } from '../../store/loadStore';
import { AlertTriangle, Weight } from 'lucide-react';

export const CapacityProgressBar: React.FC = () => {
    const { getWeightTotal, getMaxCapacity } = useLoadStore();
    const currentWeight = getWeightTotal();
    const maxCapacity = getMaxCapacity();
    const percentage = Math.min((currentWeight / maxCapacity) * 100, 100);
    const isOverloaded = currentWeight > maxCapacity;

    const getColor = () => {
        if (isOverloaded) return 'bg-red-500';
        if (percentage > 90) return 'bg-orange-500';
        if (percentage > 70) return 'bg-yellow-500';
        return 'bg-emerald-500';
    };

    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-end mb-2">
                <div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-white/60 text-xs font-semibold uppercase tracking-wider">
                        <Weight className="w-3 h-3" />
                        Load Factor
                    </div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                        {percentage.toFixed(1)}<span className="text-sm font-medium text-slate-400 dark:text-white/40">%</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs text-slate-400 dark:text-white/40 font-medium">Capacity</div>
                    <div className={`text-sm font-bold ${isOverloaded ? 'text-red-400' : 'text-slate-700 dark:text-white/80'}`}>
                        {currentWeight.toLocaleString()} / {maxCapacity.toLocaleString()} kg
                    </div>
                </div>
            </div>

            <div className="relative h-3 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden border border-slate-200 dark:border-white/5">
                <motion.div
                    className={`absolute inset-y-0 left-0 ${getColor()}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
                />

                {/* Overload pulse effect */}
                {isOverloaded && (
                    <motion.div
                        className="absolute inset-0 bg-red-400/30"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    />
                )}
            </div>

            {isOverloaded && (
                <div className="mt-3 flex items-center gap-2 text-red-400 text-xs font-bold animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    WEIGHT LIMIT EXCEEDED
                </div>
            )}
        </div>
    );
};
