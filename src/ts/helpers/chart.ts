import { ChartConfiguration } from "chart.js";
import _ from "lodash";
import iso2 from "../data/cntries_lst";

// data type of the objects involved in pie charts
type DIST = {
  state: number;
  name: (typeof iso2)[keyof typeof iso2] | "Others";
  iso_2: keyof typeof iso2 | null;
  year: number;
};

// Google Chart Type
// Type for columns
type GRow = {
  c: [
    {
      v: keyof typeof iso2;
      f: (typeof iso2)[keyof typeof iso2];
    },
    {
      v: number;
    }
  ];
};

// Type for GoogleTable
type GTable = {
  cols: [
    {
      id: "Country";
      label: "Country";
      type: "string";
    },
    {
      id: "Population Concerned";
      label: "Population Concerned";
      type: "number";
    }
  ];
  rows: GRow[];
};

// Google Chart Base object
let googchartconf: GTable = {
  cols: [
    {
      id: "Country",
      label: "Country",
      type: "string",
    },
    {
      id: "Population Concerned",
      label: "Population Concerned",
      type: "number",
    },
  ],
  rows: [],
};

// Google Chart function
class GoogleGeoConfig<T extends { iso_2: keyof typeof iso2 | null }> {
  // Create a google chart using iso mapping

  data: T[];
  options: google.visualization.GeoChartOptions;
  dataconf: GTable;
  id_elem: string;

  constructor(
    data: T[],
    options: google.visualization.GeoChartOptions,
    id_elem: string
  ) {
    this.data = data;
    this.options = options;
    this.id_elem = id_elem;
    this.dataconf = _.cloneDeep(googchartconf);
  }

  reset() {
    // reset
    this.dataconf = _.cloneDeep(googchartconf);
  }

  PopulateDataTable(att: keyof T, res: T) {
    if (res["iso_2"]) {
      const obj: GRow = {
        c: [
          {
            v: res["iso_2"],
            f: iso2[res["iso_2"]],
          },
          {
            v: res[att] as number,
          },
        ],
      };
      this.dataconf.rows.push(obj);
    }
  }

  SetTable(att: keyof T): GTable {
    // Set Google Table
    this.data.forEach((res) => this.PopulateDataTable(att, res));
    return this.dataconf;
  }

  draw(): void {
    // callback function to draw the geo chart

    var map = new google.visualization.GeoChart(
      document.getElementById(this.id_elem) as HTMLElement
    );
    var data = new google.visualization.DataTable(this.dataconf);
    map.draw(data, this.options);
  }
}

function set_doughnut(points: DIST[], conf: ChartConfiguration<"doughnut">) {
  // Set the doughnut dataset
  const array = points.map((o) => o.state);
  const label = points.map((o) => o.name);

  conf.data.datasets[0].data = array;
  conf.data.labels = label;
}

export { DIST, GoogleGeoConfig, set_doughnut };
