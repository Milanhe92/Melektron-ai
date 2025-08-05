'use client';

import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { TonConnectButton, useTonAddress, useTonWallet } from '@tonconnect/ui-react';
import QRCode from 'react-qr-code';

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
              <div className="qr-code-container">
                <QRCode 
                  value="UQCDSWH9N691SfTsu7IoLfP3PRipFofpJbX9Z8V8Qj-5sSmF" 
                  size={128}
                  bgColor="transparent"
                  fgColor="#00bfff"
                />
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
        :root {
          --quantum-purple: #8a2be2;
          --antimatter-blue: #00bfff;
          --singularity-gold: #ffd700;
          --dark-universe: #0a0a18;
          --neural-network: #ff00ff;
          --time-crystal: #00ff9d;
          --tachyon: #ff7b00;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Exo 2', sans-serif;
          background-color: var(--dark-universe);
          color: #e5e7eb;
          line-height: 1.7;
          overflow-x: hidden;
        }
        
        h1, h2, h3, h4 {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .quantum-gradient-text {
          background: linear-gradient(135deg, var(--quantum-purple), var(--antimatter-blue), var(--singularity-gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 300% 300%;
          animation: gradientShift 8s ease infinite;
        }
        
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }
        
        .section {
          padding: 6rem 0;
        }
        
        .hero-section {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }
        
        .tagline {
          font-size: 3rem;
          margin: 2rem 0;
          text-shadow: 0 0 20px rgba(138, 43, 226, 0.5);
        }
        
        .subtitle {
          font-size: 1.5rem;
          color: #aaa;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .portal-button {
          display: inline-block;
          padding: 1.2rem 2.5rem;
          margin: 1rem;
          font-size: 1.3rem;
          font-family: 'Orbitron', sans-serif;
          background: linear-gradient(135deg, var(--quantum-purple), var(--antimatter-blue));
          border: none;
          border-radius: 50px;
          color: white;
          text-decoration: none;
          transition: all 0.5s ease;
          cursor: pointer;
          box-shadow: 0 0 30px rgba(138, 43, 226, 0.5);
          position: relative;
          overflow: hidden;
        }
        
        .portal-button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 50px rgba(0, 191, 255, 0.8);
        }
        
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
          margin: 4rem 0;
        }
        
        .widget {
          background: rgba(20, 20, 40, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid var(--antimatter-blue);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .widget:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 191, 255, 0.3);
        }
        
        .widget::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, var(--antimatter-blue), var(--singularity-gold));
        }
        
        .widget h3 {
          margin-bottom: 1.5rem;
          color: var(--antimatter-blue);
          font-size: 1.5rem;
        }

        /* TON Donation Interface */
        .ton-donation-interface {
          background: rgba(20, 20, 40, 0.7);
          border-radius: 20px;
          padding: 2rem;
          margin-top: 2rem;
          width: 100%;
          max-width: 600px;
        }
        
        .donation-controls {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .quantum-slider {
          width: 100%;
          height: 15px;
          -webkit-appearance: none;
          background: linear-gradient(90deg, var(--antimatter-blue), var(--neural-network));
          border-radius: 10px;
          outline: none;
          margin: 1.5rem 0;
        }
        
        .quantum-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 25px;
          height: 25px;
          background: var(--singularity-gold);
          border-radius: 50%;
          cursor: pointer;
        }
        
        .donation-amount {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .donation-amount span {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--singularity-gold);
        }
        
        .future-projection {
          margin-top: 1rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          border: 1px solid var(--time-crystal);
        }
        
        .wallet-notice {
          margin-top: 1rem;
          text-align: center;
        }
        
        .ton-connect-button {
          margin-top: 1rem;
        }

        /* 1. ANTIMATERIJSKI KONVERTER */
        .antimatter-converter {
          grid-column: span 2;
          text-align: center;
        }
        
        .energy-beam {
          height: 10px;
          background: linear-gradient(90deg, #8a2be2, #00bfff, #ffd700);
          margin: 1rem 0;
          border-radius: 5px;
          animation: beamPulse 3s infinite alternate;
        }
        
        @keyframes beamPulse {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        #energySlider {
          width: 100%;
          height: 15px;
          -webkit-appearance: none;
          background: linear-gradient(90deg, var(--antimatter-blue), var(--neural-network));
          border-radius: 10px;
          outline: none;
          margin: 1.5rem 0;
        }
        
        #energySlider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 25px;
          height: 25px;
          background: var(--singularity-gold);
          border-radius: 50%;
          cursor: pointer;
        }
        
        .matter-antimatter-balance {
          display: flex;
          height: 10px;
          margin: 1rem 0;
          border-radius: 5px;
          overflow: hidden;
        }
        
        .matter {
          background: var(--antimatter-blue);
        }
        
        .antimatter {
          background: var(--neural-network);
        }
        
        .conversion-result {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          margin: 1rem 0;
        }
        
        .conversion-result span {
          padding: 0.5rem 1rem;
          border-radius: 5px;
        }
        
        #energyResult {
          background: rgba(0, 191, 255, 0.2);
        }
        
        #antimatterResult {
          background: rgba(255, 0, 255, 0.2);
        }

        /* 2. HOLOGRAM BUDUĆNOSTI */
        .hologram-projector {
          position: relative;
        }
        
        .hologram {
          min-height: 200px;
          border: 1px dashed var(--antimatter-blue);
          border-radius: 15px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
          background: rgba(0, 191, 255, 0.05);
          position: relative;
          overflow: hidden;
        }
        
        .hologram::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 191, 255, 0.1) 0%, rgba(0, 0, 0, 0) 70%);
          animation: rotateHologram 20s linear infinite;
        }
        
        @keyframes rotateHologram {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .hologram h4 {
          margin-bottom: 1rem;
          color: var(--singularity-gold);
        }
        
        .multiplier {
          font-size: 3rem;
          font-family: 'Orbitron';
          background: linear-gradient(135deg, var(--singularity-gold), var(--antimatter-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0.5rem 0;
        }
        
        #hologramAmount {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--antimatter-blue);
          color: white;
          padding: 0.8rem;
          margin: 1rem 0;
          border-radius: 5px;
          font-size: 1.1rem;
        }
        
        .time-controls {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .time-controls button {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--singularity-gold);
          color: var(--singularity-gold);
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .time-controls button:hover {
          background: rgba(255, 215, 0, 0.2);
        }

        /* 3. MULTIVERZUM PORTFOLIO */
        .multiverse-portfolio {
          grid-column: span 2;
        }
        
        .universe-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .universe-tab {
          padding: 0.8rem 1.5rem;
          background: rgba(30, 30, 60, 0.7);
          border: 1px solid var(--quantum-purple);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Orbitron';
        }
        
        .universe-tab:hover, .universe-tab.active {
          background: var(--quantum-purple);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(138, 43, 226, 0.5);
        }
        
        .universe-content {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          padding: 2rem;
          min-height: 200px;
          border: 1px solid var(--quantum-purple);
        }
        
        .universe-content h3 {
          color: var(--singularity-gold);
          margin-bottom: 1rem;
        }
        
        .universe-content p {
          margin: 0.5rem 0;
        }
        
        .universe-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }
        
        .stat-item {
          background: rgba(138, 43, 226, 0.1);
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid var(--quantum-purple);
        }
        
        .stat-value {
          font-size: 1.8rem;
          font-family: 'Orbitron';
          color: var(--singularity-gold);
          margin: 0.5rem 0;
        }

        /* 4. KVANTNI UGOVOR */
        .quantum-contract {
          grid-column: span 2;
          text-align: center;
        }
        
        .contract-scroll {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          padding: 2rem;
          border: 1px solid var(--singularity-gold);
          max-width: 800px;
          margin: 0 auto;
        }
        
        .contract-scroll p {
          margin: 1rem 0;
          line-height: 1.8;
        }
        
        .editable {
          color: var(--singularity-gold);
          border-bottom: 1px dashed var(--singularity-gold);
          padding: 0 0.2rem;
          outline: none;
        }
        
        .signature-field {
          margin: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .signature-canvas {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--singularity-gold);
          border-radius: 5px;
          cursor: crosshair;
          margin-bottom: 1rem;
        }
        
        /* 5. TAHIONSKI LIVE FEED */
        .tachyon-feed {
          position: relative;
          height: 300px;
          overflow: hidden;
          border-radius: 15px;
        }
        
        .tachyon-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: var(--tachyon);
          border-radius: 50%;
          animation: tachyon-move 3s linear infinite;
          opacity: 0;
        }
        
        @keyframes tachyon-move {
          0% { transform: translateY(-100px) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(400px) translateX(100px); opacity: 0; }
        }
        
        .tachyon-messages {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 1rem;
          overflow-y: auto;
        }
        
        .tachyon-message {
          background: rgba(0, 0, 0, 0.7);
          padding: 0.5rem 1rem;
          border-radius: 5px;
          border-left: 3px solid var(--tachyon);
          margin-bottom: 0.5rem;
        }

        /* 7. KVANTNI ŠIFRATOR */
        .quantum-cipher {
          text-align: center;
        }
        
        .cipher-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 5px;
          margin: 1.5rem 0;
        }
        
        .bit {
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.5rem;
          color: var(--antimatter-blue);
          text-align: center;
          padding: 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
          transition: all 0.3s;
        }
        
        .bit:hover {
          transform: scale(1.2);
          background: rgba(0, 191, 255, 0.3);
        }

        /* 8. TERMINAL PROROČANSTVA */
        .oracle-terminal {
          position: relative;
        }
        
        .oracle-screen {
          background: #000;
          height: 200px;
          padding: 1rem;
          font-family: 'Share Tech Mono', monospace;
          overflow-y: auto;
          border-radius: 5px;
          border: 1px solid var(--quantum-purple);
          text-align: left;
          margin-bottom: 1rem;
        }
        
        .oracle-screen::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(0,0,0,0.8) 50%, transparent 100%);
          pointer-events: none;
        }
        
        .oracle-response {
          color: var(--singularity-gold);
          white-space: pre-wrap;
          margin-top: 0.5rem;
        }
        
        #oracleQuestion {
          width: 100%;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid var(--quantum-purple);
          color: white;
          padding: 0.8rem;
          margin-bottom: 1rem;
          border-radius: 5px;
          font-family: 'Share Tech Mono';
        }

        /* TON Rudarski Pool */
        .mining-hero {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(20, 20, 40, 0.7);
          border-radius: 20px;
          margin: 4rem 0;
          border: 1px solid var(--antimatter-blue);
        }
        
        .pool-config {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin: 3rem 0;
        }
        
        .config-card {
          background: rgba(0, 0, 0, 0.3);
          padding: 1.5rem;
          border-radius: 15px;
          border: 1px solid var(--quantum-purple);
        }
        
        .wallet-address {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.8rem;
          border-radius: 5px;
          font-family: 'Share Tech Mono';
        }
        
        .qr-code-container {
          padding: 10px;
          background: white;
          border-radius: 8px;
          display: inline-block;
          margin-top: 1rem;
        }
        
        .pool-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
        }
        
        .stat-card {
          background: rgba(138, 43, 226, 0.1);
          padding: 1rem;
          border-radius: 10px;
          border: 1px solid var(--quantum-purple);
        }
        
        .start-mining {
          margin-top: 3rem;
        }
        
        .start-mining ol {
          text-align: left;
          max-width: 600px;
          margin: 1.5rem auto;
          padding-left: 1.5rem;
        }
        
        .start-mining li {
          margin: 0.8rem 0;
        }

        /* Responsivnost */
        @media (max-width: 1200px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
          .widget {
            grid-column: span 1 !important;
          }
        }
        
        @media (max-width: 768px) {
          .tagline {
            font-size: 2rem;
          }
          .portal-button {
            font-size: 1.1rem;
            padding: 1rem 2rem;
          }
          .widget {
            padding: 1.5rem;
          }
          .signature-canvas {
            width: 100%;
          }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}