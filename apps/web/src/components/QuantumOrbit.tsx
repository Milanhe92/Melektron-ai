'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function QuantumOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add lights so emissive & materials look good
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create quantum orbits
    const orbits: THREE.Mesh[] = [];
    const colors = [0x06b6d4, 0x8b5cf6, 0xec4899, 0x10b981, 0xf59e0b];

    colors.forEach((color, index) => {
      const geometry = new THREE.TorusGeometry(3 + index * 1.5, 0.2, 16, 100);
      const material = new THREE.MeshStandardMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
        metalness: 0.3,
        roughness: 0.6,
      });
      const orbit = new THREE.Mesh(geometry, material);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);
      orbits.push(orbit);
    });

    // Add central glowing particle
    const particleGeometry = new THREE.SphereGeometry(1, 32, 32);
    const particleMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.7,
      metalness: 0.5,
      roughness: 0.3,
    });
    const particle = new THREE.Mesh(particleGeometry, particleMaterial);
    scene.add(particle);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);

      orbits.forEach((orbit, index) => {
        orbit.rotation.y += 0.002 * (index + 1);
        orbit.rotation.x += 0.001 * (index + 1);
      });

      particle.rotation.x += 0.01;
      particle.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-64 md:h-96" />;
}