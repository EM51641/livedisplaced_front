/**
 * @param year: string | undefined
 * @param category: string | undefined
 * @param origin: string | undefined
 * @param country: string | undefined
 * @param head: string | undefined
 * @returns string
This function generates a URL based on the provided parameters.
*/
function global_url_generator(
  year: string | undefined,
  category: string | undefined,
  origin: string | undefined,
  country: string | undefined,
  head: string | undefined
): string {
  let url = `${window.location.href}api/v1/?`;

  if (year) {
    url += `year=${year}&`;
  }
  if (category) {
    url += `category=${category}&`;
  }
  if (country) {
    url += `country=${country}&`;
  }
  if (origin) {
    url += `origin=${origin}&`;
  }
  if (head) {
    url += `head=${head}&`;
  }

  return url.slice(0, -1);
}

export { global_url_generator };
