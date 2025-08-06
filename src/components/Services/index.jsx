'use client'
import styles from './style.module.scss';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideUp, opacity } from './animation';

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

export default function Index() {
    const [selectedService, setSelectedService] = useState(0);

    return (
        <div className={styles.services}>
            <div className={styles.header}>
                <h2>Our Services</h2>
            </div>
            <div className={styles.body}>
                <div className={styles.serviceList}>
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className={`${styles.serviceTitle} ${selectedService === index ? styles.active : ''}`}
                            onMouseEnter={() => setSelectedService(index)}
                        >
                            <h3>{service.title}</h3>
                        </div>
                    ))}
                </div>
                <div className={styles.serviceDetails}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedService}
                            variants={opacity}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                        >
                            <p>{services[selectedService].description}</p>
                            <ul>
                                {services[selectedService].points.map((point, pIndex) => (
                                    <li key={pIndex}>{point}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
