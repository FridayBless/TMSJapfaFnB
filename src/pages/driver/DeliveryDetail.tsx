import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const DriverDeliveryDetail: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#1a1c1e] font-sans transition-colors duration-300">
            <Header title="Stop Detail" />
            
            <main className="max-w-md mx-auto px-4 py-6 flex flex-col min-h-[calc(100vh-80px)]">
                <div className="bg-white dark:bg-[#2c2e33] rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-6">
                    <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Customer Name</p>
                        <h3 className="text-lg font-bold dark:text-white">RS Mitra Keluarga Cikarang</h3>
                    </div>

                    <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Address</p>
                        <p className="text-sm font-medium dark:text-slate-300 leading-relaxed">
                            Jl. Raya Industri No. 100, <br />
                            Cikarang Selatan, Bekasi, <br />
                            Jawa Barat 17530
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">PIC Name</p>
                        <p className="text-base font-bold dark:text-white">Bapak Budi Santoso</p>
                    </div>

                    <button className="w-full h-12 bg-primary/10 dark:bg-primary/20 text-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/20 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined text-lg">call</span>
                        Call PIC
                    </button>
                    
                    <div className="aspect-video rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-inner relative">
                        <img 
                            src="https://images.unsplash.com/photo-1526772662000-3f88f10c05fe?q=80&w=1974&auto=format&fit=crop" 
                            alt="Map Preview" 
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                            <span className="material-symbols-outlined text-primary bg-white rounded-full p-1 text-sm shadow-md">location_on</span>
                            <span className="text-[10px] font-bold uppercase tracking-wider shadow-sm">Location Pin</span>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-8 space-y-4 pb-8">
                    <button className="w-full h-14 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined text-xl">map</span>
                        BUKA GOOGLE MAPS
                    </button>
                    
                    <button 
                        onClick={() => navigate('/driver/pod')}
                        className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-wide"
                    >
                        SAYA SUDAH TIBA
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DriverDeliveryDetail;
