// Geo Chart
import { coo_choices } from "../../../data/coa_coo_filter";
import {geo_choices_home} from "../../../data/situations_lst";
import { years_choices } from "../../../data/tot_arrival_filter";
import { DIST, GoogleGeoConfig } from "../../chartjs/helpers/chart";
import { getjson } from "../../chartjs/helpers/refresh";
import { geo_option } from "../../models/models";
import { AppendOption, GetDomID } from "../../utils";


AppendOption('select-attribute-2', coo_choices);
AppendOption('select-year-2', years_choices);
AppendOption('select-coo-coa', geo_choices_home);

function urlgenerator(year: string, state: string, coo: string = 'true'){
    return `${window.location.href}api/world?year=${year}&state=${state}&coo=${coo}`
};

async function updatechart(
    year: string, attr: string, coo: string,
    chart: GoogleGeoConfig<DIST>){
    // Change attribute

    const url = urlgenerator(year, attr, coo);
    points = await getjson<DIST>(url) as DIST[];
    chart.data = points;

    chart.reset();
    chart.SetTable('state');
    chart.draw();
};

const htmlelem_attr = GetDomID('select-attribute-2');
const htmlelem_year = GetDomID('select-year-2');
const htmlelem_coo = GetDomID('select-coo-coa');

declare const geo: string;
let points: DIST[] = JSON.parse(geo);

// load googles' package
google.charts.load('current', {
    'packages':['geochart'],
  });

// Launch the promise
google.charts.setOnLoadCallback(() => {
    {
        let chart = new GoogleGeoConfig<DIST>(points, geo_option, 'geo-map-1');
        chart.SetTable('state');
        chart.draw();

        htmlelem_attr.addEventListener('change', function(event: Event){
            // Change attribute
            const attr = event.target as HTMLInputElement;
            const year =  GetDomID('select-year-2') as HTMLInputElement;
            const coo = GetDomID('select-coo-coa') as HTMLInputElement;

            updatechart(year.value, attr.value,  coo.value, chart);
        });

        htmlelem_year.addEventListener('change', function(event: Event){
            // Change year
            const year = event.target as HTMLInputElement;
            const attr =  GetDomID('select-attribute-2') as HTMLInputElement;
            const coo = GetDomID('select-coo-coa') as HTMLInputElement;

            updatechart(year.value, attr.value, coo.value, chart);
        });

        htmlelem_coo.addEventListener('change', function(event: Event){
            // Change coo
            const coo = event.target as HTMLInputElement;
            const attr =  GetDomID('select-attribute-2') as HTMLInputElement;
            const year =  GetDomID('select-year-2') as HTMLInputElement;

            updatechart(year.value, attr.value, coo.value, chart);
        });

        window.onresize = () => chart.draw();   // save the last result
    }
});
