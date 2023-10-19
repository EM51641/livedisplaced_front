import Chart from 'chart.js/auto';
import _ from 'lodash';
import iso2 from '../data/cntries_lst';
import { getjson } from '../helpers/refresh';
import { AppendOption, GetCtx, GetDomID } from '../helpers/utils';
import { lconf } from '../main';
import { TChart } from './types';

AppendOption('select-country', iso2); // Append the select

// Second Graph Line
declare const total: string;
let points: TChart[] = JSON.parse(total);

let conf = _.clone(lconf);

conf.data.datasets[0].data = points.map((o) => o.number);
conf.data.labels = points.map((o) => o.year);

const canvas = GetCtx('line-1');
const chart = new Chart(canvas, conf);

const htmlelem = GetDomID('select-country');

async function updatechart(event: Event) {
  const target = event.target as HTMLInputElement;
  const iso2 = target.value;
  const url = `${window.location.href}/api/${iso2}`;

  points = (await getjson<TChart>(url)) as TChart[];

  conf.data.datasets[0].data = points.map((o) => o.number);
  conf.data.labels = points.map((o) => o.year);
  chart.update();
}

htmlelem.addEventListener('change', updatechart);
