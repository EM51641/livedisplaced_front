import { Chart, ChartConfiguration } from "chart.js/auto";
import { dconf } from "../../models/models"
import { set_doughnut, DIST } from "../../chartjs/helpers/chart"
import { fill_image, fill_text, GetCtx, GetDomID } from "../../utils";
import { AppendOption } from "../../utils";
import { coo_choices } from "../../../data/coa_coo_filter"
import _ from "lodash";
import { getjson } from "../../chartjs/helpers/refresh";
import { urlgenerator } from "./utils";
import { years_choices } from "../../../data/tot_arrival_filter";


AppendOption('select-attribute', coo_choices);
AppendOption('select-year',  years_choices);

declare const data: string;
let points: DIST[] = JSON.parse(data);

let conf: ChartConfiguration<"doughnut"> = _.cloneDeep(dconf);

set_doughnut(points, conf);

conf.data.datasets[0].backgroundColor =  [
    'rgb(176, 244, 179)',
    'rgb(119, 252, 233)',
    'rgb(108, 144, 239)',
    'rgb(102, 181, 241)',
    'rgb(228, 168, 200)',
    'rgb(174, 142, 130)',
    'rgb(172, 245, 184)',
    'rgb(215, 169, 210)',
    'rgb(162, 248, 176)',
    'rgb(149, 103, 222)',
    'rgb(206, 102, 236)'
];

const canvas = GetCtx('pieplot-1');
const chart = new Chart(canvas, conf);

let htmlelem_year = GetDomID('select-year');


htmlelem_year.addEventListener('change', async (e: Event) => {
    const target = e.target as HTMLInputElement;
    let year = target.value;
    let state = GetDomID("select-attribute") as HTMLInputElement;

    let url = urlgenerator(year, state.value)
    const points = await getjson<DIST>(url) as DIST[];
    set_doughnut(points, conf);

    fill_text<DIST>('number-first', points, "state", '');
    fill_text<DIST>('name-first', points, "name", '');
    fill_image<DIST>('img-first', points, "iso_2", "name");

    chart.update();
    }
);

let htmlelem_attr = GetDomID('select-attribute');

htmlelem_attr.addEventListener('change', async (e: Event) => {
    const target = e.target as HTMLInputElement;
    let state = target.value;
    let year = GetDomID("select-year") as HTMLInputElement;

    let url = urlgenerator(year.value, state)
    const points = await getjson<DIST>(url) as DIST[];
    console.log(points);
    set_doughnut(points, conf);

    fill_text<DIST>('number-first', points, "state", '');
    fill_text<DIST>('name-first', points, "name", '');
    fill_image<DIST>('img-first', points, "iso_2", "name");

    chart.update();
    }
);