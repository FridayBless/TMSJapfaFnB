import ThemeToggle from "../../components/ThemeToggle";

export default function SalesVisibility() {
    return (
        <div className="flex-1 flex flex-col items-center pb-20">
            {/* Top Navigation Bar / Header context for this page */}
            <header className="w-full flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-white/5 px-4 md:px-10 py-4 bg-white dark:bg-[#111111] lg:sticky top-0 z-50 transition-colors">
                <div className="flex items-center gap-4 md:gap-8">
                    <h2 className="text-slate-900 dark:text-white text-base md:text-lg font-bold leading-tight tracking-tight">Visibilitas Pesanan</h2>
                </div>
                <div className="flex items-center justify-end gap-2 md:gap-4">
                    <ThemeToggle />
                    <span className="material-symbols-outlined text-slate-400 hidden sm:block">help_outline</span>
                </div>
            </header>

            {/* Hero Search Section */}
            <section className="w-full max-w-[1200px] px-4 md:px-6 pt-6 md:pt-12 pb-8">
                <div className="text-center mb-8">
                    <h1 className="text-slate-900 dark:text-white text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2">Visibilitas Pesanan Sales</h1>
                    <p className="text-slate-500 dark:text-slate-400">Pantau status pengiriman secara real-time untuk menjawab pertanyaan pelanggan.</p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors mb-[-4px]">search</span>
                        </div>
                        <input className="block w-full pl-12 pr-4 md:pr-[140px] py-4 md:py-5 bg-white dark:bg-[#111111] border-none rounded-xl shadow-xl dark:shadow-none border border-transparent dark:border-white/5 text-base md:text-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary transition-all" placeholder="Masukkan Nomor PO atau Toko..." type="text" />
                        <button className="relative md:absolute md:right-3 md:top-3 md:bottom-3 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 md:py-0 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                            Cari Pesanan
                        </button>
                    </div>
                    <div className="flex gap-4 mt-4 justify-center text-xs text-slate-500">
                        <span>Pencarian Terakhir:</span>
                        <a className="text-primary hover:underline" href="#">PO-2023-08921</a>
                        <a className="text-primary hover:underline" href="#">Toko Makmur Jaya</a>
                        <a className="text-primary hover:underline" href="#">PO-2023-07712</a>
                    </div>
                </div>
            </section>

            {/* Tracking Result Section */}
            <section className="w-full max-w-[1200px] px-6">
                <div className="bg-white dark:bg-[#111111] rounded-2xl shadow-sm border border-slate-200 dark:border-white/5 overflow-hidden transition-colors">

                    {/* Header Status */}
                    <div className="px-4 md:px-8 py-6 border-b border-slate-200 dark:border-white/5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-slate-50/50 dark:bg-[#1a1a1a]">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded">Sales Order</span>
                                <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">PO-2023-08921</h2>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">Toko Sumber Rejeki, Jakarta Barat • Estimasi Tiba: <span className="font-bold text-slate-700 dark:text-slate-200">Hari ini, 14:30 WIB</span></p>
                        </div>
                        <div className="grid grid-cols-2 md:flex gap-2">
                            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-[#111111] border border-slate-200 dark:border-white/10 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-sm mb-[-2px]">print</span> Cetak
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 shadow-md shadow-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-sm mb-[-2px]">share</span> Bagikan Status
                            </button>
                        </div>
                    </div>

                    {/* Horizontal Journey Timeline */}
                    <div className="px-12 py-12 hidden md:block">
                        <div className="relative flex justify-between items-start">
                            {/* Background Line */}
                            <div className="absolute top-6 left-0 w-full h-1 bg-slate-100 dark:bg-white/10 -z-0"></div>
                            {/* Active Line Progress */}
                            <div className="absolute top-6 left-0 w-[66%] h-1 bg-primary -z-0"></div>

                            {/* Stage 1: PO Dibuat */}
                            <div className="relative z-10 flex flex-col items-center text-center w-1/4">
                                <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 border-4 border-white dark:border-[#111111] transition-colors">
                                    <span className="material-symbols-outlined">check</span>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">PO Dibuat</p>
                                    <p className="text-xs text-slate-500 mt-1">12 Agt, 08:45 WIB</p>
                                    <p className="text-[10px] text-green-500 font-bold mt-1 bg-green-500/10 dark:bg-green-500/20 px-2 py-0.5 rounded-full inline-block">Selesai</p>
                                </div>
                            </div>

                            {/* Stage 2: Masuk Rute Truk */}
                            <div className="relative z-10 flex flex-col items-center text-center w-1/4">
                                <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 border-4 border-white dark:border-[#111111] transition-colors">
                                    <span className="material-symbols-outlined">local_shipping</span>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Masuk Rute Truk</p>
                                    <p className="text-xs text-slate-500 mt-1 font-medium">Truck B 9044 JXS</p>
                                    <p className="text-[10px] text-green-500 font-bold mt-1 bg-green-500/10 dark:bg-green-500/20 px-2 py-0.5 rounded-full inline-block">Selesai</p>
                                </div>
                            </div>

                            {/* Stage 3: Sedang Dikirim */}
                            <div className="relative z-10 flex flex-col items-center text-center w-1/4">
                                <div className="size-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 border-4 border-white dark:border-[#111111] transition-colors">
                                    <span className="material-symbols-outlined tracking-tighter">schedule</span>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Sedang Dikirim</p>
                                    <p className="text-xs text-primary font-bold mt-1 italic">ETA 14:30 WIB</p>
                                    <p className="text-[10px] text-primary font-bold mt-1 bg-primary/10 px-2 py-0.5 rounded-full inline-block border border-primary/20">Dalam Perjalanan</p>
                                </div>
                            </div>

                            {/* Stage 4: Terkirim & POD */}
                            <div className="relative z-10 flex flex-col items-center text-center w-1/4">
                                <div className="size-12 rounded-full bg-slate-200 dark:bg-[#1a1c1b] text-slate-400 flex items-center justify-center border-4 border-white dark:border-[#111111] transition-colors">
                                    <span className="material-symbols-outlined tracking-tighter">verified</span>
                                </div>
                                <div className="mt-4 opacity-50">
                                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Terkirim & POD Diverifikasi</p>
                                    <p className="text-xs text-slate-500 mt-1">Belum Selesai</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Panel */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-t border-slate-200 dark:border-white/5">
                        {/* Mini Map */}
                        <div className="lg:col-span-2 relative h-[350px] bg-slate-100 dark:bg-[#1F1F1F] overflow-hidden">
                            <div className="absolute inset-0 bg-cover bg-center opacity-70 dark:opacity-40" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeVfi2gw3-m_HYx21oGzlHZurLbnj6l-d8dHGYC5WXyr4sps7S1gI7qYRba7NeL2XtJydRj0rOPwXw3ETbH7EOfzVF4QjiSEkeFvmxsTInYsKjKVwwd2a3XMyxCxvm7ubHcve6_Yels-WjFzsPHnKlw6epB8Iys0YF3M7KM4lUbunfHB_X3suTSyGztc-Dd3ybq7d3iv9GpuvJw43LsJhKyOJn8rsA5VBWfJcITGOBnnOC0sP0-HJBlGO0ur4Q4EYxortBJY0tfjI')" }}></div>

                            {/* Mock Map UI Elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="relative flex flex-col items-center">
                                    <div className="bg-primary p-2 rounded-lg text-white shadow-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined">local_shipping</span>
                                    </div>
                                    <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-primary"></div>
                                    <div className="bg-white dark:bg-[#111111] px-3 py-1 rounded shadow-lg mt-2 border border-slate-200 dark:border-white/10">
                                        <p className="text-[10px] font-bold text-slate-900 dark:text-white tracking-wide">B 9044 JXS - Sedang Jalan</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#111111]/90 backdrop-blur p-2 rounded-lg border border-slate-200 dark:border-white/10 flex flex-col gap-2">
                                <button className="size-8 flex items-center justify-center bg-slate-100 dark:bg-[#1F1F1F] text-slate-600 dark:text-slate-300 rounded hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">add</span></button>
                                <button className="size-8 flex items-center justify-center bg-slate-100 dark:bg-[#1F1F1F] text-slate-600 dark:text-slate-300 rounded hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">remove</span></button>
                                <button className="size-8 flex items-center justify-center bg-slate-100 dark:bg-[#1F1F1F] text-slate-600 dark:text-slate-300 rounded hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">my_location</span></button>
                            </div>
                        </div>

                        {/* Info Card */}
                        <div className="p-4 md:p-8 flex flex-col h-full bg-slate-50 dark:bg-[#1a1a1a] lg:border-l border-slate-200 dark:border-white/5 transition-colors">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Informasi Driver</h3>
                            <div className="space-y-6 flex-1">
                                <div className="flex items-center gap-4">
                                    <div className="size-16 rounded-xl bg-slate-200 dark:bg-[#111111] overflow-hidden border-2 border-primary/20">
                                        <img className="w-full h-full object-cover" alt="Driver profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgVUnMKwUGWiPwxuW_MZm03ZZQqEB0gYf-vFNmUeJvh1BI9Z1dHA8R_i7YKyqYBM0JCE-sEfMhFgcyf2y5jSnK2-CcevI6KtNwNSu_tCNoOItVjWMay46sJvqNkR1yNpg3mfu-PJV88A-xKJlmer0LpwgFgR8-8HNvvxG4pzMQWCVl1mqtFlraIPsA6ScZ1EQ0tBC8ywoPavEFg92mF0s1HWY_YH7UftEKjAO5BBuQyu_gUsTSk5kIy2aden8d3oPPZ_eiSAKMmh8" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Nama Supir</p>
                                        <p className="text-base font-bold text-slate-900 dark:text-white">Bambang Susanto</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                                            <span className="text-xs font-bold dark:text-white">4.8</span>
                                            <span className="text-[10px] text-slate-500 border border-slate-200 dark:border-white/10 px-1 rounded ml-1 bg-white dark:bg-[#1F1F1F]">120+ Delivery</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="bg-white dark:bg-[#111111] p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Kontak Langsung</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-base font-mono font-bold text-slate-900 dark:text-white">+62 812-3456-7890</p>
                                            <div className="flex gap-2">
                                                <button className="p-2 border border-green-200 dark:border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-500 rounded-lg hover:bg-green-500/20 transition-colors">
                                                    <span className="material-symbols-outlined text-sm mb-[-4px]">chat</span>
                                                </button>
                                                <button className="p-2 border border-primary/20 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                                                    <span className="material-symbols-outlined text-sm mb-[-4px]">call</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white dark:bg-[#111111] p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Informasi Kendaraan</p>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-slate-50 dark:bg-[#1F1F1F] rounded-lg border border-slate-100 dark:border-white/5">
                                                <span className="material-symbols-outlined text-slate-500">local_shipping</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">Isuzu Giga FVR L</p>
                                                <p className="text-xs text-slate-500">Plat: B 9044 JXS • Kap: 10 Ton</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="mt-8 w-full py-4 bg-slate-900 border border-slate-800 dark:border-white/20 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg">
                                <span className="material-symbols-outlined text-sm mb-[-2px]">warning</span> Laporkan Kendala
                            </button>
                        </div>
                    </div>
                </div>

                {/* Secondary Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-1.5 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary text-sm">inventory_2</span>
                            </div>
                            <h4 className="font-bold dark:text-white">Item Detail</h4>
                        </div>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between">
                                <span className="text-slate-500">Produk A</span>
                                <span className="font-bold dark:text-white">250 Box</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-slate-500">Produk B</span>
                                <span className="font-bold dark:text-white">120 Box</span>
                            </li>
                            <li className="border-t border-slate-100 dark:border-white/5 pt-3 flex justify-between">
                                <span className="text-slate-500">Total Berat</span>
                                <span className="font-bold text-primary">4.2 Ton</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-1.5 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary text-sm">location_on</span>
                            </div>
                            <h4 className="font-bold dark:text-white">Alamat Tujuan</h4>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed mb-4">
                            Jl. Panjang No.12, Kebon Jeruk, Jakarta Barat, DKI Jakarta 11530
                        </p>
                        <button className="text-primary text-xs font-bold hover:underline">Lihat di Google Maps →</button>
                    </div>

                    <div className="bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-1.5 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary text-sm">history</span>
                            </div>
                            <h4 className="font-bold dark:text-white">Riwayat Update</h4>
                        </div>
                        <div className="space-y-4 pt-1">
                            <div className="flex gap-4 relative">
                                <div className="absolute left-[7px] top-6 bottom-[-16px] w-[2px] bg-slate-100 dark:bg-white/5"></div>
                                <div className="size-4 rounded-full bg-primary border-[3px] border-primary/20 shrink-0 mt-0.5 relative z-10"></div>
                                <div>
                                    <p className="text-xs font-bold dark:text-white">Keluar Gudang (Gate Out)</p>
                                    <p className="text-[10px] text-slate-500">Hari ini, 10:15 WIB</p>
                                </div>
                            </div>
                            <div className="flex gap-4 relative">
                                <div className="size-4 rounded-full bg-slate-200 dark:bg-[#1F1F1F] border-[3px] border-slate-100 dark:border-white/5 shrink-0 mt-0.5 relative z-10"></div>
                                <div>
                                    <p className="text-xs font-bold text-slate-500">Selesai Loading</p>
                                    <p className="text-[10px] text-slate-400">Hari ini, 09:30 WIB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
