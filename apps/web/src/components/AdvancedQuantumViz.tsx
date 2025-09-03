// src/components/AdvancedQuantumViz.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const AdvancedQuantumViz = ({ theta, phi }: { theta: number; phi: number }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    // Inicijalizacija Three.js samo ako mountRef postoji
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(400, 400);
    
    // Sigurno dodavanje DOM elementa jer mountRef.current sigurno postoji
    mountRef.current.appendChild(renderer.domElement);

    // Kreiranje kvantne sferne mreže
    const quantumGeometry = new THREE.SphereGeometry(1, 32, 32);
    const quantumMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x7e22ce, 
      wireframe: true,
      opacity: 0.3,
      transparent: true
    });
    const quantumSphere = new THREE.Mesh(quantumGeometry, quantumMaterial);
    scene.add(quantumSphere);

    // Pozicioniranje kamere
    camera.position.z = 3;

    // Postavljanje stanja za korišćenje u drugim efektima
    setScene(scene);
    setRenderer(renderer);
    setCamera(camera);

    // Animacija
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotacija kvantne sfere
      quantumSphere.rotation.x += 0.01;
      quantumSphere.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Cleanup funkcija
    return () => {
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Efekat za ažuriranje kvantnog stanja kada se promene theta i phi
  useEffect(() => {
    if (!scene || !camera) return;

    // Ažuriranje pozicije na osnovu theta i phi parametara
    // Ovo je pojednostavljen primer - možete dodati kompletniju logiku
    const x = Math.sin(theta) * Math.cos(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(theta);

    // Ovde možete ažurirati scenu na osnovu novih parametara
    // Na primer, pomeriti objekte ili promeniti materijale

  }, [theta, phi, scene, camera]);

  return (
    <div className="quantum-viz-container">
      <div 
        ref={mountRef} 
        className="quantum-viz-canvas"
        style={{ width: '400px', height: '400px' }}
      />
      
      <div className="quantum-state-info">
        <h3>Kvantno Stanje</h3>
        <p>Theta (θ): {theta.toFixed(2)} radijana</p>
        <p>Phi (φ): {phi.toFixed(2)} radijana</p>
      </div>
    </div>
  );
};

export default AdvancedQuantumViz;