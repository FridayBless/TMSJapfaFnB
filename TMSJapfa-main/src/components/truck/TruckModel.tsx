import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface TruckModelProps {
    position?: [number, number, number];
    targetWidth?: number;
}

export const TruckModel: React.FC<TruckModelProps> = ({
    position = [0, 0, 0],
    targetWidth = 4.2
}) => {
    // Load the GLB model
    const { scene } = useGLTF('/truck-model.glb');
    const [model, setModel] = useState<THREE.Group | null>(null);

    useEffect(() => {
        if (!scene) return;

        // Clone to avoid modifying the cached original
        const clonedScene = scene.clone();

        // Calculate bounding box to determine scale and center
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const scale = targetWidth / size.x;
        clonedScene.scale.set(scale, scale, scale);

        // Align base to the ground (y: 0) and center on X/Z
        clonedScene.position.y = -box.min.y * scale;
        clonedScene.position.x = -center.x * scale;
        clonedScene.position.z = -center.z * scale;

        // Inspection loop
        clonedScene.traverse((child: any) => {
            if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                const name = (mesh.name || '').toLowerCase();

                mesh.geometry.computeBoundingBox();
                const meshBox = mesh.geometry.boundingBox;
                const meshSize = new THREE.Vector3();
                if (meshBox) meshBox.getSize(meshSize);

                // Heuristic to hide container parts:
                // If it's a large mesh behind the center of the cabin
                // (Assumes cabin is the focus and container is extra)
                if (meshSize.z > 3 && mesh.position.z > 0.5) {
                    mesh.visible = false;
                }

                // Explicit names
                if (name.includes('container') ||
                    name.includes('cargo') ||
                    name.includes('box_model') ||
                    name.includes('bed')) {
                    mesh.visible = false;
                }
            }
        });

        setModel(clonedScene);
    }, [scene, targetWidth]);

    if (!model) return null;

    return (
        <group position={position}>
            <primitive object={model} />
        </group>
    );
};

// Preload the model
useGLTF.preload('/truck-model.glb');
