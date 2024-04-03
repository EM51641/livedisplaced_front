import iso2 from "../../data/cntries_lst";

type DoughnutDataPoint = {
  number: number;
  name: string;
  iso_2: keyof typeof iso2 | null;
};

export { DoughnutDataPoint };
