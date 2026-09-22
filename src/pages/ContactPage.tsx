import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ContactFormData } from '../types';

export const ContactPage = () => {
  useEffect(() => {
    document.title = 'Contact Us | Karuppu Tours & Travels';
  }, []);
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the actual form submission
    // This is a simulated successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! We will get back to you shortly.',
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };
  
  return (
    <div className="pt-20">
      {/* Header section */}
      <div className="relative py-16 bg-dark-900">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1416530/pexels-photo-1416530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          }}
        >
          <div className="absolute inset-0 bg-dark-900/80"></div>
        </div>
        
        <Container className="relative z-10">
          <SectionHeading 
            title="Contact Us" 
            subtitle="Reach out to our team for bookings, inquiries, or custom tour requests"
            center
          />
        </Container>
      </div>
      
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-700 p-8 rounded-lg"
          >
            <h2 className="text-2xl font-heading font-semibold mb-6">Send Us a Message</h2>
            
            {formStatus.submitted && (
              <div className={`p-4 rounded-lg mb-6 ${formStatus.success ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                {formStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-dark-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="AE"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="ae@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-dark-800 border border-dark-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="+91 9361109518"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-dark-800 border border-dark-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Tell us about your travel plans or inquiries..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="flex items-center justify-center w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-tl-[50px] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[50px] transition-colors duration-300"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </button>
            </form>
          </motion.div>
          
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-dark-700 p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-heading font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-primary-900/50 text-primary-400 mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Office Address</h3>
                    <p className="text-gray-400">
                      123 Travel Street, Adventure City<br />
                      Tamil Nadu, India 600001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-primary-900/50 text-primary-400 mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-400">
                      <a href="tel:+919876543210" className="hover:text-primary-400 transition-colors duration-300">
                        +91 9876 543 210
                      </a><br />
                      <span className="text-sm">(Monday to Saturday, 9am to 6pm)</span>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-primary-900/50 text-primary-400 mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-400">
                      <a href="mailto:info@karupputours.com" className="hover:text-primary-400 transition-colors duration-300">
                        info@karupputours.com
                      </a><br />
                      <a href="mailto:bookings@karupputours.com" className="hover:text-primary-400 transition-colors duration-300">
                        bookings@karupputours.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-dark-700 p-8 rounded-lg">
              <h2 className="text-2xl font-heading font-semibold mb-6">Business Hours</h2>
              
              <table className="w-full text-gray-300">
                <tbody>
                  <tr className="border-b border-dark-600">
                    <td className="py-3">Monday - Friday</td>
                    <td className="py-3 text-right">9:00 AM - 6:00 PM</td>
                  </tr>
                  <tr className="border-b border-dark-600">
                    <td className="py-3">Saturday</td>
                    <td className="py-3 text-right">10:00 AM - 4:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-3">Sunday</td>
                    <td className="py-3 text-right">Closed</td>
                  </tr>
                </tbody>
              </table>
              
              <div className="mt-6 p-4 bg-primary-900/30 rounded-tl-[50px] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[50px] text-center">
                <p className="text-primary-300 font-medium">
                  Emergency contact available 24/7 for active tours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
      
      {/* Map section */}
      <div className="h-[400px] bg-dark-700 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Interactive map would be embedded here</p>
        </div>
      </div>
    </div>
  );
};