import { Grid, Container, Typography, Box, TextField, Card, Stack, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";

import DivisionList from "../sections/reports/DivisionList";
import { useEffect, useState, useRef } from "react";

import { getAllConstituenciesRoute, getAllDistrictsRoute, getAllMandalRoute, getAllStatesRoute, getAllDivisionRoute, createDivisionsRoute } from "../utils/apis";
import { showAlert } from "../actions/alert";
import ApiServices from "../services/apiservices";
import { Edit } from "@mui/icons-material";

const DivisionPage = ({ dashboard, showAlert, account }) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEditState, setEditState] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [],
    district: [],
    consistency: [],
    mandal: [],
    division: [],
  });

  const [formValues, setFormValues] = useState({
    district_id: "",
    consistency_id: "",
    mandal_id: "",
    division_name: "",
  });

  const inputFieldRef = useRef();

  useEffect(() => {
    if (isEditState) {
      inputFieldRef.current.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isFocused, isEditState]);

  useEffect(() => {
    fecthOptionsData();
    fecthDivisionData();
  }, []);

  const fecthOptionsData = async () => {
    try {
      /// get all states
      const statesResponse = await ApiServices.postRequest(getAllStatesRoute);
      // console.log("states", statesResponse.data.message);
      /// get all districts
      const districtsResponse = await ApiServices.postRequest(getAllDistrictsRoute);
      // console.log("districts", districtsResponse.data.message);

      /// get all constituencies
      const constituenciesResponse = await ApiServices.postRequest(getAllConstituenciesRoute);
      console.log("constituencies", constituenciesResponse.data.message);

      /// get all mandals
      const mandalsResponse = await ApiServices.postRequest(getAllMandalRoute);
      // console.log("mandals", mandalsResponse.data.message);

      /// state update
      setFetchedData((prevState) => ({
        ...prevState,
        states: statesResponse.data.message,
        district: districtsResponse.data.message,
        consistency: constituenciesResponse.data.message,
        mandal: mandalsResponse.data.message,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fecthDivisionData = async () => {
    try {
      /// get all divisions
      const divisionsResponse = await ApiServices.postRequest(getAllDivisionRoute);
      console.log("divisions", divisionsResponse.data.message);

      /// state update
      setFetchedData((prevState) => ({
        ...prevState,
        division: divisionsResponse.data.message,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (data) => {
    setEditState(true);
    setIsFocused((prevState) => !prevState);
    console.log("data", data);
    setFormValues({
      district_id: data.district_id,
      consistency_id: data.consistency_id,
      mandal_id: data.mandal_id,
      division_id: data.division_id,
      division_name: data.division_name,
    });
  };

  const handleSubmit = async () => {
    console.log("formValues", formValues);

    if (!formValues.district_id) {
      showAlert({ text: "Please select district", color: "error" });
      return;
    }
    if (!formValues.consistency_id) {
      showAlert({ text: "Please select constituency", color: "error" });
      return;
    }
    if (!formValues.mandal_id) {
      showAlert({ text: "Please select mandal", color: "error" });
      return;
    }
    if (!formValues.division_name) {
      showAlert({ text: "Please enter division name", color: "error" });
      return;
    }
    setLoading(true);

    var body = {
      division_name: formValues.division_name,
      mandal_id: formValues.mandal_id,
    };

    if (!isEditState) {
      await addDivision(body);
    } else {
      await updateDivision(formValues.division_id, body);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setEditState(false);
    setFormValues({
      district_id: "",
      consistency_id: "",
      mandal_id: "",
      division_name: "",
    });
  };

  const addDivision = async (body) => {
    try {
      await ApiServices.postRequest(createDivisionsRoute, body);

      showAlert({ text: "Division Created Successfully", color: "success" });
      fecthDivisionData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Division Created Failed", color: "error" });
    }
  };

  const updateDivision = async (id, body) => {
    try {
      await ApiServices.putRequest(`${createDivisionsRoute}${id}`, body);

      showAlert({ text: "Division Updated Successfully", color: "success" });
      fecthDivisionData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Division Updated Failed", color: "error" });
    }
  };

  return (
    <Page title="Divisions">
      <Container maxWidth="xl">
        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>{isEditState ? "Edit Division" : "Add Division"}</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select State"
                fullWidth
                select
                value={account.user.state_pk}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    state_id: e.target.value,
                    district_id: "",
                    consistency_id: "",
                    mandal_id: "",
                  }));
                }}
                disabled
              >
                {fetchedData.states.map((state, index) => {
                  return (
                    <MenuItem key={index} value={state.state_pk}>
                      {state.state_name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select District"
                fullWidth
                select
                value={formValues.district_id}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    district_id: e.target.value,
                    consistency_id: "",
                    mandal_id: "",
                  }));
                }}
              >
                {/* filter districk based on state_id */}
                {fetchedData.district
                  .filter((district) => district.state_id === account.user.state_pk)
                  .map((district, index) => {
                    return (
                      <MenuItem key={index} value={district.district_id}>
                        {district.district_name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select Constituency"
                fullWidth
                select
                value={formValues.consistency_id}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    consistency_id: e.target.value,
                    mandal_id: "",
                  }));
                }}
              >
                {/* filter constituency based on district_id */}
                {fetchedData.consistency
                  .filter((consistency) => consistency.district_id === formValues.district_id)
                  .map((consistency, index) => {
                    return (
                      <MenuItem key={index} value={consistency.consistency_id}>
                        {consistency.consistency_name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                size="small"
                label="Select Mandal"
                fullWidth
                select
                value={formValues.mandal_id}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    mandal_id: e.target.value,
                  }));
                }}
              >
                {/* filter mandal based on consistency_id */}
                {fetchedData.mandal
                  .filter((mandal) => mandal.consistency_id === formValues.consistency_id)
                  .map((mandal, index) => {
                    return (
                      <MenuItem key={index} value={mandal.mandal_id}>
                        {mandal.mandal_name}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <TextField
                inputRef={inputFieldRef}
                size="small"
                label="Division Name"
                fullWidth
                required
                value={formValues.division_name}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    division_name: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              {!isEditState && (
                <LoadingButton loading={isLoading} onClick={handleSubmit} variant="contained">
                  Add
                </LoadingButton>
              )}
              {isEditState && (
                <Stack direction="row" spacing={1}>
                  <LoadingButton loading={isLoading} onClick={handleSubmit} variant="contained">
                    Update
                  </LoadingButton>

                  <LoadingButton loading={isLoading} onClick={handleReset} variant="contained">
                    Cancel
                  </LoadingButton>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />
        <DivisionList loading={fetchLoading} divisionList={fetchedData.division} handleEdit={handleEdit} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    account: state.auth,
  };
};

export default connect(mapStateToProps, { showAlert })(DivisionPage);
