import React from 'react';

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
)

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.07-1.645-.07-4.85s.012-3.585.07-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44c0-.795-.645-1.44-1.441-1.44z"/></svg>
)

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-light">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
             <div className="text-2xl font-bold text-brand-secondary tracking-wider mb-4">
                PLACED
            </div>
            <p className="text-gray-400">
              Your Home's Exterior, Perfected. Premium services for Quispamsis, Rothesay, and Saint John, NB.
            </p>
             <div className="flex space-x-4 mt-6">
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon /></a>
                <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon /></a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4 tracking-wider">Services</h3>
            <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-white transition-colors">Christmas Lights</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Gutter Cleaning</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Roof Inspection</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4 tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
                <li><a href="#why-placed" className="hover:text-white transition-colors">Why Us</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Our Process</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>
           <div>
            <h3 className="font-bold text-white mb-4 tracking-wider">Contact</h3>
            <ul className="space-y-2 text-gray-400">
                <li><a href="tel:506-555-1234" className="hover:text-white transition-colors">(506) 555-1234</a></li>
                <li><a href="mailto:quotes@placed.ca" className="hover:text-white transition-colors">quotes@placed.ca</a></li>
                <li>Quispamsis, NB</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-primary/50 pt-6 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PLACED Exterior Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;