import { Component, createSignal, For } from "solid-js";

import col from "./assets/col_index_2022.json";
import COLMap from "./COLMap";
import type { Country } from "./types";
import { calculateCostOfLiving } from "./utils";

const App: Component = () => {
  let netValueInput;
  const [netWorth, setNetWorth] = createSignal(200000);

  return (
    <div class="flex flex-col content-center items-center align-middle pt-2 mx-auto h-full w-full prose lg:prose-xl">
      <h1 class="">🔥FIREHOUSE🔥</h1>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Enter your current net worth (USD)</span>
        </label>
        <label class="input-group">
          <input
            ref={netValueInput}
            type="text"
            class="input input-bordered input-primary w-full max-w-sm"
            value={netWorth()}
            onChange={(e) => setNetWorth(e.target.value)}
          />
          <span onClick={(e) => setNetWorth(netValueInput.value)}>USD</span>
        </label>
      </div>
      <br />
      <COLMap netWorth={netWorth} />
      <details class="overflow-auto h-1/2 w-2/3 mt-2">
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
      <footer>
        Based on the&nbsp;
        <a href="https://web.archive.org/web/20110806210437/http://www.aaii.com/journal/article/retirement-savings-choosing-a-withdrawal-rate-that-is-sustainable?utm_source=sitesearch&utm_medium=click">
          trinity study
        </a>{" "}
        &bullet; All calculations are done locally &bullet; &copy; Lior Pollak
        2022
      </footer>
    </div>
  );
};

export default App;
