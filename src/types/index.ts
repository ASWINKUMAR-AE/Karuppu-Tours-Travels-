export interface TourPackage {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  location: string;
  featured: boolean;
  activities: string[];
  category: 'adventure' | 'relaxation' | 'cultural' | 'wildlife';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}