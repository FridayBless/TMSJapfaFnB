import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Header({ title }: { title: string }) {
    const { role, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="h-16 bg-white dark:bg-[#111] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 shrink-0 transition-colors">
            <div className="flex items-center gap-3">
                <div className="bg-slate-100 dark:bg-white p-1 rounded-lg w-8 h-8 flex items-center justify-center shrink-0">
                    <img src="/japfa-logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-lg tracking-tight font-sans whitespace-nowrap hidden sm:block">
                    <span className="text-slate-900 dark:text-white">TMS </span>
                    <span className="text-[#FF7A00]">Japfa</span>
                </span>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block mx-1"></div>
                <h2 className="text-base md:text-lg font-bold text-slate-800 dark:text-white truncate">{title}</h2>
            </div>
            <div className="flex items-center gap-6">
                <ThemeToggle />
                <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <span className="material-symbols-outlined text-lg">calendar_today</span>
                    Oct 24, 2023
                </div>
                <div className="hidden lg:block h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="relative p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#111]"></span>
                    </button>
                    <button className="hidden sm:block p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <span className="material-symbols-outlined">help_outline</span>
                    </button>
                    {role === 'driver' && (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 p-2 px-3 bg-red-50 dark:bg-red-500/10 text-red-500 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-all font-bold text-xs"
                        >
                            <span className="material-symbols-outlined text-sm">logout</span>
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
