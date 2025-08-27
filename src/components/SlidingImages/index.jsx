import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import styles from './style.module.scss';

const REVIEWS = [
    {
        id: 6,
        name: 'Alice',
        role: 'Data Scientist',
        avatar: 'https://hips.hearstapps.com/hmg-prod/images/openai-ceo-sam-altman-poses-during-the-artificial-news-photo-1755716119.pjpeg?crop=0.655xw:0.980xh;0.0459xw,0.0204xh&resize=640:*',
        review: `Absolutely mind-blowing! From graphics to gameplay, its a virtual masterpiece. I lost track of time in the immersive experience.`,
    },
    {
        id: 0,
        name: 'Bob',
        role: 'Architect',
        avatar: 'https://image.cnbcfm.com/api/v1/image/108043097-1727989387071-gettyimages-2173579179-META_CONNECT.jpeg?v=1744292077&w=800&h=600&ffmt=webp',
        review: `A hidden gem for tech enthusiasts. The selection is vast, and the ease of discovering new tech is addictively delightful!`,
    },
    {
        id: 2,
        name: 'Charlie',
        role: 'DevOps Engineer',
        avatar: 'https://i.pravatar.cc/150?img=8',
        review: `Results speak louder than words. Ive never seen progress like this. The workflows are challenging but oh-so-rewarding. Kudos!`,
    },
    {
        id: 3,
        name: 'Diana',
        role: 'Product Manager',
        avatar: 'https://i.pravatar.cc/150?img=41',
        review: `Its very easy to customize and categorize lists for new projects/task categories.`,
    },
    {
        id: 13,
        name: 'Ethan',
        role: 'Software Engineer',
        avatar: 'https://i.pravatar.cc/150?img=57',
        review: `An adventure for the curious mind. Every click led to a new discovery. Its like a digital journey through the wonders of the internet.`,
    },
    {
        id: 4,
        name: 'Fiona',
        role: 'Marketing Specialist',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/USAFA_Hosts_Elon_Musk_%28Image_1_of_17%29_%28cropped%29.jpg',
        review: `Plan, create, and explore seamlessly. This service made my creative dreams a reality. Smooth navigation, and the recommendations were spot on.`,
    },
    {
        id: 10,
        name: 'George',
        role: 'Software Developer',
        avatar: 'https://i.pravatar.cc/150?img=21',
        review: `A game-changer for organization. Tasks, calendars, notes everything neatly synced. My life has never been this streamlined. Pure genius!`,
    },
    {
        id: 11,
        name: 'Hannah',
        role: 'Graphic Designer',
        avatar: 'https://i.pravatar.cc/150?img=18',
        review: `Drowning in a sea of creativity. The content here is a visual feast. An endless source of inspiration for my artistic endeavors.`,
    },
    {
        id: 5,
        name: 'Ian',
        role: 'CTO',
        avatar: 'https://public.bnbstatic.com/image/cms/blog/20190606/8ed87a09-59f3-4000-952f-1e7e2677b550.jpg',
        review: `Discovering new beats is addictive with this service. The curated playlists are spot-on, and the personalized recommendations are eerily accurate. A music lovers paradise!`,
    },
];

export default function Index() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const slide = (direction) => {
        const nextIndex = direction === 'next'
            ? (currentIndex + 1) % REVIEWS.length
            : (currentIndex - 1 + REVIEWS.length) % REVIEWS.length;
        setCurrentIndex(nextIndex);
    };

    const startSlider = () => {
        intervalRef.current = setInterval(() => {
            slide('next');
        }, 3000);
    };

    const pauseSlider = () => {
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
        if (!isPaused) {
            startSlider();
        }

        return () => {
            pauseSlider();
        };
    }, [isPaused, currentIndex]);

    return (
        <div className={styles.slidingImages}>
            <main className={styles.main}>
                <h1 className={styles.h1}>A word from our customers</h1>
                <p className={styles.p}>We've been helping businesses do their best since inception.</p>

                <div 
                    className={styles.sliderContainer}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <button onClick={() => slide('prev')} className={styles.navButton}>
                        
                    </button>
                    <div className={styles.slider}>
                        <div className={styles.listCards}>
                            {REVIEWS.map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    className={styles.card}
                                    initial={{ opacity: 0, scale: 0.8, x: (index === currentIndex) ? 0 : (index > currentIndex ? '100%' : '-100%') }}
                                    animate={{ opacity: (index === currentIndex) ? 1 : 0, scale: (index === currentIndex) ? 1 : 0.8, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, x: (index < currentIndex) ? '-100%' : '100%' }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                                >
                                    <blockquote className={styles.blockquote}>
                                        {`"${review.review}"`}
                                    </blockquote>
                                    <div className={styles.details}>
                                        <img src={review.avatar} alt={review.name} className={styles.avatar} />
                                        <div>
                                            <p className={styles.reviewName}>{review.name}</p>
                                            <p className={styles.reviewRole}>{review.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => slide('next')} className={styles.navButton}>
                       
                    </button>
                </div>
            </main>
        </div>
    );
}
