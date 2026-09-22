import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { useRef } from 'react';
import VariableProximity from './VariableProximity';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const backgroundVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.8
      }
    }
  };

  const bounceVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity
      }
    }
  };

  const scrollDotVariants = {
    animate: {
      height: [0, 8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-dark-900 flex items-center" ref={containerRef}>
      {/* Background Image with Overlay */}
      <motion.div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1600)', 
          backgroundPosition: 'center',
        }}
        initial="hidden"
        animate="visible"
        variants={backgroundVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-800/80 to-dark-900"></div>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 z-10 pt-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-3xl">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6"
          >
            <VariableProximity
              label="Discover the Beauty of Nature with Us"
              fromFontVariationSettings="'wght' 400, 'wdth' 100, 'opsz' 14"
              toFontVariationSettings="'wght' 800, 'wdth' 125, 'opsz' 48"
              containerRef={containerRef}
              radius={150}
              falloff="gaussian"
              className="block"
            />
            <span className="text-primary-400">
              <VariableProximity
                label="Nature"
                fromFontVariationSettings="'wght' 600, 'wdth' 100, 'opsz' 14"
                toFontVariationSettings="'wght' 900, 'wdth' 150, 'opsz' 72"
                containerRef={containerRef}
                radius={200}
                falloff="exponential"
              />
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
          >
            <VariableProximity
              label="Experience breathtaking mountain treks, peaceful forest retreats, and thrilling wildlife safaris with our expert guides."
              fromFontVariationSettings="'wght' 300, 'wdth' 90, 'opsz' 12"
              toFontVariationSettings="'wght' 500, 'wdth' 110, 'opsz' 24"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <Button href="/tours" size="lg">
              View Tour Packages
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Book Now
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
        >
          <motion.div 
            animate={{ height: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 bg-primary-400 rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};