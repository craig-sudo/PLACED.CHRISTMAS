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
        className="flex justify-