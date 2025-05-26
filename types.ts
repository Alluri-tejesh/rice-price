
export interface CalculatorInputs {
  paddyPrice: string; // Total price for 100kg of paddy
  yieldRate: string; // Main rice yield % from paddy
  millingCostPerUnitPaddy: string; // Total milling cost for 100kg of paddy
  overheadPercentage: string; // % of (net variable cost per kg rice)
  profitMarginPercentage: string; // % of (total cost per kg rice)

  includeByProducts: boolean;
  byProductBranPercentage: string; // % of paddy weight
  byProductBranPrice: string; // price per kg of bran
  byProductBrokenPercentage: string; // % of paddy weight
  byProductBrokenPrice: string; // price per kg of broken rice
  byProductHuskPercentage: string; // % of paddy weight
  byProductHuskPrice: string; // price per kg of husk/other
}

export interface CostBreakdown {
  paddyCostComponent: number; // per kg rice
  millingCostComponent: number; // per kg rice
  totalByProductRevenuePerUnitRice: number; // revenue offset per kg rice
  overheadCostComponent: number; // per kg rice
  profitComponent: number; // per kg rice
  totalCostPrice: number; // per kg rice (after by-product offset, before profit)
}

export interface CalculationResult {
  sellingPrice: number; // per kg finished rice
  breakdown: CostBreakdown;
  isValid: boolean;
  errorMessage?: string;

  // Quantities per 1 kg of PADDY processed
  mainRiceQuantityPerUnitPaddy?: number; // kg of rice from 1 kg paddy
  branQuantityPerUnitPaddy?: number; // kg of bran from 1 kg paddy
  brokenRiceQuantityPerUnitPaddy?: number; // kg of broken rice from 1 kg paddy
  huskQuantityPerUnitPaddy?: number; // kg of husk/other from 1 kg paddy
}
