import type { Country } from "./types";

// Calculates the cost of living per year
export const calculateCostOfLiving = (
  country: Country,
  baseCostOfLiving = 3700 // Based on NYC
) => {
  return (
    ((baseCostOfLiving * country["Cost of Living Plus Rent Index"]) / 100) * 12
  );
};

// costOfLiving is per year
export const canFire = (netWorth: number, costOfLiving: number) =>
  netWorth * 0.04 > costOfLiving;
