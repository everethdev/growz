
'use client'
import styles from './style.module.scss'
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import ServicesModal from '../ServicesModal';
import RotatingText from './RotatingText';

const slideUp = {
    initial: { y: "100%" },
    enter: {
        y: "0%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
}

// Array now contains all 12 animation types
const ANIMATION_TYPES = [
    'halftone', 'grid', 'ripple', 'expandingLines', 'silver'
];

export default function Home() {
  const [animationIndex, setAnimationIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setAnimationIndex(prevIndex => (prevIndex + 1) % ANIMATION_TYPES.length);
        setIsFading(false);
      }, 500); // Fade duration
    }, 6000); // 2-second animation cycle
    return () => clearInterval(interval);
  }, []);

  const animationElements = useMemo(() => {
    const currentAnimation = ANIMATION_TYPES[animationIndex];
    let elements = [];

    switch (currentAnimation) {
      case 'pulsating': {
        const center = { key: 'center', class: styles.pulseDot, style: { width: '8px', height: '8px', left: 'calc(50% - 4px)', top: 'calc(50% - 4px)' }};
        elements.push(center);
        for (let r = 0; r < 4; r++) {
          const radius = 15 + r * 15, count = 6 + r * 3;
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI, x = Math.cos(angle) * radius, y = Math.sin(angle) * radius, sz = 3 + r * 0.3;
            elements.push({ key: `p-${r}-${i}`, class: styles.pulseDot, style: { width: `${sz}px`, height: `${sz}px`, left: `calc(50% + ${x}px - ${sz/2}px)`, top: `calc(50% + ${y}px - ${sz/2}px)`, animationDelay: `${r * 0.2 + i * 0.1}s`, background: `rgba(28, 28, 28, ${(90 - r * 10) / 100})` }});
          }
        }
        break;
      }
      
      case 'orbits': {
        elements.push({ key: 'center', class: styles.dot, style: { width: '8px', height: '8px', left: 'calc(50% - 4px)', top: 'calc(50% - 4px)' }});
        for (let r = 0; r < 3; r++) {
          let orbitDots = [];
          const radius = 20 + r * 20, count = 6 + r * 3;
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI, x = Math.cos(angle) * radius, y = Math.sin(angle) * radius, sz = 4 - r * 0.5;
            orbitDots.push({ key: `o-d-${r}-${i}`, class: styles.dot, style: { width: `${sz}px`, height: `${sz}px`, left: `calc(50% + ${x}px - ${sz/2}px)`, top: `calc(50% + ${y}px - ${sz/2}px)`, background: `rgba(28, 28, 28, ${(90 - r * 15) / 100})` }});
          }
          elements.push({ key: `o-c-${r}`, class: styles.orbitContainer, style: { animationDuration: `${8 + r * 4}s`, animationDirection: r % 2 ? 'reverse' : 'normal' }, children: orbitDots });
        }
        break;
      }

      case 'sequentialRings': {
        for (let i = 0; i < 5; i++) {
          const rad = 15 + i * 15, count = 8 + i * 4;
          for (let j = 0; j < count; j++) {
            const angle = (j / count) * 2 * Math.PI, x = Math.cos(angle) * rad, y = Math.sin(angle) * rad, sz = 3 + i * 0.2;
            elements.push({ key: `sr-${i}-${j}`, class: styles.sequentialDot, style: { width: `${sz}px`, height: `${sz}px`, left: `calc(50% + ${x}px - ${sz/2}px)`, top: `calc(50% + ${y}px - ${sz/2}px)`, animationDelay: `${i * 0.3 + (j / count) * 0.1}s`, background: `rgba(28, 28, 28, ${(90 - i * 15) / 100})` }});
          }
        }
        break;
      }

      case 'concentricRotations': {
        let rings = [];
        for (let r = 0; r < 8; r++) {
          let ringDots = [];
          const radius = 10 + r * 10, circ = 2 * Math.PI * radius, count = Math.max(6, Math.floor(circ / 10));
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI, x = Math.cos(angle) * radius, y = Math.sin(angle) * radius;
            ringDots.push({ key: `crd-${r}-${i}`, class: styles.dot, style: { width: '4px', height: '4px', left: `calc(50% + ${x}px - 2px)`, top: `calc(50% + ${y}px - 2px)`, background: `rgba(28, 28, 28, ${(90 - r * 5) / 100})` }});
          }
          rings.push({ key: `crr-${r}`, class: styles.concentricRing, style: { animationDuration: `${3 * Math.pow(1.5, r)}s` }, children: ringDots });
        }
        elements.push({ key: 'cr-cont', class: styles.concentricContainer, children: rings });
        break;
      }

      case 'circularWaves': {
        for (let r = 0; r < 5; r++) {
          const rad = 15 + r * 15, count = 8 + r * 4;
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI, x = Math.cos(angle) * rad, y = Math.sin(angle) * rad, sz = 3 + r * 0.2;
            elements.push({ key: `cw-${r}-${i}`, class: styles.circularWaveDot, style: { width: `${sz}px`, height: `${sz}px`, left: `calc(50% + ${x}px - ${sz/2}px)`, top: `calc(50% + ${y}px - ${sz/2}px)`, animationDelay: `${r * 0.2 + (i / count) * 0.5}s`, background: `rgba(28, 28, 28, ${(90 - r * 10) / 100})` }});
          }
        }
        break;
      }
      
      case 'expandingLines': {
        for (let g = 0; g < 3; g++) {
          let lines = [];
          for (let i = 0; i < 12; i++) {
            lines.push({ key: `el-l-${g}-${i}`, class: styles.expandingLine, style: { animationDelay: `${(i/12)*2}s`, transform: `rotate(${(360/12)*i}deg)` }});
          }
          elements.push({ key: `el-c-${g}`, class: styles.lineContainer, style: { animationDuration: `${8+g*4}s`, animationDirection: g % 2 ? 'reverse' : 'normal' }, children: lines });
        }
        break;
      }

      case 'ripple': {
        elements.push({ key: 'center-ripple', class: styles.dot, style: { width: '8px', height: '8px', left: 'calc(50% - 4px)', top: 'calc(50% - 4px)', zIndex: 10 }});
        for (let i = 0; i < 4; i++) {
          elements.push({ key: `r-r-${i}`, class: styles.rippleRing, style: { animationDelay: `${i * (4/4)}s` }});
        }
        const numRings = 6, maxRadius = 80;
        for (let ring = 0; ring < numRings; ring++) {
          const radius = 15 + (ring * (maxRadius - 15)) / (numRings - 1), numDots = 6 + ring * 3;
          for (let i = 0; i < numDots; i++) {
            const angle = (i / numDots) * 2 * Math.PI, x = Math.cos(angle) * radius, y = Math.sin(angle) * radius;
            const distanceFromCenter = Math.sqrt(x*x + y*y) / maxRadius, size = 5 - ring * 0.5;
            elements.push({ key: `rd-${ring}-${i}`, class: styles.rippleWaveDot, style: { width: `${size}px`, height: `${size}px`, left: `calc(50% + ${x}px - ${size/2}px)`, top: `calc(50% + ${y}px - ${size/2}px)`, animation: 'rippleWave 1s infinite ease-in-out', animationDelay: `${distanceFromCenter * (4/1.2)}s`, background: `rgba(28, 28, 28, ${(90 - ring * 10) / 100})` }});
          }
        }
        break;
      }

      case 'fibonacci':
      case 'silver':
      case 'halftone': {
        const N = currentAnimation === 'halftone' ? 60 : 120;
        const scale = 1.2;
        let className = styles.fibonacciDot;
        if (currentAnimation === 'silver') className = styles.silverDot;
        if (currentAnimation === 'halftone') className = styles.halftoneDot;

        for (let i = 0; i < N; i++) {
            const angle = i * (Math.PI * (3 - Math.sqrt(5))), rad = scale * Math.sqrt(i) * (currentAnimation === 'halftone' ? 8 : 6), size = 4 - (i/N) * 2;
            if (size < 1) continue;
            const x = Math.cos(angle) * rad, y = Math.sin(angle) * rad;
            elements.push({ key: `f-${i}`, class: className, style: { width: `${size}px`, height: `${size}px`, left: `calc(50% + ${x}px - ${size/2}px)`, top: `calc(50% + ${y}px - ${size/2}px)`, animationDelay: `${(i/N)*2}s` }});
        }
        break;
      }
      
      case 'fibonacciSVG': {
        const N = 200, SIZE = 180, DOT_RADIUS = 2, MARGIN = 4, CENTER = SIZE / 2, MAX_RADIUS = CENTER - MARGIN - DOT_RADIUS, GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)), DURATION = 3;
        let circles = [];
        for (let i = 0; i < N; i++) {
            const idx = i + 0.5, frac = idx / N, r = Math.sqrt(frac) * MAX_RADIUS, theta = idx * GOLDEN_ANGLE;
            circles.push({
                key: `fsvg-${i}`,
                cx: CENTER + r * Math.cos(theta),
                cy: CENTER + r * Math.sin(theta),
                r: DOT_RADIUS,
                delay: `${frac * DURATION}s`
            });
        }
        elements.push({ type: 'svg', key: 'fsvg-cont', children: circles, width: SIZE, height: SIZE, viewBox: `0 0 ${SIZE} ${SIZE}` });
        break;
      }

      case 'grid':
      default: {
        const grid = 9, spacing = 16, dotSize = 4, offset = -(spacing * (grid - 1)) / 2;
        for (let y = 0; y < grid; y++) {
          for (let x = 0; x < grid; x++) {
            const px = offset + x * spacing, py = offset + y * spacing, center = (grid - 1) / 2, dist = Math.hypot(x-center, y-center), maxDist = Math.hypot(center, center);
            elements.push({ key: `g-${x}-${y}`, class: `${styles.dot} ${styles.breathingDot}`, style: { width: `${dotSize}px`, height: `${dotSize}px`, left: `calc(50% + ${px}px - ${dotSize/2}px)`, top: `calc(50% + ${py}px - ${dotSize/2}px)`, animationDelay: `${(dist/maxDist) * 1.5}s`, background: `rgba(28, 28, 28, ${(90 - (dist/maxDist) * 40)/100})` }});
          }
        }
        break;
      }
    }
    return elements;
  }, [animationIndex]);

  return (
    <motion.div variants={slideUp} initial="initial" animate="enter" className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>Paradigm Global</div>

      </header>
      <main className={styles.mainContent}>
        <div className={styles.textContainer}>
          <p className={styles.microcopy}>We offer</p>
          <RotatingText
            texts={['High-End Consultancy', 'AI-Powered Solutions', 'Web Development']}
            staggerFrom={"first"}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3000}
            mainClassName={styles.headline}
          />
          <p className={styles.description}>to help you grow your business in today&apos;s digital era.</p>
          <button className={styles.ctaButton} onClick={() => {setModalActive(true)}}><span>Learn More</span></button>
        </div>
        <div className={`${styles.illustrationContainer} ${isFading ? styles.fading : ''}`}>
           <div className={styles.circleContainer}>
              <div className={`${styles.corner} ${styles.topLeft}`}>
                <svg width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><polygon points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288" fill="currentColor"></polygon></svg>
              </div>
              <div className={`${styles.corner} ${styles.topRight}`}>
                <svg width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><polygon points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288" fill="currentColor"></polygon></svg>
              </div>
              <div className={`${styles.corner} ${styles.bottomLeft}`}>
                <svg width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><polygon points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288" fill="currentColor"></polygon></svg>
              </div>
              <div className={`${styles.corner} ${styles.bottomRight}`}>
                <svg width="16" height="16" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><polygon points="448,224 288,224 288,64 224,64 224,224 64,224 64,288 224,288 224,448 288,448 288,288 448,288" fill="currentColor"></polygon></svg>
              </div>
              {animationElements.map(el => {
                if (el.type === 'svg') {
                  return (
                    <svg key={el.key} width={el.width} height={el.height} viewBox={el.viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
                      {el.children.map(c => (
                        <circle key={c.key} cx={c.cx} cy={c.cy} r={c.r} fill="#1c1c1c" opacity="0.6">
                           <animate attributeName="r" values={`${c.r*0.5};${c.r*1.5};${c.r*0.5}`} dur="3s" begin={c.delay} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                           <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin={c.delay} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
                        </circle>
                      ))}
                    </svg>
                  )
                }
                if (el.children) {
                  return (
                    <div key={el.key} className={el.class} style={el.style}>
                      {el.children.map(child => <div key={child.key} className={child.class} style={child.style}></div>)}
                    </div>
                  );
                }
                return <div key={el.key} className={el.class} style={el.style}></div>;
              })}
            </div>
        </div>
      </main>
      <ServicesModal active={modalActive} setActive={setModalActive} />
    </motion.div>
  )
}
