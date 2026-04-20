import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Box3 } from 'three';
import { useLoadStore } from '../../store/loadStore';

interface GhostBoxProps {
    detectionMeshes: Mesh[];
}

const GhostBox: React.FC<GhostBoxProps> = ({ detectionMeshes }) => {
    const { isDragging, dragPosition } = useLoadStore();
    const meshRef = useRef<Mesh>(null);
    const [isColliding, setIsColliding] = useState(false);

    useFrame(() => {
        if (!isDragging || !meshRef.current || !dragPosition) return;

        // Follow the drag position (synced from store)
        meshRef.current.position.set(dragPosition[0], dragPosition[1], dragPosition[2]);

        // Simple AABB Collision Detection for now (can be expanded with BVH later)
        const ghostBox = new Box3().setFromObject(meshRef.current);
        let collision = false;

        for (const mesh of detectionMeshes) {
            if (!mesh) continue;
            const otherBox = new Box3().setFromObject(mesh);
            if (ghostBox.intersectsBox(otherBox)) {
                collision = true;
                break;
            }
        }

        setIsColliding(collision);
    });

    if (!isDragging || !dragPosition) return null;

    return (
        <group>
            <mesh ref={meshRef}>
                <boxGeometry args={[1.2, 0.8, 1.1]} />
                <meshStandardMaterial
                    color={isColliding ? '#ff0000' : '#00ff00'}
                    transparent
                    opacity={0.5}
                    emissive={isColliding ? '#ff0000' : '#00ff00'}
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Outline for better visibility */}
            <mesh position={[dragPosition[0], dragPosition[1], dragPosition[2]]}>
                <boxGeometry args={[1.22, 0.82, 1.12]} />
                <meshBasicMaterial color={isColliding ? 'red' : 'lime'} wireframe />
            </mesh>
        </group>
    );
};

export default GhostBox;
