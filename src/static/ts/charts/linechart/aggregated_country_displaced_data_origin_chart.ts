import _ from "lodash";
import { LineChartDataPoint } from "./type";
import { LineChartManager } from "./utils";
import { AppendDataToId } from "../utils";
import iso2 from "../../data/cntries_lst";

AppendDataToId("select-country", iso2); // Append the select

declare let data: LineChartDataPoint[];
const countryIso2 = undefined;

let ChartManager = new LineChartManager({
  points: data,
  isCountryOfOrigin: true,
  countryIso2: countryIso2,
});

ChartManager.setConfig();
ChartManager.Draw("line-1");
ChartManager.AddEventListener("select-countryIso2");
ChartManager.AddEventListener("select-category");

declare let total_outflow: LineChartDataPoint[];

let ChartManagerOutflow = new LineChartManager({
  points: total_outflow,
  isCountryOfOrigin: false,
  countryIso2: countryIso2,
});

ChartManagerOutflow.setConfig();
ChartManagerOutflow.Draw("line-2");
ChartManagerOutflow.AddEventListener("select-category-1");
