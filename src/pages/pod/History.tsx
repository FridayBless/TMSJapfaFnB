import PodSidebar from "./Sidebar";
import Header from "../../components/Header";

export default function History() {
    return (
        <div className="flex h-screen overflow-hidden relative bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display transition-colors">
            <PodSidebar />
            
            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50 dark:bg-[#111111]">
                {/* Header */}
                <Header title="Riwayat & Arsip Dokumen" />

                {/* Filters & Summary Section */}
                <div className="p-8 space-y-6">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-[#1a1a1a] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
                        <div className="flex flex-col gap-1 min-w-[200px]">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Periode</span>
                            <div className="flex items-center gap-2 bg-background-light dark:bg-[#222] px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-sm text-slate-500">calendar_today</span>
                                <span className="text-sm font-medium dark:text-slate-300">1 Aug 2026 - 31 Aug 2026</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 min-w-[150px]">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
                            <select className="bg-background-light dark:bg-[#222] dark:text-slate-300 border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:ring-primary focus:border-primary transition-colors">
                                <option>Semua Status</option>
                                <option>Selesai (Success)</option>
                                <option>Gagal (Failed)</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400">Cari Data</span>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                <input className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-[#222] dark:text-slate-300 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary transition-colors" placeholder="Cari No. DO, Nama Toko, atau Driver..." type="text" />
                            </div>
                        </div>
                        <div className="flex items-end self-stretch">
                            <button className="flex items-center gap-2 border-2 border-primary text-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-all h-[42px]">
                                <span className="material-symbols-outlined text-sm">download</span>
                                Unduh Laporan (Excel/PDF)
                            </button>
                        </div>
                    </div>

                    {/* Daily Summary Card */}
                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0">
                                <span className="material-symbols-outlined">fact_check</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Aug 14, 2026</h3>
                                <p className="text-slate-600 dark:text-slate-300 font-medium">145/150 (96.6%) Documents Verified. <span className="text-red-500">5 Returns</span></p>
                            </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                            <div className="text-right">
                                <div className="text-xs text-slate-500 uppercase font-bold">Total Efisiensi</div>
                                <div className="text-2xl font-black text-primary">96.6%</div>
                            </div>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-[#222]/80 border-b border-slate-200 dark:border-slate-700">
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">No. Delivery Order</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Toko</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Driver</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal Selesai</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    <tr className="hover:bg-slate-50 dark:hover:bg-[#222]/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-primary">DO-2026-0814-001</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Superindo Metro Lampung</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Bambang Wijaya</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">14 Aug 2026 09:12</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Success</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-[#222]/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-primary">DO-2026-0814-002</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Indogrosir Kemayoran</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Agus Setiawan</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">14 Aug 2026 10:45</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Failed (Return)</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-[#222]/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-primary">DO-2026-0814-003</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Farmer's Market Serpong</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Dedi Kurniawan</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">14 Aug 2026 11:30</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Success</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-[#222]/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-primary">DO-2026-0814-004</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Hypermart Karawaci</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Bambang Wijaya</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">14 Aug 2026 13:05</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Success</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-[#222]/50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-semibold text-primary">DO-2026-0814-005</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Lotte Mart Gandaria</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">Slamet Riadi</td>
                                        <td className="px-6 py-4 text-sm dark:text-slate-300">14 Aug 2026 14:40</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Success</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">visibility</span></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-[#1a1a1a]">
                            <span className="text-sm text-slate-500 dark:text-slate-400">Menampilkan 1-10 dari 150 data</span>
                            <div className="flex items-center gap-2">
                                <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-[#222] transition-colors"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                                <button className="w-8 h-8 bg-primary text-white rounded-lg text-sm font-bold">1</button>
                                <button className="w-8 h-8 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#222] rounded-lg text-sm font-medium transition-colors">2</button>
                                <button className="w-8 h-8 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#222] rounded-lg text-sm font-medium transition-colors">3</button>
                                <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-[#222] transition-colors"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
