import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Box,
  Button,
  Card,
  Grid,
} from "@mui/material";
import { LoginForm } from "../sections/auth/login";
import Page from "../components/Page";
import { PUBLIC_URL } from "../constants";
import useResponsive from "../hooks/useResponsive";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { getAllMandalRoute } from "../utils/apis";
import { YSRCPColor } from "../utils/constants";

const StyledRoot = styled("div")(({ theme }) => ({
  // background: "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)) center center / cover no-repeat, url('" + PUBLIC_URL + "/static/images/crowd.jpg') no-repeat center",
  background:
    "url('" +
    PUBLIC_URL +
    "/static/images/ysrbackground.jpg') no-repeat center",
  backgroundSize: "cover",
}));

const StyledContent = styled("div")(({ theme }) => ({
  margin: "auto",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: theme.spacing(2, 2),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(3, 9),
  },
  [theme.breakpoints.up("lg")]: {
    padding: theme.spacing(6, 9),
  },
  [theme.breakpoints.up("xl")]: {
    padding: theme.spacing(6, 16),
  },
}));

const useStyles = makeStyles((theme) => ({
  subContainer: {
    // background:
    //   "url('" +
    //   PUBLIC_URL +
    //   "/static/images/sub-background.jpg') no-repeat center",
    backgroundSize: "cover",
  },

  linearAvatar: {
    borderRadius: "100%",
    padding: "2px",
    background: "linear-gradient(160deg, #4875db, #358c6b)",
    border: "2px solid transparent",
    backgroundClip: "padding-box",
  },

  card: {
    backgroundImage:
      "linear-gradient(120deg, rgba(255, 255, 255, 0.1), rgba(139, 196, 63, 0.1), rgba(0, 149, 252, 0.1))",
    boxShadow: `0 0 5px 2px ${YSRCPColor}`,
  },
}));

const LandingPage = () => {
  const classes = useStyles();

  const isDesktop = useResponsive("up", "lg");

  return (
    <Page title="Landing">
      <StyledRoot>
        <StyledContent>
          <Card
            className={classes.subContainer}
            sx={{ p: { xs: 2, sm: 3, md: 4, xl: 6 } }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                
              }}
            >
              <Grid item xs={12} md={12} lg={12}>
                <Box sx={{ pb: 2, display: "flex", justifyContent: "end" }}>
                  <Box
                    className={classes.linearAvatar}
                    component="img"
                    src={PUBLIC_URL + "/static/images/ysrgaru.png "}
                    sx={{ width: 70, height: 70, mr: 2 }}
                  />

                  {/* <Box
                    className={classes.linearAvatar}
                    component="img"
                    src={PUBLIC_URL + "/static/images/jagan.jpg"}
                    sx={{ width: 70, height: 70 }}
                  /> */}
                </Box>
              </Grid>
              {isDesktop && (
                <Grid
                  item
                  md={12}
                  lg={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={PUBLIC_URL + "/static/images/ap-map.png"}
                    sx={{
                      width: "100%",
                      textAlign: "center",
                    }}
                  />

                    {/* <Typography variant="h5" sx={{  textAlign: "center" }}>
                      CHANDRAGIRI CONSTITUENCY
                    </Typography> */}

                    {/* <Typography
                      variant="h7"
                      sx={{ textAlign: "center", color: "#20287F" }}
                    >
                      (ANDHRA PRADESH)
                    </Typography> */}
                </Grid>
              )}

              {isDesktop && (
                <Grid
                  item
                  md={12}
                  lg={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={PUBLIC_URL + "/static/images/ysrjagan.png"}
                    sx={{ width: "100%" }}
                  />

                  <Typography variant="h5" sx={{ mt: 3, textAlign: "center" }}>
                    YS Jagan Mohan Reddy
                  </Typography>

                  <Typography
                    variant="h7"
                    sx={{ textAlign: "center", color: "#20287F" }}
                  >
                    (Chief Minister of Andhra Pradesh )
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Card>
        </StyledContent>
      </StyledRoot>
    </Page>
  );
};

export default LandingPage;
