import Chart, { ChartConfiguration } from "chart.js/auto";
import _ from "lodash";
import { coo_choices } from "../data/coa_coo_filter";
import { years_choices } from "../data/tot_arrival_filter";
import { DIST, set_doughnut } from "../helpers/chart";
import { getjson } from "../helpers/refresh";
import {
  AppendOption,
  GetCtx,
  GetDomID,
  fill_image,
  fill_text,
} from "../helpers/utils";
import { dconf } from "../main";
import { urlgenerator } from "./utils";

AppendOption("select-attribute", coo_choices);
AppendOption("select-year", years_choices);

declare const coo: string;

let points: DIST[] = JSON.parse(coo);

console.log(points);

let conf: ChartConfiguration<"doughnut"> = _.cloneDeep(dconf);

set_doughnut(points, conf);

conf.data.datasets[0].backgroundColor = [
  "rgb(176, 244, 179)",
  "rgb(119, 252, 233)",
  "rgb(108, 144, 239)",
  "rgb(102, 181, 241)",
  "rgb(228, 168, 200)",
  "rgb(174, 142, 130)",
  "rgb(172, 245, 184)",
  "rgb(215, 169, 210)",
  "rgb(162, 248, 176)",
  "rgb(149, 103, 222)",
  "rgb(206, 102, 236)",
];

const canvas = GetCtx("pieplot-1");
const chart = new Chart(canvas, conf);

console.log(chart.data);

const htmlelem_year = GetDomID("select-year");

htmlelem_year.addEventListener("change", async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const year = target.value;
  const state = GetDomID("select-attribute") as HTMLInputElement;

  const url = urlgenerator(year, state.value);
  points = (await getjson<DIST>(url)) as DIST[];
  set_doughnut(points, conf);

  fill_text<DIST>("number-first", points, "number", "");
  fill_text<DIST>("name-first", points, "name", "");
  fill_image<DIST>("img-first", points, "iso_2", "name");

  chart.update();
});

const htmlelem_attr = GetDomID("select-attribute");

htmlelem_attr.addEventListener("change", async (e: Event) => {
  const target = e.target as HTMLInputElement;
  const state = target.value;
  const year = GetDomID("select-year") as HTMLInputElement;
  const url = urlgenerator(year.value, state);

  points = (await getjson<DIST>(url)) as DIST[];
  set_doughnut(points, conf);

  fill_text<DIST>("number-first", points, "number", "");
  fill_text<DIST>("name-first", points, "name", "");
  fill_image<DIST>("img-first", points, "iso_2", "name");

  chart.update();
});
