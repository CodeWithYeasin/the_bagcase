"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import * as THREE from "three";

function SuitcaseModel() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.5, 0.95]} />
        <meshStandardMaterial color="#1B2A4A" metalness={0.35} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <torusGeometry args={[0.56, 0.09, 24, 100, Math.PI]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.7} roughness={0.2} />
      </mesh>
      <mesh position={[1.12, 0, 0.52]}>
        <boxGeometry args={[0.06, 1.2, 0.04]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-1.12, 0, 0.52]}>
        <boxGeometry args={[0.06, 1.2, 0.04]} />
        <meshStandardMaterial color="#C9A84C" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-navy via-[#223763] to-cream pt-24">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 3, 3]} intensity={1.5} color="#C9A84C" />
          <spotLight position={[-4, 4, 3]} intensity={1.2} angle={0.4} penumbra={0.3} />
          <Float speed={1.25} rotationIntensity={0.2} floatIntensity={0.7}>
            <SuitcaseModel />
          </Float>
          <Stars radius={55} depth={28} count={900} factor={4} saturation={0} fade speed={0.8} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />
        </Canvas>
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-xl"
        >
          <p className="text-sm tracking-[0.28em] text-gold">EST. 2023</p>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-cream md:text-7xl">Exquisite Travel & Lifestyle</h1>
          <p className="mt-6 text-cream/90">
            Discover luxury essentials designed for modern journeys with timeless craftsmanship.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-full border border-gold bg-navy px-8 py-3 font-semibold text-cream shadow-[0_0_0_0_rgba(201,168,76,.7)] transition duration-300 hover:bg-gold hover:text-navy hover:shadow-[0_0_24px_0_rgba(201,168,76,.8)]"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
