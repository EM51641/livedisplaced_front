import { Chart } from "chart.js/auto";
import _ from "lodash";
import { coo_choices } from "../../../data/coa_coo_filter";
import { lconf } from "../../models/models";
import { AppendOption, GetCtx, GetDomID } from "../../utils";
import { AGG } from "./types";

AppendOption("select-option", coo_choices); // Append the select

// First Line
declare const datat: string;
const points: AGG[] = JSON.parse(datat);

let conf = _.cloneDeep(lconf);

conf.data.datasets[0].data = points.map((o) => o.total);
conf.data.labels = points.map((o) => o.year);

const canvas = GetCtx("line-1");
const chart = new Chart(canvas, conf);

const htmlelemt = GetDomID("select-option");

htmlelemt.addEventListener("change", function (event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    let val = target.value as keyof AGG;
    conf.data.datasets[0].data = points.map((o) => o[val]);
    conf.data.labels = points.map((o) => o.year);
    chart.update();
  }
});
