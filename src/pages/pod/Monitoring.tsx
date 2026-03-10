import PodSidebar from "./Sidebar";
import Header from "../../components/Header";

export default function Monitoring() {
    return (
        <div className="flex h-screen overflow-hidden relative bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display transition-colors">
            <PodSidebar />
            
            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 dark:bg-[#111111]">
                <Header title="Monitoring Harian" />

                <div className="p-8 space-y-8">
                    {/* KPI Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Target</p>
                                    <p className="text-3xl font-bold mt-1">150</p>
                                </div>
                                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                                    <span className="material-symbols-outlined">assignment</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-4">Dokumen POD hari ini</p>
                        </div>
                        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">POD Progress</p>
                                    <p className="text-3xl font-bold mt-1">120<span className="text-sm font-normal text-slate-400">/150</span></p>
                                </div>
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">trending_up</span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full" style={{ width: "80%" }}></div>
                                </div>
                                <p className="text-xs text-primary font-semibold mt-2">80% Tercapai</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Waiting for Driver</p>
                                    <p className="text-3xl font-bold mt-1">18</p>
                                </div>
                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600">
                                    <span className="material-symbols-outlined">pending_actions</span>
                                </div>
                            </div>
                            <p className="text-xs text-amber-600 font-medium mt-4">Menunggu upload berkas</p>
                        </div>
                        <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Verified</p>
                                    <p className="text-3xl font-bold mt-1">102</p>
                                </div>
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                                    <span className="material-symbols-outlined">verified</span>
                                </div>
                            </div>
                            <p className="text-xs text-emerald-600 font-medium mt-4">Selesai divalidasi admin</p>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#1a1a1a]">
                            <h3 className="font-bold text-lg dark:text-white">Tabel Pemantauan Truk</h3>
                            <div className="flex items-center gap-2">
                                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-lg transition-colors">
                                    <span className="material-symbols-outlined text-base">filter_list</span> Filter
                                </button>
                                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                                    <span className="material-symbols-outlined text-base">download</span> Export
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-[#222] text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Plat Nomor / Driver</th>
                                        <th className="px-6 py-4 font-semibold">Route</th>
                                        <th className="px-6 py-4 font-semibold">POD Progress</th>
                                        <th className="px-6 py-4 font-semibold">Status Terkini</th>
                                        <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    {/* Expanded Truck Group */}
                                    <tr className="bg-slate-50/50 dark:bg-[#222]/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-slate-400">expand_more</span>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-slate-100">B 9044 JXS</p>
                                                    <p className="text-xs text-slate-500">Mulyadi - 0812-XXXX-XXXX</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Jakarta - Bandung - Solo</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-500 h-full" style={{ width: "80%" }}></div>
                                                </div>
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">8/10</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                                Waiting Admin
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary hover:underline text-xs font-bold">Detail Truk</button>
                                        </td>
                                    </tr>
                                    {/* Stop Details Row */}
                                    <tr className="bg-white dark:bg-[#1a1a1a] border-l-4 border-primary">
                                        <td className="px-6 py-0" colSpan={5}>
                                            <div className="pl-12 py-6 space-y-4">
                                                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Detail Stop & Dokumen</p>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {/* Stop Item 1 */}
                                                    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-[#222]/30">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
                                                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold dark:text-slate-200">Stop 01 - Jakarta Warehouse</p>
                                                                <p className="text-xs text-slate-500">DO-90334211 • 14:20 WIB</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-6">
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">Verified</span>
                                                            <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined text-lg">visibility</span></button>
                                                        </div>
                                                    </div>
                                                    {/* Stop Item 2 */}
                                                    <div className="flex items-center justify-between p-3 rounded-lg border border-amber-200 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-900/10">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-8 h-8 rounded bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
                                                                <span className="material-symbols-outlined text-lg">hourglass_empty</span>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold dark:text-slate-200">Stop 02 - Bogor Retailer</p>
                                                                <p className="text-xs text-slate-500">DO-90334215 • 16:45 WIB</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-6">
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">Waiting Admin</span>
                                                            <button className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-primary/90 transition-colors">Verify Now</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* Next Truck Row */}
                                    <tr className="hover:bg-slate-50 dark:hover:bg-[#222]/50 transition-colors bg-white dark:bg-[#1a1a1a]">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-slate-100">B 1102 KKM</p>
                                                    <p className="text-xs text-slate-500">Rendi - 0821-XXXX-XXXX</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Semarang - Solo</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                                    <div className="bg-primary h-full" style={{ width: "40%" }}></div>
                                                </div>
                                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">4/10</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                                In Transit
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary hover:underline text-xs font-bold">Detail Truk</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#1a1a1a]">
                            <p className="text-sm text-slate-500 italic">Menampilkan 1-10 dari 45 armada</p>
                            <div className="flex items-center gap-1">
                                <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#222] rounded-lg transition-colors"><span className="material-symbols-outlined">first_page</span></button>
                                <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#222] rounded-lg transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
                                <button className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded font-bold text-xs">1</button>
                                <button className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#222] rounded text-xs transition-colors">2</button>
                                <button className="w-8 h-8 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#222] rounded text-xs transition-colors">3</button>
                                <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#222] rounded-lg transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
                                <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#222] rounded-lg transition-colors"><span className="material-symbols-outlined">last_page</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
