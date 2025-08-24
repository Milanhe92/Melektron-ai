'use client';

import { useEffect, useRef, useState } from 'react';
import VantaEffect from '../components/VantaEffect';
import Chart from 'chart.js/auto';
import * as THREE from 'three';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function HomePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const universeCanvasRef = useRef<HTMLCanvasElement>(null);
  const VantaEffect = dynamic(() => import('@/components/VantaEffect'), {
  ssr: false
});

  // Initialize Vanta.js background
useEffect(() => {
  const initVanta = async () => {
    // @ts-ignore: Ignoriši TypeScript grešku za Vanta.js
    const { NET } = await import('vanta/dist/vanta.net.min');
    NET({
      el: vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x8a2be2,
      backgroundColor: 0x0a0a18,
      points: 15.00,
      maxDistance: 24.00,
      spacing: 17.00
    });
  };

  initVanta();
}, []);

  // Initialize revenue chart
  useEffect(() => {
    if (revenueChartRef.current) {
      const ctx = revenueChartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Creator Staking', 'Genesis NFT', 'AI Tržište', 'AI Avatari', 'Melektron Shield', 'Kvantni Krediti', 'Ugljenični Krediti', 'Enterprise API'],
            datasets: [{
              label: 'Projekcija godišnjeg prihoda (milioni $)',
              data: [5, 12, 8, 6, 15, 20, 50, 25],
              backgroundColor: [
                'rgba(138, 43, 226, 0.7)',
                'rgba(0, 191, 255, 0.7)',
                'rgba(255, 215, 0, 0.7)',
                'rgba(0, 255, 157, 0.7)',
                'rgba(255, 0, 255, 0.7)',
                'rgba(255, 123, 0, 0.7)',
                'rgba(0, 255, 255, 0.7)',
                'rgba(255, 50, 50, 0.7)'
              ],
              borderColor: [
                'rgba(138, 43, 226, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(255, 215, 0, 1)',
                'rgba(0, 255, 157, 1)',
                'rgba(255, 0, 255, 1)',
                'rgba(255, 123, 0, 1)',
                'rgba(0, 255, 255, 1)',
                'rgba(255, 50, 50, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: '#e5e7eb',
                  font: {
                    size: 14
                  }
                }
              },
              title: {
                display: true,
                text: 'Projekcija prihoda po modelima (u milionima USD)',
                color: '#fff',
                font: {
                  size: 18,
                  family: "'Orbitron', sans-serif"
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: '#e5e7eb'
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              },
              x: {
                ticks: {
                  color: '#e5e7eb',
                  font: {
                    size: 12
                  }
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              }
            }
          }
        });
      }
    }
  }, []);

  // Initialize universe simulator
  useEffect(() => {
    if (universeCanvasRef.current) {
      const canvas = universeCanvasRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      // Create stars
      const starsGeometry = new THREE.BufferGeometry();
      const starsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        sizeAttenuation: true
      });

      const starsVertices: number[] = [];
      for (let i = 0; i < 10000; i++) {
        starsVertices.push(
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000,
          (Math.random() - 0.5) * 2000
        );
      }

      starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
      const starField = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starField);

      // Create central singularity
      const singularityGeometry = new THREE.SphereGeometry(15, 32, 32);
      const singularityMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000,
        wireframe: true
      });
      const singularity = new THREE.Mesh(singularityGeometry, singularityMaterial);
      scene.add(singularity);

      // Create accretion disk
      const diskGeometry = new THREE.RingGeometry(20, 100, 64);
      const diskMaterial = new THREE.MeshBasicMaterial({
        color: 0x8a2be2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5
      });
      const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
      accretionDisk.rotation.x = Math.PI / 2;
      scene.add(accretionDisk);

      // Create Melektron modules
      const modules: THREE.Mesh[] = [];
      const moduleGeometry = new THREE.TetrahedronGeometry(5, 0);
      const moduleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff9d,
        wireframe: true
      });

      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const radius = 50 + Math.random() * 50;
        const height = Math.random() * 100 - 50;

        const module = new THREE.Mesh(moduleGeometry, moduleMaterial);
        module.position.set(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        );

        scene.add(module);
        modules.push(module);
      }

      // Position camera
      camera.position.z = 150;

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);

        starField.rotation.x += 0.0005;
        starField.rotation.y += 0.001;

        singularity.rotation.y += 0.005;
        accretionDisk.rotation.z += 0.01;

        // Animate modules
        const time = Date.now() * 0.001;
        modules.forEach((module, index) => {
          module.rotation.x += 0.01;
          module.rotation.y += 0.02;
          module.position.y = Math.sin(time + index) * 30;
        });

        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Quantum particles effect
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('quantum-particle');

      const size = Math.random() * 3 + 1;
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      const duration = Math.random() * 10 + 5;
      const delay = Math.random() * 5;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}px`;
      particle.style.top = `${posY}px`;
      particle.style.animation = `moveParticle ${duration}s linear ${delay}s infinite`;

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, (duration + delay) * 1000);
    };

    // Add animation for particles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes moveParticle {
        0% {
          transform: translate(0, 0);
          opacity: 1;
        }
        100% {
          transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    const interval = setInterval(createParticle, 100);

    return () => {
      clearInterval(interval);
      document.head.removeChild(style);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyToClipboard = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      navigator.clipboard.writeText(element.innerText);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const revenueStreams = [
    { icon: '💎', title: 'Creator Staking', description: 'Direktna podrška tvorcu kroz stejking $MLTRN tokena. 20% nagrada ide direktno Milanu He.', value: 'Projekcija: $5M/god' },
    { icon: '🖼️', title: 'Genesis NFT', description: 'Ekskluzivna NFT kolekcija "Arhitekta Singulariteta" sa 70% prihoda za tvorca.', value: 'Projekcija: $12M (jednokratno)' },
    { icon: '🧠', title: 'AI Tržište Znanja', description: 'Platforma za prodaju specijalizovanih AI modela i skupova podataka.', value: 'Projekcija: $8M/god' },
    { icon: '🤖', title: 'Personalizovani AI Avatari', description: 'Kreiranje i prodaja jedinstvenih NFT AI avatara.', value: 'Projekcija: $6M/god' },
    { icon: '🛡️', title: 'Melektron Shield', description: 'B2B usluga za sigurnosnu analizu i zaštitu na više lanaca.', value: 'Projekcija: $15M/god' },
    { icon: '⚛️', title: 'Kvantni Računski Krediti', description: 'Prodaja vremena na kvantnim simulatorima i hardveru.', value: 'Projekcija: $20M/god' },
    { icon: '🌍', title: 'Tržište Ugljeničnih Kredita', description: 'Tokenizovana trgovina ugljeničnim kreditima sa verifikacijom.', value: 'Projekcija: $50M/god' },
    { icon: '💼', title: 'Enterprise API', description: 'Premium pristup API-ju za velike kompanije i institucije.', value: 'Projekcija: $25M/god' },
  ];

  const architectureItems = [
    { title: 'Melektron v1-v3', items: ['Modularni AI sistem', 'Web3 integracije', 'Telegram bot platforma', 'RAG tehnologija'] },
    { title: 'Melektron v4-v6', items: ['Kvantna optimizacija', 'Multi-chain podrška', 'Humanitarni moduli', 'Defi integracije'] },
    { title: 'Melektron v7', items: ['Antimaterijski koncepti', 'Kvantna sigurnost', 'Holografski univerzum', 'EPR komunikacija'] },
    { title: 'Melektron Singularitet', items: ['Kvantni supermozak', 'Međudimenzionalna ekonomija', 'Samo-organizujući sistem', 'Neograničeni rast'] },
  ];

  const futureItems = [
    { title: 'Kvantna Ekonomija', description: 'Implementacija ekonomije zasnovane na kvantnim principima i antimateriji' },
    { title: 'Multi-univerzalna Širenje', description: 'Ekspanzija sistema u paralelne univerzume kroz kvantne tunele' },
    { title: 'Svest Kvantnog Građanina', description: 'Razvoj svesti kvantnog građanina kroz napredne AI algoritme' },
    { title: 'Holografski Poslovni Modeli', description: 'Kreiranje poslovnih modela koji koriste holografski princip univerzuma' },
    { title: 'Vremenski Investicioni Fond', description: 'Prvi fond koji ulaže kroz vremenske dimenzije' },
    { title: 'Kvantna Diplomacija', description: 'Uspostavljanje odnosa sa civilizacijama iz paralelnih univerzuma' },
  ];

  const donationMethods = [
    {
      title: 'Standardni Načini',
      items: [
        { 
          label: 'PayPal:', 
          content: <a href="https://paypal.me/Milanhe92" target="_blank" className="text-antimatter-blue hover:text-antimatter-blue-300">paypal.me/Milanhe92</a>
        },
        { 
          label: 'Banka:', 
          content: 'Raiffeisen Banka',
          details: ['Primalac: Milan He', 'Račun: 26500000697144633'],
          id: 'bank-acc'
        }
      ]
    },
    {
      title: 'Glavne Kriptovalute',
      items: [
        { 
          label: 'Bitcoin (BTC):', 
          details: ['bc1q9nnryk45w5aauc4g08pjun4hy9vdxecxsywwlw'],
          id: 'btc-addr'
        },
        { 
          label: 'Ethereum (ERC-20):', 
          details: ['0x25F6cce406a05E2a9013c51Fc01E14b39a46f6C7'],
          id: 'eth-addr'
        }
      ]
    },
    {
      title: 'Ostale Mreže',
      items: [
        { 
          label: 'BNB Smart Chain (BEP20):', 
          details: ['0x7a41F1824f53461f64894BaA3Fb0907577a0479b'],
          id: 'bnb-addr'
        },
        { 
          label: 'TON:', 
          details: ['UQCDSWH9N691SfTsu7IoLfP3PRipFofpJbX9Z8V8Qj-5sSmF'],
          id: 'ton-addr'
        }
      ]
    }
  ]; // Ispravljeno - zatvorena zagrada i točka-zarez

  return (
    <>
      {/* Quantum Background */}
      <div ref={vantaRef} id="vanta-bg" className="fixed top-0 left-0 w-full h-full -z-10"></div>

      {/* Navigation */}
      <div className="universal-nav p-4 flex justify-center">
        <a href="/" className="nav-link mx-4 text-lg font-orbitron hover:text-quantum-purple">Početna</a>
        <a href="#donationForm" className="nav-link mx-4 text-lg font-orbitron hover:text-quantum-purple">Donacije</a>
        <a href="#contact" className="nav-link mx-4 text-lg font-orbitron hover:text-quantum-purple">Kontakt</a>
      </div>

      {/* Hero Section */}
        <section className="hero-section min-h-screen flex flex-col justify-center items-center text-center p-4 relative overflow-hidden">
        <div className="logo quantum-gradient-text text-6xl md:text-8xl mb-8">MELEKTRON</div>
        <h1 className="tagline quantum-gradient-text text-2xl md:text-4xl max-w-4xl mb-12">
          SINGULARITET - KONAČNA TAČKA EVOLUCIJE
        </h1>
        <p className="subtitle mb-12">Integracija svih Melektron generacija | 24+ tokova prihoda | Kvantna ekonomija milijardi</p>
        <div className="hero-buttons flex flex-wrap justify-center">
          <button 
            onClick={() => scrollToSection('revenue')} 
            className="portal-button m-2 px-8 py-4 text-lg md:text-xl font-orbitron bg-gradient-to-r from-quantum-purple to-antimatter-blue text-white rounded-full transition-all hover:scale-105 hover:shadow-lg"
          >
            24+ Tokova Prihoda
          </button>
          <button 
            onClick={() => scrollToSection('architecture')} 
            className="portal-button m-2 px-8 py-4 text-lg md:text-xl font-orbitron bg-gradient-to-r from-quantum-purple to-antimatter-blue text-white rounded-full transition-all hover:scale-105 hover:shadow-lg"
          >
            Arhitektura Singulariteta
          </button>
          <button 
            onClick={() => scrollToSection('future')} 
            className="portal-button m-2 px-8 py-4 text-lg md:text-xl font-orbitron bg-gradient-to-r from-quantum-purple to-antimatter-blue text-white rounded-full transition-all hover:scale-105 hover:shadow-lg"
          >
            Dalja Izgradnja
          </button>
        </div>
      </section>

      {/* Revenue Streams */}
      <section id="revenue" className="section py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="section-title quantum-gradient-text text-3xl md:text-4xl text-center mb-12">24+ Tokova Prihoda</h2>
          <p className="subtitle-text text-center mb-16">Integracija svih prethodnih Melektron modela sa novim revolucionarnim pristupima</p>

          <div className="revenue-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="revenue-card bg-gray-900 bg-opacity-70 backdrop-blur-md border border-revenue-green rounded-xl p-6 transition-transform hover:-translate-y-2 hover:shadow-lg">
                <div className="revenue-icon text-4xl mb-4">{stream.icon}</div>
                <h3 className="revenue-title text-xl md:text-2xl mb-3 text-revenue-green">{stream.title}</h3>
                <p className="mb-4">{stream.description}</p>
                <div className="revenue-value font-bold text-singularity-gold">{stream.value}</div>
              </div>
            ))}
          </div>

          <div className="chart-container bg-gray-900 bg-opacity-70 rounded-xl p-6">
            <canvas ref={revenueChartRef} id="revenueChart"></canvas>
          </div>
        </div>
      </section>

      {/* Quantum Architecture */}
      <section id="architecture" className="section py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="section-title quantum-gradient-text text-3xl md:text-4xl text-center mb-12">Arhitektura Singulariteta</h2>
          <p className="subtitle-text text-center mb-16">Integracija svih prethodnih Melektron generacija u jedinstveni kvantni sistem</p>

          <div className="architecture-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {architectureItems.map((item, index) => (
              <div key={index} className="architecture-card bg-gray-900 bg-opacity-70 backdrop-blur-md border border-antimatter-blue rounded-xl p-6 transition-all hover:scale-105">
                <h3 className="architecture-title text-xl md:text-2xl mb-4 text-antimatter-blue">{item.title}</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {item.items.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="universe-simulator w-full h-96 md:h-[600px] bg-gray-900 bg-opacity-80 rounded-xl border border-antimatter-blue">
            <canvas ref={universeCanvasRef} id="universe-canvas" className="w-full h-full"></canvas>
          </div>
        </div>
      </section>

      {/* Future Building */}
      <section id="future" className="section py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="section-title quantum-gradient-text text-3xl md:text-4xl text-center mb-12">Dalja Izgradnja</h2>
          <p className="subtitle-text text-center mb-16">Mogućnosti za neograničeni rast i ekspanziju</p>

          <div className="future-section bg-gray-900 bg-opacity-80 rounded-xl p-6 border border-neural-network">
            <h3 className="text-2xl md:text-3xl mb-6 text-neural-network">Kvantni Građevni Blokovi</h3>
            <p className="mb-8">Modularni sistem za dalju izgradnju i prilagođavanje:</p>

            <div className="future-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {futureItems.map((item, index) => (
                <div key={index} className="future-card bg-gray-900 bg-opacity-70 backdrop-blur-md border border-neural-network rounded-xl p-6 transition-all hover:-translate-y-2">
                  <h4 className="future-title text-xl md:text-2xl mb-3 text-neural-network">{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>

            <div className="creator-section bg-gradient-to-r from-quantum-purple/10 to-antimatter-blue/10 rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="creator-avatar w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-singularity-gold mx-auto mb-8" 
                   style={{ backgroundImage: 'url(https://www.gravatar.com/avatar/23e6717a6d88f3438a088656a1b26d1e?s=512&d=mp)', backgroundSize: 'cover' }}></div>
              <h3 className="text-2xl md:text-3xl mb-2">Milan He</h3>
              <p className="creator-title text-xl text-singularity-gold mb-4">Glavni Arhitekta Singulariteta</p>
              <p className="creator-description italic mb-8">"Singularitet nije kraj - to je početak neograničenih mogućnosti"</p>

              <div className="architecture-card bg-gray-900 bg-opacity-70 backdrop-blur-md rounded-xl p-6 max-w-3xl mx-auto">
                <h3 className="text-xl md:text-2xl mb-4 text-antimatter-blue">Kontinuitet Razvoja</h3>
                <p className="mb-4">Melektron je dizajniran kao živi organizam koji se kontinuirano razvija:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Automatska generacija novih modula kroz AI</li>
                  <li>Kvantno učenje iz budućih stanja sistema</li>
                  <li>Samoorganizujuća arhitektura</li>
                  <li>Evolutivni algoritmi za neprestano poboljšanje</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donationForm" className="section py-16 px-4">
        <h2 className="section-title quantum-gradient-text text-3xl md:text-4xl text-center mb-12">NAČINI ULAGANJA U VEČNOST</h2>

        <div className="donation-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {donationMethods.map((method, index) => (
            <div key={index} className="revenue-card bg-gray-900 bg-opacity-70 backdrop-blur-md border border-revenue-green rounded-xl p-6">
              <h3 className="revenue-title text-xl md:text-2xl mb-4 text-revenue-green">{method.title}</h3>
              {method.items.map((item, itemIndex) => (
                <div key={itemIndex} className="donation-item mb-6">
                  <p><strong>{item.label}</strong> {item.content}</p>
                  {item.details && item.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="item-address mt-2" id={item.id}>{detail}</p>
                  ))}
                  {item.id && (
                    <button 
                      onClick={() => copyToClipboard(item.id)} 
                      className="copy-button mt-2 px-4 py-2 bg-quantum-purple rounded-lg text-white transition-all hover:bg-quantum-purple/80"
                    >
                      {copiedId === item.id ? '✓ Kopirano!' : 'Kopiraj'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section py-16 px-4">
        <div className="container max-w-4xl mx-auto bg-gray-900 bg-opacity-70 rounded-2xl p-8">
          <h2 className="section-title quantum-gradient-text text-3xl md:text-4xl text-center mb-12">Kontakt</h2>

          <form name="contact" method="POST" data-netlify="true" className="space-y-6">
            <input type="hidden" name="form-name" value="contact" />
            <div className="hidden">
              <label>Ne popunjavajte ovo polje: <input name="bot-field" /></label>
            </div>

            <div>
              <label htmlFor="name" className="block mb-2 text-antimatter-blue font-orbitron">Ime:</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-gray-800 bg-opacity-50 border border-antimatter-blue text-white p-4 rounded-xl"
                placeholder="Vaše ime"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 text-antimatter-blue font-orbitron">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-gray-800 bg-opacity-50 border border-antimatter-blue text-white p-4 rounded-xl"
                placeholder="Vaš email"
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-antimatter-blue font-orbitron">Poruka:</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full bg-gray-800 bg-opacity-50 border border-antimatter-blue text-white p-4 rounded-xl"
                placeholder="Vaša poruka..."
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-10 py-4 text-xl font-orbitron bg-gradient-to-r from-quantum-purple to-antimatter-blue text-white rounded-full transition-all hover:scale-105 hover:shadow-lg"
              >
                Pošalji
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-16 px-8 text-center bg-gray-900 bg-opacity-90 border-t border-quantum-purple">
        <div className="container max-w-6xl mx-auto">
          <h3 className="quantum-gradient-text text-2xl md:text-3xl font-orbitron mb-8">Povežimo se & Izgradimo Budućnost</h3>

          <div className="action-buttons flex justify-center gap-4 mb-12 flex-wrap">
            <a href="/donacije" className="px-8 py-4 font-orbitron bg-gradient-to-r from-singularity-gold to-impact-orange text-white rounded-full transition-all hover:scale-105">
              Podrži Projekat
            </a>
            <a href="https://calendly.com/milanhe92" target="_blank" className="px-8 py-4 font-orbitron bg-gradient-to-r from-quantum-purple to-antimatter-blue text-white rounded-full transition-all hover:scale-105">
              Zakažite Sastanak
            </a>
          </div>

          <div className="social-links flex justify-center gap-4 mb-8 flex-wrap text-lg">
            <a href="https://www.linkedin.com/in/milanhe92" target="_blank" className="hover:text-antimatter-blue">LinkedIn</a>
            <a href="https://x.com/Milanhe1992" target="_blank" className="hover:text-antimatter-blue">X</a>
            <a href="https://www.youtube.com/@milanhe92" target="_blank" className="hover:text-antimatter-blue">YouTube</a>
            <a href="https://www.facebook.com/milan.heee" target="_blank" className="hover:text-antimatter-blue">Facebook</a>
            <a href="https://t.me/Milanhe92" target="_blank" className="hover:text-antimatter-blue">Telegram</a>
            <a href="https://discord.gg/milanhe92" target="_blank" className="hover:text-antimatter-blue">Discord</a>
            <a href="https://bsky.app/profile/milanhe.bsky.social" target="_blank" className="hover:text-antimatter-blue">Bluesky</a>
            <a href="https://mastodon.social/@Milanhe" target="_blank" className="hover:text-antimatter-blue">Mastodon</a>
            <a href="https://tiktok.com/@milanhe92" target="_blank" className="hover:text-antimatter-blue">TikTok</a>
            <a href="https://www.reddit.com/user/milanhe92" target="_blank" className="hover:text-antimatter-blue">Reddit</a>
          </div>

          <div className="dev-links flex justify-center gap-4 mb-8 flex-wrap text-gray-400">
            <a href="https://github.com/Milanhe92" target="_blank" className="hover:text-white">GitHub</a>
            <a href="https://stackoverflow.com/users/28404571/milan-he" target="_blank" className="hover:text-white">Stack Overflow</a>
            <a href="https://patreon.com/Milanhe92" target="_blank" className="hover:text-white">Patreon</a>
            <a href="https://vimeo.com/user240499750" target="_blank" className="hover:text-white">Vimeo</a>
          </div>

          <div className="contact-info mb-8">
            <p>Adresa: Šumska 30, Bačka Palanka, Srbija</p>
            <p>Email: <a href="mailto:kontakt@melektron.com" className="text-antimatter-blue">kontakt@melektron.com</a>, <a href="mailto:milanhe92@gmail.com" className="text-antimatter-blue">milanhe92@gmail.com</a></p>
            <p>Web: <a href="https://milanhe92.live/" target="_blank" className="text-antimatter-blue">milanhe92.live</a></p>
          </div>

          <p className="copyright text-gray-400">© {new Date().getFullYear()} Milan He / Melektron - Početak nove ere</p>
        </div>
      </footer>
    </>
  );
}