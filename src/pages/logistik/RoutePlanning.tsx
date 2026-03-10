import { useState, useRef } from "react";
import Header from "../../components/Header";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useApi } from "../../hooks/useApi";
import { API_ENDPOINTS } from "../../config/api";
import { useEffect } from "react";

// Fix default icon issues in Webpack/Vite
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});




const Truck3D = ({
    plateNumber,
    driverName,
    truckType,
    zone,
    colorHex,
    percent,
    outerText,
    loadKg,
    colorClass,
    isSelected
}: any) => {
    return (
        <div className={`bg-white dark:bg-[#1F1F1F] p-4 rounded-xl shadow-sm transition-all cursor-pointer ${isSelected ? 'border-2 border-primary ring-4 ring-primary/5 shadow-md' : 'border border-slate-200 dark:border-[#333] hover:border-primary/50'}`}>
            <div className="flex justify-between items-start mb-3">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">{plateNumber}</span>
                        {isSelected && <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">SELECTED</span>}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{driverName} | {truckType}</p>
                </div>
                <span className="text-xs font-bold text-slate-400 dark:text-slate-300">ZONE: {zone}</span>
            </div>

            <div className="mt-4 bg-[#111111] rounded-2xl p-6 border border-[#333] shadow-[0_4px_20px_rgba(0,0,0,0.5)] relative overflow-hidden">
                {/* Background accents */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${colorClass}-500/10 blur-[40px] rounded-full pointer-events-none`}></div>

                <div className="flex justify-between items-baseline mb-3 relative z-10">
                    <span className="text-sm font-black text-white uppercase tracking-wider">Load Factor 3D</span>
                    <span className={`text-[10px] font-black text-${colorClass}-400 bg-${colorClass}-400/10 px-2 py-1 rounded border border-${colorClass}-400/20 uppercase shadow-[0_0_10px_rgba(0,0,0,0.2)]`}>{outerText}</span>
                </div>

                <div className="flex justify-between text-xs mb-1 relative z-10">
                    <span className="text-slate-400 font-medium uppercase">Current Load</span>
                    <span className="font-bold text-white">{loadKg}</span>
                </div>

                {/* 3D Isometric Truck View */}
                <div className="relative w-full h-48 flex items-center justify-center mt-6 overflow-visible scale-110" style={{ perspective: '1200px' }}>
                    <div style={{ transform: 'rotateX(60deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }} className="w-[240px] h-[72px] relative flex transition-all duration-700 hover:scale-105 cursor-pointer">

                        {/* TRAILER */}
                        <div className="absolute right-0 top-0 w-[180px] h-[72px]" style={{ transformStyle: 'preserve-3d' }}>
                            {/* Floor */}
                            <div className="absolute inset-0 bg-slate-900 border-[2px] border-slate-700" style={{ transform: 'translateZ(10px)' }}></div>

                            {/* Top Face */}
                            <div className="absolute inset-0 border-[3px] border-slate-200" style={{ transform: 'translateZ(80px)', background: `linear-gradient(to right, ${colorHex} 0%, ${colorHex} ${percent}%, #f1f5f9 ${percent}%, #f1f5f9 100%)` }}>
                                <div className="absolute inset-x-0 top-0 h-full opacity-30" style={{ width: `${percent}%`, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.7) 10px, rgba(255,255,255,0.7) 20px)' }}></div>
                            </div>

                            {/* Right Face (+Y) facing user mostly */}
                            <div className="absolute bottom-0 left-0 w-full h-[70px] origin-bottom border-[3px] border-r-0 border-slate-200 flex items-center shadow-[-5px_5px_20px_rgba(0,0,0,0.5)]" style={{ transform: 'translateZ(10px) rotateX(-90deg)', background: `linear-gradient(to right, ${colorHex} 0%, ${colorHex} ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)` }}>
                                <div className="absolute inset-y-0 left-0 opacity-30" style={{ width: `${percent}%`, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.7) 10px, rgba(255,255,255,0.7) 20px)' }}></div>
                                <span className="text-white font-black text-4xl drop-shadow-md absolute" style={{ left: `calc(${percent}% / 2)`, transform: 'translate(-50%, 0)' }}>{percent}%</span>
                            </div>

                            {/* Left Face (-Y) */}
                            <div className="absolute top-0 left-0 w-full h-[70px] origin-top bg-slate-300 border-[3px] border-l-0 border-slate-400" style={{ transform: 'translateZ(10px) rotateX(90deg)' }}></div>

                            {/* Back Face (+X) */}
                            <div className="absolute top-0 right-0 w-[70px] h-[72px] origin-right bg-slate-200 border-[3px] border-slate-300 flex flex-col p-[2px] gap-[2px]" style={{ transform: 'translateZ(10px) rotateY(-90deg)' }}>
                                <div className="flex-1 border-2 border-slate-400 bg-slate-100 flex items-center justify-center">
                                    <div className="w-1/2 h-full border-b-[2px] border-slate-300"></div>
                                </div>
                                <div className="flex-1 border-2 border-slate-400 bg-slate-100 flex items-center justify-center">
                                    <div className="w-1/2 h-full border-b-[2px] border-slate-300"></div>
                                </div>
                            </div>

                            {/* Wheels (Right side) */}
                            <div className="absolute right-[20px] bottom-[-2px] w-[30px] h-[30px] origin-bottom bg-slate-900 rounded-full border-[6px] border-[#222] shadow-xl" style={{ transform: 'rotateX(-90deg) translateZ(-15px)' }}>
                                <div className="absolute inset-[2px] bg-slate-400 rounded-full"></div>
                            </div>
                            <div className="absolute right-[70px] bottom-[-2px] w-[30px] h-[30px] origin-bottom bg-slate-900 rounded-full border-[6px] border-[#222] shadow-xl" style={{ transform: 'rotateX(-90deg) translateZ(-15px)' }}>
                                <div className="absolute inset-[2px] bg-slate-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* CABIN */}
                        <div className="absolute left-[10px] top-[4px] w-[40px] h-[64px]" style={{ transformStyle: 'preserve-3d' }}>
                            {/* Floor */}
                            <div className="absolute inset-0 bg-slate-800" style={{ transform: 'translateZ(10px)' }}></div>

                            {/* Top Face */}
                            <div className="absolute inset-0 bg-slate-100 border-[3px] border-slate-300 shadow-inner" style={{ transform: 'translateZ(60px)' }}></div>

                            {/* Right Face (+Y) */}
                            <div className="absolute bottom-0 left-0 w-full h-[50px] origin-bottom bg-slate-100 border-[3px] border-slate-300 flex items-start" style={{ transform: 'translateZ(10px) rotateX(-90deg)' }}>
                                {/* Door/Window */}
                                <div className="w-full h-[30px] mt-2 ml-[2px] bg-slate-200 border-[2px] border-slate-400 rounded-sm overflow-hidden relative">
                                    <div className="w-full h-2/3 bg-slate-800/90 absolute top-0 border-b-2 border-slate-400"></div>
                                    <div className="w-2 h-[2px] bg-slate-500 absolute bottom-1 right-1"></div>
                                </div>
                            </div>

                            {/* Left Face (-Y) */}
                            <div className="absolute top-0 left-0 w-full h-[50px] origin-top bg-slate-300 border-[3px] border-slate-400" style={{ transform: 'translateZ(10px) rotateX(90deg)' }}></div>

                            {/* Front Face (-X) Windshield */}
                            <div className="absolute top-0 left-0 w-[50px] h-[64px] origin-left bg-slate-200 border-[3px] border-slate-300" style={{ transform: 'translateZ(10px) rotateY(90deg)' }}>
                                {/* Windshield */}
                                <div className="absolute right-[2px] top-[4px] w-[26px] h-[50px] bg-slate-800/90 rounded-sm border-2 border-slate-700 shadow-inner"></div>
                            </div>

                            {/* Front Wheel */}
                            <div className="absolute left-[5px] bottom-[-2px] w-[30px] h-[30px] origin-bottom bg-slate-900 rounded-full border-[6px] border-[#222] shadow-xl" style={{ transform: 'rotateX(-90deg) translateZ(-15px)' }}>
                                <div className="absolute inset-[2px] bg-slate-400 rounded-full"></div>
                            </div>
                        </div>

                        {/* Ground Box Shadow */}
                        <div className="absolute -bottom-8 -left-4 w-[110%] h-16 bg-black/40 blur-xl rounded-full" style={{ transform: 'rotateX(80deg) translateZ(-20px)' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function RoutePlanning() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [uploadMessage, setUploadMessage] = useState('');

    const [isOptimizing, setIsOptimizing] = useState(false);
    const [showMapView, setShowMapView] = useState(false);
    const [routeMessage, setRouteMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

    const { data: trips, loading: loadingTrips, execute: fetchTrips } = useApi<any[]>(
        `${API_ENDPOINTS.ROUTING}/trips?date=${new Date().toISOString().split('T')[0]}`
    );

    const { execute: optimize } = useApi(
        `${API_ENDPOINTS.ROUTING}/optimize`,
        { method: 'POST' }
    );

    useEffect(() => {
        fetchTrips();
    }, []);

    useEffect(() => {
        if (trips && trips.length > 0 && !selectedTripId) {
            setSelectedTripId(trips[0].id);
        }
    }, [trips]);

    const selectedTrip = trips?.find(t => t.id === selectedTripId);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        setIsUploading(true);
        setUploadStatus('idle');

        // Simulate upload and generating route process
        setTimeout(() => {
            setIsUploading(false);
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                setUploadStatus('success');
                setUploadMessage(`Successfully uploaded ${file.name}. Generating new routes...`);
            } else {
                setUploadStatus('error');
                setUploadMessage(`Failed to upload ${file.name}. Invalid format.`);
            }

            // Auto-hide alert after 3 seconds
            setTimeout(() => setUploadStatus('idle'), 3000);
        }, 2000);
    };

    const handleOptimizeRoute = async () => {
        setIsOptimizing(true);
        setRouteMessage('');

        try {
            await optimize({ body: { date: new Date().toISOString().split('T')[0] } });
            setRouteMessage('Route successfully optimized for fuel efficiency!');
            await fetchTrips();
        } catch (error: any) {
            console.error('Optimization error:', error);
            setRouteMessage('Optimization failed: ' + (error.message || 'Unknown error'));
        } finally {
            setIsOptimizing(false);
            setTimeout(() => setRouteMessage(''), 3000);
        }
    };

    return (
        <>
            <Header title="Route Planning Dashboard" />

            {/* Loading Overlay */}
            {isUploading && (
                <div className="absolute inset-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Uploading & Generating Route...</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-300 mt-1">Please wait while we process the delivery order.</p>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {/* Actions and Alerts */}
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center bg-white dark:bg-[#1F1F1F] p-4 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                        <h3 className="font-bold text-slate-800 dark:text-white">Quick Actions</h3>
                        <div className="flex items-center gap-3">
                            <button
                                className="px-5 py-2.5 bg-white dark:bg-[#1F1F1F] border border-slate-300 dark:border-[#333] text-slate-700 dark:text-white font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-[#1A1A1A] transition-all text-sm flex items-center gap-2 cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-lg text-emerald-600 dark:text-emerald-500">download</span>
                                Download Delivery Order (sales)
                            </button>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg hover:brightness-110 transition-all text-sm shadow-md shadow-primary/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-lg">upload_file</span>
                                Upload Delivery Order
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".csv,.xlsx,.xls"
                                onChange={handleFileUpload}
                            />
                        </div>
                    </div>

                    {/* Alerts */}
                    {uploadStatus === 'success' && (
                        <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <span className="material-symbols-outlined text-emerald-500">check_circle</span>
                            <p className="text-sm font-semibold">{uploadMessage}</p>
                        </div>
                    )}
                    {uploadStatus === 'error' && (
                        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <span className="material-symbols-outlined text-red-500">error</span>
                            <p className="text-sm font-semibold">{uploadMessage}</p>
                        </div>
                    )}
                </div>

                {/* Top KPIs */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-[#1F1F1F] p-5 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">Cost Estimation</span>
                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 dark:text-slate-300">payments</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">Rp 7.150.000</div>
                        <div className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">trending_down</span>
                            -4.2% from avg
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1F1F1F] p-5 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">Total Distance</span>
                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 dark:text-slate-300">route</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">3,200 KM</div>
                        <div className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-300">Across 7 Active Trucks</div>
                    </div>

                    <div className="bg-white dark:bg-[#1F1F1F] p-5 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">Time Adherence</span>
                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 dark:text-slate-300">schedule</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">94%</div>
                        <div className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            On target (Green)
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#1F1F1F] p-5 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-300 uppercase tracking-wider">Total Orders</span>
                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 dark:text-slate-300">inventory_2</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">240</div>
                        <div className="mt-2 text-xs font-medium text-primary flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">pending_actions</span>
                            12 Pending processing
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8 items-start pb-12">
                    {/* Left Column: Fleet List */}
                    <div className="col-span-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 dark:text-slate-300">local_shipping</span>
                                Today's Fleet
                            </h3>
                            <button className="text-xs font-semibold text-primary hover:underline">View All</button>
                        </div>

                        <div className="space-y-4">
                            {loadingTrips ? (
                                <div className="p-8 text-center text-slate-500">Loading fleet data...</div>
                            ) : trips?.length === 0 ? (
                                <div className="p-8 text-center text-slate-500 bg-white dark:bg-[#1F1F1F] rounded-xl border border-dashed border-slate-300 dark:border-[#333]">
                                    No trips generated yet. Click "Upload" or "Optimize" to start.
                                </div>
                            ) : (
                                trips?.map((trip) => (
                                    <div key={trip.id} onClick={() => setSelectedTripId(trip.id)}>
                                        <Truck3D
                                            plateNumber={trip.truck?.plate_number || 'N/A'}
                                            driverName={trip.driver?.full_name || 'Unassigned'}
                                            truckType={trip.truck?.truck_type || 'Unknown'}
                                            zone={trip.region || 'NASIONAL'}
                                            colorHex={trip.status === 'IN_PROGRESS' ? '#10b981' : '#f59e0b'}
                                            percent={Math.round((trip.total_weight || 0) / (trip.truck?.max_capacity_kg || 1000) * 100)}
                                            outerText={`${trip.status} • ${Math.round((trip.total_weight || 0) / (trip.truck?.max_capacity_kg || 1000) * 100)}%`}
                                            loadKg={`${trip.total_weight || 0} / ${trip.truck?.max_capacity_kg || 0} Kg`}
                                            colorClass={trip.status === 'IN_PROGRESS' ? 'emerald' : 'amber'}
                                            isSelected={selectedTripId === trip.id}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Column: Route Sequence */}
                    <div className="col-span-7 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 dark:text-slate-300">timeline</span>
                                Route Sequence - {selectedTrip?.truck?.plate_number || 'Select Truck'}
                            </h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleOptimizeRoute}
                                    disabled={isOptimizing}
                                    className={`px-3 py-1.5 border border-slate-200 dark:border-[#333] rounded-lg text-xs font-bold transition-colors ${isOptimizing ? 'text-slate-400 dark:text-slate-300 bg-slate-50 dark:bg-[#1A1A1A] cursor-not-allowed' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-[#1A1A1A]'}`}
                                >
                                    {isOptimizing ? 'Optimizing...' : 'Optimize'}
                                </button>
                                <button
                                    onClick={() => setShowMapView(!showMapView)}
                                    className={`px-3 py-1.5 border rounded-lg text-xs font-bold transition-colors ${showMapView ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'border-slate-200 dark:border-[#333] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:bg-[#1A1A1A]'}`}
                                >
                                    {showMapView ? 'List View' : 'Map View'}
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1F1F1F] border border-slate-200 dark:border-[#333] dark:border-[#333] rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[450px] relative">

                            {/* Optimizing Overlay */}
                            {isOptimizing && (
                                <div className="absolute inset-0 z-20 bg-white/70 dark:bg-black/70 backdrop-blur-[2px] flex flex-col items-center justify-center">
                                    <div className="relative">
                                        <span className="material-symbols-outlined text-primary text-5xl animate-bounce">route</span>
                                        <div className="absolute -bottom-2 -right-2 h-4 w-4 bg-emerald-50 dark:bg-emerald-500/100 rounded-full animate-ping"></div>
                                    </div>
                                    <p className="text-sm font-bold text-slate-700 dark:text-white mt-4">Recalculating optimal path...</p>
                                </div>
                            )}

                            {/* Route Alert Message */}
                            {routeMessage && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-sm font-bold animate-in fade-in slide-in-from-top-4">
                                    <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>
                                    {routeMessage}
                                </div>
                            )}

                            {showMapView ? (
                                <div className="flex-1 bg-slate-100 dark:bg-[#1A1A1A] flex flex-col relative w-full h-[500px]">
                                    <MapContainer
                                        center={[-6.2000, 106.8166]}
                                        zoom={11}
                                        scrollWheelZoom={true}
                                        zoomControl={true}
                                        style={{ height: '500px', width: '100%', zIndex: 10, minHeight: '500px' }}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        {selectedTrip?.stops?.map((stop: any, idx: number) => (
                                            <Marker key={stop.id} position={[stop.latitude || 0, stop.longitude || 0]} icon={customIcon}>
                                                <Popup>
                                                    <div className="font-bold text-slate-800 dark:text-white">{stop.order?.customer_name || 'Stop ' + (idx + 1)}</div>
                                                    <div className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-300">
                                                        {stop.arrival_time ? new Date(stop.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD'}
                                                    </div>
                                                    {idx === 0 ? <div className="text-[10px] mt-1 text-primary animate-pulse">START</div> : null}
                                                </Popup>
                                            </Marker>
                                        ))}
                                        {selectedTrip?.stops && selectedTrip.stops.length > 0 && (
                                            <Polyline
                                                positions={selectedTrip.stops.sort((a: any, b: any) => a.stop_order - b.stop_order).map((s: any) => [s.latitude || 0, s.longitude || 0])}
                                                pathOptions={{ color: '#D54B00', weight: 4, dashArray: '5, 10' }}
                                            />
                                        )}
                                    </MapContainer>

                                    <div className="absolute top-4 right-4 z-[999] text-center bg-white/90 dark:bg-[#1F1F1F]/90 backdrop-blur px-4 py-2 rounded-xl border border-slate-200 dark:border-[#333] shadow-md">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-xl text-primary">navigation</span>
                                            <div className="text-left">
                                                <h4 className="font-bold text-slate-700 dark:text-white text-sm leading-tight">Live Tracker</h4>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-300 font-medium">B 9513 JXS Route</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 flex-1">
                                    <div className="space-y-0 relative">
                                        {/* Vertical line connecting nodes */}
                                        <div className="absolute left-[9px] top-2 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700 border-l-2 border-dashed border-slate-200 dark:border-slate-700 dark:border-[#333] -z-10"></div>

                                        {/* Warehouse Start */}
                                        <div className="relative pl-10 pb-10">
                                            <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center ring-4 ring-white dark:ring-[#1F1F1F]">
                                                <span className="text-[10px] text-white font-bold">W</span>
                                            </div>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">Main Distribution Center</h4>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gatot Subroto St No. 12, Jakarta</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-sm font-bold text-slate-900 dark:text-white">07:00 AM</span>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Departure</p>
                                                </div>
                                            </div>
                                        </div>

                                        {selectedTrip?.stops?.sort((a: any, b: any) => a.stop_order - b.stop_order).map((stop: any, idx: number) => (
                                            <div key={stop.id} className="relative pl-10 pb-10">
                                                <div className={`absolute left-[-11px] top-0 w-5 h-5 rounded-full ${idx === 0 ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-slate-200 dark:bg-slate-700'} flex items-center justify-center ring-4 ring-white dark:ring-[#1F1F1F]`}>
                                                    <span className={`text-[10px] ${idx === 0 ? 'text-white' : 'text-slate-600 dark:text-slate-300'} font-bold`}>{idx + 1}</span>
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-bold text-slate-900 dark:text-white uppercase">{stop.order?.customer_name || 'Unknown Customer'}</h4>
                                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stop.order?.delivery_address || 'Address N/A'}</p>
                                                        <div className="mt-3 flex gap-3">
                                                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                                                <span className="material-symbols-outlined text-xs">package_2</span> {stop.order?.total_weight || 0} Kg
                                                            </span>
                                                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                                                <span className="material-symbols-outlined text-xs">info</span> {stop.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className={`text-sm font-bold ${idx === 0 ? 'text-primary' : 'text-slate-900 dark:text-white'}`}>
                                                            {stop.arrival_time ? new Date(stop.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD'}
                                                        </span>
                                                        <p className={`text-[10px] ${idx === 0 ? 'text-primary' : 'text-slate-400'} font-bold uppercase`}>ETA</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {(!selectedTrip?.stops || selectedTrip.stops.length === 0) && (
                                            <div className="py-10 text-center text-slate-400 text-sm">No stops assigned for this trip.</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="bg-slate-50 dark:bg-[#1A1A1A] p-6 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-[#333]">
                                <button className="px-6 py-2.5 bg-white dark:bg-[#1F1F1F] border border-slate-300 dark:border-[#333] text-slate-700 dark:text-white font-bold rounded-lg hover:bg-slate-100 dark:bg-[#1A1A1A] transition-all text-sm flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                                    Print Out (PDF)
                                </button>
                                <button className="px-8 py-2.5 bg-primary text-white font-bold rounded-lg hover:brightness-110 transition-all text-sm shadow-lg shadow-primary/25 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">done_all</span>
                                    Accept Route Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
