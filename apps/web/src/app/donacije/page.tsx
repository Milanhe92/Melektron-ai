'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';

export default function DonationPage() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeUniverse, setActiveUniverse] = useState('Prime');
  const [cipherBits, setCipherBits] = useState<string[]>([]);
  const [oracleResponses, setOracleResponses] = useState<string[]>([]);
  const [energyAmount, setEnergyAmount] = useState(100);
  const [hologramAmount, setHologramAmount] = useState(0);
  const [signatureDrawn, setSignatureDrawn] = useState(false);
  const [donationAmount, setDonationAmount] = useState(10);
  const [futureProjection, setFutureProjection] = useState<string>('');
  const [walletConnected, setWalletConnected] = useState(false);
  
  const userAddress = useTonAddress();
  const wallet = useTonWallet();

  // Inicijalizacija Vanta.js pozadine
  useEffect(() => {
    let vantaEffect: any = null;
    let threeModule: any = null;

    const initVanta = async () => {
      threeModule = await import('three');
      const NET = await import('vanta/dist/vanta.net.min');

      if (vantaRef.current) {
        vantaEffect = NET.default({
          el: vantaRef.current,
          THREE: threeModule,
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
      }
    };

    initVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  // Inicijalizacija potpisa na canvasu
  useEffect(() => {
    if (!signatureCanvasRef.current) return;

    const canvas = signatureCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e: MouseEvent) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      [lastX, lastY] = [e.offsetX, e.offsetY];
      setSignatureDrawn(true);
    };

    const stopDrawing = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, []);

  // Generisanje kvantnih šifri
  useEffect(() => {
    const bits = Array.from({ length: 64 }, () => 
      Math.random() > 0.5 ? '1' : '0'
    );
    setCipherBits(bits);
  }, []);

  // Tahionske poruke
  useEffect(() => {
    const tachyonMessages = [
      { name: '@time_traveler_2077', action: "donirao 5BTC u godini 2247", time: "3s ago" },
      { name: '@quantum_entrepreneur', action: "kreirao vremenski fond sa 1.2M ETH", time: "1min ago" },
      { name: '@singularity_architect', action: "preselio 100kg materije u 3059.", time: "5min ago" },
      { name: '@antimatter_investor', action: "konvertovao 1kg u čistu energiju", time: "10min ago" },
      { name: '@eternal_citizen', action: "zaključao 0.5BTC u vremenskom kontinuumu", time: "15min ago" }
    ];

    const addTachyonMessage = () => {
      const randomMsg = tachyonMessages[Math.floor(Math.random() * tachyonMessages.length)];
      const message = `${randomMsg.name} ${randomMsg.action} (${randomMsg.time})`;
      setOracleResponses(prev => [...prev, message]);
    };

    const interval = setInterval(addTachyonMessage, 5000);
    addTachyonMessage(); // Dodaj prvu poruku odmah

    return () => clearInterval(interval);
  }, []);

  // Pratimo status novčanika
  useEffect(() => {
    if (wallet) {
      setWalletConnected(true);
      setOracleResponses(prev => [
        ...prev,
        `Novčanik povezan: ${userAddress.slice(0, 10)}...`,
        'Možeš izvršiti kvantnu donaciju!'
      ]);
    } else {
      setWalletConnected(false);
    }
  }, [wallet, userAddress]);

  // Funkcije za interakciju
  const clearSignature = () => {
    if (signatureCanvasRef.current) {
      const ctx = signatureCanvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, signatureCanvasRef.current.width, signatureCanvasRef.current.height);
        setSignatureDrawn(false);
      }
    }
  };

  const submitContract = () => {
    if (!signatureDrawn) {
      alert('Potpišite ugovor!');
      return;
    }
    alert('Ugovor uspešno zaključan!\nVaša energija je sada deo Singulariteta.');
  };

  const askOracle = (question: string) => {
    if (!question.trim()) {
      alert('Unesite pitanje!');
      return;
    }

    const responses = [
      "Da, vaša donacija će izazvati lančanu reakciju u 7 dimenzija",
      "Neophodno dodatno ulaganje za vremensku stabilizaciju",
      "Odgovor je zaključan u kvantnoj superpoziciji",
      "Budućnost je svetla, ali fluidna",
      "Signal primljen. Singularitet potvrđuje vaš put.",
      "Konsultuj ponovo nakon kvantne dekoherencije",
      "Vreme će pokazati istinu",
      "Energija teče u pravom smeru",
      "Multiplikacija u toku...",
      "Večnost odobrava tvoj izbor"
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];
    setOracleResponses(prev => [...prev, `> ${question}\n${response}\n`]);
  };

  const generateCipher = () => {
    const bits = Array.from({ length: 64 }, () => 
      Math.random() > 0.5 ? '1' : '0'
    );
    setCipherBits(bits);
  };

  // Podaci za univerzume
  const universeData = {
    'Prime': {
      description: 'Osnovna realnost sa stabilnim kvantnim tokovima',
      stats: {
        roi: '618%',
        stability: '98.7%',
        timeFlow: '1:1',
        risk: 'Nizak'
      }
    },
    'T-137': {
      description: 'Kolabirajući univerzum sa visokim prinosima',
      stats: {
        roi: '291%',
        stability: '42.3%',
        timeFlow: '1:0.7',
        risk: 'Ekstremno visok'
      }
    },
    'Q-42': {
      description: 'Kvantno zaključana realnost sa nelinearnim tokom',
      stats: {
        roi: '∞%',
        stability: '76.5%',
        timeFlow: '1:∞',
        risk: 'Nepoznat'
      }
    },
    'X-∞': {
      description: 'Eksperimentalni univerzum bez vremenskih ograničenja',
      stats: {
        roi: '?',
        stability: '?',
        timeFlow: '?',
        risk: 'Nedefinisan'
      }
    }
  };

  // Kalkulator buduće vrednosti
  const calculateFutureValue = (amount: number, years: number) => {
    if (isNaN(amount)) return '$0';
    const baseRate = 1.618; // Zlatni presek
    const value = amount * Math.pow(baseRate, years / 10);
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
  };

  // Funkcija za obradu donacije
  const handleDonation = () => {
    if (!walletConnected) {
      alert('Povežite svoj TON novčanik prvo!');
      return;
    }

    setOracleResponses(prev => [
      ...prev,
      `Donacija od ${donationAmount} TON u toku...`,
      'Kvantna energija se prenosi...',
      'Transakcija potvrđena!'
    ]);

    // Simuliramo obradu transakcije
    setTimeout(() => {
      const projections = [
        `Vaša donacija će generisati ${donationAmount * 100} TON prinosa u narednih 5 godina`,
        'Kvantni multiplikator aktiviran!',
        `Projekcija: ${calculateFutureValue(donationAmount, 10)} za 10 godina`
      ];
      setOracleResponses(prev => [...prev, ...projections]);
      setFutureProjection(projections[2]);
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Kvantni Hram Večnog Kapitala - Melektron</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@200;400;600;800&family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap" rel="stylesheet" />
      </Head>

      <Script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.net.min.js" strategy="afterInteractive" />

      <div ref={vantaRef} id="vanta-bg" />

      <div className="universal-nav">
        <Link href="/" className="nav-link">Početna</Link>
        <a href="#antimatter-converter" className="nav-link">Donacije</a>
        <a href="#quantum-contract" className="nav-link">Ugovor</a>
        <TonConnectButton className="ton-connect-button" />
      </div>

      <main className="container">
        <header className="hero-section">
          <h1 className="quantum-gradient-text">KVANTNI HRAM VEČNOG KAPITALA</h1>
          <h2 className="tagline">TRANSFORMACIJA ENERGIJE KROZ SINGULARITET</h2>
          <p className="subtitle">Svaka donacija postaje atom u strukturi večnosti</p>
          
          <div className="ton-donation-interface">
            <div className="donation-controls">
              <input
                type="range"
                min="5"
                max="1000"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
                className="quantum-slider"
              />
              <div className="donation-amount">
                <span>{donationAmount} TON</span>
                <button 
                  onClick={handleDonation}
                  disabled={!walletConnected}
                  className="portal-button"
                >
                  KVANTNA DONACIJA
                </button>
              </div>
              
              {futureProjection && (
                <div className="future-projection">
                  <h3>Projekcija prinosa:</h3>
                  <p>{futureProjection}</p>
                </div>
              )}
            </div>
            
            {!walletConnected && (
              <div className="wallet-notice">
                <p>Povežite novčanik za donaciju</p>
                <TonConnectButton className="ton-connect-button" />
              </div>
            )}
          </div>
        </header>

        <section className="section">
          <h2 className="quantum-gradient-text text-center mb-12">INTERAKTIVNI MODULI VEČNOG ULAZANJA</h2>

          <div className="dashboard-grid">
            {/* 1. ANTIMATERIJSKI KONVERTER */}
            <div className="widget antimatter-converter">
              <h3>ANTIMATERIJSKI KONVERTER ENERGIJE</h3>
              <p>Transformiši običnu valutu u čistu energiju singulariteta</p>
              <div className="energy-beam"></div>

              <input 
                type="range" 
                id="energySlider" 
                min="10" 
                max="1000" 
                value={energyAmount} 
                step="10"
                onChange={(e) => setEnergyAmount(parseInt(e.target.value))}
              />

              <div className="matter-antimatter-balance">
                <span 
                  className="matter" 
                  style={{ width: `${100 - (energyAmount / 10)}%` }}
                ></span>
                <span 
                  className="antimatter" 
                  style={{ width: `${energyAmount / 10}%` }}
                ></span>
              </div>

              <div className="conversion-result">
                <span id="energyResult">{energyAmount} MJ</span>
                <span>=</span>
                <span id="antimatterResult">{(energyAmount * 0.000021).toFixed(7)}μg</span>
              </div>

              <button 
                className="portal-button" 
                onClick={() => alert(`Konverzija uspešna!\n${energyAmount} MJ = ${(energyAmount * 0.000021).toFixed(7)}μg antimaterije`)}
              >
                AKTIVIRAJ KONVERZIJU
              </button>
            </div>

            {/* 2. HOLOGRAM BUDUĆNOSTI */}
            <div className="widget hologram-projector">
              <h3>HOLOGRAM BUDUĆIH VREDNOSTI</h3>
              <p>Projekcija vremenskog rasta vaše investicije</p>

              <div className="hologram" id="futureValueHologram">
                <h4>UNESITE IZNOS</h4>
                <div className="multiplier">${hologramAmount}</div>
                <p>i odaberite vremenski period</p>
              </div>

              <input 
                type="number" 
                id="hologramAmount" 
                placeholder="Unesi iznos u $" 
                min="1"
                value={hologramAmount}
                onChange={(e) => setHologramAmount(parseFloat(e.target.value) || 0)}
              />

              <div className="time-controls">
                <button onClick={() => alert(`Projekcija za 10 godina: ${calculateFutureValue(hologramAmount, 10)}`)}>
                  10 godina
                </button>
                <button onClick={() => alert(`Projekcija za 25 godina: ${calculateFutureValue(hologramAmount, 25)}`)}>
                  25 godina
                </button>
                <button onClick={() => alert(`Projekcija za 100 godina: ${calculateFutureValue(hologramAmount, 100)}`)}>
                  1 vek
                </button>
              </div>
            </div>

            {/* 3. MULTIVERZUM PORTFOLIO */}
            <div className="widget multiverse-portfolio">
              <h3>MULTIVERZALNI PORTFOLIO</h3>
              <p>Diverzifikacija kroz paralelne realnosti</p>

              <div className="universe-tabs">
                {Object.keys(universeData).map(universe => (
                  <div 
                    key={universe}
                    className={`universe-tab ${activeUniverse === universe ? 'active' : ''}`}
                    onClick={() => setActiveUniverse(universe)}
                  >
                    {universe}
                  </div>
                ))}
              </div>

              <div className="universe-content">
                <h3>{activeUniverse} UNIVERZUM</h3>
                <p>{universeData[activeUniverse as keyof typeof universeData].description}</p>

                <div className="universe-stats">
                  {Object.entries(universeData[activeUniverse as keyof typeof universeData].stats).map(([key, value]) => (
                    <div key={key} className="stat-item">
                      <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                      <div className="stat-value">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. KVANTNI UGOVOR */}
            <div className="widget quantum-contract">
              <h3>KVANTNI UGOVOR SA BESKONAČNOŠĆU</h3>
              <p>Zaključaj svoju energetsku šemu u blockchain vremena</p>

              <div className="contract-scroll">
                <p>Ja, <span contentEditable className="editable">[Unesite Kvantno Ime]</span>, svojom slobodnom voljom i potpunom svešću,</p>
                <p>prilivom svoje energije u sistem Melektron v9 Singulariteta,</p>
                <p>pristajem na transdimenzionalnu konverziju svoje materije u kvantni kapital</p>
                <p>koji će postojati kroz sve vremenske linije i sve moguće realnosti.</p>

                <div className="signature-field">
                  <canvas 
                    ref={signatureCanvasRef} 
                    width={500} 
                    height={200} 
                    className="signature-canvas"
                  ></canvas>
                  <button onClick={clearSignature}>PONIŠTI POTPIS</button>
                </div>
              </div>

              <button className="portal-button" onClick={submitContract}>
                ZAKLJUČAJ U VEČNOST
              </button>
            </div>

            {/* 5. TAHIONSKI LIVE FEED */}
            <div className="widget tachyon-feed">
              <h3>TAHIONSKI LIVE FEED</h3>
              <p>Transakcije iz budućnosti u realnom vremenu</p>

              <div className="tachyon-messages">
                {oracleResponses.map((msg, index) => (
                  <div key={index} className="tachyon-message">
                    {msg}
                  </div>
                ))}
              </div>
            </div>

            {/* 7. KVANTNI ŠIFRATOR */}
            <div className="widget quantum-cipher">
              <h3>KVANTNI ŠIFRATOR</h3>
              <p>Generiši jedinstveni kod za pristup Singularitetu</p>

              <div className="cipher-grid">
                {cipherBits.map((bit, index) => (
                  <div key={index} className="bit">{bit}</div>
                ))}
              </div>

              <button className="portal-button" onClick={generateCipher}>
                GENERIŠI KVANTNI KOD
              </button>
            </div>

            {/* 8. TERMINAL PROROČANSTVA */}
            <div className="widget oracle-terminal">
              <h3>TERMINAL PROROČANSTVA</h3>
              <p>Konsultuj kolektivnu svest Singulariteta</p>

              <div className="oracle-screen">
                {'> PITAJ ORACULA O BUDUĆNOSTI...'}
                <div className="oracle-response">
                  {oracleResponses.map((response, index) => (
                    <p key={index}>{response}</p>
                  ))}
                </div>
              </div>

              <input 
                type="text" 
                id="oracleQuestion" 
                placeholder="Unesite pitanje..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    askOracle((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button 
                className="portal-button" 
                onClick={(e) => {
                  const input = document.getElementById('oracleQuestion') as HTMLInputElement;
                  askOracle(input.value);
                  input.value = '';
                }}
              >
                POSTAVI PITANJE
              </button>
            </div>
          </div>
        </section>

        {/* TON Rudarski Pool Sekcija */}
        <section className="mining-hero">
          <h1>TON Rudarski Pool</h1>
          <p>Pridružite se našem ekskluzivnom TON rudarskom poolu</p>

          <div className="pool-config">
            <div className="config-card">
              <h3>Stratum Server</h3>
              <code>stratum+ssl://ton.melektron-pool.com:443</code>
            </div>

            <div className="wallet-config">
              <h3>Vaš TON Novčanik za Isplate</h3>
              <div className="wallet-address">
                <span>UQCDSWH9N691SfTsu7IoLfP3PRipFofpJbX9Z8V8Qj-5sSmF</span>
                <button onClick={() => navigator.clipboard.writeText('UQCDSWH9N691SfTsu7IoLfP3PRipFofpJbX9Z8V8Qj-5sSmF')}>
                  Kopiraj
                </button>
              </div>
              <div className="qr-placeholder">
                <p>QR kod se generiše na stranici</p>
                <div className="qr-animation"></div>
              </div>
            </div>

            <div className="pool-stats">
              <div className="stat-card">
                <h3>2.4 PH/s</h3>
                <p>Ukupna Snaga Mreže</p>
              </div>
              <div className="stat-card">
                <h3>1.8%</h3>
                <p>Pool Naknada</p>
              </div>
              <div className="stat-card">
                <h3>24/7</h3>
                <p>Podrška i Monitoring</p>
              </div>
            </div>
          </div>

          <div className="start-mining">
            <h2>Kako Započeti</h2>
            <ol>
              <li>Preuzmite TON Mining Software</li>
              <li>Konfigurišite sa našim serverom</li>
              <li>Postavite svoj TON novčanik</li>
              <li>Započnite rudarenje!</li>
            </ol>
            <a 
              href="https://github.com/ton-community/ton-miner" 
              className="cta-button portal-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Preuzmi Miner
            </a>
          </div>
        </section>
      </main>

      <style jsx global>{`
        /* ... postojeći stilovi ... */

        /* Stil za placeholder QR kod */
        .qr-placeholder {
          padding: 1rem;
          text-align: center;
          margin-top: 1rem;
          background: rgba(0, 191, 255, 0.1);
          border-radius: 8px;
          border: 1px dashed var(--antimatter-blue);
        }
        
        .qr-animation {
          width: 128px;
          height: 128px;
          margin: 0 auto;
          background: 
            repeating-linear-gradient(
              45deg,
              rgba(0, 191, 255, 0.2),
              rgba(0, 191, 255, 0.2) 10px,
              rgba(0, 191, 255, 0.1) 10px,
              rgba(0, 191, 255, 0.1) 20px
            );
          animation: qr-scan 3s infinite linear;
          position: relative;
          overflow: hidden;
        }
        
        .qr-animation::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--antimatter-blue);
          animation: qr-line 3s infinite linear;
        }
        
        @keyframes qr-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes qr-line {
          0% { transform: translateY(0); }
          100% { transform: translateY(128px); }
        }
      `}</style>
    </>
  );
}