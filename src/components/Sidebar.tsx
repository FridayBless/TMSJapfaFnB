import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

export default function Sidebar() {
    const navigate = useNavigate();
    const { isCollapsed, toggleSidebar, isMobileMenuOpen, closeMobileMenu } = useSidebar();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <aside className={`
            fixed lg:static inset-y-0 left-0 z-30
            ${isCollapsed ? 'w-20' : 'w-72'} 
            bg-white dark:bg-sidebar text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-white/5 
            flex flex-col justify-between shrink-0 
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
            <div className="flex flex-col overflow-hidden">
                <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b border-slate-200 dark:border-white/5 h-20`}>
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-100 dark:bg-white p-1 rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                            <img src="/japfa-logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        {!isCollapsed && (
                            <span className="font-bold text-xl tracking-tight font-sans whitespace-nowrap lg:block">
                                <span className="text-slate-900 dark:text-white">TMS </span>
                                <span className="text-[#FF7A00]">Japfa</span>
                            </span>
                        )}
                    </div>
                    {/* Desktop Toggle Button - Hidden on Mobile */}
                    {!isCollapsed && (
                        <button
                            onClick={toggleSidebar}
                            className="hidden lg:block p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-xl">menu_open</span>
                        </button>
                    )}
                    {/* Mobile Close Button */}
                    <button
                        onClick={closeMobileMenu}
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {isCollapsed && (
                    <div className="hidden lg:flex justify-center p-4 border-b border-slate-200 dark:border-white/5">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                )}

                <nav className="p-4 flex flex-col gap-1">
                    {[
                        { to: "/logistik", icon: "dashboard", label: "Dashboard", end: true },
                        { to: "/logistik/route-planning", icon: "map", label: "Route Planning" },
                        { to: "/logistik/fleet", icon: "local_shipping", label: "Fleet Management" },
                        { to: "/logistik/drivers", icon: "badge", label: "Driver List" },
                        { to: "/logistik/analytics", icon: "analytics", label: "Analytics" },
                    ].map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            onClick={closeMobileMenu}
                            className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all ${isActive ? 'active-nav shadow-lg shadow-primary/20' : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5'}`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                        </NavLink>
                    ))}
                    <div className="my-2 border-t border-slate-200 dark:border-white/5"></div>
                    <NavLink
                        to="/logistik/settings"
                        onClick={closeMobileMenu}
                        className={({ isActive }) => `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all ${isActive ? 'active-nav shadow-lg shadow-primary/20' : 'hover:bg-slate-100 hover:text-slate-900 dark:hover:text-white dark:hover:bg-white/5'}`}
                    >
                        <span className="material-symbols-outlined">settings</span>
                        {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
                    </NavLink>
                </nav>
            </div>

            <div className="relative">
                {isProfileOpen && !isCollapsed && (
                    <div className="absolute bottom-[calc(100%+12px)] left-4 w-64 bg-white dark:bg-[#1F1F1F] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col z-50">
                        <div className="p-5 border-b border-slate-200 dark:border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border-2 border-primary/50" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_CoqZM_f895VVG6xXC0MfnjI98mvn3WcDUJwkb1Hv3GGpHUO2HqGmx5horSlkjjgo7VZT8jXmkKux0MWPCZ_-HDsrLO5o0twThB3MVIJzR-npaiY6dKeL0j48vcU_DvCalF7abl13097MKhMih--TbrpNZ2ztDSje7k4rVTzwhvkz4_uAXn-Ah7qYsJZDKOmrh_1DwiFmgurQFlK69gGKx0FFrylODtnN8lTk13zSVEUZQv2NchBDLLntLpHLoFkEeF3kN4BcQ6c')" }}></div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Budi Santoso</p>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">budi.santoso@logistics.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-3">Switch Role</p>
                            <div className="space-y-1">
                                <button
                                    onClick={() => navigate('/logistik')}
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-primary/10 text-primary group transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
                                        <span className="text-sm font-semibold">Admin Logistik</span>
                                    </div>
                                    <span className="material-symbols-outlined text-xl">check_circle</span>
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
                                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-symbols-outlined text-xl">receipt_long</span>
                                        <span className="text-sm font-medium">Admin POD</span>
                                    </div>
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
                                onClick={() => navigate('/login')}
                                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 hover:text-red-600 dark:hover:text-red-300 transition-all"
                            >
                                <span className="material-symbols-outlined text-xl">logout</span>
                                <span className="text-sm font-bold">Logout</span>
                            </button>
                        </div>
                    </div>
                )}

                <div
                    className={`${isCollapsed ? 'p-2 flex justify-center' : 'p-4 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10'} m-4 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-white/10 transition-all group`}
                    onClick={() => {
                        if (isCollapsed) {
                            toggleSidebar();
                        } else {
                            setIsProfileOpen(!isProfileOpen);
                        }
                    }}
                >
                    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                        <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 bg-cover bg-center border border-slate-300 dark:border-white/20 shrink-0" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_CoqZM_f895VVG6xXC0MfnjI98mvn3WcDUJwkb1Hv3GGpHUO2HqGmx5horSlkjjgo7VZT8jXmkKux0MWPCZ_-HDsrLO5o0twThB3MVIJzR-npaiY6dKeL0j48vcU_DvCalF7abl13097MKhMih--TbrpNZ2ztDSje7k4rVTzwhvkz4_uAXn-Ah7qYsJZDKOmrh_1DwiFmgurQFlK69gGKx0FFrylODtnN8lTk13zSVEUZQv2NchBDLLntLpHLoFkEeF3kN4BcQ6c')" }}></div>
                        {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">Budi Santoso</p>
                                <p className="text-xs text-slate-500 truncate">Logistics Admin</p>
                            </div>
                        )}
                        {!isCollapsed && (
                            <button className="text-slate-500 group-hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-xl">swap_horiz</span>
                            </button>
                        )}
                    </div>
                    {!isCollapsed && (
                        <div className="mt-2 text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1.5 px-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Online
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
