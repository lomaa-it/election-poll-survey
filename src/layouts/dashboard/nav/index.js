import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from "@mui/material";
import useResponsive from "../../../hooks/useResponsive";
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/Scrollbar";
import NavSection from "../../../components/NavSection";
import { adminNavConfig, mlaNavConfig, operatorNavConfig, userNavConfig } from "./config";
import { connect } from "react-redux";
import { LOGIN_TYPES, PUBLIC_URL } from "../../../constants";

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const Nav = ({ account, openNav, onCloseNav }) => {
  const { pathname } = useLocation();
  const [navConfig, setNavConfig] = useState([]);

  const isDesktop = useResponsive("up", "lg");

  const userDesignation = account.user?.desgination_name;

  useEffect(() => {
    let navbar = [];
    if (userDesignation == LOGIN_TYPES[0]) {
      navbar = mlaNavConfig;
    } else if (userDesignation == LOGIN_TYPES[7]) {
      navbar = adminNavConfig;
    } else if (userDesignation == LOGIN_TYPES[8]) {
      navbar = operatorNavConfig;
    } else {
      navbar = userNavConfig;
    }

    setNavConfig(navbar);
  }, []);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        backgroundImage: "linear-gradient(to bottom, #013157,#013157, #006D4D)",
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box component="img" src={PUBLIC_URL + "/static/logo.png"} sx={{ width: "60px", height: "60px" }} />

        <Typography variant="subtitle1" color="text.white" sx={{ pl: 2 }}>
          CHANDRAGIRI CONSTITUENCY
        </Typography>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar>A</Avatar>

            <Box sx={{ ml: 2, width: "100%" }}>
              <Typography variant="subtitle2" sx={{ color: "text.white" }}>
                {account.user?.user_displayname}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.white", fontSize: 10 }}>
                {account.user?.desgination_name}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        bgcolor: "black",
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "primary.dark",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH, bgcolor: "primary.dark" },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapStateToProps)(Nav);
