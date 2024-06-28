import _ from "lodash";
import { LineChartDataPoint } from "./type";
import { LineChartManager } from "./utils";
import { AppendDataToId } from "../utils";
import iso2 from "../../data/cntries_lst";

AppendDataToId("select-countryIso2", iso2); // Append the select

declare let TotalTrafficJson: string;

let total_trafic: LineChartDataPoint[] = JSON.parse(TotalTrafficJson);

let ChartManagerInflow = new LineChartManager({
  points: total_trafic,
  isCountryOfOrigin: true,
});

ChartManagerInflow.setConfig();
ChartManagerInflow.Draw("line-1");
ChartManagerInflow.AddEventListener("select-countryIso2");
