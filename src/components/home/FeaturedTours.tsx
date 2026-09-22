import { useState } from 'react';
import { motion } from 'framer-motion';
import { tourPackages } from '../../data/tourPackages';
import { SectionHeading } from '../ui/SectionHeading';
import { TourCard } from '../tours/TourCard';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const FeaturedTours = () => {
  const featuredTours = tourPackages.filter(tour => tour.featured);
  const [visibleTours, setVisibleTours] = useState(3);

  const showMoreTours = () => {
    setVisibleTours(Math.min(visibleTours + 3, tourPackages.length));
  };
  
  return (
    
    <section className=" bg-dark-800 mb-10">
    
<div className="container-fluid mx-auto  px-4 z-10 flex flex-col md:flex-row items-center justify-between py-20 mb-20 bg-black">
  {/* About Content */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="md:w-1/2 max-w-lg mb-8 md:mb-0"
  >
    <h2 className="text-3xl font-heading font-bold text-primary-400 mb-4">
      About Us
    </h2>
    <p className="text-lg text-gray-300">
      At Karuppu Tours & Travels, we are dedicated to providing unique travel experiences. Our expert guides ensure unforgettable journeys through breathtaking landscapes and vibrant cultures.
    </p>
  </motion.div>

  {/* About Image */}
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
    className="md:w-1/2 h-[400px] rounded-lg overflow-hidden relative"
  >
    <img
      src="./images/karuppu_logo_2.png"
      alt="About Us"
      className="w-full h-full object-contain"
    />
    <div className="absolute inset-0 opacity-70 bg-gradient-to-b from-transparent to-black"></div>
  </motion.div>
</div>  
      <Container>
        <SectionHeading
          title="Featured Tour Packages"
          subtitle="Explore our most popular destinations and experiences"
          center
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {featuredTours.slice(0, visibleTours).map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TourCard tour={{ ...tour, price: `Rs. ${tour.price}` }} />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button href="/tours" variant="outline">
            View All Tour Packages
          </Button>
        </div>
      </Container>
    </section>
  );
};

