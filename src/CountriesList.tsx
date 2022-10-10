import { Accessor, For } from "solid-js";
import type { Country } from "./types";
import { calculateCostOfLiving } from "./utils";

type CountriesListProps = {
  countries: Country[];
  netWorth: Accessor<number>;
};

const CountriesList = (props: CountriesListProps) => {
  return (
    <>
      <label for="my-modal-4" class="btn modal-button m-2">
        List of countries and approximated COL
      </label>

      <input type="checkbox" id="my-modal-4" class="modal-toggle" />
      <label for="my-modal-4" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
          <h3 class="text-lg font-bold">
            List of countries and approximated COL
          </h3>
          <p class="py-4">
            <For each={props.countries}>
              {(country: Country) => (
                <div>
                  {country.Country}&nbsp;
                  {Math.floor(
                    calculateCostOfLiving(country, props.netWorth())
                  )}{" "}
                  USD
                </div>
              )}
            </For>
          </p>
        </label>
      </label>
    </>
  );
};

export default CountriesList;
