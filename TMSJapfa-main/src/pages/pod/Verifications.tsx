import PodSidebar from "./Sidebar";
import Header from "../../components/Header";

export default function Verifications() {
    return (
        <div className="flex h-screen overflow-hidden relative bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display transition-colors">
            <PodSidebar />
            
            {/* Main Workspace */}
            <main className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
                <Header title="Admin Portal" />
                
                {/* Workspace Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Panel 1: Live Queue (20%) */}
                    <section className="w-1/4 xl:w-1/5 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50 dark:bg-slate-900/50">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Live Queue</h2>
                            <p className="text-xs text-slate-400 mt-1">4 Pending Verifications</p>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {/* Selected Item */}
                            <div className="p-4 bg-primary/5 border-l-4 border-primary cursor-pointer">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-bold text-primary">e-POD #88291</span>
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                </div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Budi Santoso</p>
                                <p className="text-xs text-slate-500 mt-1">2 mins ago • Jakarta Timur</p>
                            </div>
                            
                            {/* Regular Item */}
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-bold text-slate-500">e-POD #88290</span>
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                </div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Ahmad Fauzi</p>
                                <p className="text-xs text-slate-500 mt-1">5 mins ago • Bekasi</p>
                            </div>
                            
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors opacity-70">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-bold text-slate-500">e-POD #88289</span>
                                </div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Siti Aminah</p>
                                <p className="text-xs text-slate-500 mt-1">12 mins ago • Tangerang</p>
                            </div>
                            
                            <div className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors opacity-70">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-bold text-slate-500">e-POD #88288</span>
                                </div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Dedi Kurniawan</p>
                                <p className="text-xs text-slate-500 mt-1">15 mins ago • Depok</p>
                            </div>
                        </div>
                    </section>

                    {/* Panel 2: Data Sistem GR (30%) */}
                    <section className="w-1/3 xl:w-[30%] border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-[#111111]">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">Data Sistem GR</h2>
                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[10px] font-bold rounded">MATCHING</span>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                                        <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">SKU</th>
                                        <th className="p-3 text-[10px] font-bold text-slate-500 uppercase">Item Name</th>
                                        <th className="p-3 text-[10px] font-bold text-slate-500 uppercase text-right">Qty</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                    <tr>
                                        <td className="p-3 text-xs font-mono text-slate-600 dark:text-slate-400">JPF-CK-001</td>
                                        <td className="p-3 text-xs font-medium text-slate-800 dark:text-slate-200">Chicken Whole (0.8kg - 1.0kg)</td>
                                        <td className="p-3 text-xs font-bold text-slate-900 dark:text-slate-100 text-right">450</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-xs font-mono text-slate-600 dark:text-slate-400">JPF-CK-005</td>
                                        <td className="p-3 text-xs font-medium text-slate-800 dark:text-slate-200">Chicken Thigh Skinless</td>
                                        <td className="p-3 text-xs font-bold text-slate-900 dark:text-slate-100 text-right">120</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-xs font-mono text-slate-600 dark:text-slate-400">JPF-EG-012</td>
                                        <td className="p-3 text-xs font-medium text-slate-800 dark:text-slate-200">Omega-3 Eggs Tray 30s</td>
                                        <td className="p-3 text-xs font-bold text-slate-900 dark:text-slate-100 text-right">30</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 text-xs font-mono text-slate-600 dark:text-slate-400">JPF-PR-022</td>
                                        <td className="p-3 text-xs font-medium text-slate-800 dark:text-slate-200">Chicken Breast Fillet</td>
                                        <td className="p-3 text-xs font-bold text-slate-900 dark:text-slate-100 text-right">85</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-slate-400 text-sm">chat_bubble</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase">Driver Notes</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 italic">"Penerima meminta barang diletakkan di cold storage 3. Sudah ditimbang ulang sesuai SOP."</p>
                        </div>
                    </section>

                    {/* Panel 3: Document Viewer (50%) */}
                    <section className="flex-1 bg-slate-100 dark:bg-[#0a0a0a] flex flex-col relative">
                        {/* Toolbar */}
                        <div className="absolute top-4 right-4 z-10 flex gap-2">
                            <button className="w-10 h-10 bg-slate-900/80 text-white rounded-full flex items-center justify-center hover:bg-slate-900 transition-colors shadow-lg">
                                <span className="material-symbols-outlined">zoom_in</span>
                            </button>
                            <button className="w-10 h-10 bg-slate-900/80 text-white rounded-full flex items-center justify-center hover:bg-slate-900 transition-colors shadow-lg">
                                <span className="material-symbols-outlined">zoom_out</span>
                            </button>
                            <button className="w-10 h-10 bg-slate-900/80 text-white rounded-full flex items-center justify-center hover:bg-slate-900 transition-colors shadow-lg">
                                <span className="material-symbols-outlined">rotate_right</span>
                            </button>
                            <button className="w-10 h-10 bg-slate-900/80 text-white rounded-full flex items-center justify-center hover:bg-slate-900 transition-colors shadow-lg">
                                <span className="material-symbols-outlined">fullscreen</span>
                            </button>
                        </div>

                        {/* Document Image */}
                        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
                            <div className="bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-lg w-full h-full max-w-[600px] flex items-center justify-center relative border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center opacity-90" data-alt="Photo of a signed delivery note and invoice" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTx9bYd1hgeeWX1P-Y3mUYWXFJXplpHkDmiLVOPyUD3oP3aJElteBrqefiqoN_-Cj5Dqk33srhBY4zrITGWjG4ujVaQ3xQiGHog_oa0w-kghUP08wCk7mbK3RgDR27N3ExeGW_7vXLuybyDzoF7w7L4Fzs5otvHtFs0O1ISma6-tYq2OIj-SzkbZ0odalVapd_oC_uUxt9sT4GPxUp9FvuyJKHZYgvTHhgpqDDZ-7TTMrExRscqw9-YCYrE7uWpnNL07ggrbIz1D0')" }}></div>
                                <div className="relative z-10 flex flex-col items-center pointer-events-none p-8 bg-black/40 rounded-xl backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-6xl text-white">image</span>
                                    <span className="text-xs text-white mt-2 font-bold tracking-widest">DOCUMENT PREVIEW MODE</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Header */}
                        <div className="absolute top-4 left-4 z-10">
                            <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-3 shadow-lg">
                                <span className="material-symbols-outlined text-primary">verified_user</span>
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase leading-none">Photo Evidence</p>
                                    <p className="text-white text-xs font-medium mt-1">Captured by Budi Santoso at 14:32</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sticky Bottom Bar */}
                <footer className="h-20 bg-white dark:bg-[#111111] border-t border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Live Connection Active</span>
                        </div>
                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 italic">Reviewing: JPF-2023-000452-91</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-8 py-3 border-2 border-red-500 text-red-500 object-none hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">cancel</span>
                            PENGIRIMAN GAGAL / RETUR
                        </button>
                        <button className="px-8 py-3 bg-primary text-white hover:bg-primary/90 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">check_circle</span>
                            VERIFIKASI COCOK
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}
