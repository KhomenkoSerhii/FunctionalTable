export const DATA = [
  {
    name: "first",
    reference: "first",
    currency: "USD",
    city: "Miami",
    date: 1605983196455,
  },
  {
    name: "second",
    reference: "second",
    currency: "EUR",
    city: "Paris",
    date: 1605883196455,
  },
  {
    name: "third",
    reference: "third",
    currency: "UAH",
    city: "Kiev",
    date: 1605983196455,
  },
  {
    name: "fourth",
    reference: "fourth",
    currency: "USD",
    city: "Boston",
    date: 1605683196455,
  },
  {
    name: "fifth",
    reference: "fifth",
    currency: "EUR",
    city: "London",
    date: 1605583196455,
  },
];

export const COLUMNS = [
  {
    headerName: "Name",
    field: "name",
  },
  {
    headerName: "Reference",
    field: "reference",
  },
  {
    headerName: "Currency",
    field: "currency",
  },
  {
    headerName: "City",
    field: "city",
  },
  {
    headerName: "Date",
    field: "date",
    type: "date",
  },
];

export const DEFAULT_CONFIG = {
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: true,
  enableValue: true,
  enableRowGroup: true,
  enablePivot: true,
};
