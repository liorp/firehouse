import { Component, createSignal, For } from "solid-js";

import col from "./assets/col_index_2022.json";
import COLMap from "./COLMap";
import type { Country } from "./types";
import { calculateCostOfLiving } from "./utils";

const App: Component = () => {
  const [netWorth, setNetWorth] = createSignal(1000);

  return (
    <div class="flex flex-col content-center items-center align-middle pt-2 mx-auto h-full w-full prose lg:prose-xl">
      <h1 class="">FIREHOUSE</h1>
      <input
        type="number"
        placeholder="Enter your current net worth (USD)"
        class="input input-bordered input-primary w-full max-w-md"
        value={netWorth()}
        onChange={(e) => setNetWorth(e.target.value)}
      />
      <br />
      <COLMap netWorth={netWorth} key={netWorth()} />
      <details>
        <summary>List of countries and approximated COL</summary>
        <For each={col}>
          {(country: Country) => (
            <div>
              {country.Country}&nbsp;
              {Math.floor(calculateCostOfLiving(country, netWorth()))} USD
            </div>
          )}
        </For>
      </details>
    </div>
  );
};

export default App;
