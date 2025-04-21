/**
 * @param year: string | undefined
 * @param category: string | undefined
 * @param origin: string | undefined
 * @param country: string | undefined
 * @param head: string | undefined
 * @returns string
This function generates a URL based on the provided parameters.
*/
function generate_bilateral_url(
  from_country_iso2: string,
  to_country_iso2: string,
): string {
  return `${window.location.protocol}//${window.location.host}/dashboard?coo=${from_country_iso2}&coa=${to_country_iso2}`;
}

export { generate_bilateral_url };
