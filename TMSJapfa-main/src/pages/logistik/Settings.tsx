

export default function Settings() {
    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white dark:bg-[#111111] border-b border-slate-200 dark:border-[#333] px-4 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-xl font-bold">Settings Configuration</h1>
                <div className="flex items-center gap-6">
                    <div className="relative hidden md:block">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl">search</span>
                        <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-[#1A1A1A] border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 outline-none" placeholder="Search settings..." type="text" />
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <button className="p-2 text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:bg-[#1A1A1A] rounded-lg relative transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold">Alex Admin</p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500">Fleet Operations</p>
                            </div>
                            <img className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJm3w9qzIOpWbkRQ7IwPeE7Y0osx-07ft_FirScRWyQVK6d7ex5JpefkWS6wg0kiUKuKhoTHYa-LewuqDlMB460iO-Lhp7i5NGcvSVlmILFyIJhhrURyp4mJJ0S7Q5lezKQa-ZdzM5MVlt1EfeJdm41FiRMyCoQv2wXlzobHx2HpkHkzqdRDr7cU-kXJBDnyOFg4mQ5jD6nFbjXnl1lH2BcobozPr8a4qiNlC9MAHAXrZPVe1m40_R71CCc-g4dHXS-8SR6vkLHdU" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
                {/* Tabs */}
                <div className="flex items-center border-b border-slate-200 dark:border-[#333] mb-8 overflow-x-auto">
                    <button className="px-6 py-4 text-sm font-bold border-b-2 border-primary text-primary flex items-center gap-2 shrink-0">
                        <span className="material-symbols-outlined text-sm">map</span>
                        Delivery Zones
                    </button>
                    <button className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 flex items-center gap-2 shrink-0 transition-colors">
                        <span className="material-symbols-outlined text-sm">payments</span>
                        Cost Configuration
                    </button>
                    <button className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:text-slate-300 flex items-center gap-2 shrink-0 transition-colors">
                        <span className="material-symbols-outlined text-sm">group</span>
                        Team Roles
                    </button>
                </div>

                {/* Delivery Zones Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold tracking-tight mb-1">Delivery Zones</h2>
                            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-xs">Manage geographical boundaries and truck assignments for delivery services.</p>
                        </div>
                        <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm transition-all">
                            <span className="material-symbols-outlined">add_location_alt</span>
                            Add New Zone
                        </button>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#333] rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left bg-white dark:bg-[#111111] min-w-[600px]">
                                <thead className="bg-slate-50 dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-[#333]">
                                    <tr>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Zone Name</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Assigned Trucks</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                                        <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-[#333]">
                                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                                                    <span className="material-symbols-outlined text-lg">explore</span>
                                                </div>
                                                <span className="font-medium">Kelapa Gading</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">B 9513 JXS, ON CALL 1</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary hover:text-primary/80 font-bold text-sm flex items-center gap-1 ml-auto transition-colors">
                                                <span className="material-symbols-outlined text-sm">polyline</span>
                                                Edit Polygon
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                    <span className="material-symbols-outlined text-lg">explore</span>
                                                </div>
                                                <span className="font-medium">Bekasi/Cikarang</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">B 9514 JXS, B 9517 JXS</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary hover:text-primary/80 font-bold text-sm flex items-center gap-1 ml-auto transition-colors">
                                                <span className="material-symbols-outlined text-sm">polyline</span>
                                                Edit Polygon
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-slate-100 dark:bg-[#1A1A1A] flex items-center justify-center text-slate-500 dark:text-slate-400 dark:text-slate-500">
                                                    <span className="material-symbols-outlined text-lg">explore</span>
                                                </div>
                                                <span className="font-medium">Serpong/Tangerang</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">B 9518 JXS, B 9522 JXS</td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-300">
                                                Inactive
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <button className="text-primary hover:text-primary/80 font-bold text-sm flex items-center gap-1 ml-auto transition-colors">
                                                <span className="material-symbols-outlined text-sm">polyline</span>
                                                Edit Polygon
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Cost Configuration Section */}
                    <div className="mt-8 border-t border-slate-200 dark:border-[#333] pt-8">
                        <div className="mb-6">
                            <h2 className="text-base font-bold tracking-tight mb-1">Cost Configuration</h2>
                            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-xs">Define global parameters for automated shipping cost calculations.</p>
                        </div>

                        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#333] rounded-xl p-8 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500">Fuel Cost per KM (IDR)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium">Rp</span>
                                        <input className="w-full pl-12 pr-4 py-2 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#333] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm transition-all" type="text" defaultValue="12,500" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500">Driver Base Salary (Monthly)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium">Rp</span>
                                        <input className="w-full pl-12 pr-4 py-2 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#333] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm transition-all" type="text" defaultValue="4,500,000" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500">Overtime Rate (per hour)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium">Rp</span>
                                        <input className="w-full pl-12 pr-4 py-2 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#333] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm transition-all" type="text" defaultValue="25,000" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500">Vehicle Maintenance Buffer (%)</label>
                                    <div className="relative">
                                        <input className="w-full px-4 py-2 bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#333] rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm transition-all text-right pr-12" type="text" defaultValue="15" />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-medium">%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-end gap-3">
                                <button className="px-6 py-2.5 bg-slate-100 dark:bg-[#1A1A1A] hover:bg-slate-200 dark:bg-slate-800 rounded-lg text-sm font-bold transition-colors">Discard Changes</button>
                                <button className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-bold shadow-sm transition-all">Save Parameters</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Stats Sub-Bar */}
            <footer className="mt-auto border-t border-slate-200 dark:border-[#333] bg-white dark:bg-[#111111] px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 hover:bg-slate-50 dark:bg-[#0a0a0a] transition-colors">
                <div className="flex items-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500">System Status: <span className="text-slate-900 font-bold">Optimal</span></span>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 dark:text-slate-500 hidden sm:block">Last synced: <span className="text-slate-900 font-medium">2 mins ago</span></div>
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    V 2.4.1 Build 202311
                </div>
            </footer>
        </>
    );
}
