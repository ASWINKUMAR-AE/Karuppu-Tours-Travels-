import { TourPackage } from '../types';

export const tourPackages: TourPackage[] = [
  {
    id: '1',
    title: 'Mountain Trek Adventure',
    description: 'Experience the thrill of trekking through majestic mountains and valleys with our expert guides.',
    duration: '3 days',
    price: 299,
    image: 'https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Western Ghats',
    featured: true,
    activities: ['Trekking', 'Camping', 'Wildlife Spotting'],
    category: 'adventure'
  },
  {
    id: '2',
    title: 'Waterfall Expedition',
    description: 'Visit the most beautiful waterfalls in the region with swimming opportunities and picnic spots.',
    duration: '2 days',
    price: 199,
    image: 'https://images.pexels.com/photos/461956/pexels-photo-461956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Kerala',
    featured: true,
    activities: ['Swimming', 'Photography', 'Hiking'],
    category: 'relaxation'
  },
  {
    id: '3',
    title: 'Cultural Heritage Tour',
    description: 'Immerse yourself in local traditions, cuisines, and historical sites with knowledgeable local guides.',
    duration: '4 days',
    price: 349,
    image: 'https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Tamil Nadu',
    featured: false,
    activities: ['Temple Visits', 'Cooking Classes', 'Traditional Performances'],
    category: 'cultural'
  },
  {
    id: '4',
    title: 'Wildlife Safari',
    description: 'Encounter exotic wildlife in their natural habitat with our expert naturalists and comfortable safari vehicles.',
    duration: '3 days',
    price: 399,
    image: 'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Bandipur',
    featured: true,
    activities: ['Jeep Safari', 'Bird Watching', 'Nature Walks'],
    category: 'wildlife'
  },
  {
    id: '5',
    title: 'Beach Retreat',
    description: 'Relax on pristine beaches with golden sands and clear waters. Perfect for a peaceful getaway.',
    duration: '3 days',
    price: 279,
    image: 'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Goa',
    featured: false,
    activities: ['Sunbathing', 'Water Sports', 'Beachside Dining'],
    category: 'relaxation'
  },
  {
    id: '6',
    title: 'Forest Camping Adventure',
    description: 'Camp under the stars in lush forests with bonfire nights and adventure activities.',
    duration: '2 days',
    price: 249,
    image: 'https://images.pexels.com/photos/6271625/pexels-photo-6271625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    location: 'Wayanad',
    featured: false,
    activities: ['Camping', 'Bonfire', 'Star Gazing', 'Forest Trails'],
    category: 'adventure'
  }
];
