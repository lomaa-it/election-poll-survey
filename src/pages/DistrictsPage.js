import { Grid, Container, Typography, Box, TextField, Card, Stack, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import Autocomplete from "@mui/material/Autocomplete";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import DistrictsList from "../sections/reports/DistrictsList";
import { useEffect, useState, useRef } from "react";
import { getAllDistrictsWithJoinRoute, getAllStatesRoute, createDistrictsRoute, getAllDistrictsRoute } from "../utils/apis";

import { showAlert } from "../actions/alert";
import ApiServices from "../services/apiservices";
import { add } from "date-fns";

const DistrictsPage = ({ dashboard, showAlert, account }) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEditState, setEditState] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [],
    district: [],
  });

  const [formValues, setFormValues] = useState({
    state_id: "",
    district_name: "",
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
    fecthDistrictData();
  }, []);

  const fecthOptionsData = async () => {
    try {
      /// get all states
      const statesResponse = await ApiServices.postRequest(getAllStatesRoute);
      console.log("states", statesResponse.data.message);

      /// state update
      setFetchedData((prevState) => ({
        ...prevState,
        states: statesResponse.data.message,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fecthDistrictData = async () => {
    try {
      /// get all districts
      const districtsResponse = await ApiServices.postRequest(getAllDistrictsRoute);
      console.log("districts", districtsResponse.data.message);

      /// state update
      setFetchedData((prevState) => ({
        ...prevState,
        district: districtsResponse.data.message,
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
      state_id: account.user.state_pk,
      district_id: data.district_id,
      district_name: data.district_name,
    });
  };

  const handleSubmit = async () => {
    if (!formValues.district_name) {
      showAlert({ text: "Please Enter District Name", color: "error" });
      return;
    }
    setLoading(true);

    var body = {
      state_id: account.user.state_pk,
      district_name: formValues.district_name,
    };

    if (!isEditState) {
      await addDistrict(body);
    } else {
      await updateDistrict(formValues.district_id, body);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setEditState(false);
    setFormValues({
      state_id: "",
      district_name: "",
    });
  };

  const addDistrict = async (body) => {
    console.log("addme");
    try {
      await ApiServices.postRequest(createDistrictsRoute, body);

      showAlert({ text: "District Created Successfully", color: "success" });
      setLoading(false);
      fecthDistrictData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "District Created Failed", color: "error" });
    }
  };

  const updateDistrict = async (id, body) => {
    console.log("updateme");
    try {
      await ApiServices.putRequest(`${createDistrictsRoute}${id}`, body);

      showAlert({ text: "District Updated Successfully", color: "success" });
      fecthDistrictData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "District Updated Failed", color: "error" });
    }
  };
  console.log("formValues", formValues);

  return (
    <Page title="Districts">
      <Container maxWidth="xl">
        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>{isEditState ? "Edit District" : "Add District"}</Typography>
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
                inputRef={inputFieldRef}
                size="small"
                label="District Name"
                fullWidth
                value={formValues.district_name}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    district_name: e.target.value,
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
        <DistrictsList loading={fetchLoading} districtsList={fetchedData.district} handleEdit={handleEdit} />
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

export default connect(mapStateToProps, { showAlert })(DistrictsPage);
