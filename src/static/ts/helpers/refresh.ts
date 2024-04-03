async function FetchJsonFromUrl<T>(url: string) {
  // Set the doughnut dataset
  try {
    console.log(`Fetching POST to ${url}`);
    const response = await fetch(url);
    const points = (await response.json()) as T[];
    return points;
  } catch (e) {
    console.log(e);
  }
}

export { FetchJsonFromUrl };
