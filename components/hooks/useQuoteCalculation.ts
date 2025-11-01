import { useState, useEffect, useRef } from 'react';
import { QuoteFormData } from '../../types';

interface PriceRange {
    low: number;
    high: number;
}

// Worker code is now inlined as a string to avoid file loading issues.
const workerCode = `
function getSeasonalMultiplier(timestamp) {
    const date = new Date(timestamp);
    const month = date.getMonth(); // 0-11
    
    if (month === 11) return 1.20; // Premium for December
    if (month === 10) return 1.10; // Premium for November

    return 1.0;
}

function calculateGutterPrice(data, rules) {
    let sizeCategory;
    if (data.homeSizeSqFt < 1500) sizeCategory = 'under1500';
    else if (data.homeSizeSqFt < 2500) sizeCategory = '1500-2500';
    else if (data.homeSizeSqFt < 3500) sizeCategory = '2500-3500';
    else sizeCategory = 'over3500';

    const gutterFeetEstimate = {
        'under1500': 120,
        '1500-2500': 160,
        '2500-3500': 200,
        'over3500': 250,
    }[sizeCategory];

    return gutterFeetEstimate * rules.gutterPricePerFoot;
}

function calculatePriceRange(data, rules) {
    let basePrice = 0;
    const service = data.serviceType;

    if (service === 'Christmas Lights') {
        basePrice += data.roofLinesLinearFeet * rules.pricePerFoot;
        if (data.lightingType === 'Rental') {
            basePrice += rules.rentalFee;
        }
    } else if (service === 'Gutter Cleaning') {
        basePrice += calculateGutterPrice(data, rules);
    } else if (service === 'Roof Inspection') {
        basePrice += rules.inspectionBaseFee;
    }

    if (data.stories === '2+') basePrice *= 1.25;
    if (data.serviceType === 'Christmas Lights' && data.roofLinesLinearFeet > 200) basePrice *= 1.15;
    
    const seasonalMultiplier = getSeasonalMultiplier(Date.now());
    basePrice *= seasonalMultiplier;

    // A slightly tighter 90-110% price range for the estimate.
    return {
        low: Math.round(basePrice * 0.9),
        high: Math.round(basePrice * 1.1),
    };
}

self.onmessage = ({ data }) => {
    const { quoteData, pricingRules } = data;
    const result = calculatePriceRange(quoteData, pricingRules);
    self.postMessage({ priceRange: result });
};
`;

const workerBlob = new Blob([workerCode], { type: 'application/javascript' });

export const useQuoteCalculation = () => {
    const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const workerRef = useRef<Worker | null>(null);
    const workerUrlRef = useRef<string | null>(null);


    useEffect(() => {
        // Create a URL for the blob, which can be used to instantiate the worker.
        workerUrlRef.current = URL.createObjectURL(workerBlob);
        workerRef.current = new Worker(workerUrlRef.current);

        workerRef.current.onmessage = (event) => {
            setPriceRange(event.data.priceRange);
            setIsCalculating(false);
        };

        workerRef.current.onerror = (error) => {
            console.error('Worker error:', error);
            setIsCalculating(false);
        };

        // Cleanup on unmount: terminate worker and revoke the blob URL to free up memory.
        return () => {
            workerRef.current?.terminate();
            if (workerUrlRef.current) {
                URL.revokeObjectURL(workerUrlRef.current);
            }
        };
    }, []);

    const calculateQuote = (quoteData: QuoteFormData) => {
        if (!workerRef.current) return;
        
        setIsCalculating(true);
        setPriceRange(null);

        const pricingRules = {
            pricePerFoot: 6.50,
            rentalFee: 400,
            gutterPricePerFoot: 2.50,
            inspectionBaseFee: 150,
        };
        
        workerRef.current.postMessage({
            quoteData,
            pricingRules,
        });
    };

    return {
        calculateQuote,
        priceRange,
        isCalculating,
    };
};
