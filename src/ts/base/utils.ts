import Cookies from "js-cookie";
import { GetDomID } from "../helpers/utils";

// Add google analytics cookie
declare const gtag_: Function;

function generate_cookie_json(val = false) {
  return `{"opted":"true", "nonessential":"${val}"}`;
}

function set_expiration(x: number) {
  const now = new Date();
  const time = now.getTime();
  const expireTime = time + x;
  now.setTime(expireTime);
  return now;
}

function create_cookie(val = false) {
  const exp = set_expiration(86400000);
  const json_val = generate_cookie_json(val);

  document.cookie = `cst_cookie=${json_val}; expires=${exp.toUTCString()}; path=/`;
  const banner = GetDomID("cookie-consent-container");

  if (!banner.hidden) {
    banner.hidden = true;
  } else {
    const settings = GetDomID("cookie-settings");
    settings.hidden = true;
  }
}

function set_cst_cookies() {
  // Set the consent cookie
  const value = Cookies.get("cst_cookie") as string;

  if (value) {
    try {
      const data = JSON.parse(value);
      if (data["nonessential"] == "true") {
        gtag_("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted",
        });
      } else {
        gtag_("consent", "default", {
          ad_storage: "denied",
          analytics_storage: "denied",
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
    return true;
  }
  return false;
}

function cus(val: boolean) {
  // Create, Upadate and Set
  create_cookie(val);
  set_cst_cookies();
}

export { cus, set_cst_cookies };
