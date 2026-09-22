import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Tag, ArrowLeft } from 'lucide-react';
import { tourPackages } from '../data/tourPackages';
import { TourPackage } from '../types';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export const TourDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tour, setTour] = useState<TourPackage | null>(null);
  
  useEffect(() => {
    const foundTour = tourPackages.find(t => t.id === id);
    setTour(foundTour || null);
    
    if (foundTour) {
      document.title = `${foundTour.title} | Karuppu Tours & Travels`;
    } else {
      document.title = 'Tour Not Found | Karuppu Tours & Travels';
    }
  }, [id]);
  
  if (!tour) {
    return (
      <Container className="py-24 text-center">
        <h2 className="text-2xl font-heading mb-4">Tour not found</h2>
        <p className="text-gray-400 mb-8">The tour you're looking for doesn't exist or has been removed.</p>
        <Button href="/tours">Back to Tours</Button>
      </Container>
    );
  }
  
  return (
    <div className="pt-20">
      {/* Hero section */}
      <div className="relative h-[50vh] bg-dark-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${tour.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/60 to-dark-900"></div>
        </div>
        
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-primary-400 transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-1" />
            Back
          </button>
        </div>
        
        <Container className="relative h-full flex items-end pb-8 z-10">
          <div>
            <div className="inline-block bg-primary-600 text-white text-xs uppercase tracking-wider py-1 px-2 rounded mb-4">
              {tour.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1 text-primary-400" />
                {tour.location}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1 text-primary-400" />
                {tour.duration}
              </div>
              <div className="flex items-center">
                <Tag size={16} className="mr-1 text-primary-400" />
                ${tour.price} / person
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Content section */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tour details */}
          <div className="lg:col-span-2">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-dark-700 p-8 rounded-lg mb-8"
            >
              <h2 className="text-2xl font-heading font-semibold mb-4">Tour Overview</h2>
              <p className="text-gray-300 mb-6">{tour.description}</p>
              
              <h3 className="text-xl font-heading font-semibold mb-3">Activities</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {tour.activities.map((activity, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                    {activity}
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-heading font-semibold mb-3">What to Expect</h3>
              <p className="text-gray-300">
                Experience the beauty of {tour.location} with our expert guides. This tour is perfect for those who love {tour.category} activities and want to explore the natural wonders of the region. We provide all necessary equipment and ensure a safe, enjoyable experience for everyone.
              </p>
            </motion.section>
            
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-dark-700 p-8 rounded-lg"
            >
              <h2 className="text-2xl font-heading font-semibold mb-4">Itinerary</h2>
              
              {/* Sample itinerary - would be dynamic in a real app */}
              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-primary-600">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 bg-primary-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold mb-2">Day 1: Arrival & Orientation</h3>
                  <p className="text-gray-300">
                    Arrive at the meeting point and meet your guide and fellow travelers. After a brief orientation, we'll begin our journey with a welcome dinner and overview of the adventure ahead.
                  </p>
                </div>
                
                <div className="relative pl-8 border-l-2 border-primary-600">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 bg-primary-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold mb-2">Day 2: Main Exploration</h3>
                  <p className="text-gray-300">
                    After breakfast, we'll embark on the main portion of our tour, exploring the beautiful landscapes and engaging in the planned activities. Lunch will be provided at a scenic location.
                  </p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-[-8px] top-0 w-4 h-4 bg-primary-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold mb-2">Day 3: Conclusion & Departure</h3>
                  <p className="text-gray-300">
                    On our final day, we'll enjoy a relaxed morning activity followed by a farewell lunch. We'll share photos and memories before departing back to the starting point.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
          
          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-dark-700 p-6 rounded-lg sticky top-24"
            >
              <h2 className="text-xl font-heading font-semibold mb-4">Book This Tour</h2>
              
              <div className="mb-6">
                <p className="text-2xl font-bold text-primary-400">${tour.price}<span className="text-sm text-gray-400 font-normal"> / person</span></p>
                <p className="text-gray-400 text-sm">All inclusive package</p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full bg-dark-800 border border-dark-600 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Number of Travelers</label>
                  <select className="w-full bg-dark-800 border border-dark-600 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5+ People</option>
                  </select>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full py-3" href="/contact">
                    Book Now
                  </Button>
                  <p className="text-gray-500 text-xs text-center mt-2">
                    No payment required until tour confirmation
                  </p>
                </div>
              </form>
              
              <div className="mt-6 pt-6 border-t border-dark-600">
                <h3 className="font-medium mb-2">Need help booking?</h3>
                <p className="text-gray-400 text-sm mb-3">
                  Contact our travel experts for assistance with your booking or custom tour requests.
                </p>
                <a href="tel:+919876543210" className="flex items-center text-primary-400 hover:text-primary-300 transition-colors duration-300">
                  +91 9876 543 210
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
};