export const opacity = {
  initial: { opacity: 0, y: 25, filter: 'blur(10px)' },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -15,
    filter: 'blur(10px)',
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] }
  }
};

export const listStagger = {
  initial: {},
  enter: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

export const itemFade = {
  initial: { opacity: 0, y: 15, filter: 'blur(5px)' },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const sectionReveal = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren'
    }
  }
};

export const titleStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.25 }
  }
};

export const titleItem = {
  hidden: { opacity: 0, x: -20, filter: 'blur(5px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};