import Chart from "chart.js/auto";
import _ from "lodash";
import iso2 from "../../../data/cntries_lst";
import { getjson } from "../../chartjs/helpers/refresh";
import { lconf } from "../../models/models";
import { AppendOption, GetCtx, GetDomID } from "../../utils";
import { AL } from "./types";

AppendOption("select-country", iso2); // Append the select

// Second Graph Line
declare const cooline: string;
let points: AL[] = JSON.parse(cooline);

let conf = _.clone(lconf);

conf.data.datasets[0].data = points.map((o) => o.metric);
conf.data.labels = points.map((o) => o.year);

const canvas = GetCtx("line-1");
const chart = new Chart(canvas, conf);

const htmlelem = GetDomID("select-country");

async function updatechart(event: Event) {
  const target = event.target as HTMLInputElement;
  const iso2 = target.value;
  const url = `${window.location.href}/api/${iso2}`;

  points = (await getjson<AL>(url)) as AL[];

  conf.data.datasets[0].data = points.map((o) => o.metric);
  conf.data.labels = points.map((o) => o.year);
  chart.update();
}

htmlelem.addEventListener("change", updatechart);
