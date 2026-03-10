import ThemeToggle from "../../components/ThemeToggle";

export default function SalesOrderEntry() {
    return (
        <>
            {/* Top Header - Not sticky on mobile to avoid double headers */}
            <header className="h-16 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#111111] flex items-center justify-between px-4 md:px-8 lg:sticky top-0 z-10 transition-colors">
                <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white truncate mr-2">Input & Kelola Pesanan</h2>
                <div className="flex items-center gap-2 md:gap-4 shrink-0">
                    <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors relative">
                        <span className="material-symbols-outlined mb-[-4px]">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-primary rounded-full"></span>
                    </button>
                    <ThemeToggle />
                </div>
            </header>

            <div className="p-4 md:p-8 space-y-6 md:space-y-8">
                {/* Section: Buat Pesanan Baru */}
                <section className="bg-white dark:bg-[#111111] rounded-xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden transition-colors">
                    <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#1a1a1a]">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">add_circle</span>
                            Buat Pesanan Baru
                        </h3>
                    </div>

                    <div className="p-6 grid grid-cols-12 gap-6">
                        {/* Left Column: Form Details */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Customer / Toko</label>
                                    <div className="relative">
                                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                                        <input className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1F1F1F] focus:ring-primary focus:border-primary text-sm dark:text-white transition-colors placeholder:text-slate-400" placeholder="Cari nama customer atau kode toko..." type="text" />
                                    </div>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Time Window Delivery</label>
                                    <select className="w-full py-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1F1F1F] focus:ring-primary focus:border-primary text-sm dark:text-white transition-colors">
                                        <option>Bebas (08:00 - 20:00)</option>
                                        <option>Pagi (08:00 - 12:00)</option>
                                        <option>Siang (12:00 - 16:00)</option>
                                        <option>Malam (16:00 - 20:00)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Product Table */}
                            <div className="border border-slate-200 dark:border-white/10 rounded-lg overflow-x-auto transition-colors">
                                <table className="w-full text-sm text-left min-w-[500px]">
                                    <thead className="bg-slate-50 dark:bg-[#1a1a1a] text-slate-600 dark:text-slate-400 font-medium">
                                        <tr>
                                            <th className="px-4 py-3">SKU Produk</th>
                                            <th className="px-4 py-3">Kuantitas (Pcs/Box)</th>
                                            <th className="px-4 py-3">Tonase (Kg)</th>
                                            <th className="px-4 py-3 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 border-b border-slate-200 dark:border-white/10">
                                        <tr>
                                            <td className="px-4 py-3">
                                                <select className="w-full border-none focus:ring-0 text-sm p-0 bg-transparent text-slate-500 dark:text-slate-400">
                                                    <option>Pilih SKU Produk...</option>
                                                    <option>Ayam Karkas - S (0.8-0.9kg)</option>
                                                    <option>Ayam Karkas - M (1.0-1.2kg)</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-3">
                                                <input className="w-24 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1F1F1F] dark:text-white rounded-md text-sm py-1 placeholder:text-slate-400 px-2" placeholder="0" type="number" />
                                            </td>
                                            <td className="px-4 py-3 text-slate-500 dark:text-slate-400">0.00</td>
                                            <td className="px-4 py-3 text-right">
                                                <button className="text-primary font-bold hover:underline">Tambah</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot className="bg-primary/5 dark:bg-primary/10 transition-colors">
                                        <tr className="font-bold text-slate-800 dark:text-slate-200">
                                            <td className="px-4 py-3 text-right">Total Order:</td>
                                            <td className="px-4 py-3">0 Pcs</td>
                                            <td className="px-4 py-3">0.00 Kg</td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        {/* Right Column: Instructions & Submit */}
                        <div className="col-span-12 lg:col-span-4 flex flex-col">
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Catatan Khusus (Driver)</label>
                            <textarea className="w-full bg-white dark:bg-[#1F1F1F] border border-slate-200 dark:border-white/10 rounded-lg focus:ring-primary focus:border-primary text-sm dark:text-white transition-colors resize-none flex-1 placeholder:text-slate-400 p-3" placeholder="Contoh: Bongkar lewat pintu belakang, butuh pallet tambahan..." rows={6}></textarea>
                            <div className="mt-6">
                                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">save</span>
                                    SIMPAN & BUAT ORDER
                                </button>
                                <p className="text-center text-[10px] text-slate-400 mt-3 uppercase tracking-wider">Sistem akan otomatis mengecek stok gudang terdekat</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Order Master List */}
                <section className="bg-white dark:bg-[#111111] rounded-xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden transition-colors">
                    <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-[#1a1a1a]">
                        <div className="flex items-center gap-4">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Order Master List</h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 rounded-full text-xs font-bold border border-green-200 dark:border-green-500/30 uppercase">Live Update</span>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <span className="material-symbols-outlined text-green-600 dark:text-green-500 mb-[-4px]">download</span>
                            EXPORT FKO (Excel)
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 dark:bg-[#1a1a1a] text-slate-500 dark:text-slate-400 font-medium border-b border-slate-200 dark:border-white/5 transition-colors">
                                <tr>
                                    <th className="px-6 py-4">No. PO</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Waktu Pesanan</th>
                                    <th className="px-6 py-4">Kuantitas</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Detail</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                <tr className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono font-bold text-primary">PO/2023/10245</td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-800 dark:text-slate-200">Indogrosir Surabaya</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">CODE: IGS-SUB-01</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">24 Oct 2023, 09:15</td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-800 dark:text-slate-200 font-medium">450 Pcs</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">425.50 Kg</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">
                                            <span className="size-1.5 rounded-full bg-blue-500"></span>
                                            Ready to Route
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-slate-400 mb-[-4px]">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono font-bold text-primary">PO/2023/10246</td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-800 dark:text-slate-200">Superindo Kenjeran</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">CODE: SPI-KNJ-05</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">24 Oct 2023, 10:30</td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-800 dark:text-slate-200 font-medium">1,200 Pcs</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">1,150.00 Kg</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">
                                            <span className="size-1.5 rounded-full bg-blue-500"></span>
                                            Ready to Route
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-slate-400 mb-[-4px]">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono font-bold text-primary">PO/2023/10247</td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-800 dark:text-slate-200">Lotte Mart Ngagel</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">CODE: LTM-NGL-02</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">24 Oct 2023, 11:45</td>
                                    <td className="px-6 py-4">
                                        <div className="text-slate-800 dark:text-slate-200 font-medium">320 Pcs</div>
                                        <div className="text-xs text-slate-500 dark:text-slate-400">288.00 Kg</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
                                            <span className="size-1.5 rounded-full bg-amber-500"></span>
                                            Validating SKU
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-slate-400 mb-[-4px]">more_vert</span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Simple */}
                    <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 transition-colors bg-slate-50 dark:bg-[#1a1a1a]">
                        <p>Menampilkan 1 - 3 dari 124 pesanan</p>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111111] rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Sebelumnya</button>
                            <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111111] rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">Selanjutnya</button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
