import { motion } from 'framer-motion';
import { Compass, Shield, Award, Users } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../ui/Container';
import { useRef } from 'react';
import VariableProximity from './VariableProximity';

const features = [
  {
    icon: <Compass size={40} />,
    title: 'Expert Local Guides',
    description: 'Our knowledgeable guides provide unique insights and ensure safe, enriching experiences.',
  },
  {
    icon: <Shield size={40} />,
    title: 'Safe & Secure Tours',
    description: 'Your safety is our priority with well-planned itineraries and proper equipment.',
  },
  {
    icon: <Award size={40} />,
    title: 'Quality Experiences',
    description: 'We curate high-quality experiences that showcase the best of each destination.',
  },
  {
    icon: <Users size={40} />,
    title: 'Small Group Sizes',
    description: 'Enjoy personalized attention and authentic experiences with our small tour groups.',
  },
];

export const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { rotate: -15, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.2
      }
    },
    hover: {
      rotate: [0, -10, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "mirror"
      }
    }
  };

  return (
    <section ref={containerRef} className="py-20 bg-dark-900 overflow-hidden">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <SectionHeading
            title={
              <VariableProximity
                label="Why Choose Karuppu Tours"
                fromFontVariationSettings="'wght' 400, 'wdth' 100, 'opsz' 14"
                toFontVariationSettings="'wght' 700, 'wdth' 120, 'opsz' 48"
                containerRef={containerRef}
                radius={200}
                falloff="gaussian"
                className="font-heading"
              />
            }
            subtitle={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <VariableProximity
                  label="What makes our travel experiences stand out from the rest"
                  fromFontVariationSettings="'wght' 300, 'wdth' 90, 'opsz' 12"
                  toFontVariationSettings="'wght' 500, 'wdth' 110, 'opsz' 24"
                  containerRef={containerRef}
                  radius={150}
                  falloff="linear"
                />
              </motion.div>
            }
            center
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={featureCardVariants}
                whileHover="hover"
                className="bg-dark-800 p-6 rounded-lg border border-dark-700 text-center cursor-default"
              >
                <motion.div 
                  className="flex justify-center mb-4"
                  variants={iconVariants}
                >
                  <div className="p-3 rounded-full bg-primary-900/50 text-primary-400">
                    {feature.icon}
                  </div>
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-heading font-semibold mb-3"
                  whileHover={{ color: "#34d399" }} // Primary-400 color
                >
                  <VariableProximity
                    label={feature.title}
                    fromFontVariationSettings="'wght' 500, 'wdth' 100, 'opsz' 14"
                    toFontVariationSettings="'wght' 700, 'wdth' 120, 'opsz' 36"
                    containerRef={containerRef}
                    radius={100}
                    falloff="exponential"
                  />
                </motion.h3>
                
                <motion.p 
                  className="text-gray-400"
                  whileHover={{ color: "#d1fae5" }} // Primary-100 color
                >
                  <VariableProximity
                    label={feature.description}
                    fromFontVariationSettings="'wght' 300, 'wdth' 90, 'opsz' 12"
                    toFontVariationSettings="'wght' 400, 'wdth' 100, 'opsz' 18"
                    containerRef={containerRef}
                    radius={80}
                    falloff="linear"
                  />
                </motion.p>
                
                {/* Decorative animated underline */}
                <motion.div
                  className="mt-4 h-0.5 bg-primary-500/0"
                  whileHover={{
                    backgroundColor: "rgba(52, 211, 153, 0.5)",
                    scaleX: [0, 1],
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};