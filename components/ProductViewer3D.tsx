"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function BagModel() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[2.2, 1.4, 0.8]} />
        <meshStandardMaterial color="#1B2A4A" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.95, 0]}>
        <torusGeometry args={[0.5, 0.09, 20, 80, Math.PI]} />
        <meshStandardMaterial color="#C9A84C" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.2, 0.45]}>
        <boxGeometry args={[1.8, 0.12, 0.04]} />
        <meshStandardMaterial color="#C9A84C" />
      </mesh>
    </group>
  );
}

export default function ProductViewer3D() {
  return (
    <div className="h-[380px] rounded-2xl border border-gold/20 bg-gradient-to-b from-navy to-[#30497D]">
      <Canvas camera={{ position: [0, 0, 4], fov: 40 }} shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} color="#C9A84C" intensity={1.5} />
        <directionalLight position={[-3, 4, 2]} intensity={1} />
        <BagModel />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
