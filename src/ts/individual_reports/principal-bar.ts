import iso2 from '../data/cntries_lst';
import { AppendOption, GetDomID } from '../helpers/utils';

//Choices country
AppendOption('select-country', iso2);

let htmlelem = GetDomID('select-country');
let htmlanchorelem = GetDomID('search-country') as HTMLAnchorElement;

htmlelem.addEventListener('change', function (event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target) {
    let val = target.value as keyof typeof iso2;
    let img_to = GetDomID('main-flag-img') as HTMLImageElement;
    img_to.alt = iso2[val];
    img_to.src = `https://flagcdn.com/h240/${val.toLowerCase()}.png`;
    htmlanchorelem.href = `http://localhost:7070/report/${val.toString()}`;
  }
});
