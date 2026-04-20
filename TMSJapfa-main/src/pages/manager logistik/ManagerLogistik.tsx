import { useState } from "react";
import Header from "../../components/Header";
import {
    Download,
} from "lucide-react";

// Types for components
interface KPICardProps {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: string;
    bgColor: string;
    iconColor: string;
    subtext: string;
}

const KPICard = ({ label, value, change, trend, icon, bgColor, iconColor, subtext }: KPICardProps) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-wider">{label}</span>
            <div className={`p-2 ${bgColor} dark:bg-opacity-10 ${iconColor} rounded-lg`}>
                <span className="material-symbols-outlined text-xl">{icon}</span>
            </div>
        </div>
        <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-japfa-dark dark:text-white">{value}</h3>
            <span className={`text-sm font-semibold flex items-center ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                <span className="material-symbols-outlined text-sm mr-1">
                    {trend === 'up' ? 'arrow_upward' : 'arrow_downward'}
                </span>
                {change}
            </span>
        </div>
        <p className="mt-2 text-xs text-japfa-gray dark:text-gray-400">{subtext}</p>
    </div>
);

const ManagerLogistik = () => {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50/50 dark:bg-slate-950 text-japfa-dark dark:text-white transition-colors duration-200">
            <Header title="Logistic Performance Dashboard" />

            {/* Scrollable Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8 pt-0 space-y-8 min-h-max pb-24 max-w-[1600px] mx-auto">

                    {/* Horizontal Tab Navigation */}
                    <nav className="sticky top-0 z-10 bg-gray-50/95 dark:bg-slate-950/95 backdrop-blur-sm -mx-8 px-8 border-b border-gray-200 dark:border-white/10 pt-8">
                        <div className="flex items-center gap-10">
                            {[
                                { id: "overview", label: "Overview" },
                                { id: "return", label: "Return Performance" },
                                { id: "efficiency", label: "Logistics Efficiency" }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-5 text-sm transition-all border-b-4 ${activeTab === tab.id
                                        ? "text-japfa-orange border-japfa-orange font-extrabold"
                                        : "text-japfa-gray dark:text-gray-400 border-transparent hover:text-japfa-dark dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 font-semibold"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </nav>

                    {/* Tab Content */}
                    <div className="space-y-8">
                        {activeTab === "overview" && <OverviewContent />}
                        {activeTab === "return" && <ReturnContent />}
                        {activeTab === "efficiency" && <EfficiencyContent />}
                    </div>
                </div>
            </main>
        </div>
    );
};

const OverviewContent = () => (
    <div className="space-y-8 animate-fadeIn">
        {/* KPI Row (7 Cards) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
            <KPICard
                label="OTIF Performance"
                value="94.2%"
                change="1.2%"
                trend="up"
                icon="schedule"
                bgColor="bg-blue-50"
                iconColor="text-blue-600"
                subtext="vs. last month avg"
            />
            <KPICard
                label="On-Time Delivery"
                value="96.8%"
                change="0.5%"
                trend="up"
                icon="check_circle"
                bgColor="bg-green-50"
                iconColor="text-green-600"
                subtext="Operational target: 95%"
            />
            <KPICard
                label="Fill Rate"
                value="98.1%"
                change="0.3%"
                trend="down"
                icon="inventory_2"
                bgColor="bg-orange-50"
                iconColor="text-japfa-orange"
                subtext="Stock availability index"
            />
            <KPICard
                label="Return Rate"
                value="1.2%"
                change="0.4%"
                trend="down"
                icon="assignment_return"
                bgColor="bg-red-50"
                iconColor="text-red-600"
                subtext="Rejected loads reduction"
            />
            <KPICard
                label="Transport Cost"
                value="4.2B"
                change="2.1%"
                trend="up"
                icon="payments"
                bgColor="bg-purple-50"
                iconColor="text-purple-600"
                subtext="Fuel surcharge impact"
            />
            <KPICard
                label="Load Utilization"
                value="89.4%"
                change="1.5%"
                trend="up"
                icon="local_shipping"
                bgColor="bg-teal-50"
                iconColor="text-teal-600"
                subtext="Capacity efficiency"
            />
            <KPICard
                label="Damage Rate"
                value="0.45%"
                change="0.05%"
                trend="down"
                icon="broken_image"
                bgColor="bg-amber-50"
                iconColor="text-amber-600"
                subtext="Product handling quality"
            />
        </section>

        {/* Distribution Performance Trend Section */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 flex-wrap">
                <div>
                    <h2 className="text-xl font-bold text-japfa-dark dark:text-white">Distribution Performance Trend</h2>
                    <p className="text-sm text-japfa-gray dark:text-gray-400">Daily fulfillment vs shipment volume (OTIF & Load Count)</p>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-orange-100 dark:bg-orange-500/20"></span>
                        <span className="text-xs font-medium text-japfa-gray dark:text-gray-400">Shipment Volume</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 bg-japfa-orange"></div>
                        <span className="text-xs font-medium text-japfa-gray dark:text-gray-400">OTIF Performance</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-0.5 border-t border-dashed border-red-400"></div>
                        <span className="text-xs font-medium text-japfa-gray dark:text-gray-400">95% Target</span>
                    </div>
                </div>
            </div>

            {/* SVG Chart Container */}
            <div className="relative w-full h-[300px] mb-4">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 300">
                    {/* Horizontal Grid Lines */}
                    {[0, 60, 120, 180, 240, 300].map((y) => (
                        <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="currentColor" className="text-gray-100 dark:text-white/5" strokeDasharray="4" />
                    ))}
                    {/* 95% Target Line */}
                    <line x1="0" x2="1000" y1="150" y2="150" stroke="#ef4444" strokeDasharray="6,4" strokeWidth="2" />

                    {/* Bars (Shipment Volume) */}
                    {[200, 240, 280, 180, 260, 220, 290].map((h, i) => (
                        <rect key={i} x={80 + i * 130} y={300 - h} width="40" height={h} fill="currentColor" className="text-orange-100 dark:text-orange-500/20 rounded-t-sm" />
                    ))}

                    {/* Trend Line (OTIF %) */}
                    <path
                        d="M 100,200 C 150,200 180,160 230,160 C 280,160 310,120 360,120 C 410,120 440,220 490,220 C 540,220 570,110 620,110 C 670,110 700,140 750,140 C 800,140 830,90 880,90"
                        fill="none"
                        stroke="#F28C38"
                        strokeWidth="4"
                    />

                    {/* Markers */}
                    {[
                        { x: 100, y: 200 }, { x: 230, y: 160 }, { x: 360, y: 120 },
                        { x: 490, y: 220 }, { x: 620, y: 110 }, { x: 750, y: 140 }, { x: 880, y: 90 }
                    ].map((p, i) => (
                        <circle key={i} cx={p.x} cy={p.y} r="5" fill="white" stroke="#F28C38" strokeWidth="2" />
                    ))}
                </svg>
            </div>
            <div className="flex justify-between px-10 text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-wider">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
        </section>

        {/* Delay Analysis Table */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-bold text-japfa-dark dark:text-white">Reason for Delay Analysis</h2>
                    <p className="text-sm text-japfa-gray dark:text-gray-400">Root cause identification for non-compliant shipments</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-bold text-japfa-gray dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                    <Download className="w-4 h-4" />
                    EXPORT
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-white/5">
                            <th className="py-4 px-4 text-xs font-bold text-japfa-orange uppercase tracking-widest">Delay Category</th>
                            <th className="py-4 px-4 text-xs font-bold text-japfa-orange uppercase tracking-widest text-center">Incident Count</th>
                            <th className="py-4 px-4 text-xs font-bold text-japfa-orange uppercase tracking-widest text-center">OTIF Impact (%)</th>
                            <th className="py-4 px-4 text-xs font-bold text-japfa-orange uppercase tracking-widest text-right">Responsible Party</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                        {[
                            { category: "Warehouse Loading", count: 124, impact: "-1.8%", icon: "warehouse", responsible: "Warehouse" },
                            { category: "Traffic Congestion", count: 86, impact: "-1.2%", icon: "traffic", responsible: "Transporter" },
                            { category: "Vehicle Breakdown", count: 12, impact: "-0.1%", icon: "car_repair", responsible: "Transporter" },
                            { category: "Documentation Error", count: 45, impact: "-0.6%", icon: "description", responsible: "Sales / Admin" },
                            { category: "Customer Site Delay", count: 22, impact: "-0.3%", icon: "location_on", responsible: "Sales" }
                        ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <td className="py-4 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-japfa-orange">
                                            <span className="material-symbols-outlined text-lg">{row.icon}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-japfa-dark dark:text-white">{row.category}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-sm font-medium text-japfa-gray dark:text-gray-400 text-center">{row.count}</td>
                                <td className="py-4 px-4 text-sm font-bold text-red-500 text-center">{row.impact}</td>
                                <td className="py-4 px-4 text-right">
                                    <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-white/10 text-japfa-dark dark:text-white text-[10px] font-bold rounded-full uppercase">{row.responsible}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>

        {/* Operational Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Today’s Fulfillment Progress */}
            <section className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 flex flex-col h-full">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-japfa-dark dark:text-white">Today's Fulfillment</h2>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                        </div>
                        <p className="text-xs font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-widest mt-1">Live Tracking</p>
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center gap-8 py-2">
                    <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <circle className="stroke-gray-100 dark:stroke-white/5" cx="18" cy="18" r="16" fill="transparent" strokeWidth="4"></circle>
                            <circle className="stroke-japfa-orange" cx="18" cy="18" r="16" fill="transparent" strokeWidth="4" strokeDasharray="75 25" strokeDashoffset="0"></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-japfa-dark dark:text-white">425</span>
                            <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-widest">Total Loads</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 w-full">
                        {[
                            { label: "Completed", percent: "75%", count: "319", color: "bg-japfa-orange" },
                            { label: "In-Transit", percent: "20%", count: "85", color: "bg-slate-700 dark:bg-blue-400" },
                            { label: "Pending", percent: "5%", count: "21", color: "bg-red-500" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                    <span className="text-xs font-bold text-japfa-dark dark:text-white uppercase">{item.label}</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-black text-japfa-dark dark:text-white">{item.percent}</span>
                                    <span className="text-[10px] font-bold text-japfa-gray">{item.count} Units</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Operational Monitoring / Alerts */}
            <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden flex flex-col h-full">
                <div className="px-8 py-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center h-20">
                    <h2 className="text-xl font-bold text-japfa-dark dark:text-white uppercase tracking-tight">Monitoring</h2>
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/20 text-red-600 text-[10px] font-black rounded-full uppercase">4 ACTIVE</span>
                </div>
                <div className="p-6 flex-1 space-y-4 overflow-y-auto max-h-[450px]">
                    {[
                        { title: "Route Congestion", time: "2m ago", desc: "Heavy traffic detected on Jakarta-Cikampek KM 42.", icon: "report", color: "border-red-500" },
                        { title: "Fleet Delay", time: "15m ago", desc: "Unit B-9281-UFA delayed due to severe weather.", icon: "warning", color: "border-orange-500" },
                        { title: "GPS Signal", time: "42m ago", desc: "Loss of signal for 12 units in West Java sector.", icon: "gps_off", color: "border-red-500" },
                        { title: "Cold Chain", time: "1h ago", desc: "Temp spike detected in Reefer-X45 container.", icon: "ac_unit", color: "border-red-500" }
                    ].map((alert, i) => (
                        <div key={i} className={`p-4 bg-gray-50 dark:bg-slate-950 border-l-4 ${alert.color} rounded-r-lg relative`}>
                            <span className="absolute top-3 right-3 text-[10px] font-bold text-japfa-gray">{alert.time}</span>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="material-symbols-outlined text-sm text-red-500">{alert.icon}</span>
                                <h3 className="text-xs font-bold text-japfa-dark dark:text-white uppercase">{alert.title}</h3>
                            </div>
                            <p className="text-[11px] text-japfa-gray dark:text-gray-400 leading-tight">{alert.desc}</p>
                        </div>
                    ))}
                    <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-lg uppercase transition-all shadow-md">
                        Acknowledge All Alerts
                    </button>
                </div>
            </section>
        </div>
    </div>
);

const ReturnContent = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [openActionId, setOpenActionId] = useState<number | null>(null);

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* 1. Top Row: Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 flex flex-col hover:border-japfa-orange transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-wider">Quality Standard Issues</span>
                            <span className="text-[10px] bg-orange-100 dark:bg-orange-500/20 text-japfa-orange px-2 py-0.5 rounded font-bold self-start uppercase">Production</span>
                        </div>
                        <div className="p-2 bg-orange-50 dark:bg-orange-500/10 text-japfa-orange rounded-lg">
                            <span className="material-symbols-outlined text-xl">high_quality</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-3xl font-extrabold text-japfa-dark dark:text-white">12.4K KG</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-japfa-orange">IDR 245.2M</p>
                            <span className="text-[11px] font-semibold text-red-500 bg-red-50 dark:bg-red-500/10 px-1.5 py-0.5 rounded flex items-center">
                                <span className="material-symbols-outlined text-xs mr-0.5">arrow_upward</span>
                                2.4% vs last month
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-japfa-gray dark:text-gray-400 italic border-t border-gray-50 dark:border-white/5 pt-3">Physical damage or contamination</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 flex flex-col hover:border-japfa-navy transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-wider">Mismatched SKU</span>
                            <span className="text-[10px] bg-slate-100 dark:bg-slate-500/20 text-japfa-slate dark:text-japfa-gray px-2 py-0.5 rounded font-bold self-start uppercase">Warehouse</span>
                        </div>
                        <div className="p-2 bg-slate-50 dark:bg-slate-500/10 text-japfa-navy dark:text-blue-400 rounded-lg">
                            <span className="material-symbols-outlined text-xl">category</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-3xl font-extrabold text-japfa-dark dark:text-white">4.2K KG</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-japfa-orange">IDR 84.1M</p>
                            <span className="text-[11px] font-semibold text-green-500 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded flex items-center">
                                <span className="material-symbols-outlined text-xs mr-0.5">arrow_downward</span>
                                0.8% vs last month
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-japfa-gray dark:text-gray-400 italic border-t border-gray-50 dark:border-white/5 pt-3">Incorrect product delivered</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 flex flex-col hover:border-red-500 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-wider">Customer Rejection</span>
                            <span className="text-[10px] bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold self-start uppercase">Transporter</span>
                        </div>
                        <div className="p-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg">
                            <span className="material-symbols-outlined text-xl">person_off</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-3xl font-extrabold text-japfa-dark dark:text-white">1.5K KG</h3>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-japfa-orange">IDR 32.5M</p>
                            <span className="text-[11px] font-semibold text-green-500 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded flex items-center">
                                <span className="material-symbols-outlined text-xs mr-0.5">arrow_downward</span>
                                1.1% vs last month
                            </span>
                        </div>
                    </div>
                    <p className="mt-4 text-xs text-japfa-gray dark:text-gray-400 italic border-t border-gray-50 dark:border-white/5 pt-3">Delivery window or slot missed</p>
                </div>
            </div>

            {/* 2. Middle Section: Donut Chart & Leaderboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
                    <h2 className="text-xl font-bold text-japfa-dark dark:text-white mb-1">Return Causes Distribution</h2>
                    <p className="text-sm text-japfa-gray dark:text-gray-400 font-medium mb-8">Breakdown of return reasons by total weight percentage</p>
                    <div className="flex flex-col items-center">
                        <div className="relative w-56 h-56 mb-8">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                <circle className="stroke-gray-100 dark:stroke-white/5" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="3"></circle>
                                <circle className="stroke-japfa-orange" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="5" strokeDasharray="68 32" strokeDashoffset="0"></circle>
                                <circle className="stroke-japfa-navy dark:stroke-blue-400" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="5" strokeDasharray="23 77" strokeDashoffset="-68"></circle>
                                <circle className="stroke-japfa-gray dark:stroke-gray-600" cx="18" cy="18" r="15.9155" fill="transparent" strokeWidth="5" strokeDasharray="9 91" strokeDashoffset="-91"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-extrabold text-japfa-dark dark:text-white">18.1K</span>
                                <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-400 uppercase tracking-widest mt-1">Total KG</span>
                            </div>
                        </div>
                        <div className="w-full max-w-sm space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-950 rounded-lg border border-gray-100 dark:border-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-japfa-orange"></span>
                                    <span className="text-sm font-semibold text-japfa-gray dark:text-gray-400">Quality Issues</span>
                                </div>
                                <span className="text-md font-bold text-japfa-dark dark:text-white">68.5%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-950 rounded-lg border border-gray-100 dark:border-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-japfa-navy dark:bg-blue-400"></span>
                                    <span className="text-sm font-semibold text-japfa-gray dark:text-gray-400">Mismatched SKU</span>
                                </div>
                                <span className="text-md font-bold text-japfa-dark dark:text-white">23.1%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-950 rounded-lg border border-gray-100 dark:border-white/5 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="w-3 h-3 rounded-full bg-japfa-gray dark:bg-gray-600"></span>
                                    <span className="text-sm font-semibold text-japfa-gray dark:text-gray-400">Cust. Rejection</span>
                                </div>
                                <span className="text-md font-bold text-japfa-dark dark:text-white">8.4%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
                    <h2 className="text-xl font-bold text-japfa-dark dark:text-white mb-1">Fleet Performance</h2>
                    <p className="text-sm text-japfa-gray dark:text-gray-400 font-medium mb-6">Top vehicles by incident count and weight impact</p>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {[
                            { plate: "B 9044 JXS", count: 14, weight: "1.2K KG", trend: "up", percent: "+5%" },
                            { plate: "B 9513 JXS", count: 11, weight: "940 KG", trend: "down", percent: "-2%" },
                            { plate: "B 9514 JXS", count: 8, weight: "650 KG", trend: "flat", percent: "Stable" },
                            { plate: "B 9517 JXS", count: 6, weight: "420 KG", trend: "down", percent: "-8%" },
                            { plate: "B 9518 JXS", count: 5, weight: "380 KG", trend: "up", percent: "+1%" }
                        ].map((fleet, idx) => (
                            <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${idx === 0 ? 'bg-orange-50/50 dark:bg-orange-500/5 border-orange-100 dark:border-orange-500/20' : 'bg-white dark:bg-slate-950 border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/20'}`}>
                                <div className="flex items-center gap-4">
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-japfa-orange text-white' : 'bg-gray-100 dark:bg-white/10 text-japfa-gray dark:text-gray-400'}`}>{idx + 1}</span>
                                    <div>
                                        <p className="font-bold text-japfa-dark dark:text-white text-lg tracking-tight">{fleet.plate}</p>
                                        <p className="text-[11px] text-japfa-gray dark:text-gray-500 uppercase font-bold">{fleet.count} Incidents This Month</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-extrabold text-japfa-dark dark:text-white">{fleet.weight}</p>
                                    <p className={`text-[10px] font-bold flex items-center justify-end gap-1 ${fleet.trend === 'up' ? 'text-red-500' : fleet.trend === 'down' ? 'text-green-500' : 'text-japfa-gray dark:text-gray-500'}`}>
                                        <span className="material-symbols-outlined text-xs">
                                            {fleet.trend === 'up' ? 'trending_up' : fleet.trend === 'down' ? 'trending_down' : 'trending_flat'}
                                        </span>
                                        {fleet.percent} vs last month
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Bottom Section: Historical Return Audit Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-bold text-japfa-dark dark:text-white">Historical Return Audit Table</h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium text-japfa-gray dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 transition-all active:scale-95 cursor-pointer">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                                Filter
                            </button>
                            {isFilterOpen && (
                                <div className="absolute right-0 bottom-full mb-2 w-48 bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 rounded-xl shadow-lg z-20 overflow-hidden">
                                    <div className="p-3 border-b border-gray-100 dark:border-white/10">
                                        <p className="text-xs font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-wider">Filter By Status</p>
                                    </div>
                                    <div className="p-2 flex flex-col gap-1">
                                        <label className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                                            <input type="checkbox" className="rounded text-japfa-orange focus:ring-japfa-orange" />
                                            <span className="text-sm dark:text-gray-300">Resolved</span>
                                        </label>
                                        <label className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                                            <input type="checkbox" className="rounded text-japfa-orange focus:ring-japfa-orange" />
                                            <span className="text-sm dark:text-gray-300">Investigating</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                        <button onClick={() => alert("Export functionality coming soon")} className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-medium text-japfa-gray dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 transition-all active:scale-95 cursor-pointer">
                            <span className="material-symbols-outlined text-lg">download</span>
                            Export
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto text-sm">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10 transition-colors">
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest">Date</th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest">Customer</th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest">Batch ID</th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest">Product</th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest">Weight</th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest">Reason</th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest text-center">Status</th>
                                <th className="py-4 px-6 text-[10px] font-bold text-japfa-orange uppercase tracking-widest text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5 border-b border-gray-100 dark:border-white/10">
                            {[
                                { date: "25 Oct 2023", customer: "Superindo JKT-12", id: "DO-2023-9021", product: "Chicken Fillet 500g", weight: "450 KG", reason: "Temperature Breach", status: "Resolved", color: "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400" },
                                { date: "24 Oct 2023", customer: "Lotte Mart Solo", id: "DO-2023-8842", product: "Whole Chicken Grade A", weight: "1,200 KG", reason: "Damaged Packaging", status: "Investigating", color: "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400" }
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="py-4 px-6 text-japfa-gray dark:text-gray-400 group-hover:text-japfa-dark dark:group-hover:text-white transition-colors">{row.date}</td>
                                    <td className="py-4 px-6 font-semibold text-japfa-dark dark:text-white">{row.customer}</td>
                                    <td className="py-4 px-6 font-mono text-xs text-japfa-gray dark:text-gray-500">{row.id}</td>
                                    <td className="py-4 px-6 text-japfa-dark dark:text-gray-300">{row.product}</td>
                                    <td className="py-4 px-6 font-extrabold text-japfa-dark dark:text-white text-md">{row.weight}</td>
                                    <td className="py-4 px-6 text-japfa-gray dark:text-gray-400">{row.reason}</td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${row.color}`}>{row.status}</span>
                                    </td>
                                    <td className="py-4 px-6 text-right relative">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === idx ? null : idx); }}
                                            className="px-3 py-1.5 bg-japfa-orange/10 dark:bg-japfa-orange/20 text-japfa-orange text-xs font-bold rounded hover:bg-japfa-orange hover:text-white transition-all active:scale-95 cursor-pointer flex items-center gap-1 ml-auto"
                                        >
                                            Details <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
                                        </button>
                                        {openActionId === idx && (
                                            <div className="absolute right-6 top-10 mt-1 w-48 bg-white dark:bg-slate-900 border border-gray-100 dark:border-white/10 rounded-xl shadow-lg z-20 overflow-hidden text-left">
                                                <div className="p-1" role="menu">
                                                    <button onClick={(e) => { e.stopPropagation(); alert('View Report'); setOpenActionId(null); }} className="w-full text-left px-4 py-2 text-sm text-japfa-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 transition-colors">
                                                        <span className="material-symbols-outlined text-[16px]">visibility</span> View Report
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); alert('Download PDF'); setOpenActionId(null); }} className="w-full text-left px-4 py-2 text-sm text-japfa-dark dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 transition-colors">
                                                        <span className="material-symbols-outlined text-[16px]">download</span> Download PDF
                                                    </button>
                                                    <button onClick={(e) => { e.stopPropagation(); alert('Process Return'); setOpenActionId(null); }} className="w-full text-left px-4 py-2 text-sm text-japfa-orange hover:bg-orange-50 dark:hover:bg-japfa-orange/10 flex items-center gap-2 transition-colors">
                                                        <span className="material-symbols-outlined text-[16px]">assignment_return</span> Process Return
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const EfficiencyContent = () => (
    <div className="space-y-8 animate-fadeIn">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
                label="Total Shipments" value="1,240" change="+12%" trend="up" icon="local_shipping" bgColor="bg-orange-50" iconColor="text-japfa-orange" subtext="vs. last month"
            />
            <KPICard
                label="Avg. Lead Time" value="4.2h" change="-0.3d" trend="down" icon="schedule" bgColor="bg-slate-50" iconColor="text-japfa-navy" subtext="faster processing"
            />
            <KPICard
                label="Load Factor %" value="85%" change="+5.0%" trend="up" icon="inventory_2" bgColor="bg-orange-50" iconColor="text-japfa-orange" subtext="capacity utilization"
            />
            <KPICard
                label="Cost per KG" value="Rp 4.8k" change="+4.3%" trend="up" icon="payments" bgColor="bg-red-50" iconColor="text-red-600" subtext="+2.1% vs budget"
            />
        </div>

        {/* Actual vs. Target Load Factor Chart */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-white/10">
            <div className="flex flex-col md:flex-row items-start justify-between mb-10 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-japfa-dark dark:text-white">Actual vs. Target Load Factor</h3>
                    <p className="text-sm text-japfa-gray dark:text-gray-400 font-medium mt-1">Comparison of daily actual load against established performance targets</p>
                </div>
                <div className="flex flex-wrap gap-6 items-center">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-1 bg-japfa-orange rounded-full"></span>
                        <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-wider">Actual Load Factor</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-0.5 bg-japfa-navy dark:bg-blue-400"></span>
                        <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-wider">Historical Baseline</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 border-t-2 border-dashed border-red-500 h-0"></span>
                        <span className="text-[10px] font-bold text-japfa-gray dark:text-gray-500 uppercase tracking-wider">90% Target</span>
                    </div>
                </div>
            </div>

            <div className="relative flex w-full h-[320px]">
                {/* Y-Axis Labels */}
                <div className="flex flex-col justify-between text-[10px] font-bold text-gray-400 dark:text-gray-600 pr-6 pb-8 uppercase tracking-widest h-full">
                    <span>100%</span><span>80%</span><span>60%</span><span>40%</span><span>20%</span><span>0%</span>
                </div>
                {/* Chart Content Area */}
                <div className="flex-1 relative h-full">
                    {/* Chart Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 h-full">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="border-t border-gray-100 dark:border-white/5 w-full h-0"></div>
                        ))}
                    </div>
                    {/* Target Benchmark Line (90%) */}
                    <div className="absolute inset-x-0 top-[10%] border-t-2 border-dashed border-red-500/80 z-20 pointer-events-none">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 px-2">
                            <span className="text-red-600 text-[9px] font-black tracking-widest uppercase whitespace-nowrap">90% CAPACITY TARGET</span>
                        </div>
                    </div>
                    {/* SVG Chart */}
                    <svg className="absolute inset-0 w-full h-[calc(100%-32px)] overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 100">
                        <defs>
                            <linearGradient id="orangeGradientEfficiency" x1="0%" x2="0%" y1="0%" y2="100%">
                                <stop offset="0%" stopColor="#F28C38" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#F28C38" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Historical Baseline */}
                        <path d="M 0 45 L 166.6 25 L 333.3 35 L 500 15 L 666.6 20 L 833.3 50 L 1000 45" fill="none" stroke="currentColor" className="text-japfa-navy dark:text-blue-400" strokeDasharray="4 2" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                        {/* Actual Area Fill */}
                        <path d="M 0 55 L 166.6 35 L 333.3 45 L 500 10 L 666.6 25 L 833.3 75 L 1000 65 V 100 H 0 Z" fill="url(#orangeGradientEfficiency)" />
                        {/* Actual Line */}
                        <path d="M 0 55 L 166.6 35 L 333.3 45 L 500 10 L 666.6 25 L 833.3 75 L 1000 65" fill="none" stroke="#F28C38" strokeLinejoin="round" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        {/* Markers */}
                        <g fill="#F28C38">
                            {[
                                { x: 0, y: 55 }, { x: 166.6, y: 35 }, { x: 333.3, y: 45 },
                                { x: 500, y: 10 }, { x: 666.6, y: 25 }, { x: 833.3, y: 75 }, { x: 1000, y: 65 }
                            ].map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r="4" stroke="white" strokeWidth="1.5" />
                            ))}
                        </g>
                    </svg>
                    {/* X-Axis Labels */}
                    <div className="absolute bottom-0 inset-x-0 flex justify-between">
                        {["Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23", "Oct 24", "Oct 25"].map((d, i) => (
                            <span key={i} className="text-[10px] text-japfa-gray dark:text-gray-500 font-bold uppercase w-0 text-center whitespace-nowrap" style={{ marginLeft: i === 0 ? '0' : '16.6%' }}>{d}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Operational Excellence Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-white/10 overflow-hidden mt-4">
            <div className="p-8 border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-japfa-dark dark:text-white uppercase tracking-tight">Operational Excellence</h3>
                    <p className="text-sm text-japfa-gray dark:text-gray-400 font-medium mt-1">Regional performance and efficiency tracking</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
                        <input className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:ring-1 focus:ring-japfa-orange focus:border-japfa-orange outline-none w-64 text-japfa-dark dark:text-white" placeholder="Search route or hub..." type="text" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-bold text-japfa-gray dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <Download className="w-4 h-4" />
                        EXPORT
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto text-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-japfa-orange/5 dark:bg-japfa-orange/10 border-b border-japfa-orange/10">
                            <th className="px-8 py-4 text-[10px] font-bold text-japfa-orange uppercase tracking-widest">Route / Region</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-japfa-orange uppercase tracking-widest text-center">OTIF %</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-japfa-orange uppercase tracking-widest text-center">Avg. Lead Time</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-japfa-orange uppercase tracking-widest text-center">Load Factor</th>
                            <th className="px-8 py-4 text-[10px] font-bold text-japfa-orange uppercase tracking-widest text-right">SLA Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                        {[
                            { route: "Cikupa → Bandung", region: "West Java Hub", otif: "92.4%", lead: "3.2h", factor: "88%", status: "Optimal", color: "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400" },
                            { route: "Bekasi → Surabaya", region: "Main Hub Transit", otif: "82.1%", lead: "18.2h", factor: "74%", status: "Critical Delay", color: "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400" },
                            { route: "Tangerang → Serang", region: "Regional Supply", otif: "89.5%", lead: "4.5h", factor: "52%", status: "Underloaded", color: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400" },
                            { route: "Semarang → Solo", region: "Central Java", otif: "87.8%", lead: "12.5h", factor: "82%", status: "On Track", color: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400" }
                        ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-japfa-dark dark:text-white group-hover:text-japfa-orange transition-colors">{row.route}</span>
                                        <span className="text-[10px] text-japfa-gray dark:text-gray-500 uppercase font-bold tracking-tight">{row.region}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-center font-extrabold text-japfa-dark dark:text-white uppercase">{row.otif}</td>
                                <td className="px-8 py-5 text-center text-japfa-gray dark:text-gray-400 font-medium">{row.lead}</td>
                                <td className="px-8 py-5 text-center font-extrabold text-japfa-orange">{row.factor}</td>
                                <td className="px-8 py-5 text-right">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${row.color}`}>{row.status}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

export default ManagerLogistik;

