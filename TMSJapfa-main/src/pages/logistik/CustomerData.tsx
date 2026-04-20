import { useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const ActionMenu = ({ customerId, openId, setOpenId, navigate }: { customerId: string, openId: string | null, setOpenId: (id: string | null) => void, navigate: any }) => {
    const isOpen = openId === customerId;
    return (
        <div className="relative inline-block text-left">
            <button
                onClick={(e) => { e.stopPropagation(); setOpenId(isOpen ? null : customerId); }}
                className="material-symbols-outlined text-slate-400 hover:text-primary dark:hover:text-[#FF7A00] transition-colors text-[20px] active:scale-95 cursor-pointer"
            >
                more_vert
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-[#1A1A1A] ring-1 ring-black ring-opacity-5 z-10 border border-slate-200 dark:border-[#333]">
                    <div className="py-1" role="menu">
                        <button onClick={(e) => { e.stopPropagation(); navigate('/logistik/customers/edit'); setOpenId(null); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#222] flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">edit</span> Edit Customer
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); alert('View Details'); setOpenId(null); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#222] flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">visibility</span> View Details
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); alert('Deactivate'); setOpenId(null); }} className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px]">block</span> Deactivate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default function CustomerData() {
    const navigate = useNavigate();
    const [openActionId, setOpenActionId] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    return (
        <>
            <Header title="Customer Directory" />

            {/* Content Area */}
            <div className="p-4 md:p-8 max-w-[1600px] w-full mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Data Customer Directory</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">Managing 1,284 verified merchant partners across Indonesia</p>
                </div>

                {/* Unified Search and Action Bar */}
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <div className="flex-1 bg-slate-50 dark:bg-[#1a1a1a] rounded-xl p-4 flex items-center gap-4 border border-slate-200 dark:border-slate-800">
                        <div className="relative flex-1">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                            <input
                                className="w-full bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-orange-500/20 placeholder:text-slate-400 dark:text-white outline-none"
                                placeholder="Search customer name, code or full address..."
                                type="text"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/logistik/customers/add')}
                        className="bg-[#FF7A00] text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:opacity-90 transition-all font-bold tracking-tight">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
                        Add New Customer
                    </button>
                </div>

                {/* Data Table Container */}
                <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead className="bg-slate-50 dark:bg-[#222]">
                                <tr>
                                    <th className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            CUST CODE
                                            <span className="material-symbols-outlined text-[14px]">filter_list</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            NAMA TOKO
                                            <span className="material-symbols-outlined text-[14px]">filter_list</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            STATUS
                                            <span className="material-symbols-outlined text-[14px]">filter_list</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ADMIN</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">ALAMAT</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">KECAMATAN/RT/RW</th>
                                    <th className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                            KOTA/KAB
                                            <span className="material-symbols-outlined text-[14px]">filter_list</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">COORDINATES</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                                {/* Row 1 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-[#222] transition-colors group">
                                    <td className="px-6 py-4 text-xs font-bold font-mono text-[#FF7A00]">C1092-JKT</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white block">TOKO MAJU JAYA</span>
                                        <span className="text-[10px] text-slate-500">Retailer • Tier 1</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wide">Active</span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium dark:text-slate-300">Budi Santoso</td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-[200px]">Jl. Panjang No. 45, Kebon Jeruk</p>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">Kebon Jeruk / 04 / 02</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-white">Jakarta Barat</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-tight">
                                            <span>-6.1944° S</span>
                                            <span>106.7621° E</span>
                                        </div>
                                    </td>
                                    <ActionMenu customerId="C1092-JKT" openId={openActionId} setOpenId={setOpenActionId} navigate={navigate} />
                                </tr>
                                {/* Row 2 */}
                                <tr className="bg-slate-50/50 dark:bg-[#1f1f1f] hover:bg-slate-50 dark:hover:bg-[#222] transition-colors group">
                                    <td className="px-6 py-4 text-xs font-bold font-mono text-[#FF7A00]">C2415-TNG</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white block">FARM FRESH INDO</span>
                                        <span className="text-[10px] text-slate-500">Distributor • Tier 2</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wide">Active</span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium dark:text-slate-300">Siti Aminah</td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-[200px]">Ruko Modernland Blok AR/12</p>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">Cipondoh / 01 / 05</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-white">Tangerang</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-tight">
                                            <span>-6.1783° S</span>
                                            <span>106.6319° E</span>
                                        </div>
                                    </td>
                                    <ActionMenu customerId="C2415-TNG" openId={openActionId} setOpenId={setOpenActionId} navigate={navigate} />
                                </tr>
                                {/* Row 3 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-[#222] transition-colors group">
                                    <td className="px-6 py-4 text-xs font-bold font-mono text-[#FF7A00]">C0882-JKT</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white block">BERKAH ABADI</span>
                                        <span className="text-[10px] text-slate-500">Retailer • Tier 3</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-bold uppercase tracking-wide">Inactive</span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium dark:text-slate-300">Andi Wijaya</td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-[200px]">Jl. Raden Inten II No. 8</p>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">Duren Sawit / 07 / 03</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-white">Jakarta Timur</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-tight">
                                            <span>-6.2341° S</span>
                                            <span>106.9186° E</span>
                                        </div>
                                    </td>
                                    <ActionMenu customerId="C0882-JKT" openId={openActionId} setOpenId={setOpenActionId} navigate={navigate} />
                                </tr>
                                {/* Row 4 */}
                                <tr className="bg-slate-50/50 dark:bg-[#1f1f1f] hover:bg-slate-50 dark:hover:bg-[#222] transition-colors group">
                                    <td className="px-6 py-4 text-xs font-bold font-mono text-[#FF7A00]">C5521-BKS</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white block">SUMBER REJEKI</span>
                                        <span className="text-[10px] text-slate-500">Partner • Key Account</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wide">Active</span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium dark:text-slate-300">Linda Sari</td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-[200px]">Kawasan Industri Jababeka V</p>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">Cikarang / 02 / 10</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-white">Bekasi</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-tight">
                                            <span>-6.2856° S</span>
                                            <span>107.1706° E</span>
                                        </div>
                                    </td>
                                    <ActionMenu customerId="C5521-BKS" openId={openActionId} setOpenId={setOpenActionId} navigate={navigate} />
                                </tr>
                                {/* Row 5 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-[#222] transition-colors group">
                                    <td className="px-6 py-4 text-xs font-bold font-mono text-[#FF7A00]">C9902-SOU</td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white block">SENTRA PANGAN</span>
                                        <span className="text-[10px] text-slate-500">Distributor • Tier 1</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wide">Active</span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium dark:text-slate-300">Herry Pratama</td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-[200px]">Jl. Fatmawati Raya No. 12B</p>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">Cilandak / 05 / 01</td>
                                    <td className="px-6 py-4 text-xs font-bold text-slate-900 dark:text-white">Jakarta Selatan</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col text-[10px] font-mono text-slate-500 dark:text-slate-400 leading-tight">
                                            <span>-6.2731° S</span>
                                            <span>106.7968° E</span>
                                        </div>
                                    </td>
                                    <ActionMenu customerId="C9902-SOU" openId={openActionId} setOpenId={setOpenActionId} navigate={navigate} />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="px-8 py-4 bg-slate-50 dark:bg-[#222] flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Showing <span className="font-bold text-slate-900 dark:text-white">5</span> of <span className="font-bold text-slate-900 dark:text-white">1,284</span> entries</p>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-700 rounded-lg transition-colors active:scale-95 duration-150">
                                    <span className="material-symbols-outlined text-base">filter_list</span> Filter
                                </button>
                                {isFilterOpen && (
                                    <div className="absolute right-0 bottom-full mb-2 w-56 bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#333] rounded-xl shadow-lg z-20 overflow-hidden">
                                        <div className="p-3 border-b border-slate-100 dark:border-[#333]">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter By Type</p>
                                        </div>
                                        <div className="p-2 flex flex-col gap-1">
                                            <label className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-[#222] rounded-lg cursor-pointer">
                                                <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                                <span className="text-sm dark:text-slate-300">Retail Partner</span>
                                            </label>
                                            <label className="flex items-center gap-2 p-2 hover:bg-slate-50 dark:hover:bg-[#222] rounded-lg cursor-pointer">
                                                <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                                <span className="text-sm dark:text-slate-300">Wholesale</span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => alert("Export functionality coming soon")} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors active:scale-95 duration-150">
                                <span className="material-symbols-outlined text-base">download</span> Export
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#FF7A00] transition-all">
                                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                            </button>
                            <button className="px-3 py-1 text-xs font-bold bg-[#FF7A00] text-white rounded shadow-sm border border-[#FF7A00]">1</button>
                            <button className="px-3 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors">2</button>
                            <button className="px-3 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors">3</button>
                            <span className="text-slate-400">...</span>
                            <button className="px-3 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors">128</button>
                            <button className="w-8 h-8 flex items-center justify-center rounded bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-[#FF7A00] transition-all">
                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}