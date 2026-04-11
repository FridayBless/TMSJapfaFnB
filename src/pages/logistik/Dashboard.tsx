import React, { useState } from "react";
import Header from "../../components/Header";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 🌟 INJEKSI CSS ANIMASI KEDIP (PULSE & GLOW)
const globalDashboardStyles = `
    @keyframes pulseGlow {
        0% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.7); transform: scale(1); }
        70% { box-shadow: 0 0 0 15px rgba(14, 165, 233, 0); transform: scale(1.1); }
        100% { box-shadow: 0 0 0 0 rgba(14, 165, 233, 0); transform: scale(1); }
    }
    @keyframes warningGlow {
        0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); transform: scale(1); }
        70% { box-shadow: 0 0 0 20px rgba(249, 115, 22, 0); transform: scale(1.15); }
        100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); transform: scale(1); }
    }
    .db-marker {
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.4);
    }
    .db-marker-normal {
        width: 32px; height: 32px;
        background-color: #0ea5e9;
        animation: pulseGlow 2s infinite;
    }
    .db-marker-warning {
        width: 32px; height: 32px;
        background-color: #f97316;
        animation: warningGlow 1.5s infinite;
    }
    .db-marker-depo {
        width: 40px; height: 40px;
        background-color: #e11d48;
        font-size: 20px;
        border-width: 4px;
    }
`;

const createDashboardIcon = (iconStr: string, type: 'normal' | 'warning' | 'depo') => {
    const size = type === 'depo' ? 40 : 32;
    return new L.DivIcon({
        className: "custom-leaflet-icon",
        html: `<style>${globalDashboardStyles}</style><div class="db-marker db-marker-${type}">${iconStr}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
    });
};

// 🌟 KOMPONEN SAKTI BUAT BIKIN EFEK KAMERA TERBANG
const MapController = ({ center }: { center: [number, number] | null }) => {
    const map = useMap();
    React.useEffect(() => {
        if (center) {
            map.flyTo(center, 14, { duration: 1.5 });
        }
    }, [center, map]);
    return null;
};

export default function Dashboard() {
    // Leaflet itu pakenya [Latitude, Longitude] ya Bos, kebalikan dari SDK bawaan TomTom!
    const gudangLatLon: [number, number] = [-6.207356, 106.479163];

    const activeTrucks = [
        { id: "B 9044 JXS", driver: "Budi Santoso", lat: -6.228222, lon: 106.828697, status: "Menuju D'Prima Hotel", isDelayed: false },
        { id: "B 9514 JXS", driver: "Joko Widodo", lat: -6.250000, lon: 106.700000, status: "Rest Area KM 13", isDelayed: false },
        { id: "B 9517 JXS", driver: "Rahmat Hidayat", lat: -6.300000, lon: 106.800000, status: "Terjebak Macet (Depok)", isDelayed: true },
    ];

    // State buat ngontrol posisi kamera
    const [flyToLocation, setFlyToLocation] = useState<[number, number] | null>(null);

    const handleFlyTo = (lat: number, lon: number) => {
        setFlyToLocation([lat, lon]);
    };

    return (
        <>
            <Header title="Daily Logistics KPI Dashboard" />

            <div className="p-4 md:p-8 flex flex-col gap-6 md:gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">OTIF Rate</span>
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <span className="material-symbols-outlined">timer</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">94.2%</h3>
                            <span className="text-red-500 dark:text-red-400 text-sm font-bold flex items-center">
                                <span className="material-symbols-outlined text-xs">arrow_downward</span> 0.8%
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">vs. last week target (95%)</p>
                    </div>

                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Product Rejection</span>
                            <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-500 dark:text-red-400">
                                <span className="material-symbols-outlined">error</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">1.2%</h3>
                            <span className="text-red-500 dark:text-red-400 text-sm font-bold flex items-center">
                                <span className="material-symbols-outlined text-xs">arrow_downward</span> 0.4%
                            </span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Reduction in returns</p>
                    </div>

                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Shipments</span>
                            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-500 dark:text-blue-400">
                                <span className="material-symbols-outlined">package</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">214</h3>
                            <span className="text-slate-400 text-sm font-medium uppercase">orders</span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">+12 since last update</p>
                    </div>

                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg. Loading Time</span>
                            <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-500 dark:text-orange-400">
                                <span className="material-symbols-outlined">forklift</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">35 <span className="text-xl">mins</span></h3>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Optimizing loading bay 4</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="w-full lg:w-[70%] bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hourly Delivery Volume</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Peak: 240 orders/hr at 18:00</p>
                            </div>
                            <select className="text-xs font-bold bg-slate-50 dark:bg-[#222] border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg focus:ring-primary p-2 outline-none">
                                <option>Last 24 Hours</option>
                                <option>Last 7 Days</option>
                            </select>
                        </div>
                        <div className="h-[250px] flex items-end gap-4 px-4">
                            <div className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 rounded-t-md transition-all relative" style={{ height: "40%" }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">96</div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">08:00</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 rounded-t-md transition-all relative" style={{ height: "65%" }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">156</div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">10:00</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 rounded-t-md transition-all relative" style={{ height: "50%" }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">120</div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">12:00</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 rounded-t-md transition-all relative" style={{ height: "35%" }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">84</div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">14:00</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 rounded-t-md transition-all relative" style={{ height: "45%" }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">108</div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">16:00</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-primary rounded-t-md transition-all relative" style={{ height: "100%" }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">240</div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-900 dark:text-white">18:00</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 rounded-t-md transition-all relative" style={{ height: "30%" }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">72</div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400">20:00</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[30%] bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col transition-colors">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Fleet Utilization</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Daily average across 450 vehicles</p>
                        <div className="relative flex-1 flex items-center justify-center">
                            <div className="size-48 rounded-full border-[12px] border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full border-[12px] border-primary border-r-transparent border-b-transparent rotate-[45deg]"></div>
                                <span className="text-4xl font-black text-slate-900 dark:text-white">100%</span>
                                <span className="text-xs font-bold text-primary uppercase tracking-widest mt-1">Full Capacity</span>
                            </div>
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500 dark:text-slate-400">Active Trucks</span>
                                <span className="font-bold text-slate-900 dark:text-white">7 Base + ON CALL</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: "100%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Top Rejection Reasons</h3>
                            <span className="text-xs text-slate-400 font-medium">Month to Date</span>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Damaged Goods</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">60%</span>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500" style={{ width: "60%" }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Wrong Item</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">25%</span>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-400" style={{ width: "25%" }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Customer Not Home</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">15%</span>
                                </div>
                                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-400 dark:bg-slate-600" style={{ width: "15%" }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[320px] transition-colors">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-[#222]/50 rounded-t-xl">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-time Alerts</h3>
                            <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-black rounded uppercase">Live</span>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-2">
                            <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-500/10 border-l-4 border-primary flex gap-4">
                                <span className="material-symbols-outlined text-primary">warning</span>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">B 9517 JXS Delayed</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">Heavy traffic detected in Bogor/Depok zone. ETA +45m.</p>
                                    <span className="text-[10px] text-slate-400 mt-1 block">2 mins ago</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-4 border-l-4 border-transparent">
                                <span className="material-symbols-outlined text-green-500">check_circle</span>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">OTIF Target Reached</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">Serpong zone has reached the daily target of 94% OTIF.</p>
                                    <span className="text-[10px] text-slate-400 mt-1 block">15 mins ago</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-4 border-l-4 border-transparent">
                                <span className="material-symbols-outlined text-blue-500">info</span>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">New Driver Assigned</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">Eko Prasetyo has been assigned to ON CALL 1 truck.</p>
                                    <span className="text-[10px] text-slate-400 mt-1 block">45 mins ago</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex gap-4 border-l-4 border-transparent">
                                <span className="material-symbols-outlined text-slate-400">speed</span>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Route Re-optimized</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400">Bekasi/Cikarang route optimized saving 12 KM total distance.</p>
                                    <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================================================= */}
                {/* 🌟 FITUR BARU: LIVE TRACKING MAP FULL SCREEN HEIGHT */}
                {/* ========================================================================= */}
                <div className="mt-4 bg-white dark:bg-[#1a1a1a] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[85vh] min-h-[600px]">
                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-[#222]/50 shrink-0">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </span>
                                Live Fleet Tracking
                            </h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">Real-time GPS positioning from driver E-POD devices.</p>
                        </div>

                        <div className="flex gap-2 flex-wrap justify-end max-w-[50%]">
                            {activeTrucks.map((truck, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleFlyTo(truck.lat, truck.lon)}
                                    className={`px-3 py-1.5 bg-white dark:bg-[#111] border rounded-lg text-xs font-bold transition-all whitespace-nowrap shadow-sm hover:-translate-y-0.5
                                        ${truck.isDelayed
                                            ? 'border-orange-200 text-orange-600 hover:bg-orange-50 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-900/30'
                                            : 'border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-900/30'
                                        }
                                    `}
                                >
                                    {truck.isDelayed ? '⚠️ ' : '🚚 '}{truck.id}
                                </button>
                            ))}
                            <button
                                onClick={() => handleFlyTo(gudangLatLon[0], gudangLatLon[1])}
                                className="px-3 py-1.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-lg text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-all whitespace-nowrap shadow-sm hover:-translate-y-0.5"
                            >
                                🏢 DEPO CIKUPA
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 relative bg-slate-100 dark:bg-[#0a0a0a]">
                        <MapContainer
                            center={gudangLatLon}
                            zoom={10}
                            style={{ height: '100%', width: '100%', zIndex: 0 }}
                            whenReady={() => { setTimeout(() => window.dispatchEvent(new Event('resize')), 400); }}
                        >
                            <MapController center={flyToLocation} />
                            <TileLayer attribution='&copy; TomTom' url="https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=xUy50YsjmbRexLalxX3ThDpmC1lOzElP" />

                            {/* MARKER DEPO */}
                            <Marker position={gudangLatLon} icon={createDashboardIcon('🏢', 'depo')}>
                                <Tooltip direction="top" offset={[0, -20]} opacity={1}><b>DEPO JAPFA CIKUPA</b></Tooltip>
                                <Popup>
                                    <div className="p-1 text-center">
                                        <b className="text-rose-600 text-base block mb-1">🏢 DEPO JAPFA CIKUPA</b>
                                        <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded">Pusat Distribusi</span>
                                    </div>
                                </Popup>
                            </Marker>

                            {/* MARKER TRUK AKTIF */}
                            {activeTrucks.map((truck, idx) => (
                                <Marker
                                    key={idx}
                                    position={[truck.lat, truck.lon]}
                                    icon={createDashboardIcon('🚚', truck.isDelayed ? 'warning' : 'normal')}
                                    zIndexOffset={truck.isDelayed ? 9999 : 500}
                                >
                                    <Tooltip direction="top" offset={[0, -16]} opacity={1}><b>{truck.id}</b> - {truck.status}</Tooltip>
                                    <Popup>
                                        <div className="p-1 min-w-[180px]">
                                            <b className={`text-base flex items-center gap-1 ${truck.isDelayed ? 'text-orange-600' : 'text-blue-600'}`}>
                                                🚚 {truck.id} {truck.isDelayed && '⚠️'}
                                            </b>
                                            <div className="border-b border-slate-200 dark:border-slate-700 my-2"></div>
                                            <span className="text-xs text-slate-500 block mb-2">Supir: <b className="text-slate-800">{truck.driver}</b></span>
                                            <span className={`text-[10px] font-black px-2 py-1 rounded inline-block ${truck.isDelayed ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                                                {truck.status}
                                            </span>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>

            </div>
        </>
    );
}