import { ChartConfiguration, Chart } from "chart.js/auto";
import { LineChartDataPoint } from "./type";
import { lconf } from "../../main";
import { FetchJsonFromUrl, GetDomContext, GetDomInputId } from "../utils";
import _ from "lodash";
import iso2 from "../../data/cntries_lst";

type LineChartManagerConfigParams = {
  points: LineChartDataPoint[];
  isCountryOfOrigin?: boolean;
  countryIso2?: keyof typeof iso2;
  otherCountryIso2?: keyof typeof iso2 | undefined;
};

class LineChartManager {
  points: LineChartDataPoint[];
  conf: ChartConfiguration<"line">;
  isCountryOfOrigin: boolean;
  countryIso2?: keyof typeof iso2;
  otherCountryIso2?: keyof typeof iso2;
  chart?: Chart<"line">;

  constructor(params: LineChartManagerConfigParams) {
    this.points = params["points"];
    this.isCountryOfOrigin = params["isCountryOfOrigin"] || true;
    this.countryIso2 = params["countryIso2"] || undefined;
    this.otherCountryIso2 = params["otherCountryIso2"];
    this.conf = _.cloneDeep(lconf);
  }

  /**
   * Draws the chart on the canvas element with the specified ID.
   *
   * @param {string} Id - The ID of the canvas element.
   */
  public Draw(Id: string) {
    const canvas = GetDomContext(Id);
    this.chart = new Chart(canvas, this.conf);
  }

  /**
   * Sets the configuration for the LineChart.
   * This method sets the dataset data and labels.
   */
  public setConfig(): void {
    this.setDatasetData();
    this.setLabels();
    console.log("LineChart configuration set");
  }
  /**
   * Adds an event listener to the specified element.
   * @param MutableId - The ID of the element to attach the event listener to.
   */
  public async AddEventListener(MutableId: string) {
    const ELEM = GetDomInputId(MutableId);
    ELEM.addEventListener("change", async (e: Event) => {
      const target = e.target as HTMLInputElement;
      let category: string | undefined;

      if (MutableId.startsWith("select-category")) {
        category = target.value;
      } else {
        this.countryIso2 = target.value as keyof typeof iso2;
      }
      const url = this.generateUrl(category);
      this.points = await FetchJsonFromUrl<LineChartDataPoint>(url);

      this.setConfig();

      this.updateChart();
      console.log("Chart updated !");
    });
  }

  /**
   * Sets the dataset data based on the points array.
   */
  private setDatasetData(): void {
    const array = this.points.map((o) => parseInt(o.number));
    this.conf.data.datasets[0].data = array;
  }

  /**
   * Sets the labels for the doughnut chart.
   */
  private setLabels(): void {
    const label = this.points.map((o) => o.year);
    this.conf.data.labels = label;
  }

  /**
   * Generates the URL for the API endpoint based on the provided category.
   * @param category - The category for which the URL is generated.
   * @returns The generated URL.
   */
  private generateUrl(category: string | undefined): string {
    let url = `${window.location.protocol}//${window.location.hostname}api/v1/chart?`;

    if (category) {
      url = `${url}&category=${category}`;
    }

    if (this.countryIso2) {
      url = `${url}&country=${this.countryIso2}`;
    }

    url = `${url}&origin=${this.isCountryOfOrigin}`;
    return url;
  }
  /**
   * Updates the chart.
   * If the chart is already initialized, it calls the `update` method on the chart instance.
   * If the chart is not initialized, it throws an error.
   */
  private updateChart(): void {
    if (this.chart) {
      this.chart.update();
    } else {
      throw new Error("Chart not initialized");
    }
  }
}

export { LineChartManager };
