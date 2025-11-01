import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;