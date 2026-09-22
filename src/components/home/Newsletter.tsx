import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../ui/Container';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the actual submission
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-16 bg-primary-900">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-heading font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-300 mb-8">
            Sign up to receive travel tips, inspiration, and exclusive offers from our team.
          </p>
          
          {subscribed ? (
            <div className="bg-primary-800/50 p-4 rounded-lg">
              <p className="text-white">
                Thanks for joining! You'll start receiving our newsletter soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-full bg-dark-800 border border-dark-700 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary-900 font-medium rounded-tl-[50px] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[50px] hover:bg-gray-100 transition-colors duration-300"
              >
                Join
              </button>
            </form>
          )}
        </motion.div>
      </Container>
    </section>
  );
};
