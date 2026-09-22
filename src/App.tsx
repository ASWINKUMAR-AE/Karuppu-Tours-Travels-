import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/utils/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ToursPage } from './pages/ToursPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TourDetailPage } from './pages/TourDetailPage';
import { Gallery } from './pages/Gallery';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-dark-800">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tours" element={<ToursPage />} />
          <Route path="/tours/:id" element={<TourDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<Gallery />}/>
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;