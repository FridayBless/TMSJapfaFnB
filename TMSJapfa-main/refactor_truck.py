import sys
import re

file_path = 'src/screens/RoutePlanning.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Define the Truck3D component to be inserted after ROUTE_STOPS
truck_component = """
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
"""

if "const Truck3D = " not in text:
    target = "];\n\nexport default function RoutePlanning() {"
    text = text.replace(target, "];\n\n" + truck_component + "\nexport default function RoutePlanning() {")

# 2. Replace the Left Column content
new_left_column = """                        {/* Left Column: Fleet List */}
                        <div className="col-span-5 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-slate-400 dark:text-slate-300">local_shipping</span>
                                    Today's Fleet
                                </h3>
                                <button className="text-xs font-semibold text-primary hover:underline">View All</button>
                            </div>

                            <div className="space-y-4">
                                <Truck3D 
                                    plateNumber="B 9513 JXS"
                                    driverName="Budi Santoso"
                                    truckType="Heavy Duty"
                                    zone="KELAPA GADING"
                                    colorHex="#10b981"
                                    percent={92}
                                    outerText="Optimal • 92%"
                                    loadKg="1840 / 2000 Kg"
                                    colorClass="emerald"
                                    isSelected={true}
                                />
                                
                                <Truck3D 
                                    plateNumber="B 9144 BCD"
                                    driverName="Ahmad Reza"
                                    truckType="Medium Duty"
                                    zone="CENGKARENG"
                                    colorHex="#f59e0b"
                                    percent={65}
                                    outerText="Moderate • 65%"
                                    loadKg="975 / 1500 Kg"
                                    colorClass="amber"
                                    isSelected={false}
                                />
                                
                                <Truck3D 
                                    plateNumber="B 9001 TXT"
                                    driverName="Siti Aminah"
                                    truckType="Light Duty"
                                    zone="BEKASI SELATAN"
                                    colorHex="#ef4444"
                                    percent={35}
                                    outerText="Low • 35%"
                                    loadKg="350 / 1000 Kg"
                                    colorClass="red"
                                    isSelected={false}
                                />
                            </div>
                        </div>"""

start_str = "{/* Left Column: Fleet List */}"
end_str = "{/* Right Column: Route Sequence */}"

start_idx = text.find(start_str)
end_idx = text.find(end_str)

if start_idx != -1 and end_idx != -1:
    old_left_column = text[start_idx:end_idx]
    # Keep the indenting correct
    text = text[:start_idx] + new_left_column + "\n\n                        " + text[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Refactor complete.")
