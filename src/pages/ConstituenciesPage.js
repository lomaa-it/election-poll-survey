import { Grid, Container, Typography, Box, TextField, Card } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";
import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import ConstituenciesList from "../sections/reports/ConstituenciesList";
import { useEffect, useState } from "react";
import { getAllStatesRoute, getAllConstituenciesWithJoinRoute, createConstituenciesRoute, getAllDistrictsRoute } from "../utils/apis";
import instance from "../utils/axios";
import { showAlert } from "../actions/alert";
import { set } from "date-fns";

const ConstituenciesPage = ({ dashboard }) => {
  const [constituenciesList, setConstituenciesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [consituencyName, setConsituencyName] = useState("");

  const fetchConstituencies = async () => {
    const response = await instance.get(getAllConstituenciesWithJoinRoute);
    console.log("constituencies", response.data.message);
    setConstituenciesList(response.data.message);
  };

  const fetchStates = async () => {
    const response = await instance.get(getAllStatesRoute);
    console.log("states", response.data.message);
    setStateList(response.data.message);
  };

  const fecthDistricts = async () => {
    const response = await instance.get(getAllDistrictsRoute);
    console.log("districts", response.data.message);
    setDistrictList(response.data.message);
  };

  useEffect(() => {
    fecthDistricts();
    fetchConstituencies();
    fetchStates();
  }, []);
  const stateOptions = stateList.map((state) => {
    return { label: state.state_name, value: state.state_pk };
  });

  // covert districts to options and filter based on state id
  const districtOptions = districtList
    .filter((district) => district.state_id === stateId)
    .map((district) => {
      return { label: district.district_name, value: district.district_pk };
    });

  const addConsituency = async () => {
    console.log("stateId", stateId);
    console.log("districtId", districtId);
    console.log("consituencyName", consituencyName);
    if (consituencyName === "") {
      showAlert("error", "Please enter consituency name");
      return;
    }
    if (stateId === "") {
      showAlert("error", "Please select state");
      return;
    }
    if (districtId === "") {
      showAlert("error", "Please select district");
      return;
    }
    const response = await instance.post(createConstituenciesRoute, {
      consistency_id: 2,
      consistency_name: consituencyName,

      district_pk: districtId,
    });
    setConsituencyName("");

    setDistrictId("");
    setStateId("");

    console.log("creat", response.data);
    fetchConstituencies();
  };

  return (
    <Page title="View User">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Constituencies
        </Typography>

        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={9}>
              <ConstituenciesList constituenciesList={constituenciesList} setConstituenciesList={setConstituenciesList} />
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
                options={stateOptions}
                renderInput={(params) => <TextField size="small" {...params} label="Select State" fullWidth />}
                onChange={(event, value) => {
                  console.log("value", value);
                  if (value) {
                    setStateId(value.value);
                  }
                }}
              />
              <Autocomplete
                options={districtOptions}
                renderInput={(params) => <TextField size="small" {...params} label="Select District" fullWidth />}
                onChange={(event, value) => {
                  console.log("value", value);
                  if (value) {
                    setDistrictId(value.value);
                  }
                }}
              />
              <TextField
                size="small"
                label="Consituency Name"
                fullWidth
                value={consituencyName}
                onChange={(event) => {
                  setConsituencyName(event.target.value);
                }}
              />
              <LoadingButton
                variant="contained"
                sx={{
                  padding: "15px",
                }}
                onClick={addConsituency}
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

export default connect(mapStateToProps, null)(ConstituenciesPage);
