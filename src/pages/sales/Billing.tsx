import { useState } from 'react';
import ThemeToggle from '../../components/ThemeToggle';

export default function SalesBilling() {
    const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

    return (
        <div className="flex h-full overflow-hidden bg-slate-50 dark:bg-black font-display transition-colors">

            {/* Left Panel: Invoice List */}
            <div className={`w-full lg:w-96 flex flex-col border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#111111] transition-all ${selectedInvoice ? 'hidden lg:flex' : 'flex'}`}>
                {/* Header Context */}
                <header className="p-6 border-b border-slate-200 dark:border-white/5 sticky top-0 bg-white/90 dark:bg-[#111111]/90 backdrop-blur z-10">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Konfirmasi Penagihan</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Verifikasi e-POD dengan dokumen fisik untuk proses tagihan.</p>
                </header>

                {/* Statistics Highlights */}
                <div className="px-6 py-4 grid grid-cols-2 gap-3 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#1a1a1a]">
                    <div className="bg-white dark:bg-[#111111] p-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Menunggu Review</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">12</p>
                    </div>
                    <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-xl border border-primary/20">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Selesai Hari Ini</p>
                        <p className="text-2xl font-black text-primary">8</p>
                    </div>
                </div>

                {/* Filter & Search */}
                <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-white dark:bg-[#111111]">
                    <div className="relative mb-3">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                        <input className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#1F1F1F] border border-slate-200 dark:border-white/10 rounded-lg text-sm focus:ring-primary focus:border-primary transition-colors dark:text-white placeholder:text-slate-400" placeholder="Cari No. Tagihan atau PO..." type="text" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                        <button className="whitespace-nowrap px-3 py-1 bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-full text-xs font-bold transition-colors">Semua (12)</button>
                        <button className="whitespace-nowrap px-3 py-1 bg-slate-100 dark:bg-[#1F1F1F] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 rounded-full text-xs font-bold transition-colors">Prioritas (3)</button>
                        <button className="whitespace-nowrap px-3 py-1 bg-slate-100 dark:bg-[#1F1F1F] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 rounded-full text-xs font-bold transition-colors">Draft (4)</button>
                    </div>
                </div>

                {/* Inbox List */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5">
                    {/* Item 1 - Not Selected */}
                    <div className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors" onClick={() => setSelectedInvoice('INV-2023-11-001')}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">Menunggu</span>
                            <span className="text-xs text-slate-500">10:30</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">INV-2023-11-001</h4>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2 truncate">PT. Makmur Sentosa - Order PO/10245</div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-slate-500">Rp 4.500.000</span>
                            <div className="flex -space-x-1">
                                <div className="size-5 rounded-full bg-blue-100 flex items-center justify-center border border-white dark:border-[#111111] z-20"><span className="material-symbols-outlined text-[10px] text-blue-600">receipt</span></div>
                                <div className="size-5 rounded-full bg-orange-100 flex items-center justify-center border border-white dark:border-[#111111] z-10"><span className="material-symbols-outlined text-[10px] text-orange-600">local_shipping</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 - Active/Selected */}
                    <div className="p-4 cursor-pointer bg-primary/5 dark:bg-primary/10 border-l-4 border-primary transition-colors hover:bg-primary/10" onClick={() => setSelectedInvoice('INV-2023-11-002')}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border border-red-200 dark:border-red-500/20">Prioritas</span>
                            <span className="text-xs text-primary font-bold">11:15</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">INV-2023-11-002</h4>
                        <div className="text-sm text-slate-800 dark:text-slate-200 mb-2 truncate">Superindo Jemursari - Order PO/10246</div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-mono font-bold text-slate-900 dark:text-white">Rp 12.800.000</span>
                            <div className="flex -space-x-1">
                                <div className="size-5 rounded-full bg-blue-100 border border-white dark:border-[#111111] z-20" title="Ada Dokumen"></div>
                                <div className="size-5 rounded-full bg-slate-200 border border-white dark:border-[#111111] z-10" title="Menunggu Detail"></div>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors" onClick={() => setSelectedInvoice('INV-2023-11-003')}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-300">Draft</span>
                            <span className="text-xs text-slate-500">Kemarin</span>
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">INV-2023-11-003</h4>
                        <div className="text-sm text-slate-600 dark:text-slate-400 mb-2 truncate">Lotte Mart - Order PO/10247</div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-mono text-slate-500">Rp 2.100.000</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: Detail View (Only visible if selected or on large screens) */}
            <div className={`flex-1 flex-col bg-slate-50 dark:bg-black transition-colors ${selectedInvoice ? 'flex' : 'hidden lg:flex'}`}>
                {selectedInvoice ? (
                    <>
                        <header className="h-16 border-b border-slate-200 dark:border-white/5 bg-white dark:bg-[#111111] flex items-center px-6 gap-4 sticky top-0 z-10">
                            <button onClick={() => setSelectedInvoice(null)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 dark:text-white">{selectedInvoice}</h3>
                                <p className="text-xs text-slate-500">Superindo Jemursari • PO/10246</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <ThemeToggle className="mr-2" />
                                <button className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors dark:text-white hidden sm:block">Tolak</button>
                                <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">check</span>
                                    <span className="hidden sm:inline">Buat Tagihan</span>
                                    <span className="sm:hidden">Draft</span>
                                </button>
                            </div>
                        </header>

                        <div className="flex-1 overflow-y-auto p-4 md:p-6">
                            <div className="max-w-4xl mx-auto space-y-6">
                                {/* Banner Info */}
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl flex items-start gap-3">
                                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">info</span>
                                    <div>
                                        <h4 className="font-bold text-blue-800 dark:text-blue-300 text-sm md:text-base">Verifikasi Dokumen Fisik</h4>
                                        <p className="text-xs md:text-sm text-blue-600/80 dark:text-blue-400/80 mt-1">Pastikan nominal pada Surat Jalan fisik sesuai dengan data e-POD yang diinput oleh driver sebelum membuat tagihan.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Kolom Kiri: Data Sistem (e-POD) */}
                                    <div className="bg-white dark:bg-[#111111] rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden transition-colors">
                                        <div className="bg-slate-50 dark:bg-[#1a1a1a] p-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                                            <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm md:text-base">
                                                <span className="material-symbols-outlined text-slate-400">smartphone</span>
                                                Data Sistem (e-POD)
                                            </h4>
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 text-[10px] font-bold rounded">Terverifikasi</span>
                                        </div>
                                        <div className="p-5 space-y-4">
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Status Pengiriman</p>
                                                <p className="font-bold text-green-600 dark:text-green-500 text-sm md:text-base">Telah Diterima Tanpa Kendala</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-xs text-slate-500 mb-1">Total Kuantitas</p>
                                                    <p className="font-bold dark:text-white">1,200 Pcs</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-500 mb-1">Tonase Diterima</p>
                                                    <p className="font-bold dark:text-white">1,150.00 Kg</p>
                                                </div>
                                            </div>
                                            <div className="pt-4 border-t border-slate-100 dark:border-white/10">
                                                <p className="text-xs text-slate-500 mb-2">Bukti Foto Delivery</p>
                                                <div className="flex gap-2">
                                                    <div className="size-16 bg-slate-100 dark:bg-[#1F1F1F] rounded-lg border border-slate-200 dark:border-white/5 flex items-center justify-center overflow-hidden">
                                                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQqA5x31s7Y8T3Lh1pB8eL3E5A4VwM9Fw-N-cO30jL3hKz7r7rYh7fF21w5p3xV05fN_1j_2B7Y2O29X0w5Z5gQ68uFk2n844ZtE9C4I6N8D7vWd8lX4yG5O0K2fG0wT8c3N3b7G0J2l5kXp6bF8sL8mK15R5-N_9T9-5bJ5_2hV6cT4k" alt="epod bukti" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="size-16 bg-slate-100 dark:bg-[#1F1F1F] rounded-lg border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                                                        <span className="material-symbols-outlined text-slate-400">photo_library</span>
                                                        <span className="text-[10px] font-bold text-slate-500">+2</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Kolom Kanan: Input Realisasi Tagihan */}
                                    <div className="bg-white dark:bg-[#111111] rounded-2xl border flex flex-col border-primary/30 shadow-sm overflow-hidden transition-colors relative">
                                        <div className="absolute top-0 inset-x-0 h-1 bg-primary"></div>
                                        <div className="bg-slate-50 dark:bg-[#1a1a1a] p-4 border-b border-slate-100 dark:border-white/5">
                                            <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-sm md:text-base">
                                                <span className="material-symbols-outlined text-primary">edit_document</span>
                                                Realisasi Tagihan (Sesuai SJ)
                                            </h4>
                                        </div>
                                        <div className="p-5 flex-1 flex flex-col gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Nomor Surat Jalan Fisik</label>
                                                <input type="text" className="w-full border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-[#1F1F1F] dark:text-white focus:ring-primary focus:border-primary placeholder:text-slate-400" placeholder="Input no. SJ..." defaultValue="SJ-2023-11-889" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Qty Realisasi (Pcs)</label>
                                                    <input type="number" className="w-full border border-primary/50 bg-primary/5 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white font-bold focus:ring-primary focus:border-primary" defaultValue="1200" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Tonase Realisasi (Kg)</label>
                                                    <input type="number" className="w-full border border-primary/50 bg-primary/5 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white font-bold focus:ring-primary focus:border-primary" defaultValue="1150" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Asumsi Nilai Tagihan (IDR)</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">Rp</span>
                                                    <input type="text" className="w-full border border-slate-200 dark:border-white/10 rounded-lg pl-10 pr-3 py-3 text-base md:text-lg font-mono font-bold bg-slate-50 dark:bg-[#1F1F1F] dark:text-white focus:ring-primary focus:border-primary" defaultValue="12.800.000" readOnly />
                                                </div>
                                                <p className="text-[10px] text-slate-400 mt-1">*Nilai dihitung otomatis berdasarkan tonase realisasi x harga kontrak</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    // Empty State
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-black transition-colors">
                        <div className="w-24 h-24 bg-white dark:bg-[#111111] rounded-full flex items-center justify-center shadow-lg mb-6 border border-slate-100 dark:border-white/5">
                            <span className="material-symbols-outlined text-5xl text-slate-300 dark:text-slate-600">receipt_long</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Pilih Tagihan</h3>
                        <p className="text-slate-500 max-w-sm">Pilih data dari daftar di sebelah kiri untuk melihat detail dan melakukan verifikasi penagihan.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
