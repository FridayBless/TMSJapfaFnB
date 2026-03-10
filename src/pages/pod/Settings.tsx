import { useState } from "react";
import Header from "../../components/Header";
import PodSidebar from "./Sidebar";

export default function Settings() {
    // UI/UX Preferences State
    const [autoAdvance, setAutoAdvance] = useState(false);
    const [dataDensity, setDataDensity] = useState("normal");
    const [soundAlert, setSoundAlert] = useState(true);

    return (
        <div className="flex h-screen overflow-hidden relative bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display transition-colors">
            <PodSidebar />
            
            <main className="flex-1 overflow-y-auto flex flex-col bg-slate-50 dark:bg-[#111111]">
                <Header title="Pengaturan & Preferensi" />

                <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
                    
                    {/* Account Preferences Section */}
                    <section className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#222]/50">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">manage_accounts</span>
                                Preferensi Akun
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Kelola informasi pribadi dan keamanan akun Anda.</p>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* Profile Picture */}
                            <div className="flex items-start gap-6">
                                <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden border-4 border-white dark:border-[#222] shadow-sm shrink-0">
                                    <span className="material-symbols-outlined text-4xl text-slate-400">person</span>
                                </div>
                                <div className="flex-1 space-y-3">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Foto Profil</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Unggah foto baru untuk mengubah avatar Anda.</p>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm">Ubah Foto</button>
                                        <button className="px-4 py-2 bg-white dark:bg-[#222] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">Hapus</button>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-200 dark:border-slate-800" />

                            {/* Change Password */}
                            <div className="space-y-4 max-w-md">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Ubah Password</h3>
                                
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Password Saat Ini</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none transition-colors dark:text-white" />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Password Baru</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none transition-colors dark:text-white" />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Konfirmasi Password Baru</label>
                                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary outline-none transition-colors dark:text-white" />
                                </div>

                                <button className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm mt-2">
                                    Simpan Password
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* UI/UX Preferences Section */}
                    <section className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#222]/50">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">tune</span>
                                Pengaturan Tampilan & Interaksi
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sesuaikan kenyamanan ruang kerja Anda.</p>
                        </div>
                        
                        <div className="p-6 space-y-8">
                            
                            {/* Auto Advance Toggle */}
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400 text-lg">skip_next</span>
                                        Auto-Advance Dokumen
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        Otomatis memuat dokumen berikutnya setelah Anda menekan tombol "Setuju" atau "Tolak". Mempercepat proses verifikasi.
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer" 
                                        checked={autoAdvance}
                                        onChange={(e) => setAutoAdvance(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                                </label>
                            </div>

                            <hr className="border-slate-200 dark:border-slate-800" />

                            {/* Sound Alert Toggle */}
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400 text-lg">notifications_active</span>
                                        Notifikasi Suara (Sound Alert)
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        Mainkan suara "Ping!" setiap kali ada foto e-POD baru masuk ke antrean Live Verification.
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer" 
                                        checked={soundAlert}
                                        onChange={(e) => setSoundAlert(e.target.checked)}
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                                </label>
                            </div>

                            <hr className="border-slate-200 dark:border-slate-800" />

                            {/* Data Density Selection */}
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400 text-lg">density_medium</span>
                                        Ukuran Font Tabel (Data Density)
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        Pilih seberapa padat baris tabel ditampilkan. Sangat berguna untuk kenyamanan membaca di layar berjam-jam.
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* Rapat */}
                                    <label className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-colors ${dataDensity === 'rapat' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#222] hover:border-primary/50'}`}>
                                        <input type="radio" name="density" value="rapat" className="sr-only" checked={dataDensity === 'rapat'} onChange={(e) => setDataDensity(e.target.value)} />
                                        <span className="material-symbols-outlined text-3xl text-slate-400">density_small</span>
                                        <div className="text-center">
                                            <span className="block font-bold text-slate-900 dark:text-white">Rapat</span>
                                            <span className="text-xs text-slate-500">Teks kecil, banyak data</span>
                                        </div>
                                    </label>

                                    {/* Normal */}
                                    <label className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-colors ${dataDensity === 'normal' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#222] hover:border-primary/50'}`}>
                                        <input type="radio" name="density" value="normal" className="sr-only" checked={dataDensity === 'normal'} onChange={(e) => setDataDensity(e.target.value)} />
                                        <span className="material-symbols-outlined text-3xl text-slate-400">density_medium</span>
                                        <div className="text-center">
                                            <span className="block font-bold text-slate-900 dark:text-white">Normal</span>
                                            <span className="text-xs text-slate-500">Standar UI bawaan</span>
                                        </div>
                                    </label>

                                    {/* Longgar */}
                                    <label className={`cursor-pointer rounded-xl border-2 p-4 flex flex-col items-center gap-3 transition-colors ${dataDensity === 'longgar' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#222] hover:border-primary/50'}`}>
                                        <input type="radio" name="density" value="longgar" className="sr-only" checked={dataDensity === 'longgar'} onChange={(e) => setDataDensity(e.target.value)} />
                                        <span className="material-symbols-outlined text-3xl text-slate-400">density_large</span>
                                        <div className="text-center">
                                            <span className="block font-bold text-slate-900 dark:text-white">Longgar</span>
                                            <span className="text-xs text-slate-500">Teks besar, mudah dibaca</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#222]/50 flex justify-end gap-3">
                            <button className="px-6 py-2 bg-white dark:bg-[#222] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-sm">Batal</button>
                            <button className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">save</span>
                                Simpan Pengaturan UI
                            </button>
                        </div>
                    </section>

                </div>
            </main>
        </div>
    );
}
