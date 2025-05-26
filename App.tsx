
import React, { useState, useEffect, useCallback } from 'react';
import { CalculatorInputs, CalculationResult, CostBreakdown } from './types';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    paddyPrice: '2000', // Cost for 100kg of Paddy
    yieldRate: '65', // % of rice from paddy
    millingCostPerUnitPaddy: '150', // Cost to mill 100kg of Paddy
    overheadPercentage: '10', // % on (net variable cost per kg rice)
    profitMarginPercentage: '15', // % on (total cost per kg rice + overheads)
    
    includeByProducts: false,
    byProductBranPercentage: '8', // % of paddy weight
    byProductBranPrice: '5', // Price per kg of Bran
    byProductBrokenPercentage: '5', // % of paddy weight
    byProductBrokenPrice: '10', // Price per kg of Broken Rice
    byProductHuskPercentage: '20', // % of paddy weight
    byProductHuskPrice: '0.5', // Price per kg of Husk
  });

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [inputErrors, setInputErrors] = useState<Partial<Record<keyof CalculatorInputs, string>>>({});

  const validateInputs = useCallback(() => {
    const errors: Partial<Record<keyof CalculatorInputs, string>> = {};
    let isValid = true;

    const fieldsToValidate: (keyof CalculatorInputs)[] = [
      'paddyPrice', 'yieldRate', 'millingCostPerUnitPaddy', 
      'overheadPercentage', 'profitMarginPercentage'
    ];

    if (inputs.includeByProducts) {
      fieldsToValidate.push(
        'byProductBranPercentage', 'byProductBranPrice',
        'byProductBrokenPercentage', 'byProductBrokenPrice',
        'byProductHuskPercentage', 'byProductHuskPrice'
      );
    }

    for (const key of fieldsToValidate) {
      const valueStr = inputs[key];
      if (typeof valueStr === 'string') { // Ensure it's a string field, not the boolean
        const value = parseFloat(valueStr);
        if (isNaN(value)) {
          errors[key] = "Must be a number.";
          isValid = false;
          continue;
        }
        if (key === 'yieldRate' && (value <= 0 || value > 100)) {
          errors[key] = "Rice yield must be between 0.01 and 100.";
          isValid = false;
        } else if (key.endsWith('Percentage') && value < 0) {
          errors[key] = "Percentage cannot be negative.";
          isValid = false;
        } else if (key.endsWith('Price') && value < 0) {
           errors[key] = "Price cannot be negative.";
           isValid = false;
        } else if ( (key === 'paddyPrice' || key === 'millingCostPerUnitPaddy') && value <=0 && key !== 'millingCostPerUnitPaddy') {
           errors[key] = "Must be a positive number.";
            isValid = false;
        } else if (key === 'millingCostPerUnitPaddy' && value < 0) {
           errors[key] = "Cannot be negative.";
           isValid = false;
        }
      }
    }
    
    const pp = parseFloat(inputs.paddyPrice);
     if (isNaN(pp) || pp <= 0) {
      errors.paddyPrice = "Must be a positive number (for 100kg paddy).";
      isValid = false;
    }
    const mcost = parseFloat(inputs.millingCostPerUnitPaddy);
    if (isNaN(mcost) || mcost < 0) { // Allow 0 milling cost
      errors.millingCostPerUnitPaddy = "Must be a non-negative number (for 100kg paddy).";
      isValid = false;
    }


    setInputErrors(errors);
    return isValid;
  }, [inputs]);
  
  const calculatePrice = useCallback(() => {
    if (!validateInputs()) {
      setResult({ 
        isValid: false, 
        errorMessage: "Please correct the errors in the input fields.",
        sellingPrice: 0,
        breakdown: {
          paddyCostComponent: 0, millingCostComponent: 0, totalByProductRevenuePerUnitRice: 0,
          overheadCostComponent: 0, profitComponent: 0, totalCostPrice: 0,
        }
      });
      return;
    }

    // Convert 100kg batch costs to per kg paddy costs for internal calculation
    const paddyPricePerKgPaddy = parseFloat(inputs.paddyPrice) / 100;
    const millingCostPerKgPaddy = parseFloat(inputs.millingCostPerUnitPaddy) / 100;
    
    const yieldRateNum = parseFloat(inputs.yieldRate) / 100; // decimal e.g. 0.65
    const overheadPercentageNum = parseFloat(inputs.overheadPercentage) / 100;
    const profitMarginPercentageNum = parseFloat(inputs.profitMarginPercentage) / 100;

    if (yieldRateNum <= 0) {
      setResult({ isValid: false, errorMessage: "Rice yield rate must be greater than 0.", sellingPrice: 0, breakdown: {paddyCostComponent:0,millingCostComponent:0,totalByProductRevenuePerUnitRice:0,overheadCostComponent:0,profitComponent:0,totalCostPrice:0} });
      return;
    }

    // --- By-Product Calculations (per unit of PADDY i.e. per kg of PADDY) ---
    let totalByProductRevenueFromOneKgPaddy = 0;
    let branQuantityPerKgPaddy = 0, brokenRiceQuantityPerKgPaddy = 0, huskQuantityPerKgPaddy = 0;

    if (inputs.includeByProducts) {
      const branPerc = parseFloat(inputs.byProductBranPercentage) / 100;
      const branPricePerKg = parseFloat(inputs.byProductBranPrice); // Already per kg of bran
      branQuantityPerKgPaddy = branPerc; //  e.g., 0.08 kg of bran from 1 kg of paddy
      if (!isNaN(branPricePerKg) && branPricePerKg > 0 && branQuantityPerKgPaddy > 0) {
        totalByProductRevenueFromOneKgPaddy += branQuantityPerKgPaddy * branPricePerKg;
      }


      const brokenPerc = parseFloat(inputs.byProductBrokenPercentage) / 100;
      const brokenPricePerKg = parseFloat(inputs.byProductBrokenPrice); // Already per kg of broken rice
      brokenRiceQuantityPerKgPaddy = brokenPerc;
      if (!isNaN(brokenPricePerKg) && brokenPricePerKg > 0 && brokenRiceQuantityPerKgPaddy > 0) {
        totalByProductRevenueFromOneKgPaddy += brokenRiceQuantityPerKgPaddy * brokenPricePerKg;
      }
      
      const huskPerc = parseFloat(inputs.byProductHuskPercentage) / 100;
      const huskPricePerKg = parseFloat(inputs.byProductHuskPrice); // Already per kg of husk
      huskQuantityPerKgPaddy = huskPerc;
       if (!isNaN(huskPricePerKg) && huskPricePerKg > 0 && huskQuantityPerKgPaddy > 0) {
        totalByProductRevenueFromOneKgPaddy += huskQuantityPerKgPaddy * huskPricePerKg;
      }
    }
    
    // --- Cost Calculations (per kg of FINISHED RICE) ---
    // Cost of paddy for one kg of rice
    const paddyCostComponent = paddyPricePerKgPaddy / yieldRateNum;
    // Cost of milling the paddy that produces one kg of rice
    const millingCostComponent = millingCostPerKgPaddy / yieldRateNum;
    
    // Revenue from by-products, converted to "per kg of finished RICE"
    const totalByProductRevenuePerUnitRice = totalByProductRevenueFromOneKgPaddy / yieldRateNum;

    // Net variable cost per kg of rice (after accounting for by-product sales)
    const netVariableCostPerUnitRice = paddyCostComponent + millingCostComponent - totalByProductRevenuePerUnitRice;

    // Overhead cost component (based on net variable cost)
    const overheadCostComponent = netVariableCostPerUnitRice * overheadPercentageNum;
    
    // Total cost price per kg of rice
    const totalCostPrice = netVariableCostPerUnitRice + overheadCostComponent;
    
    // Profit component (based on total cost price)
    const profitComponent = totalCostPrice * profitMarginPercentageNum;
    
    // Final selling price per kg of rice
    const sellingPrice = totalCostPrice + profitComponent;

    const breakdown: CostBreakdown = {
      paddyCostComponent,
      millingCostComponent,
      totalByProductRevenuePerUnitRice,
      overheadCostComponent,
      profitComponent,
      totalCostPrice,
    };
    
    const mainRiceQuantityPerKgPaddy = yieldRateNum; // kg of rice from 1 kg of paddy

    setResult({ 
      sellingPrice, 
      breakdown, 
      isValid: true,
      mainRiceQuantityPerUnitPaddy: mainRiceQuantityPerKgPaddy,
      branQuantityPerUnitPaddy: inputs.includeByProducts ? branQuantityPerKgPaddy : 0,
      brokenRiceQuantityPerUnitPaddy: inputs.includeByProducts ? brokenRiceQuantityPerKgPaddy : 0,
      huskQuantityPerUnitPaddy: inputs.includeByProducts ? huskQuantityPerKgPaddy : 0,
    });

  }, [inputs, validateInputs]);

  useEffect(() => {
    calculatePrice();
  }, [inputs, calculatePrice]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen flex flex-col items-center justify-center p-4 selection:bg-green-200 selection:text-green-900">
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-lg md:max-w-2xl transform transition-all duration-500 hover:scale-[1.01]">
        <header className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700">
            🌾 Rice Business Calculator
          </h1>
          <p className="text-sm text-gray-500 text-center mt-2">
            Determine rice selling price (for 100kg) with cost breakdown & by-product analysis. Input primary costs for a 100kg paddy batch.
          </p>
        </header>
        
        <main>
          <CalculatorForm 
            inputs={inputs} 
            onInputChange={handleInputChange} 
            inputErrors={inputErrors}
            setInputs={setInputs} // For toggle switch
          />
          <ResultsDisplay result={result} includeByProducts={inputs.includeByProducts} inputs={inputs} />
        </main>

        <footer className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            Calculations are estimates. Final selling price and breakdown are for 100kg finished rice. Input costs for paddy & milling are for a 100kg paddy batch. 'kg' is the base unit for other weights/prices. Ensure currency consistency.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
