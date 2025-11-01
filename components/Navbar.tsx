import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-placed' },
    { name: 'Process', href: '#how-it-works' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-primary/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-brand-secondary tracking-wider">
          PLACED
        </div>
        <nav className="hidden md:flex items-center space-x-8 text-white">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-brand-secondary transition-colors duration-300">
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center">
            <a
                href="#quote-calculator"
                className="hidden md:block bg-brand-secondary text-brand-primary font-bold py-2 px-6 rounded-lg shadow-md hover:bg-yellow-400 transition-transform duration-300 hover:scale-105"
            >
                Get Instant Quote
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden ml-4 text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}></path></svg>
            </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brand-primary/95 backdrop-blur-lg">
          <nav className="flex flex-col items-center px-4 pt-2 pb-4 space-y-2 text-white">
            {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="py-2 hover:text-brand-secondary transition-colors duration-300" onClick={() => setIsOpen(false)}>
                {link.name}
                </a>
            ))}
             <a
                href="#quote-calculator"
                onClick={() => setIsOpen(false)}
                className="w-full mt-4 text-center bg-brand-secondary text-brand-primary font-bold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-400 transition-transform duration-300 hover:scale-105 inline-block"
            >
                Get Instant Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;