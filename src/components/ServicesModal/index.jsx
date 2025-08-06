'use client'
import styles from './style.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, slideUp } from './animation';

const services = [
    {
        title: "Artificial Intelligence Consulting",
        description: "Our AI consultants and data scientists help you identify high-impact opportunities to apply artificial intelligence across your business. We design practical, forward-looking solutions that drive growth, efficiency, and long-term value.",
        points: [
            "Custom Pre-Training",
            "Enterprise Integration",
            "Optimized Deployment",
            "Simple Control"
        ]
    },
    {
        title: "Web & Application Development",
        description: "Websites and Mobile Apps Designed for Security, Scalability, and Performance. Our web development services are built to drive real business value, creating reliable, high-impact digital solutions tailored to your needs.",
        points: [
            "Expert Website Accessibility (WCAG, ADA, EAA)",
            "Scalable Architectures",
            "Performance Optimization",
            "Secure Development Lifecycle"
        ]
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
                                <motion.h2 variants={slideUp} initial="initial" animate="enter" exit="exit">Our Services</motion.h2>
                                <div onClick={() => { setActive(false) }} className={styles.closeButton}>
                                    <p>Close</p>
                                </div>
                            </div>
                            <div className={styles.body}>
                                {services.map((service, index) => (
                                    <div key={index} className={styles.service}>
                                        <motion.h3 variants={slideUp} initial="initial" animate="enter" exit="exit">{service.title}</motion.h3>
                                        <motion.p variants={slideUp} initial="initial" animate="enter" exit="exit">{service.description}</motion.p>
                                        <ul>
                                            {service.points.map((point, pIndex) => (
                                                <motion.li key={pIndex} variants={slideUp} initial="initial" animate="enter" exit="exit">{point}</motion.li>
                                            ))}
                                        </ul>
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
