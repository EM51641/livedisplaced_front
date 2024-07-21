import { GetDomID } from "../../helpers/utils";
import iso2 from "../../data/cntries_lst";
import { AppendDataToId } from "../utils";

function generate_report_url(countryIso: string): string {
  return `${window.location.protocol}//${window.location.host}/report/${countryIso}`;
}

AppendDataToId("select-country", iso2);

let htmlCountryElem = GetDomID("select-country") as HTMLInputElement;
let flagCountryElem = GetDomID("main-flag-img") as HTMLImageElement;
let htmlElemGo = GetDomID("search-country") as HTMLAnchorElement;

htmlCountryElem.addEventListener("change", function (event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    const CountryElem = target;
    flagCountryElem.alt = iso2[CountryElem.value as keyof typeof iso2];
    flagCountryElem.src = `https://flagcdn.com/h240/${CountryElem.value.toLowerCase()}.png`;
    htmlElemGo.href = generate_report_url(CountryElem.value);
  }
});
