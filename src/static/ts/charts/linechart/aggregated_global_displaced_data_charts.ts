import _ from "lodash";
import { LineChartDataPoint } from "./type";
import { LineChartManager } from "./utils";
import { AppendDataToId, getLastPathSegment } from "../utils";
import iso2 from "../../data/cntries_lst";

AppendDataToId("select-country", iso2); // Append the select
const countryIso2 = getLastPathSegment() as keyof typeof iso2;

declare let total_inflow: LineChartDataPoint[];

let ChartManagerInflow = new LineChartManager({
  points: total_inflow,
  isCountryOfOrigin: true,
  countryIso2: countryIso2,
});

ChartManagerInflow.setConfig();
ChartManagerInflow.Draw("line-1");
ChartManagerInflow.AddEventListener("select-countryIso2");
ChartManagerInflow.AddEventListener("select-category");
