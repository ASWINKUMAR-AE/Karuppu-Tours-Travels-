import { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { FeaturedTours } from '../components/home/FeaturedTours';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Testimonials } from '../components/home/Testimonials';
import { Newsletter } from '../components/home/Newsletter';
import InfiniteMenu from '../components/home/InfiniteMenu';
 import CardSwap, { Card } from '../components/home/CardSwap'


const items = [
  {
    image: 'https:picsum.photos/300/300?grayscale',
    link: 'https:google.com/',
    title: 'Package 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https:picsum.photos/400/400?grayscale',
    link: 'https:google.com/',
    title: 'Package 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https:picsum.photos/500/500?grayscale',
    link: 'https:google.com/',
    title: 'Package 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https:picsum.photos/600/600?grayscale',
    link: 'https:google.com/',
    title: 'Package 4',
    description: 'This is pretty cool, right?'
  }
];

export const HomePage = () => {
  useEffect(() => {
    document.title = 'Karuppu Tours & Travels | Experience Nature\'s Beauty';
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedTours />



<div style={{ height: '780px', position: 'relative', marginTop:'50px' }}>

  <h2 className="text-primary-500 font-bold text-center text-4xl">SERVICE PROVIDING VEHICLE</h2>



<CardSwap delay={4000} skewAmount={6} easing="elastic" cardDistance={60} verticalDistance={70}>
  <Card title="Toyota Etios Sedan" description="Seats: 5">
    <img src="./images/vehicle/car_1.png" alt="Etios Sedan" className="w-full h-full object-cover" />
  </Card>
  <Card title="Toyota Innova" description="Seats: 7 or 8">
    <img src="./images/vehicle/car_3.png" alt="Innova" className="w-full h-full object-cover" />
  </Card>
  <Card title="Mahindra" description=" Seats: 7 or 8">
    <img src="./images/vehicle/car_4.png" alt="City Lights" className="w-full h-full object-cover" />
  </Card>
  <Card title="Toyota Fortuner" description="SUV - Seats: 7">
    <img src="./images/vehicle/car_5.png" alt="Fortuner" className="w-full h-full object-cover" />
  </Card>
  <Card title="Toyota Glanza" description="Compact Hatchback - Seats: 5">
    <img src="./images/vehicle/car_3.png" alt="Glanza" className="w-full h-full object-cover" />
  </Card>
  <Card title="Toyota Camry Hybrid" description="Premium Hybrid - Seats: 5">
    <img src="./images/vehicle/car_4.png" alt="Camry" className="w-full h-full object-cover" />
  </Card>
</CardSwap>

</div>
      
      <WhyChooseUs />
<div style={{ height: '600px', position: 'relative' }}>
  <InfiniteMenu items={items}/>
</div>
      <Testimonials />
      <Newsletter />
    </div>
  );
};