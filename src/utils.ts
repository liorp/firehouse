import type { Country } from "./types";

export const calculateCostOfLiving = (
  country: Country,
  baseCostOfLiving = 3700
) => {
  return (baseCostOfLiving * country["Cost of Living Plus Rent Index"]) / 100;
};

// costOfLiving is per month
export const canFire = (netWorth: number, costOfLiving: number) =>
  netWorth * 0.04 > costOfLiving * 12;
