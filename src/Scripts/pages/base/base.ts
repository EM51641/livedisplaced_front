import { GetDomID } from "../../utils";
import { cus, set_cst_cookies } from "./utils";

// Check if the cookie exist and is formal
const res = set_cst_cookies();

// If not make the banner reappear
const htmlbanner = GetDomID("cookie-consent-container");
const htmlaccept = document.getElementsByClassName("cookie-consent-all");
const htmlrefuse = document.getElementsByClassName("cookie-consent-essential");

// Get the settings bar
const changeconsent = GetDomID("cst-btn");
const htmlsettings = GetDomID("cookie-settings");
const closesettings = document.getElementsByClassName("cancel-cst");

if (res == false) {
  htmlbanner.hidden = false;
}

for (let tag of htmlaccept) {
  tag.addEventListener("click", () => cus(true));
}

for (let tag of htmlrefuse) {
  tag.addEventListener("click", () => cus(false));
}

changeconsent.addEventListener("click", () => {
  htmlsettings.hidden = false;
});

for (let tag of closesettings) {
  tag.addEventListener("click", () => {
    htmlsettings.hidden = true;
  });
}
