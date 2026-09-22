import { Link } from 'react-router-dom';
import { Mountain, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Mountain size={28} className="text-primary-500" />
              <div>
                <h3 className="text-lg font-heading font-bold">Karuppu</h3>
                <p className="text-xs text-primary-400">Tours & Travels</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Explore the beauty of nature with our curated tour packages. We specialize in adventure tours, wildlife safaris, and cultural experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/tours" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Tours</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Contact</Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Tour Categories */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Tour Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tours?category=adventure" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Adventure Tours</Link>
              </li>
              <li>
                <Link to="/tours?category=wildlife" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Wildlife Safaris</Link>
              </li>
              <li>
                <Link to="/tours?category=cultural" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Cultural Tours</Link>
              </li>
              <li>
                <Link to="/tours?category=relaxation" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">Relaxation Retreats</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Travel Street, Adventure City, 600001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-500 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">+91 9876 543 210</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-500 flex-shrink-0" />
                <a href="mailto:info@karupputours.com" className="text-gray-400 hover:text-primary-400 transition-colors duration-300">info@karupputours.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-dark-700 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Karuppu Tours & Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};