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
        List of countries and approximated cost of living
      </label>

      <input type="checkbox" id="my-modal-4" class="modal-toggle" />
      <label for="my-modal-4" class="modal cursor-pointer">
        <label class="modal-box relative" for="">
          <h3 class="!mt-0 text-lg font-bold ">
            List of countries and approximated cost of living
          </h3>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Cost Of Living (Per Year)</th>
              </tr>
            </thead>
            <tbody>
              <For each={props.countries}>
                {(country: Country) => (
                  <tr>
                    <td>{country.Country}&nbsp;</td>
                    <td>
                      {Math.floor(
                        calculateCostOfLiving(country, props.netWorth())
                      )}{" "}
                      USD
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </label>
      </label>
    </>
  );
};

export default CountriesList;
