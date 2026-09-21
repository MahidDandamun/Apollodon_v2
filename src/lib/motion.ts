export const MOTION_TOKENS = {
  ease: {
    enter: [0.16, 1, 0.3, 1] as const,
    exit: [0.7, 0, 0.84, 0] as const,
    layout: [0.65, 0, 0.35, 1] as const,
    snappy: [0.2, 0, 0, 1] as const,
  },
  duration: {
    fast: 0.12,
    normal: 0.22,
    slow: 0.3,
  },
  stagger: {
    cards: 0.05,
    rows: 0.03,
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION_TOKENS.stagger.cards,
      delayChildren: 0.05,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TOKENS.duration.normal,
      ease: MOTION_TOKENS.ease.enter,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: MOTION_TOKENS.duration.fast,
      ease: MOTION_TOKENS.ease.exit,
    },
  },
};
