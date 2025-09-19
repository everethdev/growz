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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const nextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToProject = (index) => {
    setCurrentIndex(index);
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
            ref={projectsRef}
            className={styles.body}
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
          >
            {projects.map((project, index) => {
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Project
                    index={index}
                    title={project.title}
                    logo={project.logo}
                    metadata={project.metadata}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        ) : (
          <div className={styles.carouselContainer}>
            <motion.div
              ref={projectsRef}
              className={styles.carouselWrapper}
              initial="hidden"
              animate={projectsInView ? "visible" : "hidden"}
            >
              <div className={styles.carousel}>
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className={styles.carouselItem}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: index === currentIndex ? 1 : 0,
                      scale: index === currentIndex ? 1 : 0.95,
                      zIndex: index === currentIndex ? 1 : 0
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                  >
                    <Project
                      index={index}
                      title={project.title}
                      logo={project.logo}
                      metadata={project.metadata}
                    />
                  </motion.div>
                ))}
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
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                      onClick={() => goToProject(index)}
                      aria-label={`Go to project ${index + 1}`}
                    />
                  ))}
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
