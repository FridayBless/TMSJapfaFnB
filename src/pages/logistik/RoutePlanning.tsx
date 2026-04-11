import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 🌟 INJEKSI CSS GLOBAL BUAT ANIMASI KEDIP PETA
const globalStyles = `
    @keyframes markerBlink { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); } 50% { transform: scale(1.2); box-shadow: 0 0 20px currentColor; } }
    @keyframes polylineBlink { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px currentColor); } 50% { opacity: 0.3; filter: none; } }
    .blinking-marker { animation: markerBlink 1s ease-in-out infinite; z-index: 9999 !important; position: relative; }
    .blinking-polyline { animation: polylineBlink 1s ease-in-out infinite; }
    .dropped-marker { background-color: #334155; border: 2px solid #94a3b8; filter: grayscale(100%); }
`;

const createNumberedIcon = (number: number | string, colorHex: string, isDepo: boolean = false, isDimmed: boolean = false, isBlinking: boolean = false) => {
    const size = isDepo ? 34 : 26;
    const fontSize = isDepo ? '16px' : '12px';
    const bgColor = isDimmed ? '#94a3b8' : colorHex;
    const opacity = isDimmed ? 0.4 : 1;

    const markerHtmlStyles = `
        background-color: ${bgColor};
        opacity: ${opacity};
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: ${colorHex}; 
        font-weight: 900;
        font-size: ${fontSize};
        border: 2px solid ${isDimmed ? '#e2e8f0' : 'white'};
        box-shadow: ${isDimmed ? 'none' : '0 4px 10px rgba(0,0,0,0.5)'};
        transition: all 0.3s ease;
    `;

    return new L.DivIcon({
        className: "custom-leaflet-icon",
        html: `<style>${globalStyles}</style><div class="${isBlinking ? 'blinking-marker' : ''}" style="${markerHtmlStyles}"><span style="color: white;">${number}</span></div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
    });
};

interface RouteProduct { nama_barang: string; qty: string; }
interface RouteDetail { urutan: number; nama_toko: string; latitude: number; longitude: number; berat_kg: number; jam_tiba: string; distance_from_prev_km: number; items: RouteProduct[]; }
interface RouteItem { route_id: string; tanggal: string; driver_name: string; kendaraan: string; jenis: string; destinasi_jumlah: number; total_berat: number; total_distance_km: number; status: string; zone: string; detail_rute: RouteDetail[]; garis_aspal?: [number, number][]; }
interface Truck3DProps { plateNumber: string; driverName: string; truckType: string; zone: string; colorHex: string; percent: number; outerText: string; loadKg: string; colorClass: string; isSelected: boolean; onClick: () => void; }

interface UploadResult { order_id?: string; kode_customer?: string; nama_toko: string; berat?: number; kordinat?: string; alasan?: string; items?: RouteProduct[]; jam_maks?: string; }
interface DroppedNode { nama_toko: string; berat_kg: number; alasan: string; lat?: number; lon?: number; }

const formatTimeWindow = (timeStr: string, weight: number) => {
    if (!timeStr) return "-";
    const cleanedTimeStr = timeStr.substring(0, 5);
    const parts = cleanedTimeStr.split(':');
    if (parts.length < 2) return cleanedTimeStr;
    const h = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const serviceTime = 15 + (weight / 10);
    const totalMinutes = h * 60 + m + Math.round(serviceTime);
    const endH = Math.floor(totalMinutes / 60) % 24;
    const endM = totalMinutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} - ${endH.toString().padStart(2, '0')}:${endM.toString().padStart(2, '0')}`;
};

const Truck3D = ({ plateNumber, driverName, truckType, zone, colorHex, percent, outerText, loadKg, colorClass, isSelected, onClick }: Truck3DProps) => {
    return (
        <div onClick={onClick} className={`bg-white dark:bg-[#1F1F1F] p-4 rounded-xl shadow-sm transition-all cursor-pointer ${isSelected ? 'border-2 border-primary ring-4 ring-primary/5 shadow-md scale-[1.02]' : 'border border-slate-200 dark:border-[#333] hover:border-primary/50'}`}>
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
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${colorClass}-500/10 blur-[40px] rounded-full pointer-events-none`}></div>
                <div className="flex justify-between items-baseline mb-3 relative z-10">
                    <span className="text-sm font-black text-white uppercase tracking-wider">Load Factor</span>
                    <span className={`text-[10px] font-black text-${colorClass}-400 bg-${colorClass}-400/10 px-2 py-1 rounded border border-${colorClass}-400/20 uppercase shadow-[0_0_10px_rgba(0,0,0,0.2)]`}>{outerText}</span>
                </div>
                <div className="flex justify-between text-xs mb-1 relative z-10"><span className="text-slate-400 font-medium uppercase">Current Load</span><span className="font-bold text-white">{loadKg}</span></div>

                <div className="relative w-full h-48 flex items-center justify-center mt-6 overflow-visible scale-110" style={{ perspective: '1200px' }}>
                    <div style={{ transform: 'rotateX(60deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }} className="w-[240px] h-[72px] relative flex transition-all duration-700 hover:scale-105 cursor-pointer">
                        <div className="absolute right-0 top-0 w-[180px] h-[72px]" style={{ transformStyle: 'preserve-3d' }}>
                            <div className="absolute inset-0 bg-slate-900 border-[2px] border-slate-700" style={{ transform: 'translateZ(10px)' }}></div>
                            <div className="absolute inset-0 border-[3px] border-slate-200" style={{ transform: 'translateZ(80px)', background: `linear-gradient(to right, ${colorHex} 0%, ${colorHex} ${percent}%, #f1f5f9 ${percent}%, #f1f5f9 100%)` }}>
                                <div className="absolute inset-x-0 top-0 h-full opacity-30" style={{ width: `${percent}%`, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.7) 10px, rgba(255,255,255,0.7) 20px)' }}></div>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[70px] origin-bottom border-[3px] border-r-0 border-slate-200 flex items-center shadow-[-5px_5px_20px_rgba(0,0,0,0.5)]" style={{ transform: 'translateZ(10px) rotateX(-90deg)', background: `linear-gradient(to right, ${colorHex} 0%, ${colorHex} ${percent}%, #e2e8f0 ${percent}%, #e2e8f0 100%)` }}>
                                <div className="absolute inset-y-0 left-0 opacity-30" style={{ width: `${percent}%`, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.7) 10px, rgba(255,255,255,0.7) 20px)' }}></div>
                                <span className="text-white font-black text-4xl drop-shadow-md absolute" style={{ left: `calc(${percent}% / 2)`, transform: 'translate(-50%, 0)' }}>{percent}%</span>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-[70px] origin-top bg-slate-300 border-[3px] border-l-0 border-slate-400" style={{ transform: 'translateZ(10px) rotateX(90deg)' }}></div>
                            <div className="absolute top-0 right-0 w-[70px] h-[72px] origin-right bg-slate-200 border-[3px] border-slate-300 flex flex-col p-[2px] gap-[2px]" style={{ transform: 'translateZ(10px) rotateY(-90deg)' }}>
                                <div className="flex-1 border-2 border-slate-400 bg-slate-100 flex items-center justify-center"><div className="w-1/2 h-full border-b-[2px] border-slate-300"></div></div>
                                <div className="flex-1 border-2 border-slate-400 bg-slate-100 flex items-center justify-center"><div className="w-1/2 h-full border-b-[2px] border-slate-300"></div></div>
                            </div>
                            <div className="absolute right-[20px] bottom-[-2px] w-[30px] h-[30px] origin-bottom bg-slate-900 rounded-full border-[6px] border-[#222] shadow-xl" style={{ transform: 'rotateX(-90deg) translateZ(-15px)' }}><div className="absolute inset-[2px] bg-slate-400 rounded-full"></div></div>
                            <div className="absolute right-[70px] bottom-[-2px] w-[30px] h-[30px] origin-bottom bg-slate-900 rounded-full border-[6px] border-[#222] shadow-xl" style={{ transform: 'rotateX(-90deg) translateZ(-15px)' }}><div className="absolute inset-[2px] bg-slate-400 rounded-full"></div></div>
                        </div>
                        <div className="absolute left-[10px] top-[4px] w-[40px] h-[64px]" style={{ transformStyle: 'preserve-3d' }}>
                            <div className="absolute inset-0 bg-slate-800" style={{ transform: 'translateZ(10px)' }}></div>
                            <div className="absolute inset-0 bg-slate-100 border-[3px] border-slate-300 shadow-inner" style={{ transform: 'translateZ(60px)' }}></div>
                            <div className="absolute bottom-0 left-0 w-full h-[50px] origin-bottom bg-slate-100 border-[3px] border-slate-300 flex items-start" style={{ transform: 'translateZ(10px) rotateX(-90deg)' }}>
                                <div className="w-full h-[30px] mt-2 ml-[2px] bg-slate-200 border-[2px] border-slate-400 rounded-sm overflow-hidden relative">
                                    <div className="w-full h-2/3 bg-slate-800/90 absolute top-0 border-b-2 border-slate-400"></div>
                                    <div className="w-2 h-[2px] bg-slate-500 absolute bottom-1 right-1"></div>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 w-full h-[50px] origin-top bg-slate-300 border-[3px] border-slate-400" style={{ transform: 'translateZ(10px) rotateX(90deg)' }}></div>
                            <div className="absolute top-0 left-0 w-[50px] h-[64px] origin-left bg-slate-200 border-[3px] border-slate-300" style={{ transform: 'translateZ(10px) rotateY(90deg)' }}>
                                <div className="absolute right-[2px] top-[4px] w-[26px] h-[50px] bg-slate-800/90 rounded-sm border-2 border-slate-700 shadow-inner"></div>
                            </div>
                            <div className="absolute left-[5px] bottom-[-2px] w-[30px] h-[30px] origin-bottom bg-slate-900 rounded-full border-[6px] border-[#222] shadow-xl" style={{ transform: 'rotateX(-90deg) translateZ(-15px)' }}><div className="absolute inset-[2px] bg-slate-400 rounded-full"></div></div>
                        </div>
                        <div className="absolute -bottom-8 -left-4 w-[110%] h-16 bg-black/40 blur-xl rounded-full" style={{ transform: 'rotateX(80deg) translateZ(-20px)' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getTruckColors = (loadPercent: number) => {
    if (loadPercent > 80) return { hex: '#10b981', class: 'emerald', text: `Optimal • ${loadPercent}%` };
    if (loadPercent > 50) return { hex: '#f59e0b', class: 'amber', text: `Moderate • ${loadPercent}%` };
    return { hex: '#ef4444', class: 'red', text: `Low • ${loadPercent}%` };
};

const GlowPolyline = ({ positions, color, isDimmed, isBlinking }: { positions: [number, number][], color: string, isDimmed?: boolean, isBlinking?: boolean }) => {
    const mainOpacity = isDimmed ? 0.2 : 1.0;
    const glowOpacityInner = isDimmed ? 0 : (isBlinking ? 0.7 : 0.35);
    const glowOpacityOuter = isDimmed ? 0 : (isBlinking ? 0.4 : 0.15);
    const pathClass = isBlinking ? "blinking-polyline" : "";
    const displayColor = isDimmed ? '#94a3b8' : color;

    return (
        <>
            {!isDimmed && <Polyline positions={positions} pathOptions={{ color: displayColor, weight: 14, opacity: glowOpacityOuter, lineCap: 'round', lineJoin: 'round', className: pathClass }} />}
            {!isDimmed && <Polyline positions={positions} pathOptions={{ color: displayColor, weight: 8, opacity: glowOpacityInner, lineCap: 'round', lineJoin: 'round', className: pathClass }} />}
            <Polyline positions={positions} pathOptions={{ color: displayColor, weight: 4, opacity: mainOpacity, lineCap: 'round', lineJoin: 'round', dashArray: '8, 8', className: pathClass }} />
        </>
    );
};

interface MapComponentProps {
    routesData: RouteItem[];
    selectedRouteId: string | null;
    truckColors: string[];
    droppedNodesData?: DroppedNode[];
    flyToLocation?: [number, number] | null;
}

const MapComponent = ({ routesData, selectedRouteId, truckColors }: MapComponentProps) => {
    const mapRef = useRef<any>(null);

    useEffect(() => {
        if (mapRef.current) {
            setTimeout(() => { mapRef.current?.invalidateSize(); }, 300);
        }
    }, [routesData, selectedRouteId]);

    const defaultCenter: [number, number] = [-6.207356, 106.479163];

    return (
        // 🌟 OBAT ANTI KEMPES: Pake style height explisit 600px biar dijamin gak kempes!
        <MapContainer
            center={defaultCenter}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: '600px', width: '100%' }}
            className="z-0"
            ref={mapRef}
            whenReady={() => { setTimeout(() => window.dispatchEvent(new Event('resize')), 400); }}
        >
            <TileLayer attribution='&copy; TomTom' url="https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=xUy50YsjmbRexLalxX3ThDpmC1lOzElP" />

            <Marker position={defaultCenter} icon={createNumberedIcon('0', '#1e293b', true, selectedRouteId !== null, false)} zIndexOffset={1000}>
                <Tooltip direction="top" offset={[0, -16]} opacity={1}><b>Gudang JAPFA Cikupa</b></Tooltip>
                <Popup>
                    <div className="p-1"><b className="text-lg uppercase text-slate-800">Depo JAPFA Cikupa</b><div className="text-sm font-bold text-primary">06:00 AM (Depart)</div></div>
                </Popup>
            </Marker>

            {routesData.map((route, i) => {
                const color = truckColors[i % truckColors.length];

                // Pake Garis Aspal TomTom kalau ada
                let positions: [number, number][] = [];
                if (route.garis_aspal && route.garis_aspal.length > 0) {
                    positions = route.garis_aspal as [number, number][];
                } else {
                    positions = [defaultCenter];
                    route.detail_rute.forEach(stop => {
                        if (stop.latitude && stop.longitude) positions.push([stop.latitude, stop.longitude]);
                    });
                }

                const isDimmed = selectedRouteId !== null && selectedRouteId !== route.route_id;
                const isBlinking = selectedRouteId === route.route_id;

                return (
                    <React.Fragment key={route.route_id}>
                        {positions.length > 1 && (
                            <GlowPolyline positions={positions} color={color} isDimmed={isDimmed} isBlinking={isBlinking} />
                        )}

                        {route.detail_rute.map((stop, j) => {
                            if (!stop.latitude || !stop.longitude) return null;
                            return (
                                <Marker
                                    key={`${route.route_id}-${j}`}
                                    position={[stop.latitude, stop.longitude]}
                                    icon={createNumberedIcon(stop.urutan, color, false, isDimmed, isBlinking)}
                                    zIndexOffset={isBlinking ? 9999 : (isDimmed ? 0 : 500)}
                                >
                                    <Tooltip direction="top" offset={[0, -12]} opacity={isDimmed ? 0.3 : 1}><b>{stop.nama_toko}</b></Tooltip>
                                    <Popup>
                                        <div className="p-1 space-y-2 min-w-[200px]">
                                            <div className="flex justify-between items-center border-b pb-1 mb-1">
                                                <b style={{ color: color }} className="text-base uppercase truncate pr-2">🚚 {route.kendaraan}</b>
                                                <span style={{ backgroundColor: color }} className="text-white font-black text-xl px-3 py-1 rounded-full shadow">{stop.urutan}</span>
                                            </div>
                                            <b className="text-sm font-bold text-slate-800">{stop.nama_toko}</b>

                                            <div className="flex gap-2 items-center bg-blue-50/50 p-2 rounded-lg border border-blue-100 shadow-inner">
                                                <span className="material-symbols-outlined text-4xl text-primary">route</span>
                                                <div><div className="text-sm font-bold text-slate-900 tracking-tight">Real-Time Segment</div><div className="text-[10px] uppercase text-slate-400 font-bold -mt-0.5">Jarak dari sebelumnya</div></div>
                                                <div className="flex-1 text-right text-3xl font-black text-primary tracking-tighter">{stop.distance_from_prev_km || "0.0"}<span className="text-xl">KM</span></div>
                                            </div>

                                            <div className="text-xs text-slate-600 flex justify-between"><span className="font-medium text-slate-400">Total Muatan:</span> <b className="text-slate-900 font-bold">{stop.berat_kg} KG</b></div>
                                            <div className="text-xs text-slate-600 flex justify-between"><span className="font-medium text-slate-400">Est. Jam Tiba:</span> <b className="text-primary font-bold">{stop.jam_tiba?.substring(0, 5)}</b></div>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </MapContainer>
    );
};

export default function RoutePlanning() {
    const [isUploading, setIsUploading] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [showMapView, setShowMapView] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const [routeMessage, setRouteMessage] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [routesData, setRoutesData] = useState<RouteItem[]>([]);
    const [droppedNodes, setDroppedNodes] = useState<DroppedNode[]>([]);

    const [previewData, setPreviewData] = useState<any>(null);
    const [activePreviewTruck, setActivePreviewTruck] = useState<number | null>(null);

    const truckColors = ['#e11d48', '#0284c7', '#16a34a', '#d97706', '#9333ea', '#0d9488', '#0891b2'];

    const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
    const [activeModal, setActiveModal] = useState<'cost' | 'distance' | 'fleet' | 'stops' | null>(null);
    const [expandedStopIdx, setExpandedStopIdx] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [uploadReport, setUploadReport] = useState<{ success: UploadResult[], failed: UploadResult[] } | null>(null);
    const [failedCoords, setFailedCoords] = useState<Record<number, { lat: string, lon: string }>>({});
    const [expandedRows, setExpandedRows] = useState<number[]>([]);

    const toggleRow = (idx: number) => {
        if (expandedRows.includes(idx)) setExpandedRows(expandedRows.filter(i => i !== idx));
        else setExpandedRows([...expandedRows, idx]);
    };

    const fetchRoutes = async (date: string) => {
        try {
            const response = await fetch(`http://localhost:8000/api/routes?date=${date}`);
            if (response.ok) {
                const data = await response.json();
                if (data.routes) {
                    setRoutesData(data.routes);
                    setDroppedNodes(data.dropped_nodes || []);
                    if (data.routes.length > 0) setSelectedRouteId(data.routes[0].route_id);
                    else setSelectedRouteId(null);
                } else {
                    setRoutesData(data);
                    if (data.length > 0) setSelectedRouteId(data[0].route_id);
                    else setSelectedRouteId(null);
                }
            }
        } catch (error) { console.error("Gagal:", error); }
    };

    useEffect(() => { fetchRoutes(selectedDate); }, [selectedDate]);

    const handleUploadClick = () => fileInputRef.current?.click();

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);

        try {
            const response = await fetch('http://localhost:8000/api/orders/upload', { method: 'POST', body: formData });
            if (response.ok) {
                const data = await response.json();
                setUploadReport({ success: data.success_list || [], failed: data.failed_list || [] });
                setFailedCoords({});
                setShowVerificationModal(true);
            } else {
                alert(`Gagal upload.`);
            }
        } catch (error) {
            alert(`Server Error! Pastikan Uvicorn menyala.`);
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
            setIsUploading(false);
        }
    };

    const handleTimeChange = async (orderId: string | undefined, newTime: string) => {
        if (!orderId) return;
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${orderId}/time`, {
                method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jam_maksimal: newTime })
            });
            if (!response.ok) console.error("Gagal simpan waktu ke database!");
        } catch (error) { console.error("Error API Time Update:", error); }
    };

    const handleSaveCoordinate = async (idx: any, item: any) => {
        const coords = failedCoords[idx];
        if (!coords || !coords.lat || !coords.lon) return alert("Isi Latitude dan Longitude dulu Bos!");

        try {
            const payload = { latitude: parseFloat(coords.lat), longitude: parseFloat(coords.lon), kode_customer: item.kode_customer || item.nama_toko, nama_customer: item.nama_toko };
            const response = await fetch(`http://localhost:8000/api/orders/DRAFT-${idx}/coordinate`, {
                method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)
            });

            if (response.ok) {
                const currentSuccess = uploadReport ? [...uploadReport.success] : [];
                currentSuccess.push({ ...item, kordinat: `${coords.lat}, ${coords.lon}` });
                const currentFailed = uploadReport ? [...uploadReport.failed] : [];
                setUploadReport({ success: currentSuccess, failed: currentFailed.filter((_, currentIdx) => currentIdx !== idx) });
                const newFailedCoords = { ...failedCoords }; delete newFailedCoords[idx]; setFailedCoords(newFailedCoords);
            } else {
                // 🌟 TANGKEP ERROR GEOFENCING DARI BACKEND BIAR JADI ALERT KEREN!
                const errorData = await response.json();
                alert(`GAGAL: ${errorData.detail || 'Koordinat bermasalah'}`);
            }
        } catch (error) { console.error("Gagal save:", error); }
    };

    // 🌟 UBAH FUNGSI INI AJA:
    const [loadingProgress, setLoadingProgress] = useState(0); // Tambahin state baru ini di atas fungsi

    const handleOptimizeRoute = async () => {
        setShowVerificationModal(false);
        setIsOptimizing(true);
        setLoadingProgress(1); // Mulai animasi dari 1%

        // 🌟 JALANKAN FAKE PROGRESS BAR (Animasi Naik ke 99%)
        const progressInterval = setInterval(() => {
            setLoadingProgress((oldProgress) => {
                if (oldProgress >= 99) return 99; // Mentok di 99% nunggu server
                return oldProgress + 1; // Naik 1% tiap 600ms (Total ~60 detik)
            });
        }, 600);

        try {
            const response = await fetch('http://localhost:8000/optimize-routes?preview=true', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            if (response.ok) {
                const data = await response.json();

                clearInterval(progressInterval); // Hentikan timer animasi
                setLoadingProgress(100); // Tembak langsung 100%

                // Tunggu bentar biar admin liat 100% nya, baru buka peta
                setTimeout(() => {
                    setPreviewData(data);
                    setActivePreviewTruck(null);
                    setIsOptimizing(false);
                    setLoadingProgress(0); // Reset progress
                }, 800);
            } else {
                clearInterval(progressInterval);
                setIsOptimizing(false);
                setLoadingProgress(0);
                const errData = await response.json();
                alert(`Gagal optimasi VRP: ${errData.detail ? JSON.stringify(errData.detail) : 'Server Error'}`);
            }
        } catch (error) {
            clearInterval(progressInterval);
            setIsOptimizing(false);
            setLoadingProgress(0);
            alert('Gagal konek ke server Backend!');
        }
    };

    const handleConfirmSaveRoute = async () => {
        // Ngga pake loading AI lagi, karena nyimpen db cepet banget
        try {
            // Tembak API Confirm yang baru kita bikin di atas
            const response = await fetch('http://localhost:8000/api/routes/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(previewData) // Langsung kirim data yang lagi lu liat di layar
            });

            if (response.ok) {
                setPreviewData(null); // Tutup peta preview
                setActivePreviewTruck(null);

                setRouteMessage('Rute berhasil dikunci & disimpan ke Database!');
                const todayStr = new Date().toISOString().split('T')[0];
                setSelectedDate(todayStr);
                await fetchRoutes(todayStr); // Refresh halaman utama
            } else {
                alert(`Gagal menyimpan ke database.`);
            }
        } catch (error) {
            alert('Gagal konek ke server Backend!');
        }
    };

    const totalFleet = routesData.length;
    const totalOrders = routesData.reduce((sum, route) => sum + (route.destinasi_jumlah || 0), 0);
    const totalCost = totalFleet > 0 ? (totalFleet * 1250000).toLocaleString('id-ID') : "0";
    const totalRealDistance = routesData.reduce((sum, route) => sum + (route.total_distance_km || 0), 0).toFixed(1);
    const selectedRoute = routesData.find(r => r.route_id === selectedRouteId);

    return (
        <>
            <Header title="Route Planning Dashboard" />

            {/* 🌟 MODAL PREVIEW PETA AI */}
            {previewData && (
                <div className="fixed inset-0 z-[999999] bg-slate-900/90 backdrop-blur-sm flex flex-col p-4 md:p-8">
                    <div className="bg-white dark:bg-[#111] flex-1 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">

                        <div className="p-4 md:p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#1A1A1A]">
                            <div>
                                <h2 className="text-xl md:text-2xl font-black uppercase text-slate-800 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">route</span> Peta Preview Rute AI
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">Review jalur pengiriman setiap truk sebelum disimpan permanen.</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => { setPreviewData(null); setActivePreviewTruck(null); setShowVerificationModal(true); }} className="px-4 py-2 border-2 border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">edit</span> Batal & Edit Waktu
                                </button>
                                <button onClick={handleConfirmSaveRoute} className="px-6 py-2 bg-primary text-white font-black rounded-xl hover:brightness-110 flex items-center gap-2 shadow-lg shadow-primary/30 transition-all">
                                    <span className="material-symbols-outlined">save</span> SIMPAN RUTE PERMANEN
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 relative bg-slate-100 dark:bg-slate-900" style={{ minHeight: '600px' }}>
                            <MapContainer
                                center={[-6.207356, 106.479163]}
                                zoom={10}
                                style={{ height: '600px', width: '100%' }}
                                whenReady={() => { setTimeout(() => window.dispatchEvent(new Event('resize')), 400); }}
                            >
                                <style>{`
                                    @keyframes markerBlink { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(0,0,0,0); } 50% { transform: scale(1.2); box-shadow: 0 0 20px currentColor; } }
                                    @keyframes polylineBlink { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px currentColor); } 50% { opacity: 0.3; filter: none; } }
                                    .blinking-marker { animation: markerBlink 1s ease-in-out infinite; z-index: 9999 !important; position: relative; }
                                    .blinking-polyline { animation: polylineBlink 1s ease-in-out infinite; }
                                    .dropped-marker { background-color: #334155; border: 2px solid #94a3b8; filter: grayscale(100%); }
                                `}</style>

                                <TileLayer attribution='&copy; TomTom' url="https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=xUy50YsjmbRexLalxX3ThDpmC1lOzElP" />

                                <Marker position={[-6.207356, 106.479163]} icon={createNumberedIcon('0', '#1e293b', true, activePreviewTruck !== null, false)} zIndexOffset={1000}>
                                    <Popup><b className="text-base text-slate-800">Depo JAPFA Cikupa (06:00 AM)</b></Popup>
                                </Marker>

                                {/* 🌟 1A. LOOPING TRUK (GAMBAR GARIS ASPAL ASLI) */}
                                {previewData.jadwal_truk_internal.map((truk: any, i: number) => {
                                    const color = truckColors[i % truckColors.length];
                                    const positions = truk.garis_aspal && truk.garis_aspal.length > 0
                                        ? truk.garis_aspal
                                        : truk.detail_perjalanan.map((stop: any) => [stop.lat, stop.lon]);

                                    const isDimmed = activePreviewTruck !== null && activePreviewTruck !== i;
                                    const isBlinking = activePreviewTruck === i;

                                    return (
                                        <React.Fragment key={i}>
                                            <GlowPolyline positions={positions} color={color} isDimmed={isDimmed} isBlinking={isBlinking} />

                                            {truk.detail_perjalanan.map((stop: any, j: number) => {
                                                if (stop.urutan === 0) return null;
                                                return (
                                                    <Marker key={`${i}-${j}`} position={[stop.lat, stop.lon]} icon={createNumberedIcon(stop.urutan, color, false, isDimmed, isBlinking)} zIndexOffset={isBlinking ? 9999 : (isDimmed ? 0 : 500)}>
                                                        <Tooltip direction="top" offset={[0, -12]} opacity={isDimmed ? 0.3 : 1}><b>{stop.nama_toko || stop.lokasi}</b></Tooltip>
                                                        <Popup>
                                                            <div className="p-1 space-y-2 min-w-[200px]">
                                                                <div className="flex justify-between items-center border-b pb-1">
                                                                    <b style={{ color: color }} className="text-base uppercase truncate pr-2">🚚 {truk.armada}</b>
                                                                    <span style={{ backgroundColor: color }} className="text-white font-black text-xl px-3 py-1 rounded-full shadow">{stop.urutan}</span>
                                                                </div>
                                                                <b className="text-sm font-bold text-slate-800">{stop.nama_toko || stop.lokasi}</b>

                                                                <div className="flex gap-2 items-center bg-green-50/50 dark:bg-green-950/30 p-2 rounded-lg border border-green-100 dark:border-green-900 shadow-inner">
                                                                    <span className="material-symbols-outlined text-4xl text-emerald-600">distance</span>
                                                                    <div>
                                                                        <div className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Real-Time Segment</div>
                                                                        <div className="text-[10px] uppercase text-slate-400 font-bold -mt-0.5">Jarak dari sebelumnya</div>
                                                                    </div>
                                                                    <div className="flex-1 text-right text-3xl font-black text-emerald-600 tracking-tighter">{stop.distance_from_prev_km || stop.seg_km || "0.0"}<span className="text-xl">KM</span></div>
                                                                </div>

                                                                <div className="text-xs text-slate-500">Jam Tiba: {stop.jam_tiba?.substring(0, 5) || stop.jam?.substring(0, 5)}</div>
                                                            </div>
                                                        </Popup>
                                                    </Marker>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                })}

                                {/* 🌟 1B. GAMBAR TITIK TOKO YANG GAGAL (DROPPED NODES) */}
                                {previewData.dropped_nodes_peta && previewData.dropped_nodes_peta.map((drop: any, k: number) => {
                                    if (!drop.lat || !drop.lon) return null; // Cegah error kalau koordinat kosong
                                    return (
                                        <Marker key={`drop-${k}`} position={[drop.lat, drop.lon]} icon={createNumberedIcon('✖', '#334155')} zIndexOffset={400}>
                                            <Tooltip direction="top" offset={[0, -12]} opacity={1}>
                                                <b className="text-rose-600">GAGAL: {drop.nama_toko}</b>
                                            </Tooltip>
                                            <Popup>
                                                <div className="p-1 space-y-2 min-w-[200px]">
                                                    <div className="bg-rose-100 text-rose-700 text-xs font-black px-2 py-1 rounded uppercase tracking-widest text-center mb-2">Toko Terbuang AI</div>
                                                    <b className="text-sm font-bold text-slate-800 block">{drop.nama_toko}</b>
                                                    <div className="text-xs text-slate-600 flex justify-between"><span className="font-medium text-slate-400">Total Muatan:</span> <b className="text-slate-900 font-bold">{drop.berat_kg} KG</b></div>
                                                    <div className="p-2 bg-slate-50 rounded border border-slate-200 text-xs text-rose-600 font-medium italic">"{drop.alasan}"</div>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    )
                                })}
                            </MapContainer>

                            <div className="absolute bottom-8 right-8 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border-2 border-slate-200 dark:border-slate-700 max-h-[400px] overflow-y-auto w-[320px] transition-all">
                                <h4 className="text-xs font-black uppercase text-slate-500 mb-4 tracking-wider flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                    <span className="flex items-center gap-2"><span className="material-symbols-outlined text-base">local_shipping</span> Rute Truk</span>
                                    <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded animate-pulse">Klik untuk Fokus</span>
                                </h4>
                                <div className="space-y-3">
                                    {previewData.jadwal_truk_internal.map((truk: any, i: number) => {
                                        const isThisSelected = activePreviewTruck === i;
                                        const isOtherSelected = activePreviewTruck !== null && !isThisSelected;

                                        return (
                                            <div
                                                key={i}
                                                onClick={() => setActivePreviewTruck(isThisSelected ? null : i)}
                                                className={`flex items-center gap-4 p-3 rounded-xl border transition-all cursor-pointer select-none
                                                    ${isThisSelected ? 'bg-slate-100 dark:bg-slate-800 border-primary ring-2 ring-primary/20 scale-[1.02] shadow-md' : ''}
                                                    ${isOtherSelected ? 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-primary/50'}
                                                `}
                                            >
                                                <div className={`w-6 h-6 rounded-full shadow-md border-2 border-white shrink-0 ${isThisSelected ? 'animate-pulse' : ''}`} style={{ backgroundColor: truckColors[i % truckColors.length] }}></div>
                                                <div className="flex-1">
                                                    <span className="text-sm font-black text-slate-800 dark:text-white block leading-tight mb-1.5">{truk.armada}</span>
                                                    <div className="flex gap-2 text-[10px] font-bold">
                                                        <span className="bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-slate-700 dark:text-slate-300 flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[10px]">inventory_2</span> {truk.total_muatan_kg} KG
                                                        </span>
                                                        <span className="bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                                            <span className="material-symbols-outlined text-[10px]">route</span> {truk.total_jarak_km} KM
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 🌟 MODAL VERIFIKASI UPLOAD (KEMBALI UTUH 100%) */}
            {showVerificationModal && uploadReport && (
                <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-[#1F1F1F] rounded-2xl shadow-2xl w-full max-w-[95vw] h-[90vh] flex flex-col border border-slate-200 dark:border-[#333] overflow-hidden animate-in zoom-in-95">
                        <div className="p-6 border-b border-slate-200 dark:border-[#333] flex justify-between items-center bg-slate-50 dark:bg-[#111]">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase">Validasi Pre-Routing VRP</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Harap cek daftar pelanggan, muatan, dan <b className="text-primary">Batas Waktu</b> sebelum memproses rute Bos Ihsan.</p>
                            </div>
                            <button onClick={() => setShowVerificationModal(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-[#333] rounded-xl text-slate-500">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="p-6 flex-1 overflow-y-auto space-y-8 bg-slate-50 dark:bg-[#1A1A1A]">

                            {/* TABEL SUKSES + ACCORDION AYAM */}
                            <div className="bg-white dark:bg-[#1F1F1F] border border-emerald-200 dark:border-emerald-900/50 rounded-xl overflow-hidden shadow-sm">
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 px-5 py-3 border-b border-emerald-200 dark:border-emerald-900/50 flex justify-between items-center">
                                    <h3 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                                        <span className="material-symbols-outlined">check_circle</span>
                                        Toko Siap Routing ({uploadReport.success.length})
                                    </h3>
                                </div>
                                <div className="max-h-[500px] overflow-y-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="sticky top-0 bg-slate-50 dark:bg-[#111] shadow-sm z-10 border-b border-slate-200 dark:border-[#333]">
                                            <tr className="text-slate-500 dark:text-slate-400">
                                                <th className="px-5 py-3 font-semibold">No. & Nama Toko</th>
                                                <th className="px-5 py-3 font-semibold w-32">Total Berat</th>
                                                <th className="px-5 py-3 font-semibold w-48">Kordinat GPS</th>
                                                <th className="px-5 py-3 font-semibold w-40 text-center text-primary">Batas Jam (Bisa Edit)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 dark:divide-[#333]">
                                            {uploadReport.success.map((item, idx) => (
                                                <React.Fragment key={idx}>
                                                    <tr className="bg-white dark:bg-[#1F1F1F] hover:bg-slate-50 dark:hover:bg-[#2A2A2A] transition-colors">
                                                        <td className="px-5 py-3">
                                                            <div className="flex items-center gap-3">
                                                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 font-black text-xs border border-emerald-200 dark:border-emerald-800 shrink-0">
                                                                    {idx + 1}
                                                                </span>
                                                                <div>
                                                                    <p className="font-bold text-slate-800 dark:text-white">{item.nama_toko}</p>
                                                                    {item.items && item.items.length > 0 && (
                                                                        <button onClick={() => toggleRow(idx)} className="text-[10px] font-bold text-primary flex items-center gap-1 mt-1 hover:underline outline-none">
                                                                            <span className="material-symbols-outlined text-[12px]">{expandedRows.includes(idx) ? 'expand_less' : 'expand_more'}</span>
                                                                            {expandedRows.includes(idx) ? 'Sembunyikan Rincian' : `Lihat ${item.items.length} Rincian Muatan`}
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-3 text-slate-600 dark:text-slate-300 font-bold">{item.berat} KG</td>
                                                        <td className="px-5 py-3 font-mono text-xs text-slate-500">{item.kordinat}</td>
                                                        <td className="px-5 py-3 text-center">
                                                            <div className="flex justify-center items-center gap-2">
                                                                <input type="time" defaultValue={item.jam_maks || "20:00"} onChange={(e) => handleTimeChange(item.order_id, e.target.value)} className="border border-slate-300 dark:border-slate-600 dark:bg-[#111] dark:text-white rounded-lg px-2 py-1.5 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm w-full transition-all" title="Ganti jam kalau ada intervensi manual" />
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    {expandedRows.includes(idx) && item.items && item.items.length > 0 && (
                                                        <tr className="bg-slate-50/80 dark:bg-[#1A1A1A] animate-in fade-in slide-in-from-top-2 duration-200">
                                                            <td colSpan={4} className="px-5 pb-4 pt-3 border-t border-dashed border-slate-200 dark:border-[#333]">
                                                                <div className="pl-[44px]">
                                                                    <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                                                                        <span className="material-symbols-outlined text-[12px]">receipt_long</span> Rincian Item ({item.berat} KG)
                                                                    </h5>
                                                                    <ul className="grid grid-cols-2 gap-2">
                                                                        {item.items.map((product, prodIdx) => (
                                                                            <li key={prodIdx} className="flex justify-between items-center text-xs bg-white dark:bg-[#222] p-2 rounded-md border border-slate-200 dark:border-[#444] shadow-sm">
                                                                                <span className="text-slate-600 dark:text-slate-300 font-medium truncate pr-2">{String(product.nama_barang)}</span>
                                                                                <span className="font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-[#111] px-2 py-0.5 rounded shrink-0">{String(product.qty)}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* TABEL GAGAL + FORM INPUT KOORDINAT MANUAL YANG DI-GLOW UP */}
                            {uploadReport.failed.length > 0 && (
                                <div className="bg-white dark:bg-[#1F1F1F] border border-red-200 dark:border-red-900/50 rounded-xl overflow-hidden shadow-sm mt-4">
                                    <div className="bg-red-50 dark:bg-red-900/20 px-5 py-3 border-b border-red-200 dark:border-red-900/50 flex justify-between items-center">
                                        <h3 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                                            <span className="material-symbols-outlined">warning</span>
                                            Error / Tanpa Koordinat ({uploadReport.failed.length})
                                        </h3>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-slate-50 dark:bg-[#111] sticky top-0 border-b border-slate-200 dark:border-[#333]">
                                                <tr className="text-slate-500 dark:text-slate-400">
                                                    <th className="px-5 py-3 font-bold">Nama Toko</th>
                                                    <th className="px-5 py-3 font-bold">Keterangan Error</th>
                                                    <th className="px-5 py-3 font-bold text-center w-80">Aksi (Input Koordinat)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-[#222]">
                                                {uploadReport.failed.map((item, idx) => (
                                                    <tr key={idx} className="hover:bg-red-50/30 dark:hover:bg-red-900/10">
                                                        <td className="px-5 py-3 font-bold text-slate-800 dark:text-slate-200">{item.nama_toko}</td>
                                                        <td className="px-5 py-3 text-red-600 dark:text-red-400 font-medium text-xs">{item.alasan}</td>
                                                        <td className="px-5 py-3">
                                                            <div className="flex flex-col sm:flex-row gap-2">
                                                                <div className="flex bg-slate-50 dark:bg-[#111] border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                                                                    <span className="bg-slate-100 dark:bg-[#222] text-slate-500 px-2 py-2 text-xs font-bold border-r border-slate-300 dark:border-slate-600 flex items-center">LAT</span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="-6.207"
                                                                        className="w-24 text-sm bg-transparent text-slate-800 dark:text-white px-2 py-2 outline-none"
                                                                        onChange={(e) => setFailedCoords({
                                                                            ...failedCoords,
                                                                            [idx]: { ...failedCoords[idx], lat: e.target.value }
                                                                        })}
                                                                    />
                                                                </div>
                                                                <div className="flex bg-slate-50 dark:bg-[#111] border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
                                                                    <span className="bg-slate-100 dark:bg-[#222] text-slate-500 px-2 py-2 text-xs font-bold border-r border-slate-300 dark:border-slate-600 flex items-center">LON</span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="106.816"
                                                                        className="w-24 text-sm bg-transparent text-slate-800 dark:text-white px-2 py-2 outline-none"
                                                                        onChange={(e) => setFailedCoords({
                                                                            ...failedCoords,
                                                                            [idx]: { ...failedCoords[idx], lon: e.target.value }
                                                                        })}
                                                                    />
                                                                </div>
                                                                <button
                                                                    onClick={() => handleSaveCoordinate(idx, item)}
                                                                    className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:brightness-110 shadow-md shadow-primary/20 transition-all flex items-center gap-1"
                                                                >
                                                                    <span className="material-symbols-outlined text-[14px]">save</span> SAVE
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-t border-slate-200 dark:border-[#333] flex justify-end gap-4 bg-white dark:bg-[#111]">
                            <button onClick={() => setShowVerificationModal(false)} className="px-6 py-3 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#222] rounded-xl transition-all">
                                Batal & Edit Excel
                            </button>
                            <button onClick={handleOptimizeRoute} className="px-8 py-3 font-black text-white bg-primary hover:brightness-110 rounded-xl shadow-xl shadow-primary/30 flex items-center gap-2 transition-all">
                                <span className="material-symbols-outlined">rocket_launch</span>
                                GAS PREVIEW RUTE AI SEKARANG!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Info Rincian Angka */}
            {activeModal && (
                <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
                    <div className="bg-white dark:bg-[#1F1F1F] rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 dark:border-[#333] overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
                        <div className="p-5 border-b border-slate-200 dark:border-[#333] flex justify-between items-center bg-slate-50 dark:bg-[#1A1A1A]">
                            <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
                                {activeModal === 'cost' && <><span className="material-symbols-outlined text-primary">payments</span> Rincian Cost Estimation</>}
                                {activeModal === 'distance' && <><span className="material-symbols-outlined text-primary">route</span> Rincian Total Distance</>}
                                {activeModal === 'fleet' && <><span className="material-symbols-outlined text-primary">local_shipping</span> Rincian Active Fleet</>}
                                {activeModal === 'stops' && <><span className="material-symbols-outlined text-primary">inventory_2</span> Rincian Total Stops</>}
                            </h3>
                            <button onClick={() => setActiveModal(null)} className="p-1 hover:bg-slate-200 dark:hover:bg-[#333] rounded-lg text-slate-500">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="p-5 overflow-y-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200 dark:border-[#333] text-slate-500 text-sm">
                                        <th className="pb-3 font-semibold">Truk (Nopol)</th>
                                        <th className="pb-3 font-semibold">Driver</th>
                                        {activeModal === 'cost' && <th className="pb-3 font-semibold text-right">Estimasi Biaya</th>}
                                        {activeModal === 'distance' && <th className="pb-3 font-semibold text-right">Jarak Tempuh</th>}
                                        {activeModal === 'fleet' && <th className="pb-3 font-semibold text-right">Tipe Armada</th>}
                                        {activeModal === 'stops' && <th className="pb-3 font-semibold text-right">Jumlah Toko</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {routesData.map((route, i) => (
                                        <tr key={i} className="border-b border-slate-100 dark:border-[#222] last:border-0 hover:bg-slate-50 dark:hover:bg-[#2A2A2A]">
                                            <td className="py-3 font-bold dark:text-white">{route.kendaraan}</td>
                                            <td className="py-3 text-slate-600 dark:text-slate-300">{route.driver_name}</td>
                                            {activeModal === 'cost' && <td className="py-3 text-right font-mono text-emerald-600">Rp 1.250.000</td>}
                                            {activeModal === 'distance' && <td className="py-3 text-right font-mono text-blue-500">{route.total_distance_km || '0'} KM</td>}
                                            {activeModal === 'fleet' && <td className="py-3 text-right text-slate-500">{route.jenis}</td>}
                                            {activeModal === 'stops' && <td className="py-3 text-right font-bold text-primary">{route.destinasi_jumlah} Toko</td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 🌟 UBAH LAYAR LOADING INI */}
            {(isUploading || isOptimizing) && (
                <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4">

                    {/* Ikon Animasi Berbeda Tergantung Status */}
                    {isUploading ? (
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mb-6"></div>
                    ) : (
                        <div className="text-6xl animate-bounce mb-6">🚚</div>
                    )}

                    <h3 className="text-xl font-bold text-white tracking-widest uppercase mb-2 text-center">
                        {isUploading ? 'MENGUNGGAH SAP KE DATABASE...' : 'AI SEDANG MENGHITUNG RUTE TERBAIK...'}
                    </h3>

                    {isOptimizing && (
                        <p className="text-slate-400 mb-8 text-sm animate-pulse">
                            Memproses matriks jalan dan menyeimbangkan beban JAPFA
                        </p>
                    )}

                    {/* Bar Loading (Hanya Muncul Pas Optimizing/Mikir AI) */}
                    {isOptimizing && (
                        <div className="w-full max-w-md bg-slate-800 rounded-full h-6 overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.3)] border border-slate-700">
                            <div
                                className="bg-primary h-full transition-all duration-300 ease-out flex items-center justify-end relative"
                                style={{ width: `${loadingProgress}%` }}
                            >
                                {/* Efek Cahaya di ujung bar */}
                                <div className="absolute right-0 top-0 bottom-0 w-10 bg-white/20 blur-sm"></div>
                                <span className="text-[10px] text-white font-black mr-3 drop-shadow-md">
                                    {loadingProgress}%
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-8 space-y-8">

                {routeMessage && (
                    <div className={`px-5 py-3 rounded-xl text-sm font-bold border flex items-center gap-3 shadow-sm ${String(routeMessage).includes('PERHATIAN') ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-emerald-50 text-emerald-700 border-emerald-300'}`}>
                        <span className="material-symbols-outlined text-xl">{String(routeMessage).includes('PERHATIAN') ? 'warning' : 'check_circle'}</span>
                        {String(routeMessage)}
                    </div>
                )}

                <div className="flex justify-between items-center bg-white dark:bg-[#1F1F1F] p-4 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm">
                    <div className="flex items-center gap-4">
                        <h3 className="font-bold text-slate-800 dark:text-white">Filter Jadwal:</h3>
                        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="px-3 py-2 bg-slate-50 dark:bg-[#111] border border-slate-300 dark:border-[#444] rounded-lg text-sm text-slate-700 dark:text-white outline-none focus:border-primary" />
                    </div>
                    <div className="flex items-center gap-3">
                        <button type="button" className="px-5 py-2.5 bg-white dark:bg-[#1F1F1F] border border-slate-300 dark:border-[#333] text-slate-700 dark:text-white font-bold rounded-lg hover:bg-slate-50 transition-all text-sm flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg text-emerald-600">download</span> Download Delivery Order
                        </button>
                        <button type="button" onClick={handleUploadClick} disabled={isUploading} className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg hover:brightness-110 transition-all text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-lg">upload_file</span> Upload SAP Excel
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" accept=".csv,.xlsx" onChange={handleFileUpload} />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-6">
                    <div onClick={() => setActiveModal('cost')} className="bg-white dark:bg-[#1F1F1F] p-5 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm cursor-pointer hover:border-primary transition-all">
                        <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cost Estimation</span><span className="material-symbols-outlined text-slate-300">payments</span></div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">Rp {totalCost}</div><div className="mt-2 text-[10px] text-primary">Klik rincian ↗</div>
                    </div>
                    <div onClick={() => setActiveModal('distance')} className="bg-white dark:bg-[#1F1F1F] p-5 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm cursor-pointer hover:border-primary transition-all">
                        <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Distance</span><span className="material-symbols-outlined text-slate-300">route</span></div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{totalRealDistance} <span className="text-lg">KM</span></div><div className="mt-2 text-[10px] text-primary">Klik rincian ↗</div>
                    </div>
                    <div onClick={() => setActiveModal('fleet')} className="bg-white dark:bg-[#1F1F1F] p-5 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm cursor-pointer hover:border-primary transition-all">
                        <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Fleet</span><span className="material-symbols-outlined text-slate-300">local_shipping</span></div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalFleet} Trucks</div><div className="mt-2 text-[10px] text-primary">Klik rincian ↗</div>
                    </div>
                    <div onClick={() => setActiveModal('stops')} className="bg-white dark:bg-[#1F1F1F] p-5 rounded-xl border border-slate-200 dark:border-[#333] shadow-sm cursor-pointer hover:border-primary transition-all">
                        <div className="flex justify-between items-start mb-2"><span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Stops</span><span className="material-symbols-outlined text-slate-300">inventory_2</span></div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalOrders} Destinations</div><div className="mt-2 text-[10px] text-primary">Klik rincian ↗</div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8 items-start pb-4">

                    {!isFocusMode && (
                        <div className="col-span-3 space-y-4 transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2"><span className="material-symbols-outlined text-slate-400">local_shipping</span> Today's Fleet</h3>
                            </div>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 pb-10">
                                {routesData.length > 0 ? (
                                    routesData.map((route) => {
                                        const maxCap = 2000;
                                        const loadPercent = Math.min(Math.round((route.total_berat / maxCap) * 100), 100);
                                        const colors = getTruckColors(loadPercent);
                                        return (
                                            <Truck3D
                                                key={route.route_id}
                                                plateNumber={route.kendaraan}
                                                driverName={route.driver_name}
                                                truckType={route.jenis}
                                                zone={route.zone}
                                                colorHex={colors.hex}
                                                percent={loadPercent}
                                                outerText={colors.text}
                                                loadKg={`${route.total_berat} / ${maxCap} Kg`}
                                                colorClass={colors.class}
                                                isSelected={selectedRouteId === route.route_id}
                                                onClick={() => { setSelectedRouteId(route.route_id); setExpandedStopIdx(null); }}
                                            />
                                        );
                                    })
                                ) : (
                                    <div className="p-10 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-300 dark:border-[#333] rounded-2xl text-slate-500">
                                        <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">manage_search</span>
                                        <p className="font-bold">Belum ada rute.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className={`${isFocusMode ? 'col-span-12' : 'col-span-9'} space-y-4 transition-all duration-300`}>
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2"><span className="material-symbols-outlined text-slate-400">timeline</span> Route Sequence {selectedRoute && `- ${selectedRoute.kendaraan}`}</h3>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setIsFocusMode(!isFocusMode)} className={`px-3 py-1.5 border rounded-lg text-sm font-bold transition-colors flex items-center gap-1 ${isFocusMode ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20' : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:hover:bg-[#1A1A1A] dark:text-slate-300 dark:border-[#333]'}`}>
                                    <span className="material-symbols-outlined text-base">{isFocusMode ? 'fullscreen_exit' : 'fullscreen'}</span>
                                    {isFocusMode ? 'Normal View' : 'Focus Mode'}
                                </button>
                                <button type="button" onClick={() => setShowMapView(!showMapView)} className={`px-4 py-2 border rounded-lg text-sm font-bold transition-colors ${showMapView ? 'bg-slate-800 text-white border-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:hover:bg-[#1A1A1A] dark:text-slate-300 dark:border-[#333]'}`}>
                                    {showMapView ? 'List View' : 'Map View'}
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#1F1F1F] border border-slate-200 dark:border-[#333] rounded-xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
                            {/* 🌟 LOGIKA MAP VIEW (YANG SEKARANG DI-DISABLE KARENA UDAH PINDAH BAWAH, TAPI TETEP DI SINI KALO ADMIN MAU LAYAR KECIL) */}
                            {showMapView ? (
                                <div className="flex-1 bg-slate-100 dark:bg-[#1A1A1A] flex flex-col relative w-full h-[500px] z-0">
                                    <MapComponent
                                        routesData={routesData}
                                        selectedRouteId={selectedRouteId}
                                        truckColors={truckColors}
                                    />

                                    {/* 🌟 LEGENDA PETA KECIL YANG BISA DIKLIK (INTERAKTIF) */}
                                    {routesData.length > 0 && (
                                        <div className="absolute bottom-6 right-6 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[250px] overflow-y-auto min-w-[200px] transition-all">
                                            <h4 className="text-[10px] font-black uppercase text-slate-500 mb-3 tracking-wider flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">local_shipping</span> Rute Aktif</span>
                                                <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded">Pilih Manual</span>
                                            </h4>
                                            <div className="space-y-2">
                                                {routesData.map((truk, i) => {
                                                    const isThisSelected = selectedRouteId === truk.route_id;
                                                    const isOtherSelected = selectedRouteId !== null && !isThisSelected;
                                                    return (
                                                        <div
                                                            key={i}
                                                            onClick={() => setSelectedRouteId(isThisSelected ? null : truk.route_id)}
                                                            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all select-none ${isThisSelected ? 'bg-slate-100 dark:bg-slate-800 border border-primary scale-105 shadow-sm' : 'border border-transparent hover:border-slate-300 dark:hover:border-slate-600'} ${isOtherSelected ? 'opacity-40 grayscale hover:opacity-100' : ''}`}
                                                        >
                                                            <div className={`w-4 h-4 rounded-full shadow-inner border border-white ${isThisSelected ? 'animate-pulse' : ''}`} style={{ backgroundColor: truckColors[i % truckColors.length] }}></div>
                                                            <div>
                                                                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block leading-none">{truk.kendaraan}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                selectedRoute ? (
                                    <div className="p-8 flex-1 overflow-y-auto max-h-[600px]">
                                        <div className="space-y-0 relative">
                                            <div className="absolute left-[9px] top-2 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-700 border-l-2 border-dashed border-slate-200 dark:border-[#333] -z-10"></div>

                                            <div className="relative pl-10 pb-10">
                                                <div className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center ring-4 ring-white dark:ring-[#1F1F1F]"><span className="text-[10px] text-white font-bold">0</span></div>
                                                <div className="flex justify-between items-start">
                                                    <div><h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">Main Distribution Center</h4><p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Gudang JAPFA Cikupa</p>
                                                        <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 bg-slate-100 dark:bg-[#1A1A1A] text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded"><span className="material-symbols-outlined text-xs">inventory</span> TOTAL MUATAN: {selectedRoute.total_berat} KG</div></div>
                                                    <div className="text-right"><span className="text-sm font-bold text-slate-900 dark:text-white">06:00 AM</span><p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Berangkat</p></div>
                                                </div>
                                            </div>

                                            {selectedRoute.detail_rute.map((stop, idx) => (
                                                <div key={idx} className="relative pl-10 pb-10">
                                                    <div
                                                        className="absolute left-[-11px] top-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-white dark:ring-[#1F1F1F] cursor-pointer hover:scale-110 transition-transform"
                                                        onClick={() => setExpandedStopIdx(expandedStopIdx === idx ? null : idx)}
                                                    >
                                                        <span className="text-[10px] text-white font-bold">{idx + 1}</span>
                                                    </div>

                                                    <div className="flex justify-between items-start cursor-pointer group" onClick={() => setExpandedStopIdx(expandedStopIdx === idx ? null : idx)}>
                                                        <div>
                                                            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-primary transition-colors flex items-center gap-2">
                                                                {stop.nama_toko}
                                                                <span className={`material-symbols-outlined text-lg transition-transform ${expandedStopIdx === idx ? 'rotate-180' : ''}`}>expand_more</span>
                                                            </h4>
                                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-mono text-[11px]">📍 GPS: {stop.latitude}, {stop.longitude}</p>
                                                            <div className="mt-3 flex gap-3">
                                                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                                                    <span className="material-symbols-outlined text-xs">package_2</span> {stop.berat_kg} KG Total Turun
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-sm font-bold text-primary">{formatTimeWindow(stop.jam_tiba, stop.berat_kg)}</span>
                                                            <p className="text-[10px] text-primary font-bold uppercase mt-1">Est. Time Window</p>
                                                        </div>
                                                    </div>

                                                    {expandedStopIdx === idx && stop.items && stop.items.length > 0 && (
                                                        <div className="mt-4 bg-slate-50 dark:bg-[#1A1A1A] rounded-xl border border-slate-200 dark:border-[#333] p-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                                            <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2 uppercase">
                                                                <span className="material-symbols-outlined text-sm">receipt_long</span> Rincian Produk Dikirim:
                                                            </h5>
                                                            <ul className={`grid gap-2 ${isFocusMode ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                                                {stop.items.map((product, prodIdx) => (
                                                                    <li key={prodIdx} className="flex justify-between items-center text-sm border-b border-slate-200 dark:border-[#333] pb-2">
                                                                        <span className="text-slate-600 dark:text-slate-300 font-medium">{String(product.nama_barang)}</span>
                                                                        <span className="font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-[#111] px-2 py-1 rounded">{String(product.qty)}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-8 flex-1 flex flex-col items-center justify-center text-slate-500 opacity-60">
                                        <span className="material-symbols-outlined text-5xl mb-3">touch_app</span>
                                        <h4 className="font-bold">Pilih Truk di sebelah kiri untuk melihat urutan</h4>
                                    </div>
                                )
                            )}

                            <div className="bg-slate-50 dark:bg-[#1A1A1A] p-6 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-[#333]">
                                <button type="button" onClick={() => window.print()} disabled={!selectedRoute} className="px-6 py-2.5 bg-white dark:bg-[#1F1F1F] border border-slate-300 dark:border-[#333] text-slate-700 dark:text-white font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-[#2A2A2A] text-sm flex items-center gap-2 disabled:opacity-50">
                                    <span className="material-symbols-outlined text-lg">picture_as_pdf</span> Cetak Surat Jalan (PDF)
                                </button>
                                <button type="button" onClick={() => alert(`Jadwal berhasil dikirim ke HP Supir: ${selectedRoute?.driver_name}!`)} disabled={!selectedRoute} className="px-8 py-2.5 bg-primary text-white font-bold rounded-lg hover:brightness-110 text-sm shadow-lg shadow-primary/25 flex items-center gap-2 disabled:opacity-50">
                                    <span className="material-symbols-outlined text-lg">done_all</span> Kirim ke HP Supir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🌟 BAGIAN PETA GEDE DI BAWAH (SCROLLABLE) + MANUAL TRUK */}
                <div className="w-full mt-8 bg-white dark:bg-[#1F1F1F] border border-slate-200 dark:border-[#333] rounded-2xl shadow-sm overflow-hidden flex flex-col h-[70vh] min-h-[600px]">
                    <div className="p-5 border-b border-slate-200 dark:border-[#333] shrink-0 flex justify-between items-center bg-slate-50 dark:bg-[#1A1A1A]">
                        <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tight flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">map</span> Live Route Map
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-200 dark:bg-[#333] px-2 py-1 rounded">Semua Rute Aktif</span>
                    </div>

                    <div className="flex-1 relative bg-slate-100 dark:bg-[#0a0a0a]">
                        <MapComponent
                            routesData={routesData}
                            selectedRouteId={selectedRouteId}
                            truckColors={truckColors}
                            droppedNodesData={droppedNodes}
                        />

                        {/* 🌟 LEGENDA PETA KECIL YANG BISA DIKLIK (INTERAKTIF / MANUAL TRUK) */}
                        {routesData.length > 0 && (
                            <div className="absolute bottom-6 right-6 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[250px] overflow-y-auto min-w-[200px] transition-all">
                                <h4 className="text-[10px] font-black uppercase text-slate-500 mb-3 tracking-wider flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">local_shipping</span> Rute Aktif</span>
                                    <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded">Pilih Manual</span>
                                </h4>
                                <div className="space-y-2">
                                    {routesData.map((truk, i) => {
                                        const isThisSelected = selectedRouteId === truk.route_id;
                                        const isOtherSelected = selectedRouteId !== null && !isThisSelected;
                                        return (
                                            <div
                                                key={i}
                                                onClick={() => setSelectedRouteId(isThisSelected ? null : truk.route_id)}
                                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all select-none ${isThisSelected ? 'bg-slate-100 dark:bg-slate-800 border border-primary scale-105 shadow-sm' : 'border border-transparent hover:border-slate-300 dark:hover:border-slate-600'} ${isOtherSelected ? 'opacity-40 grayscale hover:opacity-100' : ''}`}
                                            >
                                                <div className={`w-4 h-4 rounded-full shadow-inner border border-white ${isThisSelected ? 'animate-pulse' : ''}`} style={{ backgroundColor: truckColors[i % truckColors.length] }}></div>
                                                <div>
                                                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block leading-none">{truk.kendaraan}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ALERT DROPPED NODES MENGAMBANG DI ATAS PETA BAWAH */}
                        {droppedNodes.length > 0 && (
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-red-200 dark:border-red-900 flex items-center gap-2 animate-bounce cursor-pointer hover:scale-105 transition-transform" onClick={() => alert(`Ada ${droppedNodes.length} toko yang gagal di-routing (Kapasitas Penuh / Luar Jam). Silahkan cek tabel merah di bagian atas!`)}>
                                <span className="material-symbols-outlined text-red-600 text-lg">warning</span>
                                <span className="text-xs font-black text-red-600 uppercase tracking-wider">{droppedNodes.length} Toko Gagal AI!</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}