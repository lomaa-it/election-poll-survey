import { Radio } from "@mui/material";
import { styled } from "@mui/styles";
import {
  BJPColor,
  CONGRESSColor,
  JSPColor,
  NETURALColor,
  OTHERColor,
  TDPColor,
  YSRCPColor,
} from "../../utils/constants";

export const NeutralRadio = styled(Radio)(({ fontSize }) => ({
  color: NETURALColor,
  "&.Mui-checked": {
    color: NETURALColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: fontSize || 32,
  },
}));

export const YCPRadio = styled(Radio)(({ fontSize }) => ({
  color: YSRCPColor,
  fontSize: 28,
  "&.Mui-checked": {
    color: YSRCPColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: fontSize || 32,
  },
}));

export const TDPRadio = styled(Radio)(({ fontSize }) => ({
  color: TDPColor,
  "&.Mui-checked": {
    color: TDPColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: fontSize || 32,
  },
}));

export const JSPRadio = styled(Radio)(({ fontSize }) => ({
  color: JSPColor,
  "&.Mui-checked": {
    color: JSPColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: fontSize || 32,
  },
}));

export const BJPRadio = styled(Radio)(({ fontSize }) => ({
  color: BJPColor,
  "&.Mui-checked": {
    color: BJPColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: fontSize || 32,
  },
}));

export const CongressRadio = styled(Radio)(({ fontSize }) => ({
  color: CONGRESSColor,
  "&.Mui-checked": {
    color: CONGRESSColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: fontSize || 32,
  },
}));

export const OthersRadio = styled(Radio)(({ fontSize }) => ({
  color: OTHERColor,
  "&.Mui-checked": {
    color: OTHERColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: fontSize || 32,
  },
}));
