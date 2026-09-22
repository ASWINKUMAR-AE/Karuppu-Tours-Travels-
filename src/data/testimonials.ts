export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rathish Kumar',
    location: 'Madurai',
    text: 'The Mountain Trek Adventure was beyond our expectations. The guides were knowledgeable and the views were breathtaking. Karuppu Tours made everything seamless from pickup to drop-off.',
    rating: 5
  },
  {
    id: '2',
    name: 'Anjali Sharma',
    location: 'Delhi',
    text: 'We booked the Waterfall Expedition and had an amazing time. The locations were pristine and the accommodation was comfortable. Will definitely book with them again!',
    rating: 5
  },
  {
    id: '3',
    name: 'Mohammed Irfan',
    location: 'Chennai',
    text: 'The Cultural Heritage Tour gave us incredible insights into local traditions. The guides were friendly and the itinerary was well-planned. Highly recommended!',
    rating: 4
  }
];