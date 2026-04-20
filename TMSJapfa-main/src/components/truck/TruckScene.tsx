import React, { Suspense, useState, useRef } from 'react';
import { useLoadStore } from '../../store/loadStore';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, TransformControls } from '@react-three/drei';
import { useControls } from 'leva';
import TruckSlot from './TruckSlot';
import { TruckModel } from './TruckModel';
import GhostBox from './GhostBox';
import type { Mesh } from 'three';
import { CapacityProgressBar } from '../ui/CapacityProgressBar';
import { SidebarInspector } from '../ui/SidebarInspector';

const TruckScene: React.FC = () => {
    const { truckCapacityTier, sceneBackground, isDragging, setDragPosition } = useLoadStore();
    const [detectionMeshes, setDetectionMeshes] = useState<Mesh[]>([]);
    const bedRef = useRef<Mesh>(null);
    const cabinRef = useRef<any>(null);

    // Populate detection meshes for collision
    React.useEffect(() => {
        if (bedRef.current) {
            setDetectionMeshes([bedRef.current]);
        }
    }, [truckCapacityTier]); // Re-run if capacity/trailer changes

    // TRAILER & ELEVATION CONFIGURATION
    // You can easily adjust these to shift the truck and bed vertical positions
    const ELEVATION_CONFIG = {
        CHASSIS_Y: -0.6,
        BED_RELATIVE_Y: -0.2,
        TRUCK_RELATIVE_Y: -1.35,
        TRUCK_FORWARD_OFFSET: -3.5,
        ROTATION_Y: Math.PI,
        LINEAR_X_OFFSET: 2.5,
        LINEAR_Z_OFFSET: 2.0
    };

    // LEVA CONTROLS FOR CALIBRATION
    const { debugMode, showGrid } = useControls('General Debug', {
        debugMode: { value: false, label: 'Debug Mode (Helpers)' },
        showGrid: { value: false, label: 'Show Ground Grid' }
    });

    const cabinCalib = useControls('Truck Model Calibration', {
        posX: { value: 0.01, min: -10, max: 10, step: 0.01, label: 'Shift X' },
        posY: { value: -1.93, min: -5, max: 5, step: 0.01, label: 'Shift Y' },
        posZ: { value: -1.48, min: -20, max: 20, step: 0.01, label: 'Shift Z' },
        rotY: { value: -3.14, min: -Math.PI, max: Math.PI, step: 0.01, label: 'Rotation Y' },
        scale: { value: 4.7, min: 1, max: 10, step: 0.1, label: 'Scale' }
    });

    const getTrailerConfig = () => {
        switch (truckCapacityTier) {
            case '2T': return { length: 4.5, rows: 3, cols: 3 };
            case '2.7T': return { length: 5.5, rows: 4, cols: 3 };
            case '5T': default: return { length: 7.5, rows: 5, cols: 3 };
        }
    };

    const config = getTrailerConfig();

    // Track cursor on the bed for GhostBox positioning
    const handlePointerMove = (e: any) => {
        if (!isDragging) return;
        setDragPosition([e.point.x, e.point.y + 0.5, e.point.z]);
    };

    // Slot elevation
    const SLOT_LOCAL_Y = ELEVATION_CONFIG.BED_RELATIVE_Y + 0.3 + 0.05 + 0.1;

    // Multi-layer slot generation
    const LAYERS = 3;
    const LAYER_HEIGHT = 1.0;
    const slots: { pos: [number, number, number]; index: number }[] = [];
    const colSpacing = 1.2;

    for (let l = 0; l < LAYERS; l++) {
        for (let r = 0; r < config.rows; r++) {
            for (let c = 0; c < config.cols; c++) {
                slots.push({
                    pos: [
                        (c - 1) * colSpacing,
                        SLOT_LOCAL_Y + l * LAYER_HEIGHT,
                        (r - (config.rows - 1) / 2) * 1.1
                    ],
                    index: l * (config.rows * config.cols) + r * config.cols + c
                });
            }
        }
    }

    return (
        <div className="w-full h-full min-h-[600px] flex bg-[#020617] overflow-hidden rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5">
            {/* 3D Scene Viewport */}
            <div className="flex-1 relative">
                <Canvas shadows gl={{ antialias: true }} dpr={[1, 2]}>
                    <color attach="background" args={[sceneBackground]} />
                    <Suspense fallback={null}>
                        <PerspectiveCamera makeDefault position={[12, 10, 12]} fov={30} />
                        <OrbitControls
                            enablePan={false}
                            maxPolarAngle={Math.PI / 2.1}
                            minDistance={8}
                            maxDistance={25}
                        />

                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />

                        <Environment preset="studio" />
                        <ContactShadows
                            position={[0, -0.6, 0]}
                            opacity={0.5}
                            scale={30}
                            blur={2.5}
                            far={5}
                        />

                        {debugMode && (
                            <>
                                <gridHelper args={[50, 50, 0xff0000, 0x444444]} position={[0, -0.6, 0]} />
                                <axesHelper args={[10]} />
                            </>
                        )}

                        {showGrid && <gridHelper args={[100, 100]} position={[0, -0.61, 0]} />}

                        <GhostBox detectionMeshes={detectionMeshes} />

                        <group
                            position={[
                                ELEVATION_CONFIG.LINEAR_X_OFFSET,
                                ELEVATION_CONFIG.CHASSIS_Y,
                                ELEVATION_CONFIG.LINEAR_Z_OFFSET
                            ]}
                            rotation={[0, ELEVATION_CONFIG.ROTATION_Y, 0]}
                            scale={[-1, 1, 1]}
                        >
                            <mesh
                                ref={bedRef}
                                position={[0, 1.5, 0]}
                                rotation={[-Math.PI / 2, 0, 0]}
                                visible={false}
                                onPointerMove={handlePointerMove}
                            >
                                <planeGeometry args={[10, 20]} />
                            </mesh>

                            <group
                                position={[cabinCalib.posX, cabinCalib.posY, cabinCalib.posZ]}
                                rotation={[0, cabinCalib.rotY, 0]}
                                ref={cabinRef}
                            >
                                {debugMode && (
                                    <TransformControls
                                        object={cabinRef.current}
                                        mode="translate"
                                    />
                                )}
                                <TruckModel targetWidth={cabinCalib.scale} />
                            </group>

                            {/* Cargo Bed */}
                            <mesh position={[0, ELEVATION_CONFIG.BED_RELATIVE_Y + 0.3, 0]} receiveShadow>
                                <boxGeometry args={[4.2, 0.1, config.length]} />
                                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
                            </mesh>

                            {/* Transparent Enclosure (Walls & Roof) */}
                            <group position={[0, ELEVATION_CONFIG.BED_RELATIVE_Y + 1.85, 0]}>
                                {/* Front Wall */}
                                <mesh position={[0, 0, -config.length / 2]}>
                                    <boxGeometry args={[4.2, 3, 0.1]} />
                                    <meshStandardMaterial color="#1e293b" metalness={0.8} />
                                </mesh>
                                {/* Left/Right Transparent Walls */}
                                <mesh position={[-2.1, 0, 0]}>
                                    <boxGeometry args={[0.05, 3, config.length]} />
                                    <meshStandardMaterial color="#ffffff" transparent opacity={0.05} />
                                </mesh>
                                <mesh position={[2.1, 0, 0]}>
                                    <boxGeometry args={[0.05, 3, config.length]} />
                                    <meshStandardMaterial color="#ffffff" transparent opacity={0.05} />
                                </mesh>
                                {/* Roof */}
                                <mesh position={[0, 1.5, 0]}>
                                    <boxGeometry args={[4.2, 0.05, config.length]} />
                                    <meshStandardMaterial color="#ffffff" transparent opacity={0.1} />
                                </mesh>
                            </group>

                            {slots.map((slot) => (
                                <TruckSlot key={slot.index} position={slot.pos} index={slot.index} />
                            ))}
                        </group>
                    </Suspense>
                </Canvas>

                {/* Overlays inside the canvas area */}
                <div className="absolute top-6 left-6 flex flex-col gap-4 pointer-events-none text-on-surface">
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 p-4 rounded-2xl shadow-2xl pointer-events-auto">
                        <div className="text-[10px] text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest mb-1">Vehicle Status</div>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <div className="text-slate-900 dark:text-white font-bold">{truckCapacityTier} Logistic Unit</div>
                        </div>
                    </div>
                    <CapacityProgressBar />
                </div>

                <div className="absolute bottom-6 left-6 pointer-events-none">
                    <div className="bg-white/40 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/5 p-3 rounded-xl text-slate-500 dark:text-white/50 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
                        Scroll to Zoom • Left Click to Rotate<br />
                        Drag Items to Load • Click Slot to Inspect
                    </div>
                </div>
            </div>

            {/* Sidebar Inspector Panel */}
            <div className="w-96 flex-none">
                <SidebarInspector />
            </div>
        </div>
    );
};

export default TruckScene;
