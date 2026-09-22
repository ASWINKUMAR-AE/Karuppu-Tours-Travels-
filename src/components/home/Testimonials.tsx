import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import { SectionHeading } from '../ui/SectionHeading';
import { Container } from '../ui/Container';

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left'|'right'>('right');

  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
  };

  // Animation variants
  const testimonialVariants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    })
  };

  const starVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <section className="py-20 bg-dark-800 overflow-hidden">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading
            title="What Our Travelers Say"
            subtitle="Hear from those who have experienced our tours"
            center
          />
        </motion.div>
        
        <div className="max-w-4xl mx-auto mt-12 px-4 sm:px-6">
          <div className="relative">
            {/* Left Arrow - positioned outside on larger screens, closer on mobile */}
            <motion.button
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 
                        -left-4 md:-left-10 lg:-left-12
                        bg-dark-900 hover:bg-primary-700 
                        w-10 h-10 md:w-12 md:h-12 
                        rounded-full flex items-center justify-center 
                        text-white transition-all duration-300 
                        shadow-lg border border-dark-600 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            {/* Testimonial Content */}
            <div className="overflow-hidden h-80 mx-2 sm:mx-0">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={testimonialVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 text-center p-6 sm:p-8 bg-dark-700 rounded-lg shadow-lg border border-dark-600"
                >
                  <Quote className="w-8 h-8 mx-auto text-primary-500 opacity-20 mb-2" />
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={starVariants}
                      >
                        <Star size={20} className="fill-primary-400 text-primary-400 mx-1" />
                      </motion.div>
                    ))}
                  </div>
                  
                  <motion.p 
                    className="text-lg mb-6 text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{testimonials[activeIndex].text}"
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h4 className="font-heading font-semibold text-white">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-gray-400">{testimonials[activeIndex].location}</p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Arrow - positioned outside on larger screens, closer on mobile */}
            <motion.button
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 
                        -right-4 md:-right-10 lg:-right-12
                        bg-dark-900 hover:bg-primary-700 
                        w-10 h-10 md:w-12 md:h-12 
                        rounded-full flex items-center justify-center 
                        text-white transition-all duration-300 
                        shadow-lg border border-dark-600 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
          </div>
          
          {/* Dots indicator */}
          <motion.div 
            className="flex justify-center space-x-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 relative ${
                  index === activeIndex ? 'bg-primary-500' : 'bg-dark-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              >
                {index === activeIndex && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute inset-0 rounded-full bg-primary-500"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};