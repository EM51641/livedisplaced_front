import Chart from "chart.js/auto";
import { lconf } from "../../main";
import { AppendOption, GetCtx, GetDomID } from "../../helpers/utils";
import iso2 from "../../data/cntries_lst";
import { generate_bilateral_url } from "./utils";
import _ from "lodash";

type TSType = {
  number: number;
  year: number;
};

AppendOption("select-country-from", iso2);
AppendOption("select-country-to", iso2);

let htmlElemGo = GetDomID("go-to") as HTMLAnchorElement;
let htmlElemCountryOfOrigin = GetDomID("select-country-from");
let htmlElemCountryOfArrival = GetDomID("select-country-to");

// Flexible Time Serie Evolution
declare const refugees_ts: string;
declare const asylium_seekers_ts: string;
declare const people_of_concern_ts: string;

const refugees_ts_json: TSType[] = JSON.parse(refugees_ts);
const asylium_seekers_ts_json: TSType[] = JSON.parse(asylium_seekers_ts);
const people_of_concern_ts_json: TSType[] = JSON.parse(people_of_concern_ts);

const dataSet = [
  {
    label: "Refugees",
    data: refugees_ts_json,
    backgroundColor: "rgb(255, 0, 0, 0.5)",
    borderColor: "rgb(255, 0, 0)",
  },
  {
    label: "Asylium Seekers",
    data: asylium_seekers_ts_json,
    backgroundColor: "rgb(0, 255, 0, 0.5)",
    borderColor: "rgb(0, 255, 0)",
  },
  {
    label: "People of Concern",
    data: people_of_concern_ts_json,
    backgroundColor: "rgb(0, 0, 255, 0.5)",
    borderColor: "rgb(0, 0, 255)",
  },
];

let conf = _.cloneDeep(lconf);

for (let i = 0; i < dataSet.length; i++) {
  if (dataSet.length > i) {
    conf.data.datasets.push({ ...conf.data.datasets[i - 1] });
  }

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
      const from_country = target;
      const img_from = GetDomID("img-flag-from") as HTMLImageElement;
      const to_country = GetDomID("select-country-to") as HTMLInputElement;
      img_from.alt = iso2[from_country.value as keyof typeof iso2];
      img_from.src = `https://flagcdn.com/h240/${from_country.value.toLowerCase()}.png`;
      htmlElemGo.href = generate_bilateral_url(
        from_country.value,
        to_country.value
      );
    }
  }
);

htmlElemCountryOfArrival.addEventListener(
  "change",
  function (event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const to_country = target;
      const from_country = GetDomID("select-country-from") as HTMLInputElement;
      const img_to = GetDomID("img-flag-to") as HTMLImageElement;
      img_to.alt = iso2[to_country.value as keyof typeof iso2];
      img_to.src = `https://flagcdn.com/h240/${to_country.value.toLowerCase()}.png`;
      htmlElemGo.href = generate_bilateral_url(
        from_country.value,
        to_country.value
      );
    }
  }
);

// Plot
const fromtocanvas = GetCtx("line-1");
const chart = new Chart(fromtocanvas, conf);
