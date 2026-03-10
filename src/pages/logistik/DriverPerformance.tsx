import Header from "../../components/Header";

export default function DriverPerformance() {
    return (
        <>
            <Header title="Driver List" />

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Driver Performance Directory</h2>
                        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500">Monitor driver performance and real-time availability across zones.</p>
                    </div>

                    <div className="flex items-center gap-4 w-full lg:max-w-xl justify-end">
                        <div className="relative w-full">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-xl">search</span>
                            <input className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:bg-white dark:bg-[#111111] transition-all outline-none" placeholder="Find Driver by name or ID..." type="text" />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#333] rounded-lg text-sm font-medium hover:bg-slate-50 dark:bg-[#1A1A1A] whitespace-nowrap">
                            <span className="material-symbols-outlined text-sm">filter_list</span>
                            Filter
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#333] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-[#1A1A1A]/50 border-b border-slate-200 dark:border-[#333]">
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Driver Info</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Current Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Perf. Score</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Key Metrics</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider">Assigned Truck</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-[#333]">
                                {/* Driver 1 */}
                                <tr className="hover:bg-primary/5 transition-colors cursor-pointer bg-primary/5">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0">
                                                <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnkWNI1IC8JzuHI1rq_bPAkgYhu6ld_UTcq8RZH1VbJFEsCnj2Di5hg93P-88jB0YPr1u-t9JfZSoLFnbjhNS6K3YMrhEyqVZLWHP-eeYGwOuMZg1Mnl_TvcTnp-68GGLr6eeqUyvstbTiwFsGOasBKQ7PDBcihtT8BQsmGi2rvF2apQPBFm0SjjSe8jsgw3r5MWEYTgjbxj__wndfacnGOOWDQbd8XbXKaEHC2pCLSR4gleFfj0cSLuWLtXB40BIe5CnVmGBiadc" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">Budi Santoso</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-mono">DRV-102</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                                            On Route
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-yellow-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                                            <span className="font-bold">98</span>
                                            <span className="text-xs text-slate-400 dark:text-slate-500">/100</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-slate-400 dark:text-slate-500 w-16">On-time:</span>
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">99%</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-slate-400 dark:text-slate-500 w-16">Safety:</span>
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">4.9/5</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-slate-600">B 9044 JXS</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 hover:bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-400 dark:text-slate-500">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Expansion Content */}
                                <tr className="bg-primary/5">
                                    <td className="px-6 pb-6" colSpan={6}>
                                        <div className="bg-white dark:bg-[#111111] rounded-lg border border-primary/20 p-4 flex flex-col lg:flex-row gap-6 lg:gap-8">
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500 uppercase">Weekly Delivery Success Trend</h4>
                                                    <span className="text-xs text-primary font-medium">+4.2% from last week</span>
                                                </div>
                                                {/* Mini Chart Placeholder */}
                                                <div className="h-24 w-full flex items-end gap-1 px-2">
                                                    <div className="flex-1 bg-primary/20 rounded-t h-[60%]"></div>
                                                    <div className="flex-1 bg-primary/30 rounded-t h-[75%]"></div>
                                                    <div className="flex-1 bg-primary/40 rounded-t h-[65%]"></div>
                                                    <div className="flex-1 bg-primary/50 rounded-t h-[90%]"></div>
                                                    <div className="flex-1 bg-primary/60 rounded-t h-[80%]"></div>
                                                    <div className="flex-1 bg-primary/80 rounded-t h-[95%]"></div>
                                                    <div className="flex-1 bg-primary rounded-t h-[100%]"></div>
                                                </div>
                                                <div className="flex justify-between mt-2 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold px-2">
                                                    <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-64 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-[#333] pt-4 lg:pt-0 lg:pl-8 flex flex-row lg:flex-col justify-between lg:justify-center gap-4">
                                                <div className="mb-0 lg:mb-3">
                                                    <p className="text-xs text-slate-400 dark:text-slate-500">Avg. Speed</p>
                                                    <p className="text-xl font-bold">35 <span className="text-sm font-normal text-slate-400 dark:text-slate-500">km/h</span></p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500">Total Distance</p>
                                                    <p className="text-xl font-bold">1,248 <span className="text-sm font-normal text-slate-400 dark:text-slate-500">km</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 2 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0">
                                                <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-59hZLke4BORxHTDvloxN0f2ZJQsaVI0yppu80sCZwa79fYHtYLcTux2qG7KLTI2nk6ztd987w17dOFt3HzB1NEr4fvJV8loIDp9hEWb3ISm2zdWFzqIP8XQHDmN7UIYZmTQwJi6C62xDGzthDq99Cf4D1UqecmAQoFHIcOuxPD2De68OTT-k-PEzi0055fH2yBZk1oTKNsv1XDgyhvylu7eyUzCz84GrEMiQTCVSweJy8gHAZSn4m9KTGHudW96K1DJpZ3KBmV8" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">Joko Widodo</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-mono">DRV-089</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
                                            Resting
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-slate-300 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                                            <span className="font-bold">85</span>
                                            <span className="text-xs text-slate-400 dark:text-slate-500">/100</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-slate-400 dark:text-slate-500 w-16">On-time:</span>
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">92%</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-slate-400 dark:text-slate-500 w-16">Safety:</span>
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">4.2/5</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-slate-600">B 9514 JXS</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 hover:bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-400 dark:text-slate-500">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                {/* Row 3 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0">
                                                <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBL2pOGkxg2biv3J3aZb1ix4Ier2dzhrlaMHy3VXZ__kicF7IPeeDeN2tortVgawMPVGYc2S8-puy5IQwbe2_8H8bt2cuIDnb9YS24Fenno_xKuEogxxS17KD_lOGoWwY5fqVwtsb-S61R_jkzPlL7K7Dog6sNocJipH3GFFV5uCxRC9oLGe0aHUJncwJcDPgFR-CyNTSwwooCaF5FKRn9dvswF2lbGJXTn2WpRhCJQROCoZIFa2GVdC9Fx6ZgSVYeJiINZQMFUFFw" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">Rahmat Hidayat</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-mono">DRV-115</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
                                            Offline
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-orange-400 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                                            <span className="font-bold">94</span>
                                            <span className="text-xs text-slate-400 dark:text-slate-500">/100</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-slate-400 dark:text-slate-500 w-16">On-time:</span>
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">97%</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-slate-400 dark:text-slate-500 w-16">Safety:</span>
                                                <span className="font-semibold text-slate-700 dark:text-slate-300">4.8/5</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-mono text-slate-600">B 9517 JXS</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1 hover:bg-slate-200 dark:bg-slate-700 rounded-lg text-slate-400 dark:text-slate-500">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 dark:bg-[#1A1A1A] border-t border-slate-200 dark:border-[#333] flex items-center justify-between">
                        <span className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Showing 1 to 3 of 8 drivers</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-slate-200 dark:border-[#333] rounded bg-white dark:bg-[#111111] text-xs font-bold hover:bg-slate-50 dark:bg-[#1A1A1A] disabled:opacity-50 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-[#333]">Previous</button>
                            <button className="px-3 py-1 bg-primary text-white rounded text-xs font-bold shadow-sm">1</button>
                            <button className="px-3 py-1 border border-slate-200 dark:border-[#333] rounded bg-white dark:bg-[#111111] text-xs font-bold hover:bg-slate-50 dark:bg-[#1A1A1A] text-slate-700 dark:text-slate-300">2</button>
                            <button className="px-3 py-1 border border-slate-200 dark:border-[#333] rounded bg-white dark:bg-[#111111] text-xs font-bold hover:bg-slate-50 dark:bg-[#1A1A1A] text-slate-700 dark:text-slate-300">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
