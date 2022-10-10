import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";
import svgMap from "svgmap";
import "svgmap/dist/svgMap.min.css";
import { calculateCostOfLiving } from "./utils";
import col from "./assets/col_index_2022.json";
import type { Country } from "./types";

type COLMapProps = {
  netWorth: Accessor<number>;
};

const costOfLivingMapValues = (countries: Country[], netWorth = 1000) => {
  const calculated: Record<
    string,
    { canFire: string; costOfLiving: number; color: string }
  > = {};
  for (const country of countries) {
    let costOfLiving = calculateCostOfLiving(country);
    calculated[country.Code] = {
      canFire: netWorth > costOfLiving ? "Yes" : "No",
      color: netWorth > costOfLiving ? "#00ff00" : "#ff0000",
      costOfLiving,
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
            name: "Cost Of Living (2022)",
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
  return <div id="svgMap" class="w-96 h-96"></div>;
};

export default COLMap;
