import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Mountain, Users, Target, Heart } from 'lucide-react';

export const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Us | Karuppu Tours & Travels';
  }, []);
  
  const values = [
    {
      icon: <Mountain size={32} />,
      title: 'Adventure',
      description: 'We believe in the transformative power of adventure and exploration.'
    },
    {
      icon: <Users size={32} />,
      title: 'Community',
      description: 'Building meaningful connections between travelers and local communities.'
    },
    {
      icon: <Target size={32} />,
      title: 'Sustainability',
      description: 'Committed to environmentally responsible tourism practices.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Passion',
      description: 'Our team is passionate about creating unforgettable travel experiences.'
    },
  ];
  
  return (
    <div className="pt-20 bg-dark-950">
      {/* Header section */}
      <motion.div 
        className="relative py-32 bg-dark-900 overflow-hidden group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          }}
        >
          <div className="absolute inset-0 bg-dark-900/90 group-hover:bg-dark-900/80 transition-all duration-500"></div>
        </div>
        
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/30 via-dark-900/70 to-dark-900/90 group-hover:from-dark-900/20 group-hover:via-dark-900/60 group-hover:to-dark-900/80 transition-all duration-500"></div>
        </motion.div>
        
        <Container className="relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SectionHeading 
              title="About Karuppu Tours" 
              subtitle="Our story, mission, and the passion that drives us"
              center
            />
          </motion.div>
          
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            <div className="w-32 h-1 bg-primary-500 rounded-full group-hover:bg-primary-400 transition-colors duration-300"></div>
          </motion.div>
        </Container>
      </motion.div>
      
      {/* Our Story */}
      <Container className="py-24">
        <motion.div 
          className="relative h-[600px] w-full overflow-hidden group"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="https://www.revv.co.in/blogs/wp-content/uploads/2020/07/Thanjavur-Image.jpg"
            alt="Karuppu Tours"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
            initial={{ scale: 1 }}
          />

          <div className="absolute inset-0 bg-dark-900/30 group-hover:bg-dark-900/70 transition-all duration-500 rounded-3xl"></div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center text-center px-8"
            initial={{ opacity: 0, y: 40 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-3xl text-white">
              <motion.h2 
                className="text-5xl font-bold font-heading mb-6 group-hover:text-primary-400 transition-colors duration-300"
                initial={{ y: -20 }}
                whileHover={{ y: 0 }}
              >
                Our Story
              </motion.h2>
              <div className="w-24 h-1 bg-primary-500 mx-auto mb-8 group-hover:bg-primary-400 transition-colors duration-300"></div>
              
              <div className="text-lg font-proximity tracking-wide leading-relaxed space-y-6">
                <motion.p 
                  className="group-hover:text-gray-100 transition-colors duration-300"
                  initial={{ x: -20 }}
                  whileHover={{ x: 0 }}
                >
                  Founded in 2018, Karuppu Tours & Travels began with a simple vision: to share the incredible natural beauty of our region with travelers seeking authentic experiences.
                </motion.p>
                <motion.p 
                  className="group-hover:text-gray-100 transition-colors duration-300"
                  initial={{ x: -20 }}
                  whileHover={{ x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  What started as a small operation with just two guides and a single van has grown into a respected tour company with a team of experienced local guides and a fleet of modern vehicles.
                </motion.p>
                <motion.p 
                  className="group-hover:text-gray-100 transition-colors duration-300"
                  initial={{ x: -20 }}
                  whileHover={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Despite our growth, we've remained true to our founding principles: responsible tourism, authentic experiences, and a deep respect for the natural environment and local communities.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
      
      {/* Our Values */}
      <div className="bg-dark-900 py-24 group">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading 
              title="Our Values" 
              subtitle="The principles that guide every adventure we create"
              center
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: 90 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  damping: 10
                }}
                className="bg-dark-800 p-8 rounded-2xl text-center hover:bg-dark-700/80 hover:ring-2 hover:ring-green-500 transition-all duration-500 hover:-translate-y-2 group/card"
              >
                <motion.div
                  className="flex justify-center mb-6 group-hover/card:rotate-6 group-hover/card:scale-110 transition-transform duration-300"
                >
                  <div className="p-4 rounded-full bg-dark-700/50 text-primary-400 group-hover/card:bg-primary-900/50 transition-colors duration-300">
                    {value.icon}
                  </div>
                </motion.div>
                <h3 className="text-2xl font-heading font-semibold mb-4 group-hover/card:text-primary-400 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-400 font-proximity tracking-wide group-hover/card:text-gray-200 transition-colors duration-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
      
      {/* Our Mission */}
      <div className="w-full bg-dark-950">
        <Container className="py-24">
          <motion.div 
            className="relative h-[600px] w-full overflow-hidden group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src="https://www.clubmahindra.com/blog/media/section_images/placestovi-4bc8914dee0ace7.webp"
              alt="Mountain landscape"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-dark-900/30 group-hover:bg-dark-900/70 transition-all duration-500 rounded-3xl"></div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center text-center px-8"
              initial={{ opacity: 0, y: 40 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="max-w-3xl text-white">
                <motion.h2 
                  className="text-5xl font-bold font-heading mb-6 group-hover:text-primary-400 transition-colors duration-300"
                  initial={{ y: -20 }}
                  whileHover={{ y: 0 }}
                >
                  Our Mission
                </motion.h2>
                <div className="w-24 h-1 bg-primary-500 mx-auto mb-8 group-hover:bg-primary-400 transition-colors duration-300"></div>
                
                <div className="text-lg font-proximity tracking-wide leading-relaxed space-y-6">
                  <motion.p 
                    className="group-hover:text-gray-100 transition-colors duration-300"
                    initial={{ x: -20 }}
                    whileHover={{ x: 0 }}
                  >
                    At Karuppu Tours & Travels, our mission is to create transformative travel experiences that connect people with the natural world and local cultures in meaningful, sustainable ways.
                  </motion.p>
                  <motion.p 
                    className="group-hover:text-gray-100 transition-colors duration-300"
                    initial={{ x: -20 }}
                    whileHover={{ x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    We strive to:
                  </motion.p>
                  <ul className="space-y-3 text-left list-disc list-inside mx-auto max-w-xl text-gray-200 font-proximity">
                    {[
                      "Showcase the beauty and diversity of our region's landscapes and ecosystems",
                      "Support local communities through responsible tourism practices",
                      "Promote environmental conservation and education",
                      "Create safe, inclusive, and unforgettable adventures for all our guests"
                    ].map((item, i) => (
                      <motion.li 
                        key={i}
                        className="group-hover:text-primary-300 transition-colors duration-300"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                        transition={{ delay: 0.1 * i + 0.2 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </div>
      
      {/* Team CTA */}
      <motion.div 
        className="py-24 bg-gradient-to-br from-dark-900 to-dark-950 group"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-heading font-bold mb-8 group-hover:text-primary-400 transition-colors duration-300"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Meet Our <span className="text-primary-500 group-hover:text-primary-300 transition-colors duration-300">Passionate</span> Team
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 mb-12 font-proximity tracking-wide leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Our team of experienced guides and travel experts are dedicated to crafting unforgettable experiences tailored to your interests and adventure level.
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.6 }}
            >
              <button className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/30 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-primary-500/40">
                Meet the Team
              </button>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </div>
  );
};