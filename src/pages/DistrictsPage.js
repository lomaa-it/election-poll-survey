import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import DistrictsList from "../sections/reports/DistrictsList";
import { useEffect, useState } from "react";
import { getAllDistrictsWithJoinRoute, getAllStatesRoute, createDistrictsRoute } from "../utils/apis";
import instance from "../utils/axios";
import { showAlert } from "../actions/alert";

const DistrictsPage = ({ dashboard }) => {
  const [districtList, setDistrictList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [stateId, setStateId] = useState("");

  // fetch both states and districts
  const fetchDistricts = async () => {
    const response = await instance.get(getAllDistrictsWithJoinRoute);
    console.log("districts", response.data);
    setDistrictList(response.data.message);
  };
  useEffect(() => {
    const fetchStates = async () => {
      const response = await instance.get(getAllStatesRoute);
      console.log("states", response.data.message);
      setStateList(response.data.message);
    };
    fetchDistricts();
    fetchStates();
  }, []);
  const stateOptions = stateList.map((state) => {
    return { label: state.state_name, value: state.state_pk };
  });

  const addDistrict = async () => {
    if (districtName === "") {
      showAlert("error", "Please enter district name");
      return;
    }
    if (stateId === "") {
      showAlert("error", "Please select state");
      return;
    }
    const response = await instance.post(createDistrictsRoute, {
      district_name: districtName,
      state_id: stateId,
    });

    console.log(response.data);
    if (response.data.status === "success") {
      showAlert("success", "District added successfully");
    }
    setDistrictName("");
    fetchDistricts();
  };

  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Districts
        </Typography>

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <DistrictsList districtList={districtList} />
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
              <Autocomplete
                options={stateOptions}
                renderInput={(params) => <TextField size="small" {...params} label="Select State" fullWidth />}
                onChange={(event, value) => {
                  console.log(value);
                  if (value) {
                    setStateId(value.value);
                  }
                }}
              />
              <TextField
                size="small"
                label="District Name"
                fullWidth
                value={districtName}
                onChange={(event) => {
                  setDistrictName(event.target.value);
                }}
              />
              <LoadingButton
                variant="contained"
                sx={{
                  padding: "15px",
                }}
                onClick={addDistrict}
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

export default connect(mapStateToProps, null)(DistrictsPage);
