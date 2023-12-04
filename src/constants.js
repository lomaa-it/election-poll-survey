import { format, isValid, formatDistanceToNow } from "date-fns";

export const bgColors = ["#F79256", "#FBD1A2", "#7DCFB6", "#00B2CA", "#1D4E89"];
export const bgColors1 = ["#d44c2c", "#e9c474", "#1c717c", "#8f834b", "#d6742b"];

export const searchFiltercolor = "#D3F0E3";

export const religionList = [
  {
    label: "Hindu",
    value: 10,
  },
  {
    label: "Muslim",
    value: 20,
  },
  {
    label: "Christian",
    value: 30,
  },
  {
    label: "Sikh",
    value: 40,
  },
  {
    label: "Buddhist",
    value: 50,
  },
  {
    label: "Jain",
    value: 60,
  },
  {
    label: "Other",
    value: 70,
  },
];

export const casteList = [
  {
    label: "Brahmin",
    value: 10,
  },
  {
    label: "Kshatriya",
    value: 20,
  },
  {
    label: "Vaishya",
    value: 30,
  },

  {
    label: "Reddy",
    value: "70",
  },
  {
    label: "Raju",
    value: "20",
  },
  {
    label: "Other",
    value: "45",
  },
];

export const PUBLIC_URL = process.env.PUBLIC_URL;

export const phoneRegExp = /\b\d{10}\b/;

export const isOtpValid = (value) => {
  var regex = /\b\d{6}\b/;
  return regex.test(value);
};

export function fToNow(value) {
  if (!isValid(parseInt(value))) return "";
  return value
    ? formatDistanceToNow(parseInt(value), {
        addSuffix: true,
      })
    : "";
}

export const PARTY_ID = {
  NEUTRAL: 22,
  YSRCP: 23,
  TDP: 24,
  CONGRESS: 25,
  BJP: 26,
  JANASENA: 27,
  OTHERS: 80,
};
