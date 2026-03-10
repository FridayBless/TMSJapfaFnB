import Header from "../../components/Header";

export default function FleetManagement() {
    return (
        <>
            <Header title="Fleet Health & Fuel Tracking" />

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 md:space-y-8">
                    {/* KPI Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-medium">Total Fleet Health</p>
                            <div className="flex items-end justify-between mt-2">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">92%</h3>
                                <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">trending_up</span>+2.1%
                                </span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-medium">Avg. Fuel Efficiency</p>
                            <div className="flex items-end justify-between mt-2">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">8.2 <span className="text-base font-normal text-slate-400 dark:text-slate-500">km/L</span></h3>
                                <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">trending_up</span>+0.5%
                                </span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-medium">Trucks in Maintenance</p>
                            <div className="flex items-end justify-between mt-2">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">1 <span className="text-base font-normal text-slate-400 dark:text-slate-500">(B 9522 JXS)</span></h3>
                                <span className="text-rose-500 text-sm font-bold flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">warning</span>Active
                                </span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-medium">Next Scheduled Service</p>
                            <div className="flex items-end justify-between mt-2">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">3 <span className="text-base font-normal text-slate-400 dark:text-slate-500">Days</span></h3>
                                <span className="text-primary text-sm font-bold">B 9513 JXS</span>
                            </div>
                        </div>
                    </div>

                    {/* Fleet Table */}
                    <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#333] shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-[#333] flex items-center justify-between">
                            <h3 className="font-bold text-lg">Fleet Status & Health</h3>
                            <button className="text-primary text-sm font-semibold hover:underline">Export CSV</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[800px]">
                                <thead className="bg-slate-50 dark:bg-[#0a0a0a] text-slate-500 dark:text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Truck ID</th>
                                        <th className="px-6 py-4">Vehicle Model</th>
                                        <th className="px-6 py-4">License Plate</th>
                                        <th className="px-6 py-4">Mileage (KM)</th>
                                        <th className="px-6 py-4">Fuel Consumption</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Next Service</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* TRK-01 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer bg-primary/5">
                                        <td className="px-6 py-4 font-bold text-primary">TRK-01</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">Isuzu ELF</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">B 9044 JXS</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">45,200</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[12%]"></div>
                                                </div>
                                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">12.0</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase rounded-full tracking-wide">Available</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">15 Oct 2026</td>
                                    </tr>

                                    {/* TRK-02 */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">TRK-02</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">Hino Dutro</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">B 9513 JXS</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">89,100</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[15%]"></div>
                                                </div>
                                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">14.5</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase rounded-full tracking-wide">In Route</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">03 Oct 2026</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">TRK-03</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">Isuzu ELF</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">B 9514 JXS</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">12,300</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[11%]"></div>
                                                </div>
                                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">11.2</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase rounded-full tracking-wide">Available</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">22 Nov 2026</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">TRK-04</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">Mitsubishi Fuso</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">B 9517 JXS</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">156,000</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[20%]"></div>
                                                </div>
                                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">18.4</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase rounded-full tracking-wide">In Route</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">10 Oct 2026</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">TRK-05</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">Hino Dutro</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">B 9518 JXS</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">34,500</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[14%]"></div>
                                                </div>
                                                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">13.8</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase rounded-full tracking-wide">Maintenance</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">01 Sep 2026</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">TRK-06</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">Isuzu ELF</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800 dark:text-slate-200">B 9522 JXS</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">67,800</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full w-[13%]"></div>
                                                </div>
                                                <span className="text-xs font-medium">12.5</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-rose-100 text-rose-600 text-[10px] font-bold uppercase rounded-full tracking-wide">Maintenance</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">18 Oct 2026</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:bg-[#0a0a0a] transition-colors cursor-pointer border-t-2 border-slate-200 dark:border-[#333] border-dashed">
                                        <td className="px-6 py-4 font-bold">TRK-07</td>
                                        <td className="px-6 py-4 text-sm">Blind Van</td>
                                        <td className="px-6 py-4 text-sm">ON CALL 1</td>
                                        <td className="px-6 py-4 text-sm">--</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">N/A</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-slate-100 dark:bg-[#1A1A1A] text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase rounded-full tracking-wide">Idle</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500">N/A</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Selected Truck Detail Panel */}
                <aside className="w-full lg:w-80 bg-white dark:bg-[#111111] border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-[#333] p-6 overflow-y-auto shrink-0 space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-xl font-bold">TRK-01</h4>
                            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">Isuzu ELF • B 9044 JXS • Available</p>
                        </div>
                        <button className="p-2 bg-slate-100 dark:bg-[#1A1A1A] rounded-lg hover:text-primary">
                            <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                    </div>

                    {/* Health Radar Simulation */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h5 className="text-sm font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">Health Status</h5>
                            <span className="text-emerald-500 text-xs font-bold px-2 py-0.5 bg-emerald-50 rounded">Excellent</span>
                        </div>
                        <div className="relative h-48 w-full flex items-center justify-center">
                            <div className="absolute inset-0 border border-slate-200 dark:border-[#333] rounded-full flex items-center justify-center">
                                <div className="w-[75%] h-[75%] border border-slate-200 dark:border-[#333] rounded-full"></div>
                                <div className="w-[50%] h-[50%] border border-slate-200 dark:border-[#333] rounded-full"></div>
                                <div className="w-[25%] h-[25%] border border-slate-200 dark:border-[#333] rounded-full"></div>
                                <svg className="absolute w-full h-full -rotate-90">
                                    <polygon className="origin-center scale-90 translate-x-4 translate-y-4" fill="rgba(255, 123, 0, 0.4)" points="120,40 180,90 160,160 80,160 60,90" stroke="#ff7b00" strokeWidth="2"></polygon>
                                </svg>
                            </div>
                            <span className="absolute top-0 text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">ENGINE</span>
                            <span className="absolute right-0 text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">TIRES</span>
                            <span className="absolute bottom-0 text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">OIL</span>
                            <span className="absolute left-0 text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">BATTERY</span>
                            <span className="absolute top-1/4 right-0 text-[10px] font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">BRAKES</span>
                        </div>
                    </div>

                    {/* Recent Fuel Logs */}
                    <div className="space-y-4">
                        <h5 className="text-sm font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">Recent Fuel Logs</h5>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#0a0a0a] rounded-lg">
                                <div>
                                    <p className="text-sm font-bold">24 Feb 2026</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500">45 Liters • Shell Station</p>
                                </div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">RP 450.500</p>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#0a0a0a] rounded-lg">
                                <div>
                                    <p className="text-sm font-bold">18 Feb 2026</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500">42 Liters • Pertamina</p>
                                </div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">RP 420.200</p>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-[#0a0a0a] rounded-lg">
                                <div>
                                    <p className="text-sm font-bold">12 Feb 2026</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500">50 Liters • SPBU 34.123.45</p>
                                </div>
                                <p className="text-sm font-bold text-slate-900 dark:text-white">RP 481.000</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">
                        Schedule Service
                    </button>
                </aside>
            </div>
        </>
    );
}
