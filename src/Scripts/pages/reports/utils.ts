function urlgenerator(year: string, state: string, coa: string = 'false'){
    return `${window.location.href}/api?year=${year}&state=${state}&coa=${coa}`
};

export {urlgenerator};