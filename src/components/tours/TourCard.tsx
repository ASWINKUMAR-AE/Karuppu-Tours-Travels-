import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { TourPackage } from '../../types';

interface TourCardProps {
  tour: TourPackage;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-dark-700 rounded-lg overflow-hidden h-full flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image container with overlay */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs uppercase tracking-wider py-1 px-2 rounded">
          {tour.category}
        </div>
        
        {/* Location badge */}
        <div className="absolute bottom-4 left-4 flex items-center text-white">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">{tour.location}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-heading font-semibold mb-2">{tour.title}</h3>
        
        <div className="flex items-center text-gray-400 mb-3">
          <Clock size={16} className="mr-1" />
          <span>{tour.duration}</span>
        </div>
        
        <p className="text-gray-400 mb-4 flex-grow">{tour.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-dark-600">
          <div>
            <span className="text-primary-400 font-semibold text-xl">${tour.price}</span>
            <span className="text-gray-500 text-sm ml-1">/ person</span>
          </div>
          
          <Link 
            to={`/tours/${tour.id}`}
            className="flex items-center text-primary-400 hover:text-primary-300 transition-colors duration-300"
          >
            View Details
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};