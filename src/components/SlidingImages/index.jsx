import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import styles from './style.module.scss';

const testimonials1 = [
    {
        color: "#e3e5e7",
        text: "The team's expertise and dedication were instrumental in our success. They delivered beyond our expectations.",
        author: "John Doe, CEO of Company A"
    },
    {
        color: "#d6d7dc",
        text: "Working with them was a pleasure. Their professionalism and attention to detail are commendable.",
        author: "Jane Smith, Marketing Director at Company B"
    },
    {
        color: "#e3e3e3",
        text: "Their innovative solutions helped us overcome significant challenges. We highly recommend their services.",
        author: "Peter Jones, CTO of Company C"
    },
    {
        color: "#969696ff",
        text: "A truly collaborative partner. They understood our vision and brought it to life with creativity and precision.",
        author: "Mary Williams, Product Manager at Company D"
    }
]

const testimonials2 = [
    {
        color: "#d4e3ec",
        text: "Their strategic insights and data-driven approach provided us with a competitive edge in the market.",
        author: "David Brown, Head of Strategy at Company E"
    },
    {
        color: "#e5e0e1",
        text: "The level of professionalism and commitment to our project was outstanding. We are thrilled with the results.",
        author: "Susan Miller, COO of Company F"
    },
    {
        color: "#d7d4cf",
        text: "They are not just consultants; they are true partners in our growth journey. Their impact has been transformative.",
        author: "Michael Clark, Founder of Company G"
    },
    {
        color: "#e1dad6",
        text: "Exceptional service and support. They were always available to address our concerns and provide expert guidance.",
        author: "Emily White, Head of Operations at Company H"
    }
]

const getInitials = (name) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[1][0]}`;
    }
    return names[0].substring(0, 2);
}

export default function SlidingImages() {

    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
    const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

    return (
        <div ref={container} className={styles.slidingImages}>
            <motion.div style={{x: x1}} className={styles.slider}>
                    {
                        testimonials1.map( (testimonial, index) => {
                            return <div key={index} className={styles.project} style={{backgroundColor: testimonial.color}} >
                                <div className={styles.testimonialContainer}>
                                    <div className={styles.avatar}>
                                        {getInitials(testimonial.author)}
                                    </div>
                                    <p className={styles.testimonialText}>"{testimonial.text}"</p>
                                    <p className={styles.testimonialAuthor}>- {testimonial.author}</p>
                                </div>
                            </div>
                        })
                    }
                </motion.div>
                <motion.div style={{x: x2}} className={styles.slider}>
                    {
                        testimonials2.map( (testimonial, index) => {
                            return <div key={index} className={styles.project} style={{backgroundColor: testimonial.color}} >
                                <div key={index} className={styles.testimonialContainer}>
                                    <div className={styles.avatar}>
                                        {getInitials(testimonial.author)}
                                    </div>
                                    <p className={styles.testimonialText}>"{testimonial.text}"</p>
                                    <p className={styles.testimonialAuthor}>- {testimonial.author}</p>
                                </div>
                            </div>
                        })
                    }
                </motion.div>
                <motion.div style={{height}} className={styles.circleContainer}>
                    <div className={styles.circle}></div>
                </motion.div>
        </div>
    )
}
