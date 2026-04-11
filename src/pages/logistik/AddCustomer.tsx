import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { useState } from "react";

export default function AddCustomer() {
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowNotification(true);
        setTimeout(() => {
            navigate('/logistik/customers');
        }, 500); // Navigate after 1.5 seconds
    };

    return (
        <>
            <Header title="Data Customer / Add New" />
            <div className="p-4 md:p-10 max-w-5xl mx-auto w-full relative">
                {/* Success Notification */}
                {showNotification && (
                    <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-[#F0FDF4] dark:bg-green-900/30 border border-[#DCFCE7] dark:border-green-800 text-[#15803D] dark:text-green-400 px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
                        <span className="material-symbols-outlined text-green-600 dark:text-green-400">check_circle</span>
                        <div>
                            <p className="font-bold text-sm">Customer Profile Created</p>
                            <p className="text-xs mt-0.5">Redirecting to directory...</p>
                        </div>
                    </div>
                )}

                <div className="mb-10">
                    <h1 className="text-3xl font-bold">Create New Customer Profile</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Initialize a new logistic node in the JAPFA industrial network.</p>
                </div>
                {/* The Industrial Form Card */}
                <div className="bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden relative">
                    {/* Visual Accent */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#FF7A00]"></div>
                    <form className="p-8 space-y-12" onSubmit={handleSubmit}>
                        {/* Section: General Identity */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Entity Identity</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Basic identification for the industrial catalog.</p>
                            </div>
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Customer Code</label>
                                    <input className="w-full bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-orange-500/20 text-sm py-3 px-4 font-medium transition-all dark:text-white outline-none" placeholder="JAP-XXXX" type="text" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Store Name</label>
                                    <input className="w-full bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-orange-500/20 text-sm py-3 px-4 font-medium transition-all dark:text-white outline-none" placeholder="Official Commercial Name" type="text" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Status</label>
                                    <select className="w-full bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-orange-500/20 text-sm py-3 px-4 font-medium transition-all dark:text-white outline-none">
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Admin Name</label>
                                    <input className="w-full bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-orange-500/20 text-sm py-3 px-4 font-medium transition-all dark:text-white outline-none" placeholder="Primary Contact Person" type="text" />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-slate-200 dark:bg-slate-800"></div>

                        {/* Section: Geographic Positioning */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Geospatial Data</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Precise location for kinetic route optimization.</p>
                            </div>
                            <div className="md:col-span-2 space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">Full Address</label>
                                    <textarea className="w-full bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-orange-500/20 text-sm py-3 px-4 font-medium transition-all dark:text-white outline-none resize-none" placeholder="Street, Building, Landmark..." rows={3}></textarea>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">District / RT / RW</label>
                                        <input className="w-full bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-orange-500/20 text-sm py-3 px-4 font-medium transition-all dark:text-white outline-none" placeholder="e.g. Kebayoran, 004/012" type="text" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">City / Regency</label>
                                        <input className="w-full bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-orange-500/20 text-sm py-3 px-4 font-medium transition-all dark:text-white outline-none" placeholder="Central Jakarta" type="text" />
                                    </div>
                                </div>
                                <div className="bg-slate-50 dark:bg-[#222] border border-slate-200 dark:border-slate-800 p-6 rounded-xl space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-orange-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Coordinates Mapping</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">Latitude</label>
                                            <input className="w-full bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-orange-500/20 text-sm py-3 px-4 font-medium transition-all dark:text-white outline-none" placeholder="-6.1754" type="text" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">Longitude</label>
                                            <input className="w-full bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-orange-500/20 text-sm py-3 px-4 font-medium transition-all dark:text-white outline-none" placeholder="106.8272" type="text" />
                                        </div>
                                    </div>
                                    {/* Mock Map Visual */}
                                    <div className="h-48 rounded-lg overflow-hidden relative border border-slate-200 dark:border-slate-800">
                                        <img className="w-full h-full object-cover grayscale opacity-50 dark:opacity-30" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBksDPjW0G30QTXgkCV1SfVmkqCx7A7onJqH5GqHT3RoNersCJtDHegmfH7XXxpbHcMnM6GUcVRLaa2xc0-sRsWeVfYMdGY5LUiU-cgdVWh1MQtZaUUXZikkvJhBJf8DN1ma2R2UeWxG-YyElTTu8uqxCwOfxbtpb5mN2LtF8SUF5T17sswhfotRu08OpeAtpFnTVyEkhpaYwuSfemsGZJFyZOGYY5EyCKcdr1eXO9NawMmu3MV9gXmDx9ooJ7bzWei5Gj4_9H6mlA" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-orange-500/20 p-8 rounded-full border border-orange-500/50 animate-pulse"></div>
                                            <span className="material-symbols-outlined text-orange-600 absolute text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-end gap-4 pt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/logistik/customers')}
                                className="px-8 py-4 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors tracking-tight"
                            >
                                Cancel
                            </button>
                            <button className="px-10 py-4 bg-[#FF7A00] hover:opacity-90 text-white rounded-xl font-bold tracking-tight shadow-lg shadow-orange-500/20 active:scale-95 transition-all duration-150" type="submit">
                                Save Customer
                            </button>
                        </div>
                    </form>
                </div>

                {/* Contextual Helper */}
                <div className="mt-8 flex items-start gap-4 p-6 bg-slate-50 dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="material-symbols-outlined text-slate-400 mt-1">info</span>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Need help?</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">Ensure the coordinates are accurate to minimize delivery failures. Data customer validation takes 1-2 hours depending on the regional cluster status.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
