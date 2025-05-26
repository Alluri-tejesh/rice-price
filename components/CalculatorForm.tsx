
import React from 'react';
import { CalculatorInputs } from '../types';
import InputGroup from './InputGroup';
import ToggleSwitch from './ToggleSwitch';
import PaddyIcon from './icons/PaddyIcon';
import YieldIcon from './icons/YieldIcon';
import MillingIcon from './icons/MillingIcon';
import OverheadIcon from './icons/OverheadIcon';
import ProfitIcon from './icons/ProfitIcon';
import BranIcon from './icons/BranIcon';
import BrokenRiceIcon from './icons/BrokenRiceIcon';
import HuskIcon from './icons/HuskIcon';

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputErrors: Partial<Record<keyof CalculatorInputs, string>>;
  setInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>; // For toggle
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ inputs, onInputChange, inputErrors, setInputs }) => {
  
  const handleToggleChange = (isChecked: boolean) => {
    setInputs(prev => ({ ...prev, includeByProducts: isChecked }));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Core Costs (based on 100kg Paddy Batch)</h2>
        <InputGroup
          label="Paddy Purchase Price (for 100kg)"
          id="paddyPrice"
          value={inputs.paddyPrice}
          onChange={onInputChange}
          placeholder="e.g., 2000"
          unit="for 100kg paddy"
          icon={<PaddyIcon className="w-5 h-5" />}
          min="0"
          error={inputErrors.paddyPrice}
        />
        <InputGroup
          label="Main Rice Yield Rate"
          id="yieldRate"
          value={inputs.yieldRate}
          onChange={onInputChange}
          placeholder="e.g., 65"
          unit="%"
          icon={<YieldIcon className="w-5 h-5" />}
          min="0.01"
          max="100"
          step="0.01"
          error={inputErrors.yieldRate}
        />
        <InputGroup
          label="Milling Cost (for 100kg paddy)"
          id="millingCostPerUnitPaddy"
          value={inputs.millingCostPerUnitPaddy}
          onChange={onInputChange}
          placeholder="e.g., 150"
          unit="for 100kg paddy"
          icon={<MillingIcon className="w-5 h-5" />}
          min="0"
          error={inputErrors.millingCostPerUnitPaddy}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-3 border-b pb-2">
           <h2 className="text-lg font-semibold text-gray-700">By-Product Sales</h2>
           <ToggleSwitch
            id="includeByProductsToggle"
            checked={inputs.includeByProducts}
            onChange={handleToggleChange}
            label="Factor in Sales"
          />
        </div>
       
        {inputs.includeByProducts && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 pl-3 border-l-2 border-green-200">
            <InputGroup
              label="Bran Yield"
              id="byProductBranPercentage"
              value={inputs.byProductBranPercentage}
              onChange={onInputChange}
              placeholder="e.g., 8"
              unit="% of paddy weight"
              icon={<BranIcon className="w-5 h-5" />}
              min="0" max="100" step="0.1"
              error={inputErrors.byProductBranPercentage}
              disabled={!inputs.includeByProducts}
            />
            <InputGroup
              label="Bran Sale Price"
              id="byProductBranPrice"
              value={inputs.byProductBranPrice}
              onChange={onInputChange}
              placeholder="e.g., 5"
              unit="per kg bran"
              icon={<BranIcon className="w-5 h-5 text-yellow-600" />}
              min="0"
              error={inputErrors.byProductBranPrice}
              disabled={!inputs.includeByProducts}
            />
            <InputGroup
              label="Broken Rice Yield"
              id="byProductBrokenPercentage"
              value={inputs.byProductBrokenPercentage}
              onChange={onInputChange}
              placeholder="e.g., 5"
              unit="% of paddy weight"
              icon={<BrokenRiceIcon className="w-5 h-5" />}
              min="0" max="100" step="0.1"
              error={inputErrors.byProductBrokenPercentage}
              disabled={!inputs.includeByProducts}
            />
            <InputGroup
              label="Broken Rice Sale Price"
              id="byProductBrokenPrice"
              value={inputs.byProductBrokenPrice}
              onChange={onInputChange}
              placeholder="e.g., 10"
              unit="per kg broken rice"
              icon={<BrokenRiceIcon className="w-5 h-5 text-gray-500" />}
              min="0"
              error={inputErrors.byProductBrokenPrice}
              disabled={!inputs.includeByProducts}
            />
            <InputGroup
              label="Husk/Other Yield"
              id="byProductHuskPercentage"
              value={inputs.byProductHuskPercentage}
              onChange={onInputChange}
              placeholder="e.g., 20"
              unit="% of paddy weight"
              icon={<HuskIcon className="w-5 h-5" />}
              min="0" max="100" step="0.1"
              error={inputErrors.byProductHuskPercentage}
              disabled={!inputs.includeByProducts}
            />
            <InputGroup
              label="Husk/Other Sale Price"
              id="byProductHuskPrice"
              value={inputs.byProductHuskPrice}
              onChange={onInputChange}
              placeholder="e.g., 0.5"
              unit="per kg husk/other"
              icon={<HuskIcon className="w-5 h-5 text-orange-500" />}
              min="0"
              error={inputErrors.byProductHuskPrice}
              disabled={!inputs.includeByProducts}
            />
          </div>
        )}
         {!inputs.includeByProducts && (
          <p className="text-xs text-gray-500 mt-1 pl-1">Enable toggle to include by-product revenues in calculations.</p>
        )}
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Financials (Calculated on Per Kg Rice Basis)</h2>
        <InputGroup
          label="Overhead Costs"
          id="overheadPercentage"
          value={inputs.overheadPercentage}
          onChange={onInputChange}
          placeholder="e.g., 10"
          unit="% of (net variable cost per kg rice)"
          icon={<OverheadIcon className="w-5 h-5" />}
          min="0"
          error={inputErrors.overheadPercentage}
        />
        <InputGroup
          label="Desired Profit Margin"
          id="profitMarginPercentage"
          value={inputs.profitMarginPercentage}
          onChange={onInputChange}
          placeholder="e.g., 15"
          unit="% of (total cost per kg rice)"
          icon={<ProfitIcon className="w-5 h-5" />}
          min="0"
          error={inputErrors.profitMarginPercentage}
        />
      </div>
      <p className="text-xs text-gray-500 mt-4">
        Note: Ensure all monetary inputs use the same currency. 'kg' (kilogram) is the consistent weight unit. Paddy and Milling costs are for a 100kg batch of paddy. By-product prices are per kg of the by-product. Overhead is applied to variable costs (per kg rice) after by-product revenue. Profit is applied to total cost (per kg rice).
      </p>
    </form>
  );
};

export default CalculatorForm;
