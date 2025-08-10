'use client';
import styles from './page.module.scss'
import { useEffect, useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import OurServices from '../components/OurServices';
import SlidingImages from '../components/SlidingImages';
import Contact from '../components/Contact';
import ServicesModal from '../components/ServicesModal';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  
  const mainRef = useRef(null);

  useEffect( () => {
    let locomotiveScroll;

    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default;
          locomotiveScroll = new LocomotiveScroll({
            el: mainRef.current,
            smooth: true,
          });

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )();

    const handleOpenModal = () => setModalActive(true);
    
    // CORRECTED SCROLL HANDLER
    const handleScrollTo = (e) => {
      if (locomotiveScroll) {
        const target = e.detail.target === '/' ? 0 : e.detail.target;
        locomotiveScroll.scrollTo(target, {
          duration: 1.8, // This controls the scroll speed for a smooth effect
          // The incorrect 'easing' line has been removed.
        });
      }
    };

    window.addEventListener('openAboutModal', handleOpenModal);
    window.addEventListener('scrollToSection', handleScrollTo);

    return () => {
      window.removeEventListener('openAboutModal', handleOpenModal);
      window.removeEventListener('scrollToSection', handleScrollTo);
      if (locomotiveScroll) locomotiveScroll.destroy();
    }
  }, [])

  return (
    <main ref={mainRef} data-scroll-container className={styles.main}>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>

      <ServicesModal active={modalActive} setActive={setModalActive} />

      <div id="home" data-scroll-section>
        <Landing />
      </div>
      <Description data-scroll-section/>
      <div id="work" data-scroll-section>
        <Projects />
      </div>
      <div id="services" data-scroll-section>
        <OurServices />
      </div>
      <SlidingImages data-scroll-section/>
      <div id="contact" data-scroll-section>
        <Contact />
      </div>
    </main>
  )
}