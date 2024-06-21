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
  to_country_iso2: string
): string {
  return `${window.location.hostname}/v1/api/?from_country_iso2=${from_country_iso2}&to_country_iso2=${to_country_iso2}`;
}

export { generate_bilateral_url };
