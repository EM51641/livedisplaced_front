import { Chart } from "chart.js/auto";
import { lconf } from "../../models/models"
import { GetCtx, GetDomID } from "../../utils";
import { AppendOption } from "../../utils";
import { AGGE } from "./types";
import _ from "lodash";
import { coa_choices } from "../../../data/coa_coo_filter";


AppendOption('select-option-1', coa_choices); // Append the select

declare const dataf: string;
const points: AGGE[] = JSON.parse(dataf);

let conf = _.cloneDeep(lconf);

// Modify the color
conf.data.datasets[0].backgroundColor = 'rgb(255, 255, 0, 0.5)';
conf.data.datasets[0].borderColor = 'rgb(255, 255, 0)';

conf.data.datasets[0].data = points.map(o => o.total);
conf.data.labels = points.map(o => o.year);

const canvas = GetCtx('line-2');
const chart = new Chart(canvas, conf);

let htmlelemf = GetDomID('select-option-1');

htmlelemf.addEventListener('change', function(event: Event): void{
     const target = event.target as HTMLInputElement;
     if(target){
        let val = target.value as keyof AGGE;
        conf.data.datasets[0].data = points.map(o => o[val]);
        conf.data.labels = points.map(o => o.year);
        chart.update();
    };
});
