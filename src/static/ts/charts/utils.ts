import iso2 from "../data/cntries_lst";

/**
 * Retrieves DOM elements with the specified class name.
 *
 * @param cls - The class name of the elements to retrieve.
 * @returns A collection of HTML elements with the specified class name.
 * @throws An error if no elements with the specified class name are found.
 */
function GetDomClass(cls: string): HTMLCollectionOf<Element> {
  let elems = document.getElementsByClassName(cls);
  if (elems instanceof HTMLCollection) {
    return elems;
  } else {
    throw new Error(`The html element with class=${cls} doesn't exist`);
  }
}

/**
 * Retrieves the DOM input element with the specified ID.
 *
 * @param Id - The ID of the input element to retrieve.
 * @returns The DOM input element with the specified ID.
 * @throws Error if the input element with the specified ID doesn't exist.
 */
function GetDomInputId(Id: string): HTMLInputElement {
  let elem = document.getElementById(Id);
  if (elem instanceof HTMLInputElement) {
    return elem;
  } else {
    throw new Error(`The html element with Id=${Id} doesn't exist`);
  }
}

/**
 * Retrieves the 2D rendering context of a canvas element with the specified ID.
 * Throws an error if the element with the given ID is not a canvas element or if the context cannot be obtained.
 *
 * @param Id - The ID of the canvas element.
 * @returns The 2D rendering context of the canvas element.
 * @throws Error if the element with the given ID is not a canvas element or if the context cannot be obtained.
 */
function GetDomContext(Id: string): CanvasRenderingContext2D {
  const canvas = document.getElementById(Id);
  let ctx: CanvasRenderingContext2D | null | undefined;

  if (canvas instanceof HTMLCanvasElement) {
    ctx = canvas.getContext("2d");
  } else {
    throw new Error(`${Id} doesn't appear to be an html canvas element`);
  }
  if (ctx instanceof CanvasRenderingContext2D) {
    return ctx;
  } else {
    throw new Error(`${Id} doesn't appear to be a canvas`);
  }
}

/**
 * Fills the labels of DOM elements with values from an array of objects.
 *
 * @param cls - The class name of the DOM elements.
 * @param array - The array of objects containing the values.
 * @param val - The key of the value to be filled in the labels.
 * @param except - The value to be filled in the labels when the array is shorter than the number of DOM elements.
 */
function FillLabels<T>(
  cls: string,
  array: T[],
  val: keyof T,
  except: string
): void {
  let slices = GetDomClass(cls);

  for (let i = 0; i < slices.length; i++) {
    if (i < array.length) {
      slices[i].textContent = String(array[i][val]);
    } else {
      slices[i].textContent = except;
    }
  }
}

/**
 * Fills the flags of HTML image elements based on the provided array of objects.
 *
 * @template T - The type of objects in the array.
 * @param {string} cls - The class name of the HTML image elements.
 * @param {T[]} array - The array of objects.
 * @param {keyof T} val - The key of the object property that contains the flag value.
 * @param {keyof T} alt - The key of the object property that contains the alternative text value.
 * @returns {void}
 */
function FillFlags<T>(
  cls: string,
  array: T[],
  val: keyof T,
  alt: keyof T
): void {
  let slices = GetDomClass(cls) as HTMLCollectionOf<HTMLImageElement>;

  for (let i = 0; i < slices.length; i++) {
    if (i < array.length && array[i][val]) {
      slices[i].src = `https://flagcdn.com/${String(
        array[i][val]
      ).toLowerCase()}.svg`;
      slices[i].alt = String(array[i][alt]);
    } else {
      slices[i].src = "";
      slices[i].alt = "";
    }
  }
}

/**
 * Fetches JSON data from the specified URL.
 *
 * @param url - The URL to fetch the JSON data from.
 * @returns A promise that resolves to the fetched JSON data.
 */
async function FetchJsonFromUrl<T>(url: string) {
  console.log(`Fetching POST to ${url}`);
  const response = await fetch(url);
  const points = (await response.json()) as T[];
  return points;
}

/**
 * Appends data to the specified HTML select element based on the provided object.
 * @param Id - The ID of the HTML select element.
 * @param Data - The object containing key-value pairs to populate the select element.
 */
function AppendDataToId(Id: string, Data: Record<string, string>): void {
  window.addEventListener("load", () => {
    const select = GetDomInputId(Id);

    Object.entries(Data).forEach(([key, value]) => {
      if (key !== select.value) {
        const option = document.createElement("option");
        option.textContent = value;
        option.value = key;
        select.appendChild(option);
      }
    });
  });
}

/**
 * Retrieves the value of a query parameter from the current window location.
 * @param param - The name of the query parameter.
 * @returns The value of the query parameter.
 */
function getQueryParam(param: string): string {
  /**
   * Represents the URL parameters extracted from the current window location.
   */
  const urlParams = new URLSearchParams(window.location.search);
  const paramValue = urlParams.get(param);
  if (!paramValue) {
    throw Error("No value found");
  }
  return paramValue;
}

export {
  GetDomClass,
  GetDomInputId,
  GetDomContext,
  FillLabels,
  FillFlags,
  FetchJsonFromUrl,
  AppendDataToId,
  getQueryParam,
};
