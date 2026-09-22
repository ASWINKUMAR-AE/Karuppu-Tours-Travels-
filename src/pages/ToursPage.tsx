import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tourPackages } from '../data/tourPackages';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TourCard } from '../components/tours/TourCard';
import { TourFilters } from '../components/tours/TourFilters';

export const ToursPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTours, setFilteredTours] = useState(tourPackages);
  
  useEffect(() => {
    document.title = 'Tour Packages | Karuppu Tours & Travels';
    
    let filtered = [...tourPackages];
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(tour => tour.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        tour => 
          tour.title.toLowerCase().includes(query) || 
          tour.description.toLowerCase().includes(query) || 
          tour.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredTours(filtered);
    
    // Update URL params when category changes
    if (activeCategory !== 'all') {
      setSearchParams({ category: activeCategory });
    } else {
      setSearchParams({});
    }
  }, [activeCategory, searchQuery, setSearchParams]);

  return (
    <div className="pt-20">
      {/* Header section */}
      <div className="relative py-16 bg-dark-900">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          }}
        >
          <div className="absolute inset-0 bg-dark-900/80"></div>
        </div>
        
        <Container className="relative z-10">
          <SectionHeading 
            title="Our Tour Packages" 
            subtitle="Explore our carefully crafted tours and find your perfect adventure"
            center
          />
        </Container>
      </div>
      
      <Container className="py-12">
        {/* Filters */}
        <TourFilters 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          setSearchQuery={setSearchQuery}
        />
        
        {/* Results count */}
        <div className="mb-8">
          <p className="text-gray-400">
            Showing {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'}
          </p>
        </div>
        
        {/* Tour cards grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour, index) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TourCard tour={tour} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No tours found matching your criteria.</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
          </div>
        )}
      </Container>
    </div>
  );
};