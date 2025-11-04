import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ServiceType, LightingType, QuoteFormData, StoriesType } from '../types';
import { generateFollowUpMessage } from '../services/geminiService';
import { useQuoteCalculation } from './hooks/useQuoteCalculation';

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
)

const QuoteCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 5;
  const [formData, setFormData] = useState<QuoteFormData>({
    serviceType: ServiceType.None,
    homeSizeSqFt: 2000,
    roofLinesLinearFeet: 150,
    lightingType: LightingType.None,
    stories: '2',
    visualizationFile: null,
    name: '',
    email: '',
    phone: '',
    shedDimensions: '10x12',
    shedMaterial: 'Wood T1-11',
  });
  
  const { calculateQuote, priceRange, isCalculating: isCalculatingPrice } = useQuoteCalculation();
  const [isLoading, setIsLoading] = useState(false); // For final submission step
  const [aiMessage, setAiMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const progressPercentage = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const handleNext = () => {
    if (step === 2) {
       if (formData.serviceType === ServiceType.Lights && (!formData.roofLinesLinearFeet || formData.roofLinesLinearFeet <= 0)) {
        setFormError('Please enter a valid roof line estimate to proceed.');
        return; // Block navigation
      }
      calculateQuote(formData);
    }
    setFormError(null); // Clear error on successful navigation
    setStep(prev => Math.min(prev + 1, TOTAL_STEPS));
  };
  const handleBack = () => {
    setFormError(null);
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleServiceSelect = (service: ServiceType) => {
    setFormData(prev => ({ ...prev, serviceType: service }));
    handleNext();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormError(null);
    const { name, value, type } = e.target;

    if (type === 'file') {
        const files = (e.target as HTMLInputElement).files;
        setFormData(prev => ({ ...prev, [name]: files ? files[0] : null }));
    } else {
        setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) : value }));
    }
  };


  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFormData(prev => ({...prev, visualizationFile: e.dataTransfer.files[0]}));
      e.dataTransfer.clearData();
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // FIX: Pass customer name for personalization and extract content string from the response object.
    const message = await generateFollowUpMessage(formData.serviceType, formData.name);
    setAiMessage(message.content);
    setIsLoading(false);
    setStep(TOTAL_STEPS);
  };
  
  useEffect(() => {
      if (step === TOTAL_STEPS && priceRange) {
          confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
          });
      }
  }, [step, priceRange]);


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-brand-primary">What service do you need?</h2>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={() => handleServiceSelect(ServiceType.Lights)} className="w-full p-4 bg-brand-primary text-white rounded-lg hover:bg-blue-800 transition">Christmas Light Installation</button>
              <button onClick={() => handleServiceSelect(ServiceType.Shed)} className="w-full p-4 bg-brand-primary text-white rounded-lg hover:bg-blue-800 transition">Custom Shed Build</button>
              <button onClick={() => handleServiceSelect(ServiceType.Gutters)} className="w-full p-4 bg-brand-primary text-white rounded-lg hover:bg-blue-800 transition">Gutter Cleaning</button>
              <button onClick={() => handleServiceSelect(ServiceType.Inspection)} className="w-full p-4 bg-brand-primary text-white rounded-lg hover:bg-blue-800 transition">Drone Roof Inspection</button>
            </div>
          </motion.div>
        );
      case 2:
        if (formData.serviceType === ServiceType.Shed) {
            return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-2xl font-bold mb-6 text-center text-brand-primary">Design Your Custom Shed</h2>
                    <div className="space-y-6">
                        <div>
                            <p className="block mb-2 font-medium text-gray-700">Shed Dimensions</p>
                            <div className="grid grid-cols-2 gap-2">
                                {(['8x10', '10x12', '12x16', 'Custom'] as const).map(s => (
                                <button key={s} onClick={() => setFormData(prev => ({ ...prev, shedDimensions: s }))} className={`p-3 rounded-md transition text-sm ${formData.shedDimensions === s ? 'bg-brand-primary text-white' : 'bg-gray-200'}`}>{s}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="block mb-2 font-medium text-gray-700">Exterior Material</p>
                            <div className="grid grid-cols-1 gap-2">
                                {(['Wood T1-11', 'Vinyl', 'Metal'] as const).map(m => (
                                <button key={m} onClick={() => setFormData(prev => ({ ...prev, shedMaterial: m }))} className={`p-3 rounded-md transition text-sm ${formData.shedMaterial === m ? 'bg-brand-primary text-white' : 'bg-gray-200'}`}>{m}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )
        }
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-brand-primary">Tell us about your home</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="homeSizeSqFt" className="block mb-1 font-medium">Home Size (sq. ft.)</label>
                <input type="number" name="homeSizeSqFt" id="homeSizeSqFt" value={formData.homeSizeSqFt} onChange={handleChange} className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <p className="block mb-2 font-medium">Number of Stories</p>
                <div className="flex gap-2">
                  {(['1', '1.5', '2', '2+'] as StoriesType[]).map(s => (
                    <button key={s} onClick={() => setFormData(prev => ({ ...prev, stories: s }))} className={`flex-1 p-2 rounded-md transition text-sm ${formData.stories === s ? 'bg-brand-primary text-white' : 'bg-gray-200'}`}>{s}</button>
                  ))}
                </div>
              </div>
              {formData.serviceType === ServiceType.Lights && (
                <>
                  <div>
                    <label htmlFor="roofLinesLinearFeet" className="block mb-1 font-medium">Estimated Roof Lines (linear feet)</label>
                    <input type="number" name="roofLinesLinearFeet" id="roofLinesLinearFeet" value={formData.roofLinesLinearFeet} onChange={handleChange} className={`w-full p-2 border rounded-md ${formError ? 'border-red-500' : 'border-gray-300'}`} aria-invalid={!!formError} aria-describedby={formError ? "roof-line-error" : undefined} />
                  </div>
                  <div>
                    <p className="block mb-2 font-medium">Lighting Type</p>
                    <div className="flex gap-4">
                      <button onClick={() => setFormData(prev => ({ ...prev, lightingType: LightingType.Rental }))} className={`flex-1 p-2 rounded-md transition ${formData.lightingType === LightingType.Rental ? 'bg-brand-primary text-white' : 'bg-gray-200'}`}>We Provide (Rental)</button>
                      <button onClick={() => setFormData(prev => ({ ...prev, lightingType: LightingType.ClientOwned }))} className={`flex-1 p-2 rounded-md transition ${formData.lightingType === LightingType.ClientOwned ? 'bg-brand-primary text-white' : 'bg-gray-200'}`}>I Own Them</button>
                    </div>
                  </div>
                </>
              )}
            </div>
             {formError && (
              <motion.div
                id="roof-line-error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm text-center"
              >
                {formError}
              </motion.div>
            )}
          </motion.div>
        );
      case 3:
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <h2 className="text-2xl font-bold mb-6 text-center text-brand-primary">Upload a Photo (Optional)</h2>
                 <p className="text-center text-gray-600 mb-4">A Google Earth screenshot or photo helps us create an accurate design.</p>
                <div 
                    onDragEnter={() => setIsDragging(true)}
                    onDragLeave={() => setIsDragging(false)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleFileDrop}
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors ${isDragging ? 'border-brand-secondary bg-yellow-50' : 'border-gray-300'}`}
                >
                    <div className="space-y-1 text-center">
                        <UploadIcon />
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="visualizationFile" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-primary hover:text-blue-800 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-secondary">
                                <span>Upload a file</span>
                                <input id="visualizationFile" name="visualizationFile" type="file" className="sr-only" onChange={handleChange} accept="image/*" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                         {formData.visualizationFile && <p className="text-sm font-medium text-green-600 pt-2">Selected: {formData.visualizationFile.name}</p>}
                    </div>
                </div>
            </motion.div>
        );
      case 4:
        return (
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-brand-primary">Almost there! Where can we send your quote?</h2>
            <div className="space-y-4">
                <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md" />
                <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-md" />
                <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-md" />
            </div>
          </motion.form>
        );
       case 5:
        return (
          <motion.div className="text-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <CheckCircleIcon />
            <h2 className="text-2xl font-bold mt-4 mb-2 text-brand-primary">Thank you, {formData.name}!</h2>
            <p className="text-lg text-gray-700 mb-4">Here is your instant estimate:</p>
            <div className="bg-brand-primary text-white p-6 rounded-lg my-4">
              <p className="text-sm uppercase tracking-widest text-brand-secondary">Estimated Price Range</p>
              {priceRange ? (
                <p className="text-4xl font-bold">${priceRange.low} - ${priceRange.high}</p>
              ): (
                <p className="text-2xl font-bold animate-pulse">Finalizing...</p>
              )}
            </div>
            <p className="text-gray-600 mb-6">{aiMessage || 'We are preparing your detailed quote now.'}</p>
            <p className="font-bold">Next Step: We will contact you shortly to schedule a design consult and finalize your booking.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const showNavigation = step > 1 && step < 5;
  const showSubmit = step === 4;

  return (
    <div className="bg-brand-light rounded-xl shadow-2xl w-full max-w-lg mx-auto border border-gray-200">
        <div className="p-1">
             <div className="h-2 bg-gray-200 rounded-full">
                <motion.div 
                    className="h-2 bg-brand-secondary rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ ease: "easeInOut", duration: 0.5 }}
                />
            </div>
        </div>
        <div className="p-6 md:p-8 relative">
          <div className="min-h-[350px] flex flex-col justify-center">
            {renderStep()}
             { (step >= 2 && step < 5) && (priceRange || isCalculatingPrice) && (
                <motion.div 
                    className="mt-6 p-4 bg-brand-light rounded-lg border border-brand-secondary/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-center">
                        <h3 className="font-bold text-brand-primary">Estimated Price Range</h3>
                        {isCalculatingPrice ? (
                            <div className="text-2xl font-bold my-2 text-brand-primary animate-pulse">Calculating...</div>
                        ) : priceRange && (
                            <p className="text-3xl font-bold my-2 text-brand-primary">
                                ${priceRange.low} - ${priceRange.high}
                            </p>
                        )}
                        <p className="text-xs text-gray-500">
                            Final price determined after site assessment.
                        </p>
                    </div>
                </motion.div>
            )}
          </div>

          {showNavigation && (
            <div className="mt-8 flex justify-between">
              <button onClick={handleBack} className="py-2 px-6 bg-gray-200 rounded-lg hover:bg-gray-300">Back</button>
              {showSubmit ? (
                 <button onClick={handleSubmit} disabled={isLoading || isCalculatingPrice} className="py-2 px-6 bg-brand-secondary text-brand-primary font-bold rounded-lg hover:bg-yellow-400 disabled:bg-gray-400">
                    {isLoading ? 'Submitting...' : 'Get My Quote'}
                 </button>
              ) : (
                <button onClick={handleNext} className="py-2 px-6 bg-brand-secondary text-brand-primary font-bold rounded-lg hover:bg-yellow-400">Next</button>
              )}
            </div>
          )}
        </div>
      </div>
  );
};

export default QuoteCalculator;