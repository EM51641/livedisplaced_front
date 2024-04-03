import _ from "lodash";
import { LineChartDataPoint } from "./type";
import { LineChartManager } from "./utils";
import { AppendDataToId, getQueryParam } from "../utils";
import iso2 from "../../data/cntries_lst";

AppendDataToId("select-country", iso2); // Append the select

declare let data: LineChartDataPoint[];
const countryIso2 = getQueryParam("countryIso2") as keyof typeof iso2;

let ChartManager = new LineChartManager({
  points: data,
  isCountryOfOrigin: false,
  countryIso2: countryIso2,
});

ChartManager.setConfig();
ChartManager.Draw("line-1");
ChartManager.AddEventListener("select-countryIso2");
ChartManager.AddEventListener("select-category");
