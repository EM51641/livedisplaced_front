async function getjson<T>(url: string) {
  // Set the doughnut dataset
  try {
    console.log(url);
    const response = await fetch(url);
    const points = (await response.json()) as T[];
    return points;
  } catch (e) {
    console.log("User Not Authorized");
  }
}

export { getjson };
