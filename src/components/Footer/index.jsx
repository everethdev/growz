import { useState } from 'react';
import styles from './style.module.scss';
import ContactModal from '../ContactModal';

const Footer = () => {
    const [contactModalActive, setContactModalActive] = useState(false);

    const handleGetInTouch = () => {
        setContactModalActive(true);
    };

    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className={styles.footer}>
                <div className={styles.container}>
                    <div className={styles.topSection}>
                        <div className={styles.leftContent}>
                            <h2 className={styles.headline}>Ready to Transform Your Business?</h2>
                            <p className={styles.description}>
                                Let&apos;s discuss how our strategic consulting can help drive your business forward.
                                We&apos;re here to turn challenges into opportunities.
                            </p>
                        </div>
                        <div className={styles.rightContent}>
                            <button
                                className={styles.ctaButton}
                                onClick={handleGetInTouch}
                            >
                                <span>Get In Touch</span>
                            </button>
                        </div>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.bottomSection}>
                        <div className={styles.companyInfo}>
                            <div className={styles.logo}>Paradigm Global</div>
                            <p className={styles.tagline}>Business Centre, SPC Free Zone, Sheikh Mohammed Bin Zayed Rd, Al Zahia
Sharjah, United Arab Emirates</p>
                            <p className={styles.contact}>hello@paradigmglobal.com </p>
                            <p className={styles.contact}>+40 751 943 797</p>
                        </div>

                        <div className={styles.links}>
                            <div className={styles.linkGroup}>
                                <h4>Services</h4>
                                <ul>
                                    <li><a href="#strategy">Strategy</a></li>
                                    <li><a href="#operations">Operations</a></li>
                                    <li><a href="#digital">Digital Transformation</a></li>
                                    <li><a href="#growth">Growth</a></li>
                                </ul>
                            </div>

                            <div className={styles.linkGroup}>
                                <h4>Company</h4>
                                <ul>
                                    <li><a href="#about">About Us</a></li>
                                    <li><a href="#team">Our Team</a></li>
                                    <li><a href="#careers">Careers</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                </ul>
                            </div>

                            <div className={styles.linkGroup}>
                                <h4>Resources</h4>
                                <ul>
                                    <li><a href="#insights">Insights</a></li>
                                    <li><a href="#case-studies">Case Studies</a></li>
                                    <li><a href="#whitepapers">Whitepapers</a></li>
                                    <li><a href="#blog">Blog</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footerBottom}>
                        <div className={styles.copyright}>
                            <p>&copy; {currentYear} Paradigm. All rights reserved.</p>
                        </div>
                        <div className={styles.legalLinks}>
                            <a href="#privacy">Privacy Policy</a>
                            <a href="#terms">Terms of Service</a>
                            <a href="#cookies">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>

            {contactModalActive && (
                <ContactModal
                    active={contactModalActive}
                    setActive={setContactModalActive}
                />
            )}
        </>
    );
};

export default Footer;