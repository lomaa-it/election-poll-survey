import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import { bgBlur } from "../../../utils/cssStyles";
import Iconify from "../../../components/Iconify";
import AccountPopover from "./AccountPopover";
import { PUBLIC_URL } from "../../../constants";
import { HeaderColor } from "../../../utils/constants";
import NotificationsIcon from "@mui/icons-material/Notifications";

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  // ...bgBlur({ color: HeaderColor }),
  backgroundColor: HeaderColor,
  // boxShadow: theme.customShadows.primary,
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot elevation={5}>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "white",
            display: { lg: "none" },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Typography>Andhra Pradesh &#8594; Tirupathi</Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <Box component="img" src={PUBLIC_URL + "/static/images/imgs-1.png"} sx={{ width: 60, height: 60 }} />

          <Box component="img" src={PUBLIC_URL + "/static/images/imgs-2.png"} sx={{ width: 60, height: 60 }} />

          <Box component="img" src={PUBLIC_URL + "/static/images/imgs-3.png"} sx={{ width: 60, height: 60 }} />

          <Box p={0.5} />

          <IconButton sx={{ color: "white" }}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
