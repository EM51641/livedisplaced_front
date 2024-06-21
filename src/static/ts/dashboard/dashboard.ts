import Chart from "chart.js/auto";
import iso2 from "../data/cntries_lst";
import { AppendOption, GetCtx, GetDomID } from "../helpers/utils";
import { lconf } from "../main";
import TLD from "./types";

// Flexible Time Serie Evolution
declare const refugees_ts: string;
const data: TLD[] = JSON.parse(refugees_ts);

let conf = { ...lconf };
conf.data.labels = data.map((o) => o.year);
conf.data.datasets[0].data = data.map((o) => o.refugees);

// Insert data
conf.data.datasets.push({ ...conf.data.datasets[0] });
conf.data.datasets[0].label = "Refugees";
conf.data.datasets[1].data = data.map((o) => o.asylium_seekers);
conf.data.datasets[1].backgroundColor = "rgb(255, 255, 0, 0.5)";
conf.data.datasets[1].borderColor = "rgb(255, 255, 0)";
conf.data.datasets[1].label = "Asylium seekers";

if (
  conf.options &&
  conf.options.plugins &&
  conf.options.plugins.legend &&
  conf.options.plugins.legend.display == false
) {
  conf.options.plugins.legend.display = true;
}

let htmlelem = GetDomID("go-to") as HTMLAnchorElement;

AppendOption("select-country-from", iso2); // Append the select

let htmlelemf = GetDomID("select-country-from");

htmlelemf.addEventListener("change", function (event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    let val = target.value as keyof typeof iso2;
    let img_from = GetDomID("img-flag-from") as HTMLImageElement;
    let to_val = GetDomID("select-country-to") as HTMLInputElement;
    img_from.alt = iso2[val];
    img_from.src = `https://flagcdn.com/h240/${val.toLowerCase()}.png`;
    htmlelem.href = `http://localhost:7070/dashboard/${val}/${to_val.value}`;
  }
});

AppendOption("select-country-to", iso2); // Append the select

let htmlelems = GetDomID("select-country-to");

htmlelems.addEventListener("change", function (event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    let val = target.value as keyof typeof iso2;
    let img_to = GetDomID("img-flag-to") as HTMLImageElement;
    let from_val = GetDomID("select-country-from") as HTMLInputElement;
    img_to.alt = iso2[val];
    img_to.src = `https://flagcdn.com/h240/${val.toLowerCase()}.png`;
    htmlelem.href = `http://localhost:7070/dashboard/${from_val.value}/${val}`;
  }
});

// Plot
const fromtocanvas = GetCtx("line-1");
const chart = new Chart(fromtocanvas, conf);
