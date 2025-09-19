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
import Footer from '../components/Footer';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const [modalActive, setModalActive] = useState(false);
  
  const mainRef = useRef(null);

  useEffect( () => {
    let locomotiveScroll;

    const initLocomotiveScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      locomotiveScroll = new LocomotiveScroll({
        el: mainRef.current,
        smooth: true,
      });
    }

    initLocomotiveScroll();

    setTimeout( () => {
      setIsLoading(false);
      document.body.style.cursor = 'default'
      window.scrollTo(0,0);
    }, 2000)

    const handleOpenModal = () => setModalActive(true);
    
    const handleScrollTo = (e) => {
      if (locomotiveScroll) {
        const target = e.detail.target === '/' ? 0 : e.detail.target;
        locomotiveScroll.scrollTo(target, {
          duration: 1.8, 
        });
      }
    };

    const handleResize = () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
        initLocomotiveScroll();
      }
    }

    window.addEventListener('openAboutModal', handleOpenModal);
    window.addEventListener('scrollToSection', handleScrollTo);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('openAboutModal', handleOpenModal);
      window.removeEventListener('scrollToSection', handleScrollTo);
      window.removeEventListener('resize', handleResize);
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

            <div id="services" data-scroll-section>
        <OurServices />
      </div>

      <div id="work" data-scroll-section>
        <Projects />
      </div>

      <div id="contact" data-scroll-section>
        <Footer />
      </div>

    </main>
  )
}
