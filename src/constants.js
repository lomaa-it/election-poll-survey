import { createTheme } from "@mui/material";
import { format, isValid, formatDistanceToNow } from "date-fns";

export const bgColors = ["#F79256", "#FBD1A2", "#7DCFB6", "#00B2CA", "#1D4E89"];
export const bgColors1 = ["#d44c2c", "#e9c474", "#1c717c", "#8f834b", "#d6742b"];

export const LOGIN_TYPES = ["MLA", "MANDAL_CONVENER/CPRO", "PRO", "APRO", "BOOTH_INCHARGE", "VOLUNTEER", "GRUHASARATHI"];

export const searchFiltercolor = "#D3F0E3";

export const LIMIT_PER_PAGE = 50;
export const ROWS_PER_PAGE_OPTION = [50, 100, 200];

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

export const getMuiTableTheme = () =>
  createTheme({
    components: {
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            backgroundColor: searchFiltercolor,
          },
        },
      },
    },
  });

export const PARTY_ID = {
  NEUTRAL: 22,
  YSRCP: 23,
  TDP: 24,
  CONGRESS: 25,
  BJP: 26,
  JANASENA: 27,
  OTHERS: 80,
};
