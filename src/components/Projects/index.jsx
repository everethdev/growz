'use client';
import styles from './style.module.scss'
import Project from './components/project';
import Rounded from '../../common/RoundedButton';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    title: "Urbano Properties",
    logo: "UrbanoLogo.png",
    metadata: ["Real Estate", "Properties", "Residential"],
    src: "UrbanoLogo.png",
    color: "#FFFFFF"
  },
  {
    title: "Unic Consulting",
    logo: "UnicSportsLogo.png",
    metadata: ["Consultancy", "Investments", "Business"],
    src: "UnicSportsLogo.png",
    color: "#FFFFFF"
  },
  {
    title: "Ioanida Consulting",
    logo: "IoanidaLogo.png",
    metadata: ["Travel", "Agency", "Services"],
    src: "IoanidaLogo.png",
    color: "#FFFFFF"
  },
  {
    title: "Termo Casa",
    logo: "TermoCasaLogo.png",
    metadata: ["Heating", "Systems", "Supplier"],
    src: "TermoCasaLogo.png",
    color: "#FFFFFF"
  },
  {
    title: "Orizont",
    logo: "orizont.jpg",
    metadata: ["Materials", "Depot", "Group"],
    src: "orizont.jpg",
    color: "#FFFFFF"
  }

]

export default function Home() {
  const titleRef = useRef(null);
  const projectsRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const projectsInView = useInView(projectsRef, { once: true, margin: "-50px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isManualNavigation, setIsManualNavigation] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile && !isManualNavigation && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === projects.length - 3 ? 0 : prevIndex + 1
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isMobile, isManualNavigation, isHovered, projects.length]);

  useEffect(() => {
    if (isManualNavigation) {
      const timeout = setTimeout(() => {
        setIsManualNavigation(false);
      }, 6000); // 6 second buffer after manual navigation

      return () => clearTimeout(timeout);
    }
  }, [isManualNavigation, currentIndex]);

  useEffect(() => {
    if (projectsInView) {
      setCurrentIndex(0);
    }
  }, [projectsInView]);

  const nextProject = () => {
    if (currentIndex < projects.length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    setIsManualNavigation(true);
  };

  const prevProject = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
    setIsManualNavigation(true);
  };

  const goToProject = (index) => {
    if (index >= 0 && index <= projects.length - 3) {
      setCurrentIndex(index);
    }
    setIsManualNavigation(true);
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <main className={styles.projects}>
      <div className={styles.container}>
        <motion.div
          ref={titleRef}
          className={styles.titleContainer}
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >

          <h2 className={styles.sectionTitle}>
            Helping brands to stand out in the digital era
          </h2>
          <motion.p
            className={styles.subtitle}
            variants={subtitleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            We partner with forward-thinking companies to create impactful digital experiences that drive growth and innovation.
          </motion.p>
        </motion.div>

        {isMobile ? (
          <motion.div
            className={styles.body}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects.map((project, index) => {
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Project
                    index={index}
                    title={project.title}
                    logo={project.logo}
                    src={project.src}
                    metadata={project.metadata}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <div 
            className={styles.carouselContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              ref={projectsRef}
              className={styles.carouselWrapper}
              initial="hidden"
              animate={projectsInView ? "visible" : "hidden"}
              style={{maxWidth: '1200px'}}
            >
              <div style={{overflow: 'hidden', paddingTop: '10px'}}>
                <motion.div
                  style={{display: 'flex', gap: '20px'}}
                  animate={{ x: -currentIndex * (1160 / 3 + 20) }}
                  transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
                >
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      style={{width: 'calc((1200px - 40px) / 3)', flexShrink: 0}}
                    >
                      <Project
                        index={index}
                        title={project.title}
                        logo={project.logo}
                        src={project.src}
                        metadata={project.metadata}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className={styles.carouselControls}>
                <button
                  className={styles.carouselButton}
                  onClick={prevProject}
                  aria-label="Previous project"
                >
                  ←
                </button>

                <div className={styles.carouselIndicators}>
                  {projects.map((_, index) => {
                    if (index <= projects.length - 3) {
                      return (
                        <button
                          key={index}
                          className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                          onClick={() => goToProject(index)}
                          aria-label={`Go to project ${index + 1}`}
                        />
                      )
                    }
                    return null;
                  })}
                </div>

                <button
                  className={styles.carouselButton}
                  onClick={nextProject}
                  aria-label="Next project"
                >
                  →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  )
}
