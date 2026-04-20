import { useState } from 'react';
import { useLoadStore } from '../../store/loadStore';
import TruckScene from '../../components/truck/TruckScene';
import ThemeToggle from '../../components/ThemeToggle';

const activityLog = [
    { label: 'Truck Capacity: 5T Selected', sub: 'Optimization v2.5 • 10:05 PM', active: true },
    { label: 'Fleet synced (7 Trucks active)', sub: 'TRC Series • 10:00 PM', active: false },
    { label: 'Realistic cargo scaling enabled', sub: 'User: Admin_42 • 09:55 PM', active: false },
];

export default function LoadPlanner() {
    const {
        shipments,
        selectedShipmentId,
        selectShipment,
        slots,
        truckCapacityTier,
        setCapacityTier,
        sceneBackground,
        setSceneBackground
    } = useLoadStore();
    const [toast, setToast] = useState<string | null>(null);

    const maxWeights = { '2T': 2000, '2.7T': 2700, '5T': 5000 };
    const maxWeight = maxWeights[truckCapacityTier];

    // Calculate capacity based on occupied slots
    const occupiedCount = slots.filter(Boolean).length;
    const capacityPct = Math.min(100, Math.round((occupiedCount / slots.length) * 100));
    const weightVal = slots.reduce((acc, s) => acc + (s ? s.weight : 0), 0);

    const selectedShipment = shipments.find((s) => s.id === selectedShipmentId);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0a0a0a]">
            {/* ── Top Header ── */}
            <header className="flex justify-between items-center px-6 h-16 w-full z-10 bg-white/85 dark:bg-[#111111]/85 backdrop-blur-md border-b border-slate-200 dark:border-[#333] sticky top-0 shrink-0">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span>Warehouse</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span>Load Planning</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#1A1A1A] px-2 py-1 rounded border border-slate-200 dark:border-[#333]">
                        <span className="text-primary font-bold">TRC-204</span>
                        <span className="text-[10px] text-slate-400">/ 7 Trucks in Fleet</span>
                    </div>
                </div>

                {/* Loading Progress */}
                <div className="flex flex-col items-center w-56 hidden md:flex">
                    <div className="flex justify-between w-full mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">Loading Payload</span>
                        <span className="text-[10px] font-bold text-on-surface">{capacityPct}% Capacity</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-[#222] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#994700] to-[#FF7A00] h-full rounded-full shadow-[0_0_8px_rgba(255,122,0,0.3)]" style={{ width: `${capacityPct}%` }}></div>
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-medium">{weightVal} / {maxWeight} kg</div>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    <button
                        onClick={() => showToast('✓ Load plan validated successfully!')}
                        className="px-4 py-2 bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:hover:bg-[#2a2a2a] active:scale-95 text-slate-900 dark:text-white text-xs font-bold rounded-lg transition-all cursor-pointer select-none border border-slate-200 dark:border-[#333]">
                        Validate
                    </button>
                    <button
                        onClick={() => showToast('🚚 Dispatching TRC-204 to fleet...')}
                        className="px-4 py-2 bg-gradient-to-r from-[#994700] to-[#FF7A00] text-white text-xs font-bold rounded-lg shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer select-none">
                        Dispatch
                    </button>
                </div>
            </header>

            {/* ── Main Layout ── */}
            <div className="flex flex-1 overflow-hidden">
                {/* ── Left Panel: Truck Capacity + Shipment Backlog ── */}
                <section className="w-72 shrink-0 bg-slate-50 dark:bg-[#0a0a0a] border-r border-slate-200 dark:border-[#333] flex flex-col overflow-hidden">
                    {/* Truck Capacity Selector */}
                    <div className="p-4 border-b border-slate-200 dark:border-[#333]">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Truck Payload Capacity</h2>
                        <div className="flex flex-col gap-2">
                            {(['2T', '2.7T', '5T'] as const).map((tier) => (
                                <button
                                    key={tier}
                                    onClick={() => { setCapacityTier(tier); showToast(`Capacity updated to ${tier}`); }}
                                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all active:scale-95 cursor-pointer ${truckCapacityTier === tier ? 'bg-white dark:bg-[#1A1A1A] border-primary shadow-sm' : 'bg-slate-100 dark:bg-[#1A1A1A] border-transparent hover:bg-white dark:hover:bg-[#222]'}`}
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="text-xs font-bold text-slate-900 dark:text-white">{tier} Payload</span>
                                        <span className="text-[9px] text-slate-500 dark:text-slate-400">{tier === '5T' ? '208' : tier === '2.7T' ? '112' : '83'} Max Crates</span>
                                    </div>
                                    <span className={`material-symbols-outlined text-sm ${truckCapacityTier === tier ? 'text-primary' : 'text-slate-400 dark:text-slate-600'}`}>
                                        {truckCapacityTier === tier ? 'radio_button_checked' : 'radio_button_unchecked'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Backlog Header */}
                    <div className="p-4 border-b border-slate-200 dark:border-[#333]">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Shipment Backlog</h2>
                            <span className="bg-slate-200 dark:bg-[#2a2a2a] px-2 py-0.5 rounded text-[10px] font-bold">{shipments.length} Items</span>
                        </div>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">search</span>
                            <input className="w-full bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#333] text-xs pl-9 pr-4 py-2 rounded-lg focus:ring-1 focus:ring-primary outline-none text-slate-900 dark:text-white" placeholder="Search orders..." type="text" />
                        </div>
                    </div>

                    {/* Shipment Cards */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {shipments.map((s) => (
                            <div
                                key={s.id}
                                onClick={() => {
                                    selectShipment(s.id);
                                    showToast(`Selected ${s.id}`);
                                }}
                                className={`bg-white dark:bg-[#111111] p-3 rounded-xl shadow-sm border transition-all cursor-pointer ${selectedShipmentId === s.id ? 'border-primary ring-1 ring-primary/20' : 'border-transparent hover:border-slate-200 dark:hover:border-[#333]'}`}
                            >
                                <div className="flex justify-between items-start mb-1.5">
                                    <span className="text-[10px] font-black text-primary">{s.id}</span>
                                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-sm">drag_indicator</span>
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{s.customer}</h3>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mb-2">Block: {s.block}</p>
                                <div className="space-y-1">
                                    {s.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-1.5 text-[9px] text-slate-600 dark:text-slate-400 font-bold uppercase">
                                            <span className="material-symbols-outlined text-[14px]">
                                                {item.type === 'egg' ? 'egg' : 'nutrition'}
                                            </span>
                                            {item.count} {item.type === 'egg' ? 'Crates' : 'Sacks'}
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                                        <span className="material-symbols-outlined text-[14px]">weight</span> {s.weight}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Center: Truck Stage ── */}
                <section className="flex-1 relative bg-[#0a0a0a] overflow-hidden">
                    {/* Scene Background Toggle */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                        {(['#0d0d0d', '#ffffff', '#333333'] as const).map((color) => (
                            <button
                                key={color}
                                onClick={() => setSceneBackground(color)}
                                className={`w-6 h-6 rounded-full border-2 transition-all active:scale-95 shadow-lg ${sceneBackground === color ? 'border-primary ring-2 ring-primary/20 scale-110' : 'border-white/20 hover:border-white/40'}`}
                                style={{ backgroundColor: color }}
                                title={`${color === '#0d0d0d' ? 'Black' : color === '#ffffff' ? 'White' : 'Grey'} Background`}
                            />
                        ))}
                    </div>

                    <TruckScene />

                    {/* Legend */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-5 px-5 py-2.5 bg-white/10 dark:bg-[#111111]/90 backdrop-blur-xl rounded-full shadow-lg border border-white/10">
                        {[
                            { color: 'bg-[#FF7A00] border-[#FF7A00]', label: 'Block A (Egg)' },
                            { color: 'bg-blue-500 border-blue-500', label: 'Block B (Chicken)' },
                            { color: 'bg-white/10 border-white/20', label: 'Empty Slot' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-1.5">
                                <div className={`w-3 h-3 rounded-sm border ${item.color}`}></div>
                                <span className="text-[9px] font-bold text-white/70 tracking-tighter uppercase">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Right Panel: Inspector + Feedback ── */}
                <section className="w-72 shrink-0 bg-white dark:bg-[#111111] border-l border-slate-200 dark:border-[#333] flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-slate-200 dark:border-[#333]">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Inspector</h2>
                        {selectedShipment ? (
                            <div className="bg-slate-50 dark:bg-[#1A1A1A] p-4 rounded-xl">
                                <span className="text-[10px] font-black text-primary uppercase">Selection</span>
                                <h3 className="text-lg font-bold mb-3 text-slate-900 dark:text-white">{selectedShipment.id}</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 dark:text-slate-400">Customer</span>
                                        <span className="font-semibold text-right text-slate-900 dark:text-white">{selectedShipment.customer}</span>
                                    </div>
                                    <div className="flex flex-col gap-1 border-y border-slate-200 dark:border-[#333] py-2">
                                        <span className="text-[9px] text-slate-400 uppercase font-black">Cargo Detail</span>
                                        {selectedShipment.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-xs">
                                                <span className="text-slate-500 dark:text-slate-400 capitalize">{item.type}</span>
                                                <span className="font-semibold text-slate-900 dark:text-white">{item.count} {item.type === 'egg' ? 'Crates' : 'Sacks'}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 dark:text-slate-400">Weight</span>
                                        <span className="font-semibold text-slate-900 dark:text-white">{selectedShipment.weight}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs text-slate-400 text-center py-6">Select a shipment to inspect</p>
                        )}
                    </div>

                    <div className="p-5 flex-1 overflow-y-auto">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Real-time Feedback</h2>
                        <div className="space-y-2">
                            {[
                                { icon: 'check_circle', label: 'Stack Integrity', value: 'OK', ok: true },
                                { icon: 'check_circle', label: 'Payload Balance', value: '94%', ok: true },
                                { icon: 'warning', label: 'Block Sequence', value: 'CHECK', ok: false },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#1A1A1A] rounded-lg border border-slate-100 dark:border-white/5">
                                    <div className="flex items-center gap-2">
                                        <span className={`material-symbols-outlined text-sm ${item.ok ? 'text-green-500' : 'text-amber-500'}`}>{item.icon}</span>
                                        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{item.label}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-5 border-t border-slate-200 dark:border-[#333]">
                        <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Activity</h2>
                        <div className="space-y-4">
                            {activityLog.map((entry, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${entry.active ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                                    <div>
                                        <p className="text-[10px] font-bold leading-none text-slate-900 dark:text-white">{entry.label}</p>
                                        <p className="text-[9px] text-slate-500 dark:text-slate-400">{entry.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-5 py-3 rounded-full shadow-xl animate-bounce-once">
                    {toast}
                </div>
            )}
        </div>
    );
}
