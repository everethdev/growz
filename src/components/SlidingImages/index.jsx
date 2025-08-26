import { useRef, useState, useEffect } from 'react';
import styles from './style.module.scss';

const REVIEWS = [
    {
        id: 6,
        name: 'Alice',
        role: 'Data Scientist',
        avatar: 'https://hips.hearstapps.com/hmg-prod/images/openai-ceo-sam-altman-poses-during-the-artificial-news-photo-1755716119.pjpeg?crop=0.655xw:0.980xh;0.0459xw,0.0204xh&resize=640:*',
        review: `Absolutely mind-blowing! From graphics to gameplay, it's a virtual masterpiece. I lost track of time in the immersive experience.`,
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
        review: `Results speak louder than words. I've never seen progress like this. The workflows are challenging but oh-so-rewarding. Kudos!`,
    },
    {
        id: 3,
        name: 'Diana',
        role: 'Product Manager',
        avatar: 'https://i.pravatar.cc/150?img=41',
        review: `It's very easy to customize and categorize lists for new projects/task categories.`,
    },
    {
        id: 13,
        name: 'Ethan',
        role: 'Software Engineer',
        avatar: 'https://i.pravatar.cc/150?img=57',
        review: `An adventure for the curious mind. Every click led to a new discovery. It's like a digital journey through the wonders of the internet.`,
    },
    {
        id: 4,
        name: 'Fiona',
        role: 'Marketing Specialist',
        avatar: 'https://i.pravatar.cc/150?img=42',
        review: `Plan, create, and explore seamlessly. This service made my creative dreams a reality. Smooth navigation, and the recommendations were spot on.`,
    },
    {
        id: 10,
        name: 'George',
        role: 'Software Developer',
        avatar: 'https://i.pravatar.cc/150?img=21',
        review: `A game-changer for organization. Tasks, calendars, notes – everything neatly synced. My life has never been this streamlined. Pure genius!`,
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
        avatar: 'https://i.pravatar.cc/150?img=33',
        review: `Discovering new beats is addictive with this service. The curated playlists are spot-on, and the personalized recommendations are eerily accurate. A music lover's paradise!`,
    },
];

export default function Index() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [outgoingIndex, setOutgoingIndex] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef(null);

    const slide = (direction) => {
        if (outgoingIndex !== null) return;

        const nextIndex = direction === 'next'
            ? (currentIndex + 1) % REVIEWS.length
            : (currentIndex - 1 + REVIEWS.length) % REVIEWS.length;

        setOutgoingIndex(currentIndex);
        setCurrentIndex(nextIndex);

        setTimeout(() => {
            setOutgoingIndex(null);
        }, 100); // Match transition duration
    };

    const startSlider = () => {
        intervalRef.current = setInterval(() => {
            slide('next');
        }, 100);
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
    }, [isPaused]);

    return (
        <div 
            className={styles.slidingImages}
        >
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
                                <div
                                    key={review.id}
                                    className={`
                                        ${styles.card}
                                        ${index === currentIndex ? styles.active : ''}
                                        ${index === outgoingIndex ? styles.out : ''}
                                    `}
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
                                </div>
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
