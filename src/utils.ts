import type { Country } from "./types";

export const calculateCostOfLiving = (
  country: Country,
  baseCostOfLiving = 3700
) => {
  return (baseCostOfLiving * country["Cost of Living Plus Rent Index"]) / 100;
};
