// Geo Chart
import { coo_choices } from "../../data/coa_coo_filter";
import { geo_choices_report } from "../../data/situations_lst";
import { years_choices } from "../../data/tot_arrival_filter";
import { DIST, GoogleGeoConfig } from "../../helpers/chart";
import { AppendOption, GetDomID } from "../../helpers/utils";
import { geo_option } from "../../main";
import { FetchJsonFromUrl, getLastPathSegment } from "../utils";
import { global_url_generator } from "./utils";

AppendOption("select-attribute-2", coo_choices);
AppendOption("select-year-2", years_choices);
AppendOption("select-coo-coa", geo_choices_report);

async function updatechart(
  year: string,
  category: string,
  origin: string,
  country: string,
  chart: GoogleGeoConfig<DIST>
) {
  // Change attribute
  const url = global_url_generator(year, category, origin, country, undefined);
  points = await FetchJsonFromUrl<DIST>(url);
  chart.data = points;

  chart.reset();
  chart.SetTable("number");
  chart.draw();
}

const htmlelem_attr = GetDomID("select-attribute-2");
const htmlelem_year = GetDomID("select-year-2");
const htmlelem_coo = GetDomID("select-coo-coa");

declare const geo: string;
let points: DIST[] = JSON.parse(geo);

// load googles' package
google.charts.load("current", {
  packages: ["geochart"],
});

// Launch the promise
google.charts.setOnLoadCallback(() => {
  {
    const country = getLastPathSegment();

    let chart = new GoogleGeoConfig<DIST>(points, geo_option, "geo-map-1");
    chart.SetTable("number");
    chart.draw();

    htmlelem_attr.addEventListener("change", function (event: Event) {
      // Change category
      const year = GetDomID("select-year-2") as HTMLInputElement;
      const category = event.target as HTMLInputElement;
      const origin = GetDomID("select-coo-coa") as HTMLInputElement;

      updatechart(year.value, category.value, origin.value, country, chart);
    });

    htmlelem_year.addEventListener("change", function (event: Event) {
      // Change year
      const year = event.target as HTMLInputElement;
      const category = event.target as HTMLInputElement;
      const origin = GetDomID("select-coo-coa") as HTMLInputElement;

      updatechart(year.value, category.value, origin.value, country, chart);
    });

    htmlelem_coo.addEventListener("change", function (event: Event) {
      // Change country of origin
      const year = event.target as HTMLInputElement;
      const category = event.target as HTMLInputElement;
      const origin = event.target as HTMLInputElement;

      updatechart(year.value, category.value, origin.value, country, chart);
    });

    window.onresize = () => chart.draw(); // save the last result
  }
});
