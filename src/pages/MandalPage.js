import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import MandalsList from "../sections/reports/MandalsList";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { getAllMandalRoute, getAllStatesRoute, getAllDistrictsRoute } from "../utils/apis";

const MandalPage = ({ dashboard }) => {
  const [mandalsList, setMandalsList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const fetchMandals = async () => {
    const response = await instance.get(getAllMandalRoute);
    console.log("mandal", response.data.message);

    setMandalsList(response.data.message);
  };
  const fetchStates = async () => {
    const response = await instance.get(getAllStatesRoute);
    console.log("states", response.data.message);
    const filterState = response.data.message.map((state) => {
      return { label: state.state_name, value: state.state_pk };
    });
    setStateList(filterState);
  };
  const fetchDistrict = async () => {
    const response = await instance.get(getAllDistrictsRoute);
    const districtsData = response.data.message;
    const filterDistrict = districtsData.filter((district) => {
      return district.state_pk == stateId;
    });
    console.log("districts", filterDistrict);
  };

  useEffect(() => {
    fetchMandals();
    fetchStates();
    if (stateId) {
      fetchDistrict();
    }
  }, [stateId, districtId]);

  // if (stateList.length > 0) {
  //   stateOptions = stateList.map((state) => {
  //     return { label: state.state_name, value: state.state_pk };
  //   });
  // }

  // // covert districts to options and filter based on state id

  return (
    <Page title="Mandal">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Mandals
        </Typography>

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <MandalsList mandalsList={mandalsList} />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {" "}
              <Autocomplete
                options={stateList || []}
                renderInput={(params) => <TextField size="small" {...params} label="Select State" fullWidth />}
                onChange={(event, value) => {
                  console.log("value", value);
                  if (value) {
                    setStateId(value.value);
                  }
                }}
              />
              <TextField size="small" label="Select State" fullWidth select />
              <TextField size="small" label="Select District" fullWidth select />
              <TextField size="small" label="Select Constituency" fullWidth select />
              <TextField size="small" label="Mandal Name" fullWidth />
              <LoadingButton
                variant="contained"
                sx={{
                  padding: "15px",
                }}
              >
                Add
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(MandalPage);
