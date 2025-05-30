import _ from "lodash";
import { AppendOption } from "../../helpers/utils";
import { coo_choices } from "../../data/coa_coo_filter";
import { years_choices } from "../../data/tot_arrival_filter";
import { DoughnutDataPoint } from "./type";
import DoughnutChart from "./utils";
import { getLastPathSegment } from "../utils";
import iso2 from "../../data/cntries_lst";

AppendOption("select-attribute-1", coo_choices);
AppendOption("select-year-1", years_choices);

declare const top10InflowDataJson: string;
let top_10_country_of_origin_data_pts: DoughnutDataPoint[] =
  JSON.parse(top10InflowDataJson);

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
  points: top_10_country_of_origin_data_pts,
  isCountryOfOrigin: true,
  countryIso2: getLastPathSegment() as keyof typeof iso2,
});
ChartManager.setConfig(BACKGROUND_COLOR);
ChartManager.Draw("pieplot-2");
ChartManager.AddEventListener(
  "select-year-1",
  "select-attribute-1",
  "number-second",
  "name-second",
  "img-second",
);
ChartManager.AddEventListener(
  "select-attribute-1",
  "select-year-1",
  "number-second",
  "name-second",
  "img-second",
);
