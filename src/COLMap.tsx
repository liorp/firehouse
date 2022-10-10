import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";
import svgMap from "svgmap";
import "svgmap/dist/svgMap.min.css";
import { calculateCostOfLiving, canFire } from "./utils";
import col from "./assets/col_index_2022.json";
import type { Country } from "./types";

type COLMapProps = {
  netWorth: Accessor<number>;
};

const costOfLivingMapValues = (countries: Country[], netWorth = 1000) => {
  const calculated: Record<
    string,
    {
      canFire: string;
      costOfLiving: number;
      color: string;
      netWorth: number;
      fireNumber: number;
    }
  > = {};
  for (const country of countries) {
    let costOfLiving = Math.floor(calculateCostOfLiving(country));
    let fireNumber = Math.floor(costOfLiving / 0.04);
    let fired = canFire(netWorth, costOfLiving);
    calculated[country.Code] = {
      canFire: fired ? "Yes" : "No",
      color: fired ? "#00ff00" : "#ff0000",
      netWorth,
      costOfLiving,
      fireNumber,
    };
  }
  return calculated;
};

const COLMap = (props: COLMapProps) => {
  let map: ReturnType<svgMap>;
  createEffect(() => {
    map?.container.remove();
    map?.tooltip.remove();

    map = new svgMap({
      targetElementID: "svgMap",
      data: {
        data: {
          costOfLiving: {
            name: "Cost of living per year (2022)",
            format: "{0} USD",
            thousandSeparator: ",",
          },
          netWorth: {
            name: "Your net worth",
            format: "{0} USD",
            thousandSeparator: ",",
          },
          fireNumber: {
            name: "🔥FIRE🔥 number",
            format: "{0} USD",
            thousandSeparator: ",",
          },
          canFire: {
            name: "Can you 🔥FIRE🔥 here?",
          },
        },
        applyData: "costOfLiving",
        values: costOfLivingMapValues(col, props.netWorth()),
      },
    });
  });
  return <div id="svgMap" class="w-[60vw] p-4"></div>;
};

export default COLMap;
