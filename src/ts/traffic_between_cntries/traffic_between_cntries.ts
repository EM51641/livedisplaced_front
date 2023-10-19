import Chart from 'chart.js/auto';
import iso2 from '../data/cntries_lst';
import { AppendOption, GetCtx, GetDomID } from '../helpers/utils';
import { TChart } from '../home/types';
import { lconf } from '../main';

// Flexible Time Serie Evolution
declare const JSON_REFUGEE_OUTFLOW: string;
declare const JSON_ASYLIUM_SEEKERS: string;
declare const JSON_PEOPLE_OF_CONCERNS: string;

const REFUGEES_OUTFLOW_DATA = {
  label: 'Refugees',
  json: JSON_REFUGEE_OUTFLOW,
  background_color: 'rgb(255, 0, 0, 0.5)',
  border_color: 'rgb(255, 0, 0)',
};

const ASYLIUM_SEEKERS_DATA = {
  label: 'Asylium Seekers',
  json: JSON_ASYLIUM_SEEKERS,
  background_color: 'rgb(255, 255, 0, 0.5)',
  border_color: 'rgb(255, 255, 0)',
};

const PEOPLE_OF_CONCERNS_DATA = {
  label: 'People of Concerns',
  json: JSON_PEOPLE_OF_CONCERNS,
  background_color: 'rgb(0, 255, 0, 0.5)',
  border_color: 'rgb(0, 255, 0)',
};

const OUTFLOW_DATA_LIST = [
  REFUGEES_OUTFLOW_DATA,
  ASYLIUM_SEEKERS_DATA,
  PEOPLE_OF_CONCERNS_DATA,
];

let conf = { ...lconf };
conf.options!.plugins!.legend!.display = true;

for (let i = 0; i < OUTFLOW_DATA_LIST.length; i++) {
  const POINT = OUTFLOW_DATA_LIST[i];
  const points: TChart[] = JSON.parse(POINT.json);
  if (conf.data.datasets.length > i) {
    conf.data.datasets[i].data = points.map(function (point) {
      return { x: point.year, y: point.number };
    });
  } else {
    conf.data.datasets.push({
      data: points.map(function (point) {
        return { x: point.year, y: point.number };
      }),
    });
  }
  conf.data.datasets[i].backgroundColor = POINT.background_color;
  conf.data.datasets[i].borderColor = POINT.border_color;
  conf.data.datasets[i].fill = true;
  conf.data.datasets[i].label = POINT.label;
}

let htmlelem = GetDomID('go-to') as HTMLAnchorElement;
AppendOption('select-country-from', iso2); // Append the select

let htmlelemf = GetDomID('select-country-from');
htmlelemf.addEventListener('change', function (event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    let val = target.value as keyof typeof iso2;
    let img_from = GetDomID('img-flag-from') as HTMLImageElement;
    let to_val = GetDomID('select-country-to') as HTMLInputElement;
    img_from.alt = iso2[val];
    img_from.src = `https://flagcdn.com/h240/${val.toLowerCase()}.png`;
    htmlelem.href = `http://localhost:7070/dashboard/?coo=${val}&coa=${to_val.value}`;
  }
});

AppendOption('select-country-to', iso2); // Append the select
let htmlelems = GetDomID('select-country-to');
htmlelems.addEventListener('change', function (event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    let val = target.value as keyof typeof iso2;
    let img_to = GetDomID('img-flag-to') as HTMLImageElement;
    let from_val = GetDomID('select-country-from') as HTMLInputElement;
    img_to.alt = iso2[val];
    img_to.src = `https://flagcdn.com/h240/${val.toLowerCase()}.png`;
    htmlelem.href = `http://localhost:7070/dashboard/?coo=${from_val.value}&coa=${val}`;
  }
});

// Plot
const fromtocanvas = GetCtx('line-1');
const chart = new Chart(fromtocanvas, conf);
