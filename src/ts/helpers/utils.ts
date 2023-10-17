function GetDomID(id: string): HTMLElement {
  // Get DOM ID element
  let elem = document.getElementById(id);
  if (elem instanceof HTMLElement) {
    return elem;
  } else {
    throw new Error(`The html element with id=${id} doesn't exist`);
  }
}

function GetDomClass(cls: string): HTMLCollectionOf<Element> {
  // Get DOM ID element
  let elems = document.getElementsByClassName(cls);
  if (elems instanceof HTMLCollection) {
    return elems;
  } else {
    throw new Error(`The html element with class=${cls} doesn't exist`);
  }
}

function fill_text<T>(
  cls: string,
  array: T[],
  val: keyof T,
  except: string
): void {
  // Fill Text
  let slices = GetDomClass(cls);

  for (let i = 0; i < slices.length; i++) {
    if (i < array.length) {
      slices[i].textContent = String(array[i][val]);
    } else {
      slices[i].textContent = except;
    }
  }
}

function fill_image<T>(
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

function GetCtx(id: string): CanvasRenderingContext2D {
  // Get the context of the canvas
  const canvas = GetDomID(id);
  let ctx: CanvasRenderingContext2D | null | undefined;

  if (canvas instanceof HTMLCanvasElement) {
    ctx = canvas.getContext("2d");
  } else {
    throw new Error(`${id} doesn't appear to be an html canvas element`);
  }
  if (ctx instanceof CanvasRenderingContext2D) {
    return ctx;
  } else {
    throw new Error(`${id} doesn't appear to be a canvas`);
  }
}

function AppendOption(class_string: string, obj: object): void {
  // Append to input select

  window.addEventListener("load", function () {
    let select = GetDomID(class_string) as HTMLInputElement;

    for (const [key, value] of Object.entries(obj)) {
      if (key != select.value) {
        let elem = document.createElement("option");
        elem.textContent = value;
        elem.value = key;
        select.appendChild(elem);
      }
    }
  });
}

export { AppendOption, GetCtx, GetDomClass, GetDomID, fill_image, fill_text };
