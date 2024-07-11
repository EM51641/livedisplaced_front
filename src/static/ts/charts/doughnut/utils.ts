import Chart, { ChartConfiguration } from "chart.js/auto";
import { DoughnutDataPoint } from "./type";
import _ from "lodash";
import { dconf } from "../../main";
import {
  FillFlags,
  FillLabels,
  GetDomContext,
  FetchJsonFromUrl,
  GetDomInputId,
} from "../utils";
import iso2 from "../../data/cntries_lst";

/**
 * Represents the configuration parameters for the DoughnutManager.
 */
type DoughnutManagerConfigParams = {
  points: DoughnutDataPoint[];
  isCountryOfOrigin?: boolean;
  countryIso2?: keyof typeof iso2 | undefined;
};

/**
 * Represents a utility class for creating doughnut charts.
 */
class DoughnutChart {
  points: DoughnutDataPoint[];
  conf: ChartConfiguration<"doughnut">;
  chart: undefined | Chart<"doughnut">;
  isCountryOfOrigin: boolean;
  countryIso2: keyof typeof iso2 | undefined;

  /**
   * Represents a utility class for creating doughnut charts.
   */

  /**
   * Constructs a new instance of the DoughnutManager class.
   * @param params - The configuration parameters for the DoughnutManager.
   */
  constructor(params: DoughnutManagerConfigParams) {
    this.points = params["points"];
    this.isCountryOfOrigin = params["isCountryOfOrigin"] || true;
    this.countryIso2 = params["countryIso2"] || undefined;
    this.conf = _.cloneDeep(dconf);
  }

  /**
   * Draws a doughnut chart on the specified canvas element.
   *
   * @param {string} Id - The ID of the canvas element.
   */
  public Draw(Id: string) {
    const canvas = GetDomContext(Id);
    this.chart = new Chart(canvas, this.conf);
  }

  /**
   * Sets the configuration for the doughnut chart.
   * @param BackgroundColors - An array of background colors for the doughnut chart.
   */
  public setConfig(BackgroundColors: string[] | undefined = undefined): void {
    this.setDatasetData();
    this.setLabels();
    this.setBackgroundColors(BackgroundColors);
    console.log("Doughnut configuration set");
  }

  /**
   * Adds an event listener to the specified element.
   * @param MutableId - The ID of the element to attach the event listener to.
   * @param NumberLabelDomClass - The class name of the number label DOM element.
   * @param NameLabelDomClass - The class name of the name label DOM element.
   * @param FlagDomClass - The class name of the flag DOM element.
   */
  public async AddEventListener(
    MainMutableId: string,
    OtherMutableId: string,
    NumberLabelDomClass: string,
    NameLabelDomClass: string,
    FlagDomClass: string
  ) {
    const ELEM = GetDomInputId(MainMutableId);
    console.log(ELEM);
    ELEM.addEventListener("change", async (e: Event) => {
      const target = e.target as HTMLInputElement;
      let year: string;
      let category: string;

      if (MainMutableId.startsWith("select-year")) {
        year = target.value;
        category = GetDomInputId(OtherMutableId).value;
      } else {
        year = GetDomInputId(OtherMutableId).value;
        category = target.value;
      }

      const url = this.generateUrl(year, category);
      this.points = await FetchJsonFromUrl<DoughnutDataPoint>(url);

      this.setConfig();
      this.fillLabelsAndFlags(
        NumberLabelDomClass,
        NameLabelDomClass,
        FlagDomClass
      );

      this.updateChart();
      console.log("Chart updated !");
    });
  }

  /**
   * Sets the dataset data based on the points array.
   */
  private setDatasetData(): void {
    const array = this.points.map((o) => o.number);
    this.conf.data.datasets[0].data = array;
  }

  /**
   * Sets the labels for the doughnut chart.
   */
  private setLabels(): void {
    const label = this.points.map((o) => o.name);
    this.conf.data.labels = label;
  }

  /**
   * Sets the background colors for the doughnut chart.
   *
   * @param BackgroundColors - An array of string values representing the background colors.
   */
  private setBackgroundColors(BackgroundColors: string[] | undefined): void {
    if (BackgroundColors) {
      this.conf.data.datasets[0].backgroundColor = BackgroundColors;
    }
  }

  /**
   * Generates the URL for the API endpoint based on the provided parameters.
   * If `CountryIso2Code` is provided, the URL will include the country code.
   * Otherwise, the URL will include the year and category.
   *
   * @param year - The year parameter for the API endpoint.
   * @param category - The category parameter for the API endpoint.
   * @returns The generated URL for the API endpoint.
   */
  private generateUrl(year: string, category: string): string {
    let url = `${window.location.protocol}//${window.location.host}/api/v1/?`;
    console.log(this.isCountryOfOrigin);
    if (this.countryIso2) {
      url = `${url}country=${this.countryIso2}`;
    }
    if (this.isCountryOfOrigin) {
      url = `${url}&origin=true`;
    }
    return `${url}&year=${year}&category=${category}&head=true`;
  }

  /**
   * Fills the labels and flags for the doughnut chart.
   *
   * @param NumberLabelDomClass - The class name for the number label DOM element.
   * @param NameLabelDomClass - The class name for the name label DOM element.
   * @param FlagDomClass - The class name for the flag DOM element.
   */
  private fillLabelsAndFlags(
    NumberLabelDomClass: string,
    NameLabelDomClass: string,
    FlagDomClass: string
  ): void {
    FillLabels<DoughnutDataPoint>(
      NumberLabelDomClass,
      this.points,
      "number",
      ""
    );
    FillLabels<DoughnutDataPoint>(NameLabelDomClass, this.points, "name", "");
    FillFlags<DoughnutDataPoint>(FlagDomClass, this.points, "iso_2", "name");
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

export default DoughnutChart;
