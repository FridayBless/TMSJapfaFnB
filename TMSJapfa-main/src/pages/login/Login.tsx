import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../../components/ThemeToggle";
import { useAuth, type Role } from "../../context/AuthContext";
import { ArrowLeft, CheckCircle, UserCheck, Gavel, Shield, XCircle } from 'lucide-react';

// ─────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────
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
        } else if (email.toLowerCase().includes('manager')) {
            targetRole = 'manager';
        }

        login(targetRole);

        if (targetRole === 'pod') {
            navigate('/pod');
        } else if (targetRole === 'sales') {
            navigate('/sales');
        } else if (targetRole === 'driver') {
            navigate('/driver');
        } else if (targetRole === 'manager') {
            navigate('/manager');
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
                    style={{ backgroundImage: "linear-gradient(to right, rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.3)), url('/japfa-bg.png')" }}
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
                        <div className="bg-white p-1 rounded-lg w-30 h-30 flex items-center justify-center shrink-0">
                            <img src="/japfa-logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-2xl tracking-tight font-sans whitespace-nowrap">
                            <span className="text-primary">TMS </span>
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Welcome Back</h2>
                        <p className="text-slate-500 dark:text-slate-400">Please enter your credentials to access the dashboard. (Try typing 'pod' or 'driver' in the email)</p>
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
                                <Link className="text-sm font-medium text-primary hover:underline" to="/forgot-password">Forgot Password?</Link>
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
                        <Link className="hover:text-slate-600 transition-colors" to="/privacy-policy">Privacy Policy</Link>
                        <Link className="hover:text-slate-600 transition-colors" to="/terms-of-service">Terms of Service</Link>
                    </div>
                    <span>© 2026 Logistics Corp</span>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// TERMS OF SERVICE
// ─────────────────────────────────────────────
export function TermsOfService() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('acceptance');

    const navItems = [
        { id: 'acceptance', icon: <CheckCircle className="w-5 h-5" />, label: 'Acceptance' },
        { id: 'conduct', icon: <UserCheck className="w-5 h-5" />, label: 'User Conduct' },
        { id: 'intellectual', icon: <Gavel className="w-5 h-5" />, label: 'Intellectual Property' },
        { id: 'liability', icon: <Shield className="w-5 h-5" />, label: 'Liability' },
        { id: 'termination', icon: <XCircle className="w-5 h-5" />, label: 'Termination' },
    ];

    return (
        <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b]" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Top Nav */}
            <header className="bg-[#fcf9f8] flex justify-between items-center px-8 py-4 border-b border-[#e0c0af]">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-[#584235] hover:text-[#D54B00] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-semibold">Back to Login</span>
                </button>
                <div className="flex items-center gap-3">
                    <img src="/japfa-logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                    <span className="text-xl font-bold text-[#D54B00]" style={{ fontFamily: 'Arial, sans-serif' }}>TMS</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/privacy-policy" className="text-[#584235] font-medium hover:text-[#FF7A00] transition-colors text-sm">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="text-[#FF7A00] font-bold text-sm">Terms of Service</Link>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className="py-20 px-8 text-white relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #121212 0%, #1c1b1b 100%)' }}
            >
                <div className="max-w-7xl mx-auto relative z-10">
                    <span className="text-[#ff7a00] font-bold tracking-widest text-sm uppercase">Legal Framework</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-4 mb-6">Terms of Service</h1>
                    <p className="text-[#ebe7e7] max-w-2xl text-lg leading-relaxed">
                        Effective Date: January 01, 2024. These terms govern your professional engagement with the TMS industrial ecosystem.
                    </p>
                </div>
                <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
                    <svg fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                        <path d="M400 0L0 400H400V0Z" fill="#FF7A00" />
                    </svg>
                </div>
            </section>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row gap-12">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-64 shrink-0">
                    <div className="sticky top-8 space-y-1">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-[#584235] mb-4 px-4">Navigation</h3>
                        <nav className="flex flex-col">
                            {navItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`px-4 py-3 flex items-center gap-3 transition-all ${activeSection === item.id
                                        ? 'border-l-4 border-[#D54B00] text-[#D54B00] font-bold'
                                        : 'text-[#584235] hover:text-[#994700] hover:bg-[#ffdbc8] rounded-lg'
                                        }`}
                                    style={activeSection === item.id ? { background: 'linear-gradient(90deg, rgba(213,75,0,0.1) 0%, rgba(213,75,0,0) 100%)' } : {}}
                                >
                                    {item.icon} {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Legal Content */}
                <div className="flex-1 bg-white p-8 md:p-16 rounded-xl shadow-sm">
                    <article className="space-y-12">
                        <section id="acceptance">
                            <h2 className="text-3xl font-bold text-[#1c1b1b] tracking-tight mb-6">1. Acceptance of Terms</h2>
                            <div className="space-y-4 text-[#584235] leading-relaxed text-lg">
                                <p>By accessing or using TMS services, platforms, or applications (the "Service"), you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and TMS.</p>
                                <p>If you are using the Service on behalf of an organization, you are agreeing to these terms for that organization and promising that you have the authority to bind that organization to these terms. In such a case, "you" and "your" will refer to that organization.</p>
                            </div>
                        </section>

                        <section id="conduct">
                            <h2 className="text-3xl font-bold text-[#1c1b1b] tracking-tight mb-6">2. User Conduct &amp; Responsibilities</h2>
                            <div className="space-y-6 text-[#584235] leading-relaxed">
                                <p>Professional conduct is paramount in our logistics network. You agree not to:</p>
                                <ul className="list-none space-y-4">
                                    <li className="flex gap-4 p-4 bg-[#f6f3f2] rounded-lg">
                                        <span className="font-extrabold text-[#994700]">2.1</span>
                                        <span>Use the platform for any fraudulent shipment tracking or unauthorized data extraction from our industrial APIs.</span>
                                    </li>
                                    <li className="flex gap-4 p-4 bg-[#f6f3f2] rounded-lg">
                                        <span className="font-extrabold text-[#994700]">2.2</span>
                                        <span>Interfere with or disrupt the integrity or performance of the Service or the data contained therein.</span>
                                    </li>
                                    <li className="flex gap-4 p-4 bg-[#f6f3f2] rounded-lg">
                                        <span className="font-extrabold text-[#994700]">2.3</span>
                                        <span>Attempt to gain unauthorized access to the Service or its related systems or networks.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section className="pt-8" id="intellectual">
                            <h2 className="text-3xl font-bold text-[#1c1b1b] tracking-tight mb-6">3. Intellectual Property Rights</h2>
                            <div className="bg-[#f0edec] p-8 rounded-2xl relative overflow-hidden">
                                <p className="text-[#1c1b1b] leading-relaxed text-lg relative z-10">
                                    All intellectual property rights in the Service, including software, hardware designs, logos, and industrial algorithms, are owned by or licensed to TMS. You are granted a limited, non-exclusive, non-transferable license to access the platform solely for its intended business logistical purposes.
                                </p>
                            </div>
                        </section>

                        <section id="liability">
                            <h2 className="text-3xl font-bold text-[#1c1b1b] tracking-tight mb-6">4. Limitation of Liability</h2>
                            <div className="space-y-4 text-[#584235] leading-relaxed">
                                <p>To the maximum extent permitted by applicable law, TMS shall not be liable for any indirect, incidental, special, consequential, or punitive damages...</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div className="border border-[#e0c0af] p-5 rounded-xl">
                                        <h4 className="font-bold text-[#1c1b1b] mb-2">Service Availability</h4>
                                        <p className="text-sm">Your access to or use of or inability to access or use the services during scheduled maintenance.</p>
                                    </div>
                                    <div className="border border-[#e0c0af] p-5 rounded-xl">
                                        <h4 className="font-bold text-[#1c1b1b] mb-2">Third Party Conduct</h4>
                                        <p className="text-sm">Any conduct or content of any third party on the services, including without limitation, any fleet operator.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="border-t border-[#ebe7e7] pt-12" id="termination">
                            <div className="bg-red-50 p-8 rounded-2xl border border-red-200">
                                <h2 className="text-3xl font-bold text-red-700 tracking-tight mb-6">5. Termination</h2>
                                <p className="text-[#584235] leading-relaxed">
                                    We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                                </p>
                            </div>
                        </section>
                    </article>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#121212] flex flex-col md:flex-row justify-between items-center px-12 py-12 w-full text-sm tracking-wide">
                <div className="flex flex-col gap-4 mb-8 md:mb-0">
                    <div className="flex items-center gap-2">
                        <img src="/japfa-logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                        <span className="text-lg font-bold text-[#D54B00]">TMS</span>
                    </div>
                    <p className="text-gray-500 max-w-xs">© 2026 TMS. All rights reserved. Precise Industrial Logistics.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <Link className="text-gray-500 hover:text-white transition-colors" to="/privacy-policy">Privacy Policy</Link>
                    <Link className="text-[#FF7A00] font-bold" to="/terms-of-service">Terms of Service</Link>
                </div>
            </footer>
        </div>
    );
}

// ─────────────────────────────────────────────
// PRIVACY POLICY
// ─────────────────────────────────────────────
export function PrivacyPolicy() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('introduction');

    const navItems = [
        { href: '#introduction', label: 'Introduction' },
        { href: '#collection', label: 'Information Collection' },
        { href: '#usage', label: 'Data Usage' },
        { href: '#sharing', label: 'Data Sharing' },
        { href: '#cookies', label: 'Cookies & Tracking' },
        { href: '#security', label: 'Security Measures' },
        { href: '#contact', label: 'Contact Us' },
    ];

    return (
        <div className="min-h-screen bg-[#fcf9f8] text-[#1c1b1b] antialiased" style={{ fontFamily: 'Arial, sans-serif' }}>

            <nav className="bg-[#fcf9f8] w-full flex justify-between items-center px-8 py-4 border-b border-[#e0c0af]">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-[#584235] hover:text-[#D54B00] transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-sm font-semibold">Back to Login</span>
                </button>
                <div className="flex items-center gap-3">
                    <img src="/japfa-logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                    <span className="text-xl font-bold text-[#D54B00]">TMS</span>
                </div>
                <div className="flex items-center gap-6">
                    <Link to="/privacy-policy" className="text-[#D54B00] font-bold text-sm">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="text-[#584235] font-medium hover:text-[#FF7A00] transition-colors text-sm">Terms of Service</Link>
                </div>
            </nav>

            {/* Hero Header */}
            <section
                className="py-20 px-8 text-white relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #121212 0%, #1c1b1b 100%)' }}
            >
                <div className="max-w-7xl mx-auto relative z-10">
                    <span className="text-[#ff7a00] font-bold tracking-widest text-sm uppercase">Legal Documentation</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-4 mb-6">Privacy Policy</h1>
                    <p className="text-[#ebe7e7] max-w-2xl text-lg leading-relaxed">
                        At TMS, we prioritize the security and integrity of your logistics data. This policy outlines how we handle operational information with industrial precision.
                    </p>
                </div>
                <div className="absolute right-0 top-0 w-1/3 h-full opacity-10 pointer-events-none">
                    <svg fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                        <path d="M400 0L0 400H400V0Z" fill="#FF7A00" />
                    </svg>
                </div>
            </section>

            {/* Main Content Grid */}
            <main className="max-w-7xl mx-auto px-8 lg:px-24 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Sticky Sidebar */}
                <aside className="lg:col-span-3">
                    <div className="sticky top-8 space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-[#8c7263] mb-6 px-4">Navigation</h3>
                        {navItems.map((item) => {
                            const id = item.href.replace('#', '');
                            const isActive = activeSection === id;
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setActiveSection(id)}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-all font-medium ${isActive
                                        ? 'bg-[#D54B00] text-white font-bold'
                                        : 'text-[#584235] hover:bg-[#ffdbc8] hover:text-[#994700]'
                                        }`}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </div>
                </aside>

                {/* Document Content Area */}
                <div className="lg:col-span-9 space-y-20">

                    <section className="scroll-mt-8" id="introduction">
                        <h2 className="text-3xl font-bold mb-6 flex items-center">
                            <span className="w-8 h-1 bg-[#994700] mr-4 inline-block"></span>
                            Introduction
                        </h2>
                        <div className="text-[#584235] leading-relaxed space-y-4 text-lg">
                            <p>TMS ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by TMS.</p>
                            <p>
                                This Privacy Policy applies to our website, and its associated subdomains alongside our application, TMS. By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy and our{' '}
                                <Link to="/terms-of-service" className="text-[#994700] underline hover:opacity-80">Terms of Service</Link>.
                            </p>
                        </div>
                    </section>

                    <section className="scroll-mt-8" id="collection">
                        <h2 className="text-3xl font-bold mb-8 flex items-center">
                            <span className="w-8 h-1 bg-[#994700] mr-4 inline-block"></span>
                            Information Collection
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-[#f6f3f2] p-8 rounded-xl">
                                <h3 className="text-xl font-bold mb-3">Direct Information</h3>
                                <ul className="space-y-3 text-sm text-[#584235]">
                                    {['Contact information (name, email, phone)', 'Professional credentials and job titles', 'Logistics and shipment documentation'].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <span className="text-green-500 mt-0.5">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-[#f6f3f2] p-8 rounded-xl">
                                <h3 className="text-xl font-bold mb-3">Automated Collection</h3>
                                <ul className="space-y-3 text-sm text-[#584235]">
                                    {['Device and browser characteristics', 'IP address and geolocation data', 'Real-time telemetry from fleet vehicles'].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <span className="text-green-500 mt-0.5">✓</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="scroll-mt-8" id="usage">
                        <h2 className="text-3xl font-bold mb-8 flex items-center">
                            <span className="w-8 h-1 bg-[#994700] mr-4 inline-block"></span>
                            Data Usage
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-2 bg-[#e5e2e1] p-8 rounded-xl">
                                <h3 className="text-lg font-bold mb-2">Operational Efficiency</h3>
                                <p className="text-sm text-[#584235] leading-relaxed">We process data to optimize supply chain routes, manage fleet maintenance schedules, and ensure timely delivery of perishable industrial goods.</p>
                            </div>
                            <div className="bg-[#994700] text-white p-8 rounded-xl">
                                <h3 className="text-lg font-bold mb-2">Predictive Analytics</h3>
                                <p className="text-xs opacity-90 leading-relaxed">Anonymized data fuels our kinetic logistics engine to predict bottlenecks before they occur.</p>
                            </div>
                            <div className="bg-[#f6f3f2] p-8 rounded-xl">
                                <h3 className="text-lg font-bold mb-2">Compliance</h3>
                                <p className="text-xs text-[#584235] leading-relaxed">Ensuring all transport follows international regulatory standards.</p>
                            </div>
                            <div className="md:col-span-2 bg-[#f6f3f2] p-8 rounded-xl">
                                <h3 className="text-lg font-bold mb-2">Security &amp; Verification</h3>
                                <p className="text-sm text-[#584235] leading-relaxed">Monitoring account activity to prevent unauthorized access and verify shipping manifest integrity using secure hashing.</p>
                            </div>
                        </div>
                    </section>

                    <section className="scroll-mt-8" id="cookies">
                        <h2 className="text-3xl font-bold mb-6 flex items-center">
                            <span className="w-8 h-1 bg-[#994700] mr-4 inline-block"></span>
                            Cookies &amp; Tracking
                        </h2>
                        <div className="bg-[#f6f3f2] p-10 rounded-2xl">
                            <p className="text-[#584235] mb-6 leading-relaxed">We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.</p>
                            <div className="flex flex-wrap gap-3">
                                {['Necessary Cookies', 'Performance Cookies', 'Functional Cookies'].map((c) => (
                                    <span key={c} className="bg-white text-[#1c1b1b] px-4 py-2 rounded-full text-xs font-semibold shadow-sm">{c}</span>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="scroll-mt-8" id="security">
                        <h2 className="text-3xl font-bold mb-6 flex items-center">
                            <span className="w-8 h-1 bg-[#994700] mr-4 inline-block"></span>
                            Security Measures
                        </h2>
                        <div className="border-l-2 border-[#e0c0af] pl-8 space-y-8">
                            {[
                                { title: 'Encryption at Rest', desc: 'All sensitive logistics data is encrypted using AES-256 standards within our secure storage clusters.' },
                                { title: 'Transport Layer Security', desc: 'Data in transit is protected via TLS 1.3 to ensure no middle-man interception of shipment coordinates.' },
                                { title: 'Access Audits', desc: 'We maintain detailed immutable logs of every database interaction for forensic analysis and compliance auditing.' },
                            ].map((item) => (
                                <div key={item.title}>
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-[#584235] leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="scroll-mt-8" id="contact">
                        <h2 className="text-3xl font-bold mb-6 flex items-center">
                            <span className="w-8 h-1 bg-[#D54B00] mr-4 inline-block"></span>
                            Contact Us
                        </h2>
                        <div className="bg-[#f6f3f2] p-10 rounded-2xl">
                            <p className="text-[#584235] leading-relaxed mb-6">Have questions about this Privacy Policy or how we handle your data? Reach out to our team directly via WhatsApp.</p>
                            <a
                                href="https://wa.me/+62895323055422"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-sm hover:opacity-90 transition-all"
                                style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                Chat on WhatsApp
                            </a>
                        </div>
                    </section>

                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#121212] flex flex-col md:flex-row justify-between items-center px-12 py-12 w-full text-sm tracking-wide mt-auto">
                <div className="flex flex-col mb-8 md:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                        <img src="/japfa-logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                        <span className="text-lg font-bold text-[#D54B00]">TMS</span>
                    </div>
                    <p className="text-gray-500 max-w-xs leading-loose">© 2026 TMS. All rights reserved. Precise Industrial Logistics.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <Link className="text-[#FF7A00] font-bold hover:opacity-80 transition-opacity" to="/privacy-policy">Privacy Policy</Link>
                    <Link className="text-gray-500 hover:text-white transition-colors" to="/terms-of-service">Terms of Service</Link>
                </div>
            </footer>

        </div>
    );
}
