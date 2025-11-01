'use client';

// FIX: Import React to use types like React.KeyboardEvent and resolve component recognition issues.
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Book, Shield, DollarSign, Package, Wrench, Zap, Star, Phone, Calendar } from 'lucide-react';
import handbookData, { HandbookSection as HandbookSectionType } from '../data/handbookData';

interface HandbookSectionProps {
  section: HandbookSectionType;
  chapterIndex: number;
  sectionIndex: number;
  globalOpen: boolean | null; // null means no global action
}

// FIX: Explicitly type HandbookSection as a React.FC to resolve issues with JSX prop type checking for the 'key' prop.
const HandbookSection: React.FC<HandbookSectionProps> = ({ section, chapterIndex, sectionIndex, globalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Respond to global expand/collapse commands
    if (globalOpen === true) setIsOpen(true);
    if (globalOpen === false) setIsOpen(false);
    // if null, leave user's current open state unchanged
  }, [globalOpen]);

  const getSectionIcon = (sectionId: string) => {
    switch (sectionId) {
      case 'safety-first': return <Shield className="w-6 h-6 text-christmas-red" />;
      case 'cost-illusion': return <DollarSign className="w-6 h-6 text-christmas-gold" />;
      case 'storage-hell': return <Package className="w-6 h-6 text-christmas-green" />;
      case 'planning-design': return <Book className="w-6 h-6 text-christmas-red" />;
      case 'installation-techniques': return <Wrench className="w-6 h-6 text-christmas-gold" />;
      case 'power-safety': return <Zap className="w-6 h-6 text-christmas-red" />;
      case 'proper-removal': return <Package className="w-6 h-6 text-christmas-green" />;
      case 'storage-solutions': return <Package className="w-6 h-6 text-christmas-gold" />;
      case 'placed-advantage': return <Star className="w-6 h-6 text-christmas-red" />;
      default: return <Book className="w-6 h-6 text-christmas-gold" />;
    }
  };

  return (
    <div className="mb-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden">
      <button
        data-section-button
        aria-expanded={isOpen}
        className="flex justify-between items-center w-full p-6 text-left hover:bg-white/5 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        // FIX: Added type for the keyboard event.
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex items-center gap-4">
          {getSectionIcon(section.sectionId)}
          <span className="font-bold text-lg text-white">
            {section.sectionTitle}
          </span>
        </div>
        <div>
          <ChevronDown className={`w-6 h-6 text-christmas-gold ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 text-white/90 leading-relaxed">
          {section.content.map((paragraph, index) => (
            <p key={index} className="mb-4 text-base" dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      )}
    </div>
  );
};

const ChristmasLightsDivider = ({ className = '' }: { className?: string }) => (
  <div className={`flex items-center justify-center py-8 ${className}`}>
    <div className="flex items-center gap-2">
      <div className="text-christmas-red text-2xl">🎄</div>
      <div className="h-px bg-gradient-to-r from-transparent via-christmas-gold to-transparent w-32"></div>
      <div className="text-christmas-gold text-2xl">✨</div>
      <div className="h-px bg-gradient-to-r from-transparent via-christmas-gold to-transparent w-32"></div>
      <div className="text-christmas-green text-2xl">🎄</div>
    </div>
  </div>
);

export default function HandbookPage() {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [globalOpen, setGlobalOpen] = useState<boolean | null>(null);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  const expandAll = () => setGlobalOpen(true);
  const collapseAll = () => setGlobalOpen(false);

  // Reset the global action after a short delay so user toggles behave normally
  useEffect(() => {
    if (globalOpen !== null) {
      const t = setTimeout(() => setGlobalOpen(null), 250);
      return () => clearTimeout(t);
    }
  }, [globalOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-christmas-green via-christmas-red to-christmas-green relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="text-8xl mb-6">
              📚
            </div>
            
            <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-christmas-gold via-white to-christmas-gold bg-clip-text text-transparent">
              The PLACED Homeowner's Handbook
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Your comprehensive guide to dazzling Christmas lights – from professional insights to DIY tips, 
              and why expert installation is the smartest choice for your home and family.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={expandAll}
                className="bg-christmas-gold text-white font-bold py-3 px-6 rounded-full hover:bg-christmas-gold/80 transition-all shadow-lg"
              >
                📖 Expand All
              </button>

              <button
                onClick={collapseAll}
                className="bg-white/10 text-white font-semibold py-3 px-6 rounded-full hover:bg-white/20 transition-all shadow-sm"
              >
                ✖ Collapse All
              </button>

              <a
                href="#consultation"
                className="bg-christmas-red text-white font-bold py-3 px-6 rounded-full hover:bg-christmas-red/80 transition-all shadow-lg flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Skip to Consultation
              </a>
            </div>
          </div>
        </motion.section>

        <ChristmasLightsDivider />

        {/* Handbook Chapters */}
        {handbookData.map((chapter, chapterIndex) => (
          <motion.section
            key={chapter.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: chapterIndex * 0.2, duration: 0.8 }}
            className="mb-16"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
              <motion.div
                className="text-center mb-8 cursor-pointer"
                onClick={() => toggleChapter(chapter.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-6xl mb-4">{chapter.icon}</div>
                <h2 className="text-4xl font-bold text-white mb-4 hover:text-christmas-gold transition-colors">
                  {chapter.title}
                </h2>
                <motion.div
                  animate={{ rotate: expandedChapter === chapter.id ? 180 : 0 }}
                  className="flex justify-center"
                >
                  <ChevronDown className="w-8 h-8 text-christmas-gold" />
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {(expandedChapter === chapter.id || expandedChapter === null) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden"
                  >
                    <div className="max-w-6xl mx-auto">
                      {chapter.sections.map((section, sectionIndex) => (
                        <HandbookSection
                          key={section.sectionId}
                          section={section}
                          chapterIndex={chapterIndex}
                          sectionIndex={sectionIndex}
                          globalOpen={globalOpen}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <ChristmasLightsDivider />
          </motion.section>
        ))}

        {/* Final Call to Action */}
        <motion.section
          id="consultation"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green p-1 rounded-3xl shadow-2xl">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12">
              <div className="text-8xl mb-6">
                🎄
              </div>

              <h2 className="text-5xl font-bold text-white mb-6">
                Ready for a Truly Stress-Free Christmas?
              </h2>
              
              <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
                You've read the guide, now experience the difference. Let PLACED handle the magic, safely and beautifully. 
                Our professional team transforms your home while you focus on what matters most – enjoying the holidays with family.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                <div className="bg-white/20 rounded-xl p-6 text-center">
                  <Shield className="w-12 h-12 text-christmas-gold mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">100% Safe & Insured</h3>
                  <p className="text-white/80 text-sm">Professional installation with full liability coverage</p>
                </div>
                <div className="bg-white/20 rounded-xl p-6 text-center">
                  <Star className="w-12 h-12 text-christmas-gold mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Satisfaction Guaranteed</h3>
                  <p className="text-white/80 text-sm">We're not happy unless you're absolutely thrilled</p>
                </div>
                <div className="bg-white/20 rounded-xl p-6 text-center">
                  <Package className="w-12 h-12 text-christmas-gold mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2">Full-Service Solution</h3>
                  <p className="text-white/80 text-sm">Design, install, maintain, remove, and store</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#booking"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-christmas-red text-white font-bold py-4 px-8 rounded-full text-xl hover:bg-christmas-red/80 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Calendar className="w-6 h-6" />
                  Book Your Free Consultation
                </motion.a>
                
                <motion.a
                  href="tel:(506)123-XMAS"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-christmas-green text-white font-bold py-4 px-8 rounded-full text-xl hover:bg-christmas-green/80 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-6 h-6" />
                  Call (506) 123-XMAS
                </motion.a>
              </div>

              <div className="mt-8 text-white/70">
                <p className="text-sm">
                  📞 Questions? Call us anytime • 📧 hello@placedchristmas.ca • 🎄 Serving Maritime Canada
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}