function urlgenerator(year: string, state: string, coo: string = "true") {
  return `${window.location.href}/api?year=${year}&state=${state}&coo=${coo}`;
}

export { urlgenerator };
