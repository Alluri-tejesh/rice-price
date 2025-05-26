
import React from 'react';
import { CalculationResult, CalculatorInputs } from '../types';

interface ResultsDisplayProps {
  result: CalculationResult | null;
  includeByProducts: boolean;
  inputs: CalculatorInputs; // Added to access by-product prices
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, includeByProducts, inputs }) => {
  if (!result || !result.isValid || result.sellingPrice === null) {
    return (
      <div className="mt-8 p-6 bg-yellow-50 border border-yellow-300 rounded-lg text-center">
        <p className="text-yellow-700 font-medium">
          {result?.errorMessage ? result.errorMessage : "Enter valid inputs above to see the calculation."}
        </p>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    if (isNaN(value)) return "N/A";
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  
  const formatQuantity = (value: number) => {
    if (isNaN(value)) return "N/A";
    if (value === 0) return "0.00";
    if (Math.abs(value) < 0.01 && value !== 0) return value.toExponential(2);
    if (Math.abs(value) < 1 && value !== 0) return value.toLocaleString(undefined, { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  // sumOfProductionAndOverheadCosts = (Paddy Cost Comp + Milling Cost Comp + Overhead Cost Comp)
  // This is because result.breakdown.totalCostPrice = (Paddy + Milling - ByProductRevenue) + Overhead
  // So, result.breakdown.totalCostPrice + result.breakdown.totalByProductRevenuePerUnitRice = (Paddy + Milling - ByProductRevenue) + Overhead + ByProductRevenue
  // = Paddy + Milling + Overhead
  const sumOfProductionAndOverheadCosts = result.breakdown.paddyCostComponent + result.breakdown.millingCostComponent + result.breakdown.overheadCostComponent;


  const branQty100kgPaddy = (result.branQuantityPerUnitPaddy ?? 0) * 100;
  const branPricePerKg = parseFloat(inputs.byProductBranPrice);
  const branTotalRevenue = branQty100kgPaddy * (isNaN(branPricePerKg) ? 0 : branPricePerKg);

  const brokenRiceQty100kgPaddy = (result.brokenRiceQuantityPerUnitPaddy ?? 0) * 100;
  const brokenRicePricePerKg = parseFloat(inputs.byProductBrokenPrice);
  const brokenRiceTotalRevenue = brokenRiceQty100kgPaddy * (isNaN(brokenRicePricePerKg) ? 0 : brokenRicePricePerKg);

  const huskQty100kgPaddy = (result.huskQuantityPerUnitPaddy ?? 0) * 100;
  const huskPricePerKg = parseFloat(inputs.byProductHuskPrice);
  const huskTotalRevenue = huskQty100kgPaddy * (isNaN(huskPricePerKg) ? 0 : huskPricePerKg);
  
  const totalDirectByProductRevenue = branTotalRevenue + brokenRiceTotalRevenue + huskTotalRevenue;

  const showDetailedByProducts = includeByProducts && (branQty100kgPaddy > 0 || brokenRiceQty100kgPaddy > 0 || huskQty100kgPaddy > 0);

  return (
    <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-green-800 mb-4 text-center">Calculation Results</h3>
      
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600">Recommended Selling Price (for 100kg finished rice)</p>
        <p className="text-4xl font-bold text-green-700">
          {formatCurrency(result.sellingPrice * 100)}
        </p>
      </div>

      {showDetailedByProducts && (
        <div className="mb-6 pt-4 border-t border-green-200">
          <h4 className="text-md font-semibold text-gray-700 mb-2">Detailed By-Product Sales (revenue from processing 100kg paddy):</h4>
          <div className="space-y-1 text-sm">
            {branQty100kgPaddy > 0 && !isNaN(branPricePerKg) && branPricePerKg > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Bran: {formatQuantity(branQty100kgPaddy)} kg @ {formatCurrency(branPricePerKg)}/kg</span>
                <span className="font-medium text-gray-800">= {formatCurrency(branTotalRevenue)}</span>
              </div>
            )}
            {brokenRiceQty100kgPaddy > 0 && !isNaN(brokenRicePricePerKg) && brokenRicePricePerKg > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Broken Rice: {formatQuantity(brokenRiceQty100kgPaddy)} kg @ {formatCurrency(brokenRicePricePerKg)}/kg</span>
                <span className="font-medium text-gray-800">= {formatCurrency(brokenRiceTotalRevenue)}</span>
              </div>
            )}
            {huskQty100kgPaddy > 0 && !isNaN(huskPricePerKg) && huskPricePerKg > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Husk/Other: {formatQuantity(huskQty100kgPaddy)} kg @ {formatCurrency(huskPricePerKg)}/kg</span>
                <span className="font-medium text-gray-800">= {formatCurrency(huskTotalRevenue)}</span>
              </div>
            )}
            {totalDirectByProductRevenue > 0 && (
                 <div className="flex justify-between text-sm font-medium border-t border-gray-200 pt-1.5 mt-1.5">
                    <span className="text-gray-600">Total Direct Revenue from By-Products:</span>
                    <span className="text-gray-800">{formatCurrency(totalDirectByProductRevenue)}</span>
                </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="text-md font-semibold text-gray-700 mb-2 pt-3 border-t border-green-200">Cost & Profit Breakdown (for 100kg finished rice):</h4>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Paddy Cost Component:</span>
          <span className="font-medium text-gray-800">{formatCurrency(result.breakdown.paddyCostComponent * 100)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Milling Cost Component:</span>
          <span className="font-medium text-gray-800">{formatCurrency(result.breakdown.millingCostComponent * 100)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Overhead Cost Component:</span>
          <span className="font-medium text-gray-800">{formatCurrency(result.breakdown.overheadCostComponent * 100)}</span>
        </div>

        <div className="flex justify-between text-sm font-medium border-t border-gray-200 pt-1.5 mt-1.5">
          <span className="text-gray-600">Sum of Production & Overhead Costs:</span>
          <span className="text-gray-800">
            {formatCurrency(sumOfProductionAndOverheadCosts * 100)}
          </span>
        </div>
        
        <div className="flex justify-between text-sm font-semibold border-t border-gray-300 pt-2 mt-2">
          <span className="text-gray-700">Total Cost Price (Net):</span>
          <span className="text-gray-900">{formatCurrency(result.breakdown.totalCostPrice * 100)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Profit Component:</span>
          <span className="font-medium text-gray-800">{formatCurrency(result.breakdown.profitComponent * 100)}</span>
        </div>
        
        <div className="flex justify-between text-lg font-bold border-t-2 border-green-300 pt-3 mt-3">
          <span className="text-green-700">Final Selling Price:</span>
          <span className="text-green-700">{formatCurrency(result.sellingPrice * 100)}</span>
        </div>
      </div>

      { (result.mainRiceQuantityPerUnitPaddy || (includeByProducts && (branQty100kgPaddy > 0 || brokenRiceQty100kgPaddy > 0 || huskQty100kgPaddy > 0 ))) && (
        <div className="mt-6 pt-4 border-t border-green-200">
          <h4 className="text-md font-semibold text-gray-700 mb-2">Expected Output (from processing 100 kg of paddy):</h4>
          <div className="space-y-1 text-sm">
            {result.mainRiceQuantityPerUnitPaddy !== undefined && (
            <div className="flex justify-between">
                <span className="text-gray-600">Finished Rice:</span>
                <span className="font-medium text-gray-800">{formatQuantity(result.mainRiceQuantityPerUnitPaddy * 100)} kg</span>
            </div>
            )}
            {includeByProducts && branQty100kgPaddy > 0 && (
            <div className="flex justify-between">
                <span className="text-gray-600">Bran:</span>
                <span className="font-medium text-gray-800">{formatQuantity(branQty100kgPaddy)} kg</span>
            </div>
            )}
            {includeByProducts && brokenRiceQty100kgPaddy > 0 && (
            <div className="flex justify-between">
                <span className="text-gray-600">Broken Rice:</span>
                <span className="font-medium text-gray-800">{formatQuantity(brokenRiceQty100kgPaddy)} kg</span>
            </div>
            )}
            {includeByProducts && huskQty100kgPaddy > 0 && (
            <div className="flex justify-between">
                <span className="text-gray-600">Husk/Other:</span>
                <span className="font-medium text-gray-800">{formatQuantity(huskQty100kgPaddy)} kg</span>
            </div>
            )}
          </div>
           <p className="text-xs text-gray-500 mt-2">
            Note: These quantities are the estimated total output from processing a 100kg batch of paddy. 'kg' refers to kilograms.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultsDisplay;
