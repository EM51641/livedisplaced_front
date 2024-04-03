import _ from "lodash";
import { AppendOption } from "../../helpers/utils";
import { coo_choices } from "../../data/coa_coo_filter";
import { years_choices } from "../../data/tot_arrival_filter";
import { DoughnutDataPoint } from "./type";
import DoughnutChart from "./utils";

AppendOption("select-attribute", coo_choices);
AppendOption("select-year", years_choices);

declare let Top10CountryOfOriginData: DoughnutDataPoint[];
const BACKGROUND_COLOR = [
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

let ChartManager = new DoughnutChart({
  points: Top10CountryOfOriginData,
});
ChartManager.setConfig(BACKGROUND_COLOR);
ChartManager.Draw("pieplot-1");
ChartManager.AddEventListener(
  "select-year",
  "number-first",
  "name-first",
  "img-first"
);
ChartManager.AddEventListener(
  "select-attribute",
  "number-first",
  "name-first",
  "img-first"
);
