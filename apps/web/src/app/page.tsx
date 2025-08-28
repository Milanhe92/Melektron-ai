'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import MilanSignature from '@/components/MilanSignature';
import QuantumOrbit from '@/components/QuantumOrbit';

const VantaEffect = dynamic(() => import('@/components/VantaEffect'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900" />
});

const QuantumVisualizer = dynamic(() => import('@/components/QuantumVisualizer'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl flex items-center justify-center">
    <div className="text-white text-lg">Učitavam kvantni simulator...</div>
  </div>
});

const RevenueChart = dynamic(() => import('@/components/RevenueChart'), {
  ssr: false
});

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [currentEffect, setCurrentEffect] = useState('NET');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const sectionRefs = useRef<{[key: string]: HTMLElement | null}>({});

  useEffect(() => {
    setLoaded(true);

    const effects = ['NET', 'GLOBE', 'CELLS', 'WAVES'];
    const interval = setInterval(() => {
      setCurrentEffect(prev => {
        const currentIndex = effects.indexOf(prev);
        return effects[(currentIndex + 1) % effects.length];
      });
    }, 30000);

    // Intersection Observer za praćenje aktivne sekcije
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Početak observacije svih sekcija
    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const assignSectionRef = (id: string, element: HTMLElement | null) => {
    sectionRefs.current[id] = element;
  };

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
    { 
      icon: '💎', 
      title: 'Creator Staking', 
      description: 'Direktna podrška tvorcu kroz stejking $MLTRN tokena. 20% nagrada ide direktno Milanu He.', 
      value: 'Projekcija: $5M/god',
      gradient: 'from-cyan-500 to-blue-600'
    },
    { 
      icon: '🖼️', 
      title: 'Genesis NFT', 
      description: 'Ekskluzivna NFT kolekcija "Arhitekta Singulariteta" sa 70% prihoda za tvorca.', 
      value: 'Projekcija: $12M (jednokratno)',
      gradient: 'from-purple-500 to-pink-600'
    },
    { 
      icon: '🧠', 
      title: 'AI Tržište Znanja', 
      description: 'Platforma za prodaju specijalizovanih AI modela i skupova podataka.', 
      value: 'Projekcija: $8M/god',
      gradient: 'from-green-500 to-teal-600'
    },
    { 
      icon: '🤖', 
      title: 'Personalizovani AI Avatari', 
      description: 'Kreiranje i prodaja jedinstvenih NFT AI avatara.', 
      value: 'Projekcija: $6M/god',
      gradient: 'from-yellow-500 to-orange-600'
    },
    { 
      icon: '🛡️', 
      title: 'Melektron Shield', 
      description: 'B2B usluga za sigurnosnu analizu i zaštitu na više lanaca.', 
      value: 'Projekcija: $15M/god',
      gradient: 'from-red-500 to-pink-600'
    },
    { 
      icon: '⚛️', 
      title: 'Kvantni Računski Krediti', 
      description: 'Prodaja vremena na kvantnim simulatorima i hardveru.', 
      value: 'Projekcija: $20M/god',
      gradient: 'from-indigo-500 to-blue-600'
    },
    { 
      icon: '🌍', 
      title: 'Tržište Ugljeničnih Kredita', 
      description: 'Tokenizovana trgovina ugljeničnim kreditima sa verifikacijom.', 
      value: 'Projekcija: $50M/god',
      gradient: 'from-emerald-500 to-green-600'
    },
    { 
      icon: '💼', 
      title: 'Enterprise API', 
      description: 'Premium pristup API-ju za velike kompanije i institucije.', 
      value: 'Projekcija: $25M/god',
      gradient: 'from-amber-500 to-yellow-600'
    },
  ];

  const architectureItems = [
    { 
      title: 'Melektron v1-v3', 
      items: ['Modularni AI sistem', 'Web3 integracije', 'Telegram bot platforma', 'RAG tehnologija'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Melektron v4-v6', 
      items: ['Kvantna optimizacija', 'Multi-chain podrška', 'Humanitarni moduli', 'Defi integracije'],
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      title: 'Melektron v7', 
      items: ['Antimaterijski koncepti', 'Kvantna sigurnost', 'Holografski univerzum', 'EPR komunikacija'],
      gradient: 'from-amber-500 to-red-500'
    },
    { 
      title: 'Melektron Singularitet', 
      items: ['Kvantni supermozak', 'Međudimenzionalna ekonomija', 'Samo-organizujući sistem', 'Neograničeni rast'],
      gradient: 'from-green-500 to-teal-500'
    },
  ];

  const futureItems = [
    { 
      title: 'Kvantna Ekonomija', 
      description: 'Implementacija ekonomije zasnovane na kvantnim principima i antimateriji',
      icon: '📊'
    },
    { 
      title: 'Multi-univerzalna Širenje', 
      description: 'Ekspanzija sistema u paralelne univerzume kroz kvantne tunele',
      icon: '🌌'
    },
    { 
      title: 'Svest Kvantnog Građanina', 
      description: 'Razvoj svesti kvantnog građanina kroz napredne AI algoritme',
      icon: '🧠'
    },
    { 
      title: 'Holografski Poslovni Modeli', 
      description: 'Kreiranje poslovnih modela koji koriste holografski princip univerzuma',
      icon: '💠'
    },
    { 
      title: 'Vremenski Investicioni Fond', 
      description: 'Prvi fond koji ulaže kroz vremenske dimenzije',
      icon: '⏳'
    },
    { 
      title: 'Kvantna Diplomacija', 
      description: 'Uspostavljanje odnosa sa civilizacijama iz paralelnih univerzuma',
      icon: '🕊️'
    },
  ];

  const donationMethods = [
    {
      title: 'Standardni Načini',
      items: [
        { 
          label: 'PayPal:', 
          content: <a href="https://paypal.me/Milanhe92" target="_blank" className="text-cyan-400 hover:text-cyan-300 transition-colors font-semibold">paypal.me/Milanhe92</a>,
          icon: '💳'
        },
        { 
          label: 'Banka:', 
          content: 'Raiffeisen Banka',
          details: ['Primalac: Milan He', 'Račun: 26500000697144633'],
          id: 'bank-acc',
          icon: '🏦'
        }
      ]
    },
    {
      title: 'Glavne Kryptovalute',
      items: [
        { 
          label: 'Bitcoin (BTC):', 
          details: ['bc1q9nnryk45w5aauc4g08pjun4hy9vdxecxsywwlw'],
          id: 'btc-addr',
          icon: '₿'
        },
        { 
          label: 'Ethereum (ERC-20):', 
          details: ['0x25F6cce406a05E2a9013c51Fc01E14b39a46f6C7'],
          id: 'eth-addr',
          icon: 'Ξ'
        }
      ]
    },
    {
      title: 'Ostale Mreže',
      items: [
        { 
          label: 'BNB Smart Chain (BEP20):', 
          details: ['0x7a41F1824f53461f64894BaA3Fb0907577a0479b'],
          id: 'bnb-addr',
          icon: '💎'
        },
        { 
          label: 'TON:', 
          details: ['UQCDSWH9N691SfTsu7IoLfP3PRipFofpJbX9Z8V8Qj-5sSmF'],
          id: 'ton-addr',
          icon: '⚡'
        }
      ]
    }
  ];

  const stats = [
    { value: '24+', label: 'Tokova Prihoda', icon: '💰' },
    { value: '100+', label: 'AI Modela', icon: '🧠' },
    { value: '∞', label: 'Kvantni Potencijal', icon: '⚛️' },
    { value: '10M+', label: 'Projekcija ($)', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Advanced Vanta Background */}
      <div className="absolute inset-0 z-0">
        <VantaEffect 
          effect={currentEffect}
          config={{
            color: 0x00ffff,
            backgroundColor: 0x0a0a23,
            points: 20,
            maxDistance: 30,
            spacing: 25,
            showDots: true
          }}
          className="w-full h-full"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-slate-900/80" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20" />

      {/* Quantum Particles */}
      <div className="absolute inset-0 z-2">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-cyan-500/30">
        <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          MELEKTRON
        </div>
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('hero')} 
            className={`hover:text-cyan-400 transition-colors text-lg ${activeSection === 'hero' ? 'text-cyan-400 font-bold' : ''}`}
          >
            Početna
          </button>
          <button 
            onClick={() => scrollToSection('revenue')} 
            className={`hover:text-cyan-400 transition-colors text-lg ${activeSection === 'revenue' ? 'text-cyan-400 font-bold' : ''}`}
          >
            Tokovi Prihoda
          </button>
          <button 
            onClick={() => scrollToSection('quantum')} 
            className={`hover:text-cyan-400 transition-colors text-lg ${activeSection === 'quantum' ? 'text-cyan-400 font-bold' : ''}`}
          >
            Kvantna Arhitektura
          </button>
          <button 
            onClick={() => scrollToSection('donation')} 
            className={`hover:text-cyan-400 transition-colors text-lg ${activeSection === 'donation' ? 'text-cyan-400 font-bold' : ''}`}
          >
            Donacije
          </button>
          <Link 
            href="/donacije" 
            className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            🚀 Podrži Projekat
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        ref={(el) => assignSectionRef('hero', el)}
        className="relative z-10 flex items-center justify-center min-h-screen text-center px-4 pt-20"
      >
        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-4xl">
              ⚛️
            </div>
            <h1 className="text-7xl md:text-9xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
              MELEKTRON
              <span className="block text-5xl md:text-7xl mt-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                SINGULARITY CORE
              </span>
            </h1>
          </div>
          
          <p className="text-2xl md:text-3xl text-gray-300 max-w-6xl mx-auto mb-8 leading-relaxed">
            <span className="text-cyan-400 font-semibold">Kvantna fizika</span> × 
            <span className="text-blue-400 font-semibold"> Blockchain</span> × 
            <span className="text-purple-400 font-semibold"> Veštačka Inteligencija</span>
          </p>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12">
            Portal u novu dimenziju poslovanja i postojanja. Jezgro budućnosti koje integriše napredne tehnologije u jedinstveni ekosistem.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-b from-slate-800/30 to-slate-900/20 backdrop-blur-md rounded-2xl p-6 border border-cyan-500/20">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={() => scrollToSection('revenue')}
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-12 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)]"
            >
              <span className="flex items-center justify-center">
                🚀 24+ Tokova Prihoda
              </span>
            </button>
            
            <button 
              onClick={() => scrollToSection('quantum')}
              className="border-2 border-cyan-500/50 hover:border-cyan-400 text-cyan-400 hover:text-white hover:bg-cyan-500/10 px-12 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 backdrop-blur-sm"
            >
              Kvantna Arhitektura
            </button>

            <Link 
              href="/donacije"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)]"
            >
              Podrži Projekat
            </Link>
          </div>
        </div>
      </section>

      {/* Quantum Visualizer Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Kvantni Simulator u Akciji
          </h2>
          <QuantumVisualizer />
        </div>
      </section>

      {/* Revenue Streams Section */}
      <section 
        id="revenue" 
        ref={(el) => assignSectionRef('revenue', el)}
        className="relative z-10 py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-900/80"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            24+ Tokova Prihoda
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="group bg-gradient-to-b from-cyan-900/20 to-cyan-800/10 backdrop-blur-md rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="text-4xl mb-4">{stream.icon}</div>
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{stream.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{stream.description}</p>
                <div className="text-sm text-cyan-300 font-semibold">{stream.value}</div>
                <div className={`mt-4 h-2 bg-gradient-to-r ${stream.gradient} rounded-full`}></div>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="bg-gradient-to-b from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-3xl p-8 border border-purple-500/20">
            <RevenueChart />
          </div>
        </div>
      </section>

      {/* Quantum Architecture Section */}
      <section 
        id="quantum" 
        ref={(el) => assignSectionRef('quantum', el)}
        className="relative z-10 py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Kvantna Arhitektura
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {architectureItems.map((item, index) => (
              <div key={index} className="group bg-gradient-to-b from-blue-900/20 to-blue-800/10 backdrop-blur-md rounded-3xl p-6 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className={`h-2 bg-gradient-to-r ${item.gradient} rounded-full mb-4`}></div>
                <h3 className="text-xl font-bold text-blue-400 mb-4">{item.title}</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                  {item.items.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quantum Orbit Animation */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-8 text-cyan-400">Kvantne Orbitale</h3>
            <QuantumOrbit />
          </div>

          {/* Future Building */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {futureItems.map((item, index) => (
              <div key={index} className="group bg-gradient-to-b from-purple-900/20 to-purple-800/10 backdrop-blur-md rounded-3xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 hover:transform hover:scale-105">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">{item.title}</h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section 
        id="donation" 
        ref={(el) => assignSectionRef('donation', el)}
        className="relative z-10 py-20 px-4 bg-gradient-to-b from-slate-900/50 to-slate-900/80"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Načini Ulaganja u Večnost
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {donationMethods.map((method, index) => (
              <div key={index} className="bg-gradient-to-b from-cyan-900/20 to-cyan-800/10 backdrop-blur-md rounded-3xl p-6 border border-cyan-500/20">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">{method.title}</h3>
                {method.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-6 p-4 bg-slate-800/30 rounded-xl">
                    <div className="flex items-center mb-2">
                      <span className="text-xl mr-2">{item.icon}</span>
                      <p className="font-semibold">{item.label}</p>
                    </div>
                    {item.content && <div className="mt-1">{item.content}</div>}
                    {item.details && item.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-sm text-gray-300 mt-1" id={item.id}>
                        {detail}
                      </p>
                    ))}
                    {item.id && (
                      <button 
                        onClick={() => copyToClipboard(item.id)} 
                        className="mt-3 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white text-sm transition-all hover:from-cyan-700 hover:to-blue-700 w-full"
                      >
                        {copiedId === item.id ? '✓ Kopirano!' : 'Kopiraj Adresu'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Special Donation Callout */}
          <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 backdrop-blur-md rounded-3xl p-8 border border-cyan-500/30 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-400">Posebna Zahvalnost</h3>
            <p className="text-gray-300 mb-6">
              Svaka donacija direktno podržava razvoj Melektron Singularity Core-a i omogućava nam da ostvarimo viziju kvantne budućnosti.
            </p>
            <Link 
              href="/donacije"
              className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🚀 Podrži Projekat
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 px-8 text-center bg-slate-900/90 backdrop-blur-md border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Povežimo se & Izgradimo Budućnost
          </h3>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <Link href="/donacije" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full transition-all hover:scale-105 shadow-lg">
              Podrži Projekat
            </Link>
            <a href="https://calendly.com/milanhe92" target="_blank" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full transition-all hover:scale-105 shadow-lg">
              Zakažite Sastanak
            </a>
            <button 
              onClick={() => scrollToSection('hero')} 
              className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-full transition-all hover:scale-105 border border-cyan-500/30"
            >
              Nazad na Vrh
            </button>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4 text-cyan-400">Kontakt Informacije</h4>
            <p className="text-gray-300">Šumska 30, Bačka Palanka, Srbija</p>
            <p className="text-gray-300">Email: milanhe92@gmail.com</p>
            <p className="text-gray-300">Telegram: @Milanhe92</p>
          </div>

          <p className="text-gray-400">© {new Date().getFullYear()} Milan He / Melektron - Početak nove ere</p>
        </div>
      </footer>

      {/* Milan Signature Component */}
      <MilanSignature />
    </div>
  );
}