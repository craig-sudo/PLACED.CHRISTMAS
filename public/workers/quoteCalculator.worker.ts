function getSeasonalMultiplier(timestamp) {
    const date = new Date(timestamp);
    const month = date.getMonth(); // 0-11
    
    // Premium pricing for December rush (month 11)
    if (month === 11) return 1.20; 
    // Premium pricing for November rush (month 10)
    if (month === 10) return 1.10; 

    return 1.0; // Standard pricing
}

function calculateGutterPrice(data, rules) {
    // Gutter-specific logic (linear footage estimation based on home size)
    let sizeCategory;
    if (data.homeSizeSqFt < 1500) {
        sizeCategory = 'under1500';
    } else if (data.homeSizeSqFt < 2500) {
        sizeCategory = '1500-2500';
    } else if (data.homeSizeSqFt < 3500) {
        sizeCategory = '2500-3500';
    } else {
        sizeCategory = 'over3500';
    }

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
    const services = data.serviceType.split(',');

    // Service-specific pricing
    if (services.includes('Christmas Lights')) {
        basePrice += data.roofLinesLinearFeet * rules.pricePerFoot;
        if (data.lightingType === 'Rental') {
            basePrice += rules.rentalFee;
        }
    }

    if (services.includes('Gutter Cleaning')) {
        basePrice += calculateGutterPrice(data, rules);
    }
    
    if (services.includes('Roof Inspection')) {
        basePrice += rules.inspectionBaseFee;
    }

    // Complexity multipliers
    if (data.stories === '2+') basePrice *= 1.25;
    if (data.roofLinesLinearFeet > 200) basePrice *= 1.15;

    // Bundle discount
    if (services.length >= 2) {
        basePrice *= 0.85; // 15% discount
    }

    // Seasonal adjustments
    const seasonalMultiplier = getSeasonalMultiplier(Date.now());
    basePrice *= seasonalMultiplier;

    return {
        low: Math.round(basePrice * 0.85),
        high: Math.round(basePrice * 1.15),
    };
}


self.onmessage = ({ data }) => {
    const { quoteData, pricingRules } = data;
    
    const result = calculatePriceRange(quoteData, pricingRules);

    self.postMessage({
        priceRange: result,
    });
};
