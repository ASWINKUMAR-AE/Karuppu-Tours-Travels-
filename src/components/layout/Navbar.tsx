import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location]);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Tours', path: '/tours' },
    { title: 'About', path: '/about' },
        { title: 'Gallery', path: '/gallery' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/95 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            {/* <Mountain size={32} className="text-primary-500" /> */}
            <div>
              <h1 className="text-xl font-heading font-bold">Karuppu</h1>
              <p className="text-xs text-primary-400">Tours & Travels</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-400'
                    : 'text-white hover:text-primary-300'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </div>

          {/* Book Now Button - Desktop */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-tl-[50px] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[50px] transition-colors duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-dark-800 border-t border-dark-700 ml-3 mr-3 rounded-tl-[20px] rounded-tr-[0.5rem] rounded-bl-[20px] rounded-br-[20px]"
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2 font-medium ${
                    location.pathname === link.path
                      ? 'text-primary-400'
                      : 'text-white'
                  }`}
                  onClick={closeMenu}
                >
                  {link.title}
                </Link>
              ))}
              <Link
                to="/contact"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-tl-[50px] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[50px] transition-colors duration-300 text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};