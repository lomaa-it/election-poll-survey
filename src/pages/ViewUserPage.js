import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { getAllUsersRoute } from "../utils/apis";
import SearchByFilter from "../sections/common/SearchByFilter";
import { searchFiltercolor } from "../constants";

const ViewUserPage = ({ dashboard }) => {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const getUsersData = async () => {
      try {
        console.log("url", "user data");
        const response = await instance.get(getAllUsersRoute);
        const responseData = response.data.message;

        console.log("dsdasda", responseData);

        const filterData = responseData.map((item) => {
          return [
            item.username,
            item.user_pk || "constituency_id",
            item.user_displayname,
            item.lookup_valuename,
            item.mandal_name || "-",
            item.division_name || "-",
            item.sachivalayam_name || "-",
            item.part_no || "-",
            item.village_name || "-",
            item.phone_no,
          ];
        });
        console.log("filterData", filterData);
        setUsersData(filterData);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };
    getUsersData();
  }, []);

  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          User List
        </Typography>

        <Card sx={{ p: 3, backgroundColor: searchFiltercolor }}>
          <Typography sx={{ pb: 2 }}>Search by filter</Typography>

          <Grid container spacing={2} alignItems="center">
            <SearchByFilter />

            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="User Type"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Voter ID"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Voter Name"
                fullWidth
                select
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <LoadingButton variant="contained">Search</LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",

              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <ViewUsersList usersData={usersData} />
        )}

        <Card sx={{ p: 3, marginTop: "10px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              <Button
                variant="outlined"
                sx={{
                  color: "#EF8F50",
                  borderColor: "#EF8F50",
                  padding: "10px 35px",
                }}
              >
                Send Login Credentials
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              sx={{
                display: "flex",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  marginRight: "10px",
                  padding: "10px 35px",
                }}
              >
                Add
              </Button>
              <Button variant="outlined">Upload</Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(ViewUserPage);
