import Chart, { ChartConfiguration } from "chart.js/auto";
import { DIST, set_doughnut } from "../../chartjs/helpers/chart";
import { getjson } from "../../chartjs/helpers/refresh";
import { AppendOption, GetCtx, GetDomID, fill_image, fill_text } from "../../utils";
import { urlgenerator } from "./utils";
import { dconf } from "../../models/models";
import { coa_choices } from "../../../data/coa_coo_filter";
import _ from "lodash";
import { years_choices } from "../../../data/tot_arrival_filter";


AppendOption('select-attribute-1', coa_choices);
AppendOption('select-year-1',  years_choices);

declare const coa: string;
let points: DIST[] = JSON.parse(coa);

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

const canvas = GetCtx('pieplot-2');
const chart = new Chart(canvas, conf);

const htmlelem_year = GetDomID('select-year-1');


htmlelem_year.addEventListener('change', async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const year = target.value;
    const state = GetDomID("select-attribute-1") as HTMLInputElement;

    const url = urlgenerator(year, state.value, 'false')
    points = await getjson<DIST>(url) as DIST[];
    set_doughnut(points, conf);

    fill_text<DIST>('number-second', points, "state", '');
    fill_text<DIST>('name-second', points, "name", '');
    fill_image<DIST>('img-second', points, "iso_2", "name");

    chart.update();
    }
);

const htmlelem_attr = GetDomID('select-attribute-1');

htmlelem_attr.addEventListener('change', async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const state = target.value;
    const year = GetDomID("select-year") as HTMLInputElement;
    const url = urlgenerator(year.value, state, 'false');

    points = await getjson<DIST>(url) as DIST[];
    set_doughnut(points, conf);

    fill_text<DIST>('number-second', points, "state", '');
    fill_text<DIST>('name-second', points, "name", '');
    fill_image<DIST>('img-second', points, "iso_2", "name");

    chart.update();
    }
);