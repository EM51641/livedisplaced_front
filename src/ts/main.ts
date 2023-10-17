import { ChartConfiguration } from "chart.js/auto";

// Configure the scales
const scales = {
  x: {
    grid: {
      color: "white",
      display: false,
    },
    ticks: {
      color: "white",
      autoSkip: true,
      maxTicksLimit: 20,
    },
  },
  y: {
    grid: {
      color: "white",
      display: false,
    },
    ticks: {
      color: "white",
      callback: function (
        label: number,
        index: number,
        labels: string[]
      ): string {
        if (label >= 1000000) {
          return label / 1000000 + "M";
        } else if (label >= 1000) {
          return label / 1000 + "K";
        } else {
          return label.toString();
        }
      },
    },
  },
};

const elements = {
  point: {
    radius: 0,
  },
};

const plugins = {
  legend: {
    display: false,
    labels: {
      color: "white",
    },
  },
  title: {
    display: false,
    // text: undefined,
    color: "white",
    font: {
      size: 20,
    },
  },
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: elements,
  plugins: plugins,
  scales: {},
};

const lconf: ChartConfiguration<"line"> = {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: undefined,
        data: [],
        backgroundColor: "rgb(255,0,0,0.5)",
        borderColor: "rgb(255,0,0)",
        cubicInterpolationMode: "monotone",
        fill: true,
      },
    ],
  },
  options: { ...options },
  plugins: [],
};

if (lconf.options?.scales) {
  lconf.options.scales = scales as any;
}

const dconf: ChartConfiguration<"doughnut"> = {
  type: "doughnut",
  data: {
    labels: [],
    datasets: [
      {
        label: undefined,
        data: [],
        backgroundColor: [],
        hoverOffset: 4,
      },
    ],
  },
  options: { ...options },
  plugins: [],
};

const geo_option: google.visualization.GeoChartOptions = {
  //title:'Hosted People of Concerns per country',
  backgroundColor: "transparent",
  colorAxis: {
    colors: ["#2E7F18", "#45731E", "#675E24", "#8D472B", "#B13433", "#C82538"],
  },
  legend: "none",
};

export { dconf, geo_option, lconf };
