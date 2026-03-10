
import { useEffect } from 'react';
import Header from "../../components/Header";
import { useApi } from '../../hooks/useApi';
import { API_ENDPOINTS } from '../../config/api';

interface KPISummary {
    otifRate: string;
    fillRate: string;
    loadFactor: string;
    totalShipments: number;
    avgLoadingTime: string;
}

interface FleetUtilization {
    totalTrucks: number;
    activeTrucks: number;
    utilizationRate: string;
}

interface DeliveryVolume {
    hour: string;
    orders: number;
}

interface RejectionStat {
    return_reason: string;
    percentage: number;
}

interface Alert {
    id: number;
    type: string;
    title: string;
    message: string;
    created_at: string;
}

export default function Dashboard() {
    // API Hooks
    const { data: summary, loading: summaryLoading, execute: fetchSummary } = useApi<{ data: KPISummary }>(`${API_ENDPOINTS.ANALYTICS}/kpi-summary`);
    const { data: utilization, loading: utilizationLoading, execute: fetchUtilization } = useApi<{ data: FleetUtilization }>(`${API_ENDPOINTS.ANALYTICS}/fleet-utilization`);
    const { data: volume, loading: volumeLoading, execute: fetchVolume } = useApi<{ data: DeliveryVolume[] }>(`${API_ENDPOINTS.ANALYTICS}/delivery-volume`);
    const { data: rejections, loading: rejectionsLoading, execute: fetchRejections } = useApi<{ data: RejectionStat[] }>(`${API_ENDPOINTS.ANALYTICS}/rejections`);
    const { data: alerts, loading: alertsLoading, execute: fetchAlerts } = useApi<{ data: Alert[] }>(`${API_ENDPOINTS.MONITORING}/alerts`);

    useEffect(() => {
        fetchSummary();
        fetchUtilization();
        fetchVolume();
        fetchRejections();
        fetchAlerts();
    }, [fetchSummary, fetchUtilization, fetchVolume, fetchRejections, fetchAlerts]);

    const kpiData = summary?.data;
    const fleetData = utilization?.data;
    const volumeData = volume?.data || [];
    const rejectionData = rejections?.data || [];
    const alertData = alerts?.data || [];

    return (
        <div className="flex-1 overflow-auto bg-slate-50 dark:bg-[#0A0A0A]">
            <Header title="Daily Logistics KPI Dashboard" />

            {/* Content Body */}
            <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8">
                {/* KPI Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">OTIF Rate</span>
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">timer</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{summaryLoading ? '...' : kpiData?.otifRate || '0%'}</h3>
                            <span className="text-emerald-500 dark:text-emerald-400 text-sm font-bold flex items-center">
                                <span className="material-symbols-outlined text-xs">arrow_upward</span> 0.5%
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">vs. last week target (95%)</p>
                    </div>

                    <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Product Rejection</span>
                            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-500 dark:text-red-400">
                                <span className="material-symbols-outlined">error</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">1.2%</h3>
                            <span className="text-emerald-500 dark:text-emerald-400 text-sm font-bold flex items-center">
                                <span className="material-symbols-outlined text-xs">arrow_downward</span> 0.4%
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Reduction in returns</p>
                    </div>

                    <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Shipments</span>
                            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-500 dark:text-blue-400">
                                <span className="material-symbols-outlined">package</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{summaryLoading ? '...' : kpiData?.totalShipments || 0}</h3>
                            <span className="text-slate-400 text-sm font-medium uppercase ml-1">orders</span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">+12 since last update</p>
                    </div>

                    <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg. Loading Time</span>
                            <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-500 dark:text-orange-400">
                                <span className="material-symbols-outlined">forklift</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{summaryLoading ? '...' : kpiData?.avgLoadingTime || '0 mins'}</h3>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Optimizing loading bay 4</p>
                    </div>
                </div>

                {/* Middle Section Charts */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Large Bar Chart */}
                    <div className="w-full lg:w-[70%] bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm transition-colors">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hourly Delivery Volume</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Real-time throughput analysis</p>
                            </div>
                            <select className="text-xs font-bold bg-slate-50 dark:bg-[#222] border-slate-200 dark:border-[#333] text-slate-600 dark:text-slate-300 rounded-lg focus:ring-primary p-2 outline-none">
                                <option>Last 24 Hours</option>
                                <option>Last 7 Days</option>
                            </select>
                        </div>
                        <div className="h-[250px] flex items-end gap-4 px-4">
                            {volumeLoading ? (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">Loading chart data...</div>
                            ) : volumeData.length === 0 ? (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">No volume data available.</div>
                            ) : (
                                volumeData.map((d, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                        <div
                                            className={`w-full ${d.orders > 200 ? 'bg-primary' : 'bg-slate-100 dark:bg-[#222] group-hover:bg-primary/20'} rounded-t-md transition-all relative`}
                                            style={{ height: `${(d.orders / 300) * 100}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">{d.orders}</div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">{d.hour}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Circular Gauge Chart */}
                    <div className="w-full lg:w-[30%] bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm flex flex-col transition-colors">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Fleet Utilization</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Daily average utilization</p>
                        <div className="relative flex-1 flex items-center justify-center">
                            {utilizationLoading ? (
                                <span className="text-slate-400">Loading...</span>
                            ) : (
                                <div className="size-48 rounded-full border-[12px] border-slate-100 dark:border-[#222] flex flex-col items-center justify-center relative">
                                    <svg className="absolute inset-0 size-full -rotate-90">
                                        <circle
                                            cx="96" cy="96" r="84"
                                            fill="none" strokeWidth="12"
                                            className="stroke-primary"
                                            strokeDasharray={`${(parseInt(fleetData?.utilizationRate || '0') / 100) * 527} 527`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="text-4xl font-black text-slate-900 dark:text-white">{fleetData?.utilizationRate || '0%'}</span>
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest mt-1">Utilization</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500 dark:text-slate-400">Active Trucks</span>
                                <span className="font-bold text-slate-900 dark:text-white">{fleetData?.activeTrucks || 0} / {fleetData?.totalTrucks || 0}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-[#222] rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: fleetData?.utilizationRate || '0%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Rejection Reasons */}
                    <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Rejection Reasons</h3>
                            <span className="text-xs text-slate-400 font-medium">Month to Date</span>
                        </div>
                        <div className="space-y-6">
                            {rejectionsLoading ? (
                                <p className="text-slate-500 text-center py-8">Loading rejection stats...</p>
                            ) : rejectionData.length === 0 ? (
                                <p className="text-slate-500 text-center py-8">No rejection data available.</p>
                            ) : (
                                rejectionData.map((r, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{r.return_reason}</span>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{r.percentage}%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 dark:bg-[#333] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${i === 0 ? 'bg-red-500' : i === 1 ? 'bg-orange-400' : 'bg-slate-400'}`}
                                                style={{ width: `${r.percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Real-time Alerts Feed */}
                    <div className="bg-white dark:bg-[#111111] rounded-xl border border-slate-200 dark:border-[#333] shadow-sm flex flex-col h-[320px] transition-colors overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-[#333] flex justify-between items-center bg-slate-50/50 dark:bg-[#1A1A1A]/50 rounded-t-xl">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-time Alerts</h3>
                            <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded uppercase">Live</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {alertsLoading ? (
                                <p className="text-slate-500 text-center py-8">Loading alerts...</p>
                            ) : alertData.length === 0 ? (
                                <p className="text-slate-500 text-center py-8 text-sm italic">No recent alerts.</p>
                            ) : (
                                alertData.map((alert, i) => (
                                    <div key={i} className={`p-4 rounded-lg flex gap-4 border-l-4 ${alert.type === 'warning' ? 'bg-orange-50 dark:bg-orange-500/10 border-primary' :
                                            alert.type === 'success' ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500' :
                                                'bg-blue-50 dark:bg-blue-500/10 border-blue-500'
                                        }`}>
                                        <span className={`material-symbols-outlined ${alert.type === 'warning' ? 'text-primary' :
                                                alert.type === 'success' ? 'text-emerald-500' :
                                                    'text-blue-500'
                                            }`}>
                                            {alert.type === 'warning' ? 'warning' : alert.type === 'success' ? 'check_circle' : 'info'}
                                        </span>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{alert.title}</p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">{alert.message}</p>
                                            <span className="text-[10px] text-slate-400 mt-1 block">
                                                {new Date(alert.created_at).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
