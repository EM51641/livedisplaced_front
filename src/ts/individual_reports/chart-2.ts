import { Chart } from 'chart.js/auto';
import _ from 'lodash';
import { coo_choices } from '../data/coa_coo_filter';
import { AppendOption, GetCtx, GetDomID } from '../helpers/utils';
import { TChart } from '../home/types';
import { lconf } from '../main';

AppendOption('select-option', coo_choices); // Append the select

// First Line
declare const total_inflow: string;
const points: TChart[] = JSON.parse(total_inflow);

let conf = _.cloneDeep(lconf);

conf.data.datasets[0].data = points.map((o) => o.number);
conf.data.labels = points.map((o) => o.year);

const canvas = GetCtx('line-1');
const chart = new Chart(canvas, conf);

const htmlelemt = GetDomID('select-option');

htmlelemt.addEventListener('change', function (event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    let val = target.value as keyof TChart;
    conf.data.datasets[0].data = points.map((o) => o[val]);
    conf.data.labels = points.map((o) => o.year);
    chart.update();
  }
});
