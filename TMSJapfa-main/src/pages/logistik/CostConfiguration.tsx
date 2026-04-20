import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CostConfiguration() {
    const navigate = useNavigate();
    const [fuelCost, setFuelCost] = useState<number>(1.45);
    const [maintenanceBuffer, setMaintenanceBuffer] = useState<number>(12.5);
    const [driverSalary, setDriverSalary] = useState<string>('3,500.00');
    const [overtimeStandard, setOvertimeStandard] = useState<string>('28.50');
    const [overtimePremium, setOvertimePremium] = useState<string>('38.00');

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#333] px-4 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-xl font-bold">Cost Configuration</h1>
                <div className="flex items-center gap-6">
                    <div className="relative hidden md:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl">search</span>
                        <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-[#1A1A1A] border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 outline-none" placeholder="Search configuration..." type="text" />
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:bg-[#1A1A1A] rounded-lg relative transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold">Alex Admin</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400">Fleet Operations</p>
                            </div>
                            <img className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJm3w9qzIOpWbkRQ7IwPeE7Y0osx-07ft_FirScRWyQVK6d7ex5JpefkWS6wg0kiUKuKhoTHYa-LewuqDlMB460iO-Lhp7i5NGcvSVlmILFyIJhhrURyp4mJJ0S7Q5lezKQa-ZdzM5MVlt1EfeJdm41FiRMyCoQv2wXlzobHx2HpkHkzqdRDr7cU-kXJBDnyOFg4mQ5jD6nFbjXnl1lH2BcobozPr8a4qiNlC9MAHAXrZPVe1m40_R71CCc-g4dHXS-8SR6vkLHdU" alt="user" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex flex-col flex-1 min-h-0">
                {/* Sub-Tabs Navigation */}
                <div className="px-4 md:px-8 pt-6">
                    <div className="flex gap-8 border-b border-slate-200 dark:border-[#333]">
                        <button
                            onClick={() => navigate('/logistik/settings')}
                            className="pb-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-on-surface transition-all"
                        >
                            Delivery Zones
                        </button>
                        <button className="pb-4 text-sm font-bold text-primary border-b-2 border-primary">
                            Cost Configuration
                        </button>
                        <button
                            onClick={() => navigate('/logistik/settings/team-roles')}
                            className="pb-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-on-surface transition-all"
                        >
                            Team Roles
                        </button>
                    </div>
                </div>

                {/* Content Canvas */}
                <div className="p-4 md:p-8 flex-1 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        {/* Page Title Row */}
                        <div className="flex items-baseline justify-between mb-8">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-black text-on-surface tracking-tighter mb-2">Global Parameters</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md">
                                    Define the foundational economic metrics that drive your logistics routing and profitability calculations.
                                </p>
                            </div>
                            <button className="bg-gradient-to-r from-[#994700] to-[#FF7A00] text-white px-6 py-3 rounded-lg font-bold text-sm shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all hidden sm:block">
                                Save Configuration
                            </button>
                        </div>

                        {/* Bento Grid Layout */}
                        <div className="grid grid-cols-12 gap-6">

                            {/* Fuel Cost Card (Large Highlight) */}
                            <div className="col-span-12 md:col-span-8 bg-white dark:bg-[#111111] p-8 rounded-xl shadow-sm border border-slate-200 dark:border-[#333] flex flex-col justify-between min-h-[280px] relative overflow-hidden">
                                <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-3 bg-orange-100 dark:bg-orange-500/10 rounded-lg text-primary">
                                            <span className="material-symbols-outlined">local_gas_station</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Global Energy Rate</p>
                                            <h4 className="text-xl font-bold text-on-surface">Fuel Cost per Liter</h4>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm">
                                        Adjust based on current market trends. This value impacts every delivery route and zone multiplier.
                                    </p>
                                </div>
                                <div className="relative z-10 flex items-end gap-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-300 dark:text-slate-600">$</span>
                                            <input
                                                className="w-full bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#333] rounded-2xl pl-12 pr-6 py-5 text-4xl md:text-5xl font-black tracking-tighter text-on-surface focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-[#1A1A1A] transition-all outline-none"
                                                type="number"
                                                step="0.01"
                                                value={fuelCost}
                                                onChange={(e) => setFuelCost(parseFloat(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 mb-4 shrink-0">
                                        <span className="material-symbols-outlined text-sm">trending_up</span>
                                        +2.4% vs last month
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Maintenance Buffer */}
                            <div className="col-span-12 md:col-span-4 bg-[#121212] p-8 rounded-xl text-white flex flex-col justify-between">
                                <div>
                                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6">
                                        <span className="material-symbols-outlined text-orange-300">build</span>
                                    </div>
                                    <h4 className="text-lg font-bold mb-2">Maintenance Buffer</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">
                                        Percentage of revenue reserved for unexpected vehicle repairs and routine servicing.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <div className="flex justify-between items-end mb-4">
                                        <div className="flex items-end gap-0.5">
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={maintenanceBuffer}
                                                onChange={(e) => setMaintenanceBuffer(parseFloat(e.target.value))}
                                                className="text-4xl font-black text-orange-300 bg-transparent border-none outline-none w-24 p-0"
                                            />
                                            <span className="text-xl text-orange-300 font-black mb-1">%</span>
                                        </div>
                                        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">Recommended: 10-15%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#994700] to-[#FF7A00] rounded-full shadow-[0_0_15px_rgba(255,122,0,0.5)] transition-all duration-300"
                                            style={{ width: `${Math.min(maintenanceBuffer * 6.67, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Driver Base Salary */}
                            <div className="col-span-12 md:col-span-6 lg:col-span-7 bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-slate-400">payments</span>
                                        <h4 className="font-bold text-on-surface">Driver Base Salary (Monthly)</h4>
                                    </div>
                                    <span className="text-xs font-bold bg-slate-100 dark:bg-white/10 px-3 py-1 rounded-full text-slate-600 dark:text-slate-300">Fixed Rate</span>
                                </div>
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            className="w-full bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#333] rounded-xl p-4 text-2xl font-black text-on-surface focus:ring-1 focus:ring-primary focus:bg-white dark:focus:bg-[#1A1A1A] transition-all outline-none pr-16"
                                            type="text"
                                            value={driverSalary}
                                            onChange={(e) => setDriverSalary(e.target.value)}
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-bold">USD</span>
                                    </div>
                                    <button className="p-4 bg-slate-100 dark:bg-white/10 rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                                        <span className="material-symbols-outlined">settings_suggest</span>
                                    </button>
                                </div>
                                <div className="mt-4 p-4 bg-slate-50 dark:bg-[#0a0a0a] rounded-lg border-l-4 border-primary/20">
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">
                                        Applied to all active fleets in Category A and B. Includes mandatory social security contributions based on regional laws.
                                    </p>
                                </div>
                            </div>

                            {/* Overtime Rate */}
                            <div className="col-span-12 md:col-span-6 lg:col-span-5 bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="material-symbols-outlined text-slate-400">schedule</span>
                                    <h4 className="font-bold text-on-surface">Overtime Rate (per Hour)</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 dark:bg-[#0a0a0a] rounded-xl border border-slate-200 dark:border-[#333]">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Standard (1.5x)</p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg font-black text-on-surface">$</span>
                                            <input
                                                type="text"
                                                value={overtimeStandard}
                                                onChange={(e) => setOvertimeStandard(e.target.value)}
                                                className="text-xl font-black text-on-surface bg-transparent outline-none w-20"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-primary/10">
                                        <p className="text-[10px] font-bold text-primary uppercase mb-1">Premium (2.0x)</p>
                                        <div className="flex items-center gap-1">
                                            <span className="text-lg font-black text-primary">$</span>
                                            <input
                                                type="text"
                                                value={overtimePremium}
                                                onChange={(e) => setOvertimePremium(e.target.value)}
                                                className="text-xl font-black text-primary bg-transparent outline-none w-20"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-[10px] font-medium text-slate-400">Effective from Jan 01, 2024</span>
                                    <button className="text-xs font-bold text-primary hover:underline transition-all">Edit Multipliers</button>
                                </div>
                            </div>

                            {/* Forecast Impact - Editorial Element */}
                            <div className="col-span-12 bg-slate-50 dark:bg-white/5 rounded-2xl p-1 lg:p-1.5 flex flex-col lg:flex-row gap-1.5 h-auto border border-slate-200 dark:border-[#333]">
                                <div className="flex-1 bg-white dark:bg-[#111111] rounded-xl p-8 flex flex-col justify-center">
                                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Forecast Impact</h5>
                                    <p className="text-xl md:text-2xl font-black tracking-tighter text-on-surface leading-tight mb-6">
                                        Changing these parameters will adjust your global delivery margins by approx{' '}
                                        <span className="text-primary">+3.2%</span>.
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-400">Projected Savings</span>
                                            <span className="text-xl font-black text-on-surface">$12,450.00</span>
                                        </div>
                                        <div className="w-px h-10 bg-slate-200 dark:bg-white/10"></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-400">Efficiency Index</span>
                                            <span className="text-xl font-black text-on-surface">94.8%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-1/3 h-48 lg:h-auto relative rounded-xl overflow-hidden group">
                                    <div className="w-full h-full bg-gradient-to-br from-[#994700] to-[#FF7A00] flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <span className="material-symbols-outlined text-6xl opacity-30">analytics</span>
                                            <p className="text-xs font-bold mt-2 opacity-60">Predictive Analysis</p>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                                        <p className="text-white text-xs font-bold">Predictive Analysis</p>
                                        <p className="text-white/60 text-[10px]">Real-time simulation engine based on your current configuration settings.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sticky Footer for Actions */}
                <footer className="mt-auto p-4 md:p-8 border-t border-slate-200 dark:border-[#333] bg-white dark:bg-[#111111] sticky bottom-0">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400">
                            <span className="material-symbols-outlined text-sm">info</span>
                            <span className="text-xs">Last updated by Admin 2 hours ago</span>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-6 py-2.5 text-sm font-bold text-on-surface hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-colors">
                                Discard Changes
                            </button>
                            <button className="bg-gradient-to-r from-[#994700] to-[#FF7A00] text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                Save &amp; Deploy
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
