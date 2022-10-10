import { Component, createEffect, createSignal, For } from "solid-js";

import col from "./assets/col_index_2022.json";
import COLMap from "./COLMap";
import CountriesList from "./CountriesList";
import type { Country } from "./types";
import { calculateCostOfLiving } from "./utils";

const App: Component = () => {
  let netValueInput;
  const [netWorth, setNetWorth] = createSignal(200000);

  createEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
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
        <COLMap netWorth={netWorth} />
        <CountriesList countries={col} netWorth={netWorth} />
        <ins
          class="adsbygoogle"
          style={{ display: "inline-block", width: "100%" }}
          data-ad-client="ca-pub-4529248472834919"
          data-ad-slot="7239472098"
          data-ad-format="auto"
          data-full-width-responsive
        ></ins>
      </div>
      <footer class="footer footer-center p-4 bg-base-300 text-base-content absolute bottom-0">
        <div>
          <p>
            Based on the&nbsp;
            <a
              class="link"
              href="https://web.archive.org/web/20110806210437/http://www.aaii.com/journal/article/retirement-savings-choosing-a-withdrawal-rate-that-is-sustainable?utm_source=sitesearch&utm_medium=click"
            >
              trinity study
            </a>{" "}
            &bullet; All calculations are done locally &bullet; &copy;{" "}
            <a class="link" href="https://liorp.dev/">
              Lior Pollak
            </a>{" "}
            2022
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
