'use client';
import styles from './style.module.scss';
import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opacity, listStagger, itemFade, sectionReveal, titleStagger, titleItem } from './animation';

const services = [
  {
    id: 'ai',
    title: 'Artificial Intelligence Consulting Services',
    subtitle: 'Practical AI Solutions for Real Business Impact',
    description:
      'Our AI consultants and data scientists help you identify high-impact opportunities to apply artificial intelligence across your business. We design practical, forward-looking solutions that drive growth, efficiency, and long-term value.',
    points: [
      'AI Strategy Development: Collaborate with you to define a clear AI roadmap aligned with your business goals.',
      'Workflow Automation: Identify and automate repetitive tasks to free up your team for higher-value work.',
      'Enhanced Decision-Making: Leverage AI to analyze data and provide actionable insights for better decision-making.',
      'Rapid Prototyping: Quickly build and test AI models to validate concepts before full-scale implementation.',
    ],

  },
    {
    id: 'ai2',
    title: 'Domain-Specialized AI Agents for Your Business',
    subtitle: 'Tailored AI Solutions for Industry-Specific Challenges',
    description:
      'We build AI agents tailored to your specific industry and use cases, leveraging the latest advancements in natural language processing and machine learning. Our solutions are designed to integrate seamlessly with your existing workflows, enhancing productivity and decision-making.',
    points: [
      'Custom Pre-Training: Train models from scratch or refine open-source checkpoints using your proprietary data.',
      'Enterprise Integration: Connect to your internal systems with custom tools, prompt libraries, and RAG-based solutions.',
      'Optimized Deployment: Scalable, high-performance infrastructure for efficient inference.',
      'Simple Control: Intuitive interfaces to configure and manage agents without deep technical expertise.',
    ],
  },
  {
    id: 'web',
    title: 'Web & Application Development',
    subtitle:
      'Websites and Mobile Apps Designed for Security, Scalability, and Performance',
    description:
      'Our web development services are built to drive real business value. Whether you need a straightforward implementation or a full-scale redesign, we bring cross-functional teams together to create reliable, high-impact digital solutions tailored to your needs.',
        points: [
      'Full-Stack Expertise: From front-end to back-end, we cover all aspects of web and app development.',
      'Extensive Frameworks: Proficient in React, Angular, Vue.js, Node.js, and more.',
      'Mobile-First Design: Responsive and adaptive designs for optimal user experiences across devices.',
      'Security-First Approach: Implementing best practices to protect your data and users.',
      'Scalable Solutions: Architected for growth, ensuring your applications can handle increased traffic and complexity.',
    ],

  },
  {
    id: 'web3',
    title: 'Web3 Services Suite',
    subtitle: 'Unlock the power of blockchain with solutions designed for you business',
    description:
      'Our Web3 services help you harness the power of decentralized technologies. From tokenization and smart contracts to custom dApp development, we provide end-to-end solutions to future-proof your business.',
    points: [
      'Tokenization & Smart Contracts - Fractionalize ownership, streamline agreements, and raise capital through secure, transparent digital assets',
      'Crypto Payments - Accept and manage crypto transactions with seamless wallet integrations and stablecoin settlement options',
      'Blockchain Infrastructure & dApp Development - Build scalable decentralized applications and robust blockchain systems tailored to your business needs',
    ],
  },
  {
    id: 'web2',
    title: 'Expert Website Accessibility Services for WCAG Compliance',
    subtitle:
      'Ensuring Your Digital Presence is Inclusive and Compliant',
    description:
      'Your website should be accessible to everyone, regardless of ability. Our accessibility experts help you meet WCAG standards and ensure your digital content is usable by all, enhancing user experience and expanding your audience reach.',
    accessibilityTitle:
      'Expert Website Accessibility Services for WCAG Compliance',
    compliance: ['Americans with Disabilities Act (ADA)', 'European Accessibility Act (EAA)'],
    extra:
      'Ensuring digital accessibility isn’t just about meeting legal requirements, it’s a strategic advantage. Our services help you create inclusive, user-friendly experiences for all—promoting equity, expanding your audience, and supporting sustainable growth while staying compliant.',
  },
];

export default function OurServices() {
  const [selected, setSelected] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });
  const serviceListRef = useRef(null);
  const listItemRefs = useRef([]);
  const measureRefs = useRef([]);

  useLayoutEffect(() => {
    const calculateHeight = () => {
      const heights = measureRefs.current.map((el) => el?.offsetHeight || 0);
      const newMaxHeight = Math.max(0, ...heights);
      if (newMaxHeight !== maxHeight) {
        setMaxHeight(newMaxHeight);
      }
    };

    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [maxHeight]);

  useLayoutEffect(() => {
    const listEl = serviceListRef.current;
    const itemEl = listItemRefs.current[selected];
    if (!listEl || !itemEl) return;

    const listRect = listEl.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();
    
    setIndicator({
      top: itemRect.top - listRect.top + listEl.scrollTop,
      height: itemRect.height,
    });
  }, [selected]);

  const onKeySelect = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelected(index);
    }
  };

  return (
    <motion.section 
      className={styles.ourServices} 
      aria-labelledby="our-services-heading"
      variants={sectionReveal} 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.header}>
        <h2 id="our-services-heading">Our Services</h2>
      </div>
      <div className={styles.body}>
        <motion.div 
          className={styles.serviceList} 
          role="tablist" 
          aria-orientation="vertical" 
          ref={serviceListRef}
          variants={titleStagger}
        >
          <motion.div
            className={styles.indicator}
            animate={{ top: indicator.top, height: indicator.height }}
            transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          />
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              role="tab"
              tabIndex={0}
              aria-selected={selected === i}
              className={`${styles.serviceTitle} ${selected === i ? styles.active : ''}`}
              onClick={() => setSelected(i)}
              onKeyDown={(e) => onKeySelect(e, i)}
              ref={(el) => (listItemRefs.current[i] = el)}
              variants={titleItem}
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <h3>{s.title}</h3>
              {s.subtitle && <p className={styles.subtitle}>{s.subtitle}</p>}
            </motion.div>
          ))}
        </motion.div>
        <div className={styles.serviceDetails} style={{ minHeight: maxHeight || 'auto' }}>
          <motion.div
            className={styles.blob}
            animate={{ 
              x: selected === 0 ? -30 : 30, 
              y: selected === 0 ? -10 : 10,
              scale: selected === 0 ? 1 : 1.1,
            }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={services[selected].id}
              className={styles.panel}
              variants={opacity}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <p className={styles.lead}>{services[selected].description}</p>
              {services[selected].points && (
                <motion.ul className={styles.chips} variants={listStagger}>
                  {services[selected].points.map((pt, idx) => (
                    <motion.li key={idx} variants={itemFade}>
                      {pt}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
              {services[selected].accessibilityTitle && (
                <div className={styles.accessibility}>
                  <h4>{services[selected].accessibilityTitle}</h4>
                  {services[selected].compliance && (
                    <motion.ul className={styles.chips} variants={listStagger}>
                      {services[selected].compliance.map((c, idx) => (
                        <motion.li key={idx} variants={itemFade}>
                          {c}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                  {services[selected].extra && <p className={styles.extra}>{services[selected].extra}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Hidden measurer to compute tallest panel height */}
      <div className={styles.measure} aria-hidden="true">
        {services.map((svc, mi) => (
          <div key={svc.id} ref={(el) => (measureRefs.current[mi] = el)} className={styles.panelContent}>
            <p className={styles.lead}>{svc.description}</p>
            {svc.points && (
              <ul className={styles.chips}>
                {svc.points.map((pt, idx) => <li key={idx}>{pt}</li>)}
              </ul>
            )}
            {svc.accessibilityTitle && (
              <div className={styles.accessibility}>
                <h4>{svc.accessibilityTitle}</h4>
                {svc.compliance && (
                  <ul className={styles.chips}>
                    {svc.compliance.map((c, idx) => <li key={idx}>{c}</li>)}
                  </ul>
                )}
                {svc.extra && <p className={styles.extra}>{svc.extra}</p>}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}