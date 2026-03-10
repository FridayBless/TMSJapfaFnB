import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import { useAuth, type Role } from "../../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');

    const handleSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        
        let targetRole: Role = 'logistik';
        if (email.toLowerCase().includes('pod')) {
            targetRole = 'pod';
        } else if (email.toLowerCase().includes('sales')) {
            targetRole = 'sales';
        } else if (email.toLowerCase().includes('driver')) {
            targetRole = 'driver';
        }
        
        login(targetRole);
        
        if (targetRole === 'pod') {
            navigate('/pod');
        } else if (targetRole === 'sales') {
            navigate('/sales');
        } else if (targetRole === 'driver') {
            navigate('/driver');
        } else {
            navigate('/logistik');
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-background-light dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 font-display antialiased relative">
            <ThemeToggle className="absolute top-6 right-6 md:top-8 md:right-8" />
            {/* Left Side: Visual Hero (60%) */}
            <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden bg-[#111111]">
                <div
                    className="absolute inset-0 bg-cover bg-[80%_center]"
                    title="Japfa Operations"
                    style={{ backgroundImage: "linear-gradient(to right, rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.3)), url('/japfa-bg.jpg')" }}
                ></div>
                <div className="relative z-10 flex flex-col justify-center px-20">
                    <h1 className="text-5xl font-black text-white leading-tight max-w-xl">
                        Streamlining Logistics, One Route at a Time.
                    </h1>
                    <div className="mt-8 flex items-center gap-4 text-primary">
                        <span className="h-1 w-12 bg-primary rounded-full"></span>
                        <p className="text-white/80 font-medium uppercase tracking-widest text-sm">Enterprise Fleet Management</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Sign In Form (40%) */}
            <div className="w-full lg:w-[40%] flex flex-col bg-white dark:bg-[#111111]">
                <div className="flex flex-col justify-center flex-1 px-8 md:px-16 lg:px-12 xl:px-20 py-12">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12">
                        <div className="bg-white p-1 rounded-lg w-10 h-10 flex items-center justify-center shrink-0">
                            <img src="/japfa-logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight font-sans whitespace-nowrap">
                            <span className="text-slate-900 dark:text-white">TMS </span>
                            <span className="text-[#D54B00]">Japfa</span>
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Welcome Back</h2>
                        <p className="text-slate-500 dark:text-slate-400">Please enter your credentials to access the dashboard. (Try typing 'pod' or 'sales' in the email)</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSignIn}>
                        {/* Username/Email Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Username or Email</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                </div>
                                <input
                                    className="block w-full pl-11 pr-4 h-14 bg-slate-50 dark:bg-[#1A1A1A] border border border-slate-200 dark:border-[#333] rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                                    placeholder="name@company.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                                <input
                                    className="block w-full pl-11 pr-12 h-14 bg-slate-50 dark:bg-[#1A1A1A] border border border-slate-200 dark:border-[#333] rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    type="password"
                                />
                                <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" type="button">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                            </div>
                            <div className="flex justify-end mt-1">
                                <a className="text-sm font-medium text-primary hover:underline" href="#">Forgot Password?</a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2" type="submit">
                            <span>Sign In</span>
                            <span className="material-symbols-outlined text-[20px]">login</span>
                        </button>
                    </form>

                    {/* Footer Action */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-[#333] text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Are you a driver?
                            <span className="ml-2 py-1 px-2 bg-slate-100 dark:bg-white/5 rounded text-[11px] font-bold text-slate-600 dark:text-slate-300 inline-block">
                                Use your Driver credentials in the form above.
                            </span>
                        </p>
                    </div>
                </div>

                {/* Language/Legal Footer */}
                <div className="px-8 pb-8 flex justify-between items-center text-xs text-slate-400 font-medium mt-auto">
                    <div className="flex gap-4">
                        <a className="hover:text-slate-600 transition-colors" href="#">Privacy Policy</a>
                        <a className="hover:text-slate-600 transition-colors" href="#">Terms of Service</a>
                    </div>
                    <span>© 2024 Logistics Corp</span>
                </div>
            </div>
        </div>
    );
}
