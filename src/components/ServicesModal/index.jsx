'use client'
import styles from './style.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, slideUp } from './animation';
import { useEffect, useState } from 'react';

const services = [
    {
        title: "Who We Are",
        description: "A multidisciplinary team of builders, creators, and thinkers who combine strategy and execution to help organizations grow and evolve with confidence.",

    },
    {
        title: "What We Do",
        description: "We specialize in high-quality digital services designed to accelerate business growth. Combining the power of AI innovation with human creativity, we transform strategy and technology into real-world impact.",

    }
];

export default function ServicesModal({ active, setActive }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle escape key and background click to close modal
    useEffect(() => {
        if (!active) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setActive(false);
            }
        };

        const handlePreventScroll = (e) => {
            e.preventDefault();
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        // Prevent scroll on mobile
        if (isMobile) {
            document.addEventListener('touchmove', handlePreventScroll, { passive: false });
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
            if (isMobile) {
                document.removeEventListener('touchmove', handlePreventScroll);
            }
        };
    }, [active, setActive, isMobile]);

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setActive(false);
        }
    };

    return (
        <AnimatePresence mode="wait">
            {active && (
                <motion.div
                    variants={opacity}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className={styles.modalContainer}
                    onClick={handleBackgroundClick}
                >
                    <video
                        autoPlay={!isMobile}
                        loop
                        muted
                        className={styles.backgroundVideo}
                        playsInline
                        style={{ pointerEvents: 'none' }}
                    >
                        <source src="/consult.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className={styles.overlay}></div>
                    <div className={styles.modalSlider}>
                        <div className={styles.modal}>
                            <div className={styles.header}>
                                <motion.h2 variants={slideUp} initial="initial" animate="enter" exit="exit">About Us</motion.h2>
                                <div onClick={() => { setActive(false) }} className={styles.closeButton}>
                                    <p>Close</p>
                                </div>
                            </div>
                            <div className={styles.body}>
                                {services.map((service, index) => (
                                    <div key={index} className={styles.service}>
                                        <motion.h3 variants={slideUp} initial="initial" animate="enter" exit="exit">{service.title}</motion.h3>
                                        <motion.p variants={slideUp} initial="initial" animate="enter" exit="exit">{service.description}</motion.p>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}