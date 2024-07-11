import _, { StringNullableChain } from "lodash";
import { LineChartDataPoint } from "./type";
import { LineChartManager } from "./utils";
import { AppendDataToId, getQueryParam } from "../utils";
import iso2 from "../../data/cntries_lst";

AppendDataToId("select-country", iso2); // Append the select

declare let totalOutflow: string;
let data_outflow: LineChartDataPoint[] = JSON.parse(totalOutflow);

const countryIso2 = getQueryParam("country_iso_2") as keyof typeof iso2;

let ChartManager = new LineChartManager({
  points: data_outflow,
  isCountryOfOrigin: true,
  countryIso2: countryIso2,
});

ChartManager.setConfig();
ChartManager.Draw("line-1");
ChartManager.AddEventListener("select-countryIso2");
ChartManager.AddEventListener("select-category");

declare let totalInflow: string;
let data_inflow: LineChartDataPoint[] = JSON.parse(totalInflow);

let ChartManagerOutflow = new LineChartManager({
  points: data_inflow,
  isCountryOfOrigin: false,
  countryIso2: countryIso2,
});

ChartManagerOutflow.setConfig();
ChartManagerOutflow.Draw("line-2");
ChartManagerOutflow.AddEventListener("select-category-1");
