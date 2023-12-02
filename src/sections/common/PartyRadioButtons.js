import { Radio } from "@mui/material";
import { styled } from "@mui/styles";
import { BJPColor, CONGRESSColor, JSPColor, NETURALColor, OTHERColor, TDPColor, YSRCPColor } from "../../utils/constants";

export const NeutralRadio = styled(Radio)({
  color: NETURALColor,
  "&.Mui-checked": {
    color: NETURALColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 32,
  },
});

export const YCPRadio = styled(Radio)({
  color: YSRCPColor,
  fontSize: 28,
  "&.Mui-checked": {
    color: YSRCPColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 32,
  },
});

export const TDPRadio = styled(Radio)({
  color: TDPColor,
  "&.Mui-checked": {
    color: TDPColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 32,
  },
});

export const JSPRadio = styled(Radio)({
  color: JSPColor,
  "&.Mui-checked": {
    color: JSPColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 32,
  },
});

export const BJPRadio = styled(Radio)({
  color: BJPColor,
  "&.Mui-checked": {
    color: BJPColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 32,
  },
});

export const CongressRadio = styled(Radio)({
  color: CONGRESSColor,
  "&.Mui-checked": {
    color: CONGRESSColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 32,
  },
});

export const OthersRadio = styled(Radio)({
  color: OTHERColor,
  "&.Mui-checked": {
    color: OTHERColor,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 32,
  },
});
