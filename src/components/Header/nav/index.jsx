import React, { useState } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../animation';
import Link from './Link';
import Curve from './Curve';
import Footer from './Footer';


const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "#work",
  },
    {
    title: "Services",
    href: "#services",
  },
  {
    title: "About",
    href: "#about", 
  },
  {
    title: "Contact",
    href: "#contact",
  },
]

export default function Nav() {

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  const handleLinkClick = (e, data) => {
    e.preventDefault(); // Prevent default link behavior for all items

    // Update the 'if' check to match the new href
    if (data.href === '#about') {
      // If it's the "About" link, dispatch the modal event
      window.dispatchEvent(new CustomEvent('openAboutModal'));
    } else {
      // For all other links, dispatch the scroll event
      window.dispatchEvent(new CustomEvent('scrollToSection', { detail: { target: data.href } }));
    }
    
    // Update the visual indicator on click
    setSelectedIndicator(data.href);
  };

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className={styles.menu}
      >
       <div className={styles.body}>
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
                    <div className={styles.header}>
                        <p>Navigation</p>
                    </div>
                    {
                      navItems.map( (data, index) => {
                        return (
                          // Wrap every link in a div with our smart click handler
                          <div key={index} onClick={(e) => handleLinkClick(e, data)}>
                            <Link 
                              data={{...data, index}} 
                              isActive={selectedIndicator === data.href} 
                              setSelectedIndicator={setSelectedIndicator}>
                            </Link>
                          </div>
                        )
                      })
                    }
            </div>
            <Footer />
        </div>
        <Curve />
    </motion.div>
  )
}