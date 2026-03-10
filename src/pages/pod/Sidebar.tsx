import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PodSidebar() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <aside className="w-72 bg-white dark:bg-[#111111] text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-white/5 flex flex-col justify-between shrink-0 z-10 transition-colors">
            <div className="flex flex-col">
                <div className="p-6 flex items-center gap-3 border-b border-slate-200 dark:border-white/5">
                    <div className="bg-slate-100 dark:bg-white p-1 rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                        <img src="/japfa-logo.png" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-xl tracking-tight font-sans whitespace-nowrap">
                        <span className="text-slate-900 dark:text-white">TMS </span>
                        <span className="text-primary">Japfa</span>
                    </span>
                </div>
                <nav className="p-4 flex flex-col gap-1">
                    <NavLink to="/pod" end className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'active-nav bg-primary/10 text-primary shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5'}`}>
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </NavLink>
                    <NavLink to="/pod/verifications" className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-lg transition-all ${isActive ? 'active-nav bg-primary/10 text-primary shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5'}`}>
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined">verified</span>
                            <span className="text-sm font-medium">Verifications</span>
                        </div>
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
                    </NavLink>
                    <NavLink to="/pod/monitoring" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'active-nav bg-primary/10 text-primary shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5'}`}>
                        <span className="material-symbols-outlined">monitoring</span>
                        <span className="text-sm font-medium">Monitoring</span>
                    </NavLink>
                    <NavLink to="/pod/history" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'active-nav bg-primary/10 text-primary shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5'}`}>
                        <span className="material-symbols-outlined">history</span>
                        <span className="text-sm font-medium">History & Archive</span>
                    </NavLink>
                    <div className="my-2 border-t border-slate-200 dark:border-white/5"></div>
                    <NavLink to="/pod/settings" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'active-nav bg-primary/10 text-primary shadow-sm' : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5'}`}>
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm font-medium">Settings</span>
                    </NavLink>
                </nav>
            </div>

            <div className="relative">
                {isProfileOpen && (
                    <div className="absolute bottom-[calc(100%+12px)] left-4 w-64 bg-white dark:bg-[#1F1F1F] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col z-50">
                        <div className="p-5 border-b border-slate-200 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center border-2 border-primary/50 text-xl font-bold text-slate-600 dark:text-slate-300">
                                    AP
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Admin POD 1</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">pod.dept@logistics.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-3">Switch Role</p>
                            <div className="space-y-1">
                                <button 
                                    onClick={() => navigate('/logistik')}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                                        <span className="text-sm font-medium">Admin Logistik</span>
                                    </div>
                                </button>
                                <button 
                                    onClick={() => navigate('/sales')}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">point_of_sale</span>
                                        <span className="text-sm font-medium">Admin Sales</span>
                                    </div>
                                </button>
                                <button 
                                    onClick={() => navigate('/pod')}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-primary/10 text-primary group transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">receipt_long</span>
                                        <span className="text-sm font-bold">Admin POD</span>
                                    </div>
                                    <span className="material-symbols-outlined text-xl">check_circle</span>
                                </button>
                                <button 
                                    onClick={() => navigate('/driver')}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">local_shipping</span>
                                        <span className="text-sm font-medium">Driver</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <div className="p-2 bg-slate-50 dark:bg-black/20 mt-2">
                            <button
                                onClick={() => { logout(); navigate('/login'); }}
                                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 hover:text-red-600 dark:hover:text-red-300 transition-all"
                            >
                                <span className="material-symbols-outlined text-xl">logout</span>
                                <span className="text-sm font-bold">Logout</span>
                            </button>
                        </div>
                    </div>
                )}

                <div
                    className="p-4 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 m-4 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-white/20 flex flex-col items-center justify-center font-bold text-slate-500 dark:text-slate-300">
                            AP
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Admin POD 1</p>
                            <p className="text-xs text-slate-500 truncate">Verification Dept</p>
                        </div>
                        <button className="text-slate-500 group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-xl">swap_horiz</span>
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
}
