import Chart from "chart.js/auto";
import { lconf } from "../../main";
import { AppendOption, GetCtx, GetDomID } from "../../helpers/utils";
import iso2 from "../../data/cntries_lst";
import { generate_bilateral_url } from "./utils";
import _ from "lodash";
import { getQueryParam } from "../utils";

type TSType = {
  number: number;
  year: number;
};

AppendOption("select-country-from", iso2);
AppendOption("select-country-to", iso2);

let htmlElemGo = GetDomID("go-to") as HTMLAnchorElement;
let countryOfOriginIso = getQueryParam("coo", "UA");
let countryOfArrivalIso = getQueryParam("coa", "US");

htmlElemGo.href = generate_bilateral_url(
  countryOfOriginIso,
  countryOfArrivalIso,
);

let htmlElemCountryOfOrigin = GetDomID("select-country-from");
let htmlElemCountryOfArrival = GetDomID("select-country-to");

// Flexible Time Serie Evolution
declare const refugeesTs: string;
declare const asyliumSeekersTs: string;
declare const peopleOfConcernTs: string;

const refugeesTsJson: TSType[] = JSON.parse(refugeesTs);
const asyliumSeekersTsJson: TSType[] = JSON.parse(asyliumSeekersTs);
const peopleOfConcernTsJson: TSType[] = JSON.parse(peopleOfConcernTs);

const dataSet = [
  {
    label: "Refugees",
    data: refugeesTsJson,
    backgroundColor: "rgb(255, 0, 0, 0.5)",
    borderColor: "rgb(255, 0, 0)",
  },
  {
    label: "Asylium Seekers",
    data: asyliumSeekersTsJson,
    backgroundColor: "rgb(0, 255, 0, 0.5)",
    borderColor: "rgb(0, 255, 0)",
  },
  {
    label: "People of Concern",
    data: peopleOfConcernTsJson,
    backgroundColor: "rgb(0, 0, 255, 0.5)",
    borderColor: "rgb(0, 0, 255)",
  },
];

let conf = _.cloneDeep(lconf);

for (let i = 0; i < dataSet.length; i++) {
  if (i > 0) conf.data.datasets.push({ data: [] });
  conf.data.labels = dataSet[i].data.map((o) => o.year);
  conf.data.datasets[i].data = dataSet[i].data.map((o) => o.number);
  conf.data.datasets[i].label = dataSet[i].label;
  conf.data.datasets[i].backgroundColor = dataSet[i].backgroundColor;
  conf.data.datasets[i].borderColor = dataSet[i].borderColor;

  if (
    conf.options &&
    conf.options.plugins &&
    conf.options.plugins.legend &&
    conf.options.plugins.legend.display == false
  ) {
    conf.options.plugins.legend.display = true;
  }
}

htmlElemCountryOfOrigin.addEventListener(
  "change",
  function (event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const originCountry = target;
      const originFlagCountry = GetDomID("img-flag-from") as HTMLImageElement;
      const arrivalCountry = GetDomID("select-country-to") as HTMLInputElement;
      originFlagCountry.alt = iso2[originCountry.value as keyof typeof iso2];
      originFlagCountry.src = `https://flagcdn.com/h240/${originCountry.value.toLowerCase()}.png`;
      htmlElemGo.href = generate_bilateral_url(
        originCountry.value,
        arrivalCountry.value,
      );
    }
  },
);

htmlElemCountryOfArrival.addEventListener(
  "change",
  function (event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const originCountry = GetDomID("select-country-from") as HTMLInputElement;
      const originFlagCountry = GetDomID("img-flag-to") as HTMLImageElement;
      const arrivalCountry = target;
      originFlagCountry.alt = iso2[arrivalCountry.value as keyof typeof iso2];
      originFlagCountry.src = `https://flagcdn.com/h240/${arrivalCountry.value.toLowerCase()}.png`;
      htmlElemGo.href = generate_bilateral_url(
        originCountry.value,
        arrivalCountry.value,
      );
    }
  },
);

// Plot
const fromtocanvas = GetCtx("line-1");
new Chart(fromtocanvas, conf);
