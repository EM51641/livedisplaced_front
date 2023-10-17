import iso2 from "../data/cntries_lst";

// data type of the objects involved in pie chart 1
type top_10_coo = {
  other: string;
  iso_other: string;
  origin_refugees: number;
  origin_asylium_seekers: number;
  origin_internally_displaced: number;
  origin_people_of_concerns: number;
};

// data type of the objects involved in pie chart 2
type top_10_coa = {
  other: string;
  iso_other: string;
  arrival_refugees: number;
  arrival_asylium_seekers: number;
  arrival_internally_displaced: number;
  arrival_people_of_concerns: number;
};

// data type of the objects involved in pie chart 2
type AL = {
  name_: string;
  iso_2_: keyof typeof iso2 | "ALL";
  year: number;
  metric: number;
};

type GEO = {
  arrival_refugees: number;
  arrival_asylium_seekers: number;
  origin_refugees: number;
  origin_asylium_seekers: number;
  origin_internally_displaced: number;
  origin_people_of_concerns: number;
  iso: keyof typeof iso2;
};

export { AL, GEO, top_10_coa, top_10_coo };
