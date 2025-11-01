import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import Features from './components/Features';
import ProductShowcase from './components/ProductShowcase';
import WhyPlaced from './components/WhyPlaced';
import HowItWorks from './components/HowItWorks';
import InstallationPortfolio from './components/InstallationPortfolio';
import Testimonials from './components/Testimonials';
import HandbookCTA from './components/HandbookCTA';
import Footer from './components/Footer';
import QuoteCalculator from './components/QuoteCalculator';
import Snowfall from './components/Snowfall';
import ChristmasLights from './components/ChristmasLights';
import AnimatedSection from './components/AnimatedSection';
import FloatingCTA from './components/FloatingCTA';
import LiveNotifications from './components/LiveNotifications';
import VisualizationUploader from './components/VisualizationUploader';
import KidsHolidayMagic from './components/KidsHolidayMagic';

function App() {
  return (
    <div className="bg-brand-light min-h-screen font-sans text-brand-dark relative overflow-x-hidden">
      <Snowfall />
      <ChristmasLights />
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <AnimatedSection>
          <Features />
        </AnimatedSection>
        <AnimatedSection>
          <ProductShowcase />
        </AnimatedSection>
        <AnimatedSection>
          <WhyPlaced />
        </AnimatedSection>
        <AnimatedSection>
          <HowItWorks />
        </AnimatedSection>
        <AnimatedSection>
          <InstallationPortfolio />
        </AnimatedSection>
        <div id="visualization-tool" className="py-20 bg-brand-primary">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">See It Before You Buy It</h2>
                    <p className="text-lg text-brand-light mt-2 max-w-2xl mx-auto">Upload a photo of your home and we'll create a custom holiday lighting mockup for your free consultation.</p>
                    <div className="mt-4 w-24 h-1 bg-brand-secondary mx-auto"></div>
                </div>
                <VisualizationUploader />
            </div>
        </div>
        <AnimatedSection>
          <Testimonials />
        </AnimatedSection>
        
        <section id="kids-magic">
            <KidsHolidayMagic />
        </section>

        <AnimatedSection>
          <HandbookCTA />
        </AnimatedSection>
        <section id="quote-calculator" className="py-20 bg-white">
         <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">Get Your Instant Quote</h2>
              <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">Fill out the form below to get a real-time estimate for your project.</p>
              <div className="mt-4 w-24 h-1 bg-brand-secondary mx-auto"></div>
            </div>
            <QuoteCalculator />
         </div>
       </section>
      </main>
      <Footer />
      <FloatingCTA />
      <LiveNotifications />
    </div>
  );
}

export default App;