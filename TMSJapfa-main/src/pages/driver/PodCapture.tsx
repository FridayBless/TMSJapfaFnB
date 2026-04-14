import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const DriverPodCapture: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#1a1c1e] font-sans transition-colors duration-300">
            <Header title="e-POD Capture" />
            
            <main className="max-w-md mx-auto px-4 py-6 flex flex-col min-h-[calc(100vh-80px)]">
                <div className="bg-white dark:bg-[#2c2e33] rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
                    {/* Photo capture */}
                    <div className="flex flex-col items-center gap-4 p-8 rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group active:scale-[0.98]">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl font-bold">add_a_photo</span>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold dark:text-white mb-1">Ambil Foto Surat Jalan</p>
                            <p className="text-[10px] text-slate-400 font-medium">Pastikan teks terlihat jelas & tidak buram</p>
                        </div>
                    </div>

                    {/* Signature section */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold dark:text-white">Tanda Tangan Penerima</p>
                                <p className="text-[10px] text-slate-400 font-medium">Tanda tangan di dalam kotak</p>
                            </div>
                            <button className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 font-bold text-[10px] uppercase tracking-wider">
                                <span className="material-symbols-outlined text-sm">delete</span>
                                Hapus
                            </button>
                        </div>
                        
                        <div className="h-48 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center relative shadow-inner overflow-hidden">
                            <span className="text-slate-300 dark:text-slate-700 font-bold select-none pointer-events-none">AREA TANDA TANGAN</span>
                            <div className="absolute bottom-6 left-6 right-6 h-px border-b border-dashed border-slate-200 dark:border-slate-800"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-8 pb-8 space-y-4">
                    <button 
                        onClick={() => navigate('/driver/summary')}
                        className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-wide"
                    >
                        KIRIM BUKTI (SUBMIT)
                    </button>
                    
                    <button className="w-full py-2 text-slate-400 hover:text-red-500 font-bold text-[10px] uppercase tracking-widest transition-colors">
                        Lapor Kendala Pengiriman
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DriverPodCapture;
