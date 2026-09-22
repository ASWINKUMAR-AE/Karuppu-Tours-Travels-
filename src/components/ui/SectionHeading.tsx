import React from 'react';
import { motion } from 'framer-motion';

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
};

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  center = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''} ${className}`}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-heading font-bold mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};