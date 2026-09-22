import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { tourPackages } from '../data/gallery';

export const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleImages, setVisibleImages] = useState(6);
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef();

  // Get all unique categories from tour packages
  const categories = ['all', ...new Set(tourPackages.map(tour => tour.category))];
  
  const filteredImages = activeCategory === 'all' 
    ? tourPackages 
    : tourPackages.filter(tour => tour.category === activeCategory);

  const imagesToShow = filteredImages.slice(0, visibleImages);

  const loadMore = () => {
    setVisibleImages(prev => prev + 3);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, rotate: -2 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    hover: {
      y: -10,
      rotate: 0,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 150
      }
    }),
    hover: {
      scale: 1.05,
      y: -3
    }
  };

  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setCurrentSlide(prev => {
      const newIndex = prev + newDirection;
      if (newIndex < 0) return filteredImages.length - 1;
      if (newIndex >= filteredImages.length) return 0;
      return newIndex;
    });
  };

  // 3D Image Card Component
  const ImageCard = ({ tour, index }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);
    const gradientX = useTransform(x, [-100, 100], [0, 100]);
    const gradientY = useTransform(y, [-100, 100], [0, 100]);
    
    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width * 100;
      const yPct = mouseY / height * 100;
      
      x.set(xPct - 50);
      y.set(yPct - 50);
    };
    
    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        key={tour.id}
        ref={ref}
        variants={cardVariants}
        custom={index}
        className="relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setSelectedImage(tour)}
      >
        {/* Dynamic gradient overlay */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255,200,100,0.15), transparent 70%)`,
            mixBlendMode: 'overlay'
          }}
        />
        
        {/* Main image with parallax effect */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{
            scale: 1.1,
            x: useTransform(x, [-50, 50], [-20, 20]),
            y: useTransform(y, [-50, 50], [-20, 20])
          }}
        >
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Tour info overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ y: 20 }}
            whileHover={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 mt-0.5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-white font-heading text-xl mb-1">
                {tour.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-primary-200 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{tour.location} • {tour.duration}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {tour.activities.slice(0, 3).map(activity => (
                <span 
                  key={activity} 
                  className="text-xs bg-dark-700/80 text-gray-300 px-2 py-1 rounded flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {activity}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="bg-dark-800 py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-primary-400 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 50],
              rotate: [0, 180]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      <Container>
        <SectionHeading
          title="Journey Through Our Lens"
          subtitle="Where every picture tells a travel story"
          center
        />

        {/* View mode toggle */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-dark-700 rounded-full p-1 inline-flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                viewMode === 'grid' ? 'bg-primary-400 text-dark-900' : 'text-gray-300'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Grid View
            </button>
            <button
              onClick={() => {
                setViewMode('carousel');
                setCurrentSlide(0);
              }}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                viewMode === 'carousel' ? 'bg-primary-400 text-dark-900' : 'text-gray-300'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
              Carousel
            </button>
          </div>
        </motion.div>

        {/* Animated category filter chips */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial="hidden"
          animate="visible"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              variants={categoryVariants}
              custom={index}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full capitalize font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category
                  ? 'bg-primary-400 text-dark-900 shadow-lg shadow-primary-400/30'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
              onClick={() => {
                setActiveCategory(category);
                setVisibleImages(6);
                if (viewMode === 'carousel') setCurrentSlide(0);
              }}
            >
              {category === 'all' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              )}
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery content */}
        {viewMode === 'grid' ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
          >
            {imagesToShow.map((tour, index) => (
              <ImageCard key={tour.id} tour={tour} index={index} />
            ))}
          </motion.div>
        ) : (
          <div className="relative h-[70vh] w-full overflow-hidden rounded-3xl bg-dark-700/50">
            <AnimatePresence initial={false} custom={currentSlide}>
              <motion.div
                key={currentSlide}
                custom={currentSlide}
                variants={carouselVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {filteredImages.length > 0 && (
                  <div className="relative w-full h-full">
                    <img
                      src={filteredImages[currentSlide].image}
                      alt={filteredImages[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
                      <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center items-center gap-2">
                          <svg className="w-6 h-6 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <h3 className="text-white text-3xl font-heading mb-2">
                            {filteredImages[currentSlide].title}
                          </h3>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-primary-300 mb-4">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{filteredImages[currentSlide].location} • {filteredImages[currentSlide].duration}</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                          {filteredImages[currentSlide].activities.slice(0, 4).map(activity => (
                            <span 
                              key={activity} 
                              className="text-sm bg-dark-700/80 text-gray-300 px-3 py-1.5 rounded-full flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {activity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Carousel navigation */}
            <button 
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-dark-700/80 hover:bg-dark-600 rounded-full p-3 text-white"
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button 
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-dark-700/80 hover:bg-dark-600 rounded-full p-3 text-white"
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            {/* Carousel indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
              {filteredImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-primary-400 w-6' : 'bg-dark-500'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Load More Button (only in grid view) */}
        {viewMode === 'grid' && visibleImages < filteredImages.length && (
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              y: [0, -10, 0] // Floating animation
            }}
            transition={{ 
              duration: 0.5,
              y: {
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }
            }}
          >
            <Button 
              onClick={loadMore}
              variant="outline"
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear"
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M23 4v6h-6M1 20v-6h6" />
                    <path d="M3.5 9a9 9 0 0114.5-5" />
                  </svg>
                </motion.span>
                Discover More
              </span>
              <motion.span
                className="absolute inset-0 bg-primary-400 opacity-0 group-hover:opacity-10"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </Button>
          </motion.div>
        )}
      </Container>

      {/* Modal for selected image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-6xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h3 className="text-white text-3xl font-heading mb-2">
                      {selectedImage.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-primary-300 mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{selectedImage.location} • {selectedImage.duration}</span>
                  </div>
                  <p className="text-gray-300 max-w-2xl">
                    {selectedImage.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedImage.activities.map(activity => (
                      <span 
                        key={activity} 
                        className="text-sm bg-dark-700/80 text-gray-300 px-3 py-1.5 rounded-full flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                className="absolute -top-14 right-0 !text-white hover:!bg-white/10"
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Close
              </Button>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

