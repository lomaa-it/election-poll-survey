import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Link, Container, Typography, Divider, Box, Button, Card, Grid } from "@mui/material";
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
  background: "url('" + PUBLIC_URL + "/static/images/crowd.jpg') no-repeat center",
  backgroundSize: "cover",
}));

const StyledContent = styled("div")(({ theme }) => ({
  margin: "auto",
  minHeight: "100vh",
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  // [theme.breakpoints.up("md")]: {
  //   padding: theme.spacing(3, 9),
  // },
  // [theme.breakpoints.up("lg")]: {
  //   padding: theme.spacing(6, 9),
  // },
  // [theme.breakpoints.up("xl")]: {
  //   padding: theme.spacing(6, 16),
  // },
}));

const useStyles = makeStyles((theme) => ({
  subContainer: {
    background: "url('" + PUBLIC_URL + "/static/images/sub-background.jpg') no-repeat center",
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
    backgroundImage: "linear-gradient(120deg, rgba(255, 255, 255, 0.1), rgba(139, 196, 63, 0.1), rgba(0, 149, 252, 0.1))",
    boxShadow: `0 0 5px 2px ${YSRCPColor}`,
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  const isDesktop = useResponsive("up", "lg");

  return (
    <Page title="Login">
      <StyledRoot>
        <StyledContent>
          <Container maxWidth="lg">
            <Card className={classes.subContainer} sx={{ p: { xs: 2, lg: 3 } }}>
              <Grid
                container
                spacing={{ xs: 1, lg: 3 }}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isDesktop && (
                  <Grid
                    item
                    md={12}
                    lg={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component="img"
                      src={PUBLIC_URL + "/static/images/map.png"}
                      sx={{
                        width: "70%",
                        textAlign: "center",
                      }}
                    />

                    <Typography variant="h5" sx={{ mt: 3, textAlign: "center" }}>
                      CHANDRAGIRI CONSTITUENCY
                    </Typography>

                    <Typography variant="h7" sx={{ textAlign: "center", color: "#20287F" }}>
                      (ANDHRA PRADESH)
                    </Typography>
                  </Grid>
                )}

                {isDesktop && (
                  <Grid
                    item
                    md={12}
                    lg={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box component="img" src={PUBLIC_URL + "/static/images/mohith.png"} sx={{ width: "70%" }} />

                    <Typography variant="h5" sx={{ mt: 3, textAlign: "center" }}>
                      CHEVIREDDY MOHITH REDDY
                    </Typography>

                    <Typography variant="h7" sx={{ textAlign: "center", color: "#20287F" }}>
                      (TUDA CHAIRMAN & TTD BOARD MEMBER)
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12} md={12} lg={4}>
                  <Box sx={{ pb: 2, display: "flex", justifyContent: "end" }}>
                    <Box className={classes.linearAvatar} component="img" src={PUBLIC_URL + "/static/images/crbr.jpg"} sx={{ width: 70, height: 70, mr: 2 }} />

                    <Box className={classes.linearAvatar} component="img" src={PUBLIC_URL + "/static/images/jagan.jpg"} sx={{ width: 70, height: 70 }} />
                  </Box>

                  <Container maxWidth="xs" disableGutters>
                    <Card className={classes.card} elevation={24} sx={{ p: { xs: 2, lg: 3 } }}>
                      <Box sx={{ pb: 1, display: "flex", justifyContent: "center" }}>
                        <Box component="img" src={PUBLIC_URL + "/static/assets/users.png"} sx={{ width: 60, height: 60 }} />
                      </Box>

                      <Typography variant="h5">Login</Typography>

                      <Typography sx={{ color: "text.secondary", mb: 3 }}>Enter your credentials to continue</Typography>

                      <LoginForm />
                    </Card>
                  </Container>
                </Grid>
              </Grid>
            </Card>
          </Container>
        </StyledContent>
      </StyledRoot>
    </Page>
  );
};

export default LoginPage;
