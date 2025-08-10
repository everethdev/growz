'use client'
import styles from './style.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, slideUp } from './animation';

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
    return (
        <AnimatePresence mode="wait">
            {active && (
                <motion.div variants={opacity} initial="initial" animate="enter" exit="exit" className={styles.modalContainer}>
                    <video autoPlay loop muted className={styles.backgroundVideo}>
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
