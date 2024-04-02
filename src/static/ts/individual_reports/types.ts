import iso2 from "../data/cntries_lst";

// data type of the objects involved in line chart 2
type AGG = {
  total: number;
  internally_displaced: number;
  people_of_concerns: number;
  asylium_seekers: number;
  refugees: number;
  year: number;
};

// For hosting situations
type AGGE = Omit<AGG, "internally_displaced">;

// GEO type
type GEOR = {
  arrival_refugees: number;
  arrival_asylium_seekers: number;
  origin_refugees: number;
  origin_asylium_seekers: number;
  origin_internally_displaced: number;
  origin_people_of_concerns: number;
  iso: keyof typeof iso2;
};

export { AGG, AGGE, GEOR };
