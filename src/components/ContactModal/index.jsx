import { motion, AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';
import { useState, useEffect } from 'react';
import Rounded from '../../common/RoundedButton';

// Checkmark SVG component
const CheckIcon = () => (
    <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="25" fill="none" stroke="#f6ff00" strokeWidth="2"/>
        <motion.path
            fill="none"
            stroke="#f6ff00"
            strokeWidth="3"
            d="M14 27l5.917 5.917L38 18.917"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        />
    </svg>
);


const ContactModal = ({ active, setActive }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        // Reset form state when modal is closed
        if (!active) {
            const timer = setTimeout(() => {
                setIsSent(false);
                setName('');
                setEmail('');
                setMessage('');
            }, 500); // Delay to allow close animation to finish
            return () => clearTimeout(timer);
        }
    }, [active]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, you'd send the data here
        console.log({ name, email, message });
        setIsSent(true);
        setTimeout(() => {
            setActive(false);
        }, 2500); // Auto-close modal after 2.5s
    };

    const modalVariants = {
        open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
        closed: { opacity: 0, y: "100vh", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
    };

    const formContainerVariants = {
        initial: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: 'easeOut' } }
    };
    
    const successContainerVariants = {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut', delay: 0.4 } }
    };

    const formItemVariants = {
        open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
        closed: { opacity: 0, y: 20 }
    };

    return (
        <motion.div
            className={styles.modalContainer}
            variants={modalVariants}
            initial="closed"
            animate="open"
            exit="closed"
        >
            <div className={styles.modalContent}>
                <AnimatePresence mode="wait">
                    {!isSent ? (
                        <motion.div key="form" variants={formContainerVariants} initial="initial" exit="exit">
                            <motion.div className={styles.header} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5, delay: 0.2}}>
                                <h2>Get In Touch</h2>
                                <button onClick={() => setActive(false)} className={styles.closeButton}>&times;</button>
                            </motion.div>
                            <motion.form 
                                onSubmit={handleSubmit} 
                                className={styles.form} 
                                initial="closed" 
                                animate="open"
                                variants={{ open: { transition: { staggerChildren: 0.1 } } }}
                            >
                                <motion.div className={styles.formGroup} variants={formItemVariants}>
                                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    <label htmlFor="name">Name</label>
                                </motion.div>
                                <motion.div className={styles.formGroup} variants={formItemVariants}>
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <label htmlFor="email">Email</label>
                                </motion.div>
                                <motion.div className={styles.formGroup} variants={formItemVariants}>
                                    <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                                    <label htmlFor="message">Message</label>
                                </motion.div>
                                <motion.div variants={formItemVariants}>
                                    <Rounded>
                                        <button type="submit" className={styles.submitButton}>
                                            <p>Send Message</p>
                                        </button>
                                    </Rounded>
                                </motion.div>
                            </motion.form>
                        </motion.div>
                    ) : (
                        <motion.div key="success" className={styles.successMessage} variants={successContainerVariants} initial="initial" animate="animate">
                            <CheckIcon />
                            <h3>Message Sent!</h3>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className={styles.modalBackdrop} onClick={() => !isSent && setActive(false)}></div>
        </motion.div>
    );
};

export default ContactModal;