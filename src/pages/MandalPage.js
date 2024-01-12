import { Grid, Container, Typography, Box, TextField, Card, Stack, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import Tooltip from "@material-ui/core/Tooltip";
import Autocomplete from "@mui/material/Autocomplete";
import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import MandalsList from "../sections/reports/MandalsList";
import { useEffect, useState, useRef } from "react";
import instance from "../utils/axios";
import { getAllMandalRoute, getAllStatesRoute, getAllDistrictsRoute, createMandalsRoute, getAllConstituenciesRoute } from "../utils/apis";
import { add, set } from "date-fns";
import { showAlert } from "../actions/alert";
import ApiServices from "../services/apiservices";

const MandalPage = ({ dashboard, showAlert, account }) => {
  const userPermission = account.user && account.user.permissions ? account.user.permissions : [];
  const pageActions = userPermission.filter((p) => p.page_id === 145)[0];
  console.log("pageActions1", pageActions);

  const [fetchLoading, setFetchLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEditState, setEditState] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    states: [],
    district: [],
    consistency: [],
    mandal: [],
  });

  const [formValues, setFormValues] = useState({
    state_id: "",
    district_id: "",
    consistency_id: "",
    mandal_name: "",
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
    fecthMandalData();
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
      // console.log("constituencies", constituenciesResponse.data.message);

      /// state update
      setFetchedData((prevState) => ({
        ...prevState,
        states: statesResponse.data.message,
        district: districtsResponse.data.message,
        consistency: constituenciesResponse.data.message,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fecthMandalData = async () => {
    try {
      /// get all mandals
      const mandalsResponse = await ApiServices.postRequest(getAllMandalRoute);
      console.log("mandals", mandalsResponse.data.message);

      /// state update
      setFetchedData((prevState) => ({
        ...prevState,
        mandal: mandalsResponse.data.message,
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
      mandal_name: data.mandal_name,
    });
  };

  const handleDelete = async (data) => {
    setLoading(true);
    console.log("data852852852", data);
    try {
      await ApiServices.deleteRequest(createMandalsRoute + data.mandal_id);
      showAlert({ text: "Mandal Deleted", color: "success" });
      fecthMandalData();
      handleReset();
    } catch (error) {
      console.log(error);

      showAlert({ text: "Mandal Not Deleted", color: "error" });
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    console.log("formValues", formValues);
    if (!formValues.district_id) {
      showAlert({ text: "Please Select District", color: "error" });
      return;
    }

    if (!formValues.consistency_id) {
      showAlert({ text: "Please Select Constituency", color: "error" });
      return;
    }

    if (!formValues.mandal_name) {
      showAlert({ text: "Please Enter Mandal Name", color: "error" });
      return;
    }

    setLoading(true);

    var body = {
      consistency_id: formValues.consistency_id,
      mandal_name: formValues.mandal_name,
    };

    if (!isEditState) {
      await addMandal(body);
    } else {
      await updateMandal(formValues.mandal_id, body);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setEditState(false);
    setFormValues({
      district_id: "",
      consistency_id: "",
      mandal_name: "",
    });
  };

  const addMandal = async (body) => {
    console.log("addme");
    try {
      await ApiServices.postRequest(createMandalsRoute, body);
      showAlert({ text: "Mandal Created Successfully", color: "success" });
      fecthMandalData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Mandal Created Failed", color: "error" });
    }
  };

  const updateMandal = async (id, body) => {
    console.log("updateme");
    console.log(`${createMandalsRoute}${id}`);
    try {
      await ApiServices.putRequest(`${createMandalsRoute}${id}`, body);
      showAlert({ text: "Mandal Updated Successfully", color: "success" });
      fecthMandalData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Mandal Updated Failed", color: "error" });
    }
  };

  return (
    <Page title="Mandals">
      <Container maxWidth="xl">
        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>{isEditState ? "Edit Mandal" : "Add Mandal"}</Typography>
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
                inputRef={inputFieldRef}
                size="small"
                label="Mandal Name"
                fullWidth
                required
                value={formValues.mandal_name}
                onChange={(e) => {
                  setFormValues((prevState) => ({
                    ...prevState,
                    mandal_name: e.target.value,
                  }));
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              {!isEditState && (
                <Tooltip title={pageActions.add_perm != 1 ? "You don't have access to add" : ""}>
                  <span>
                    <LoadingButton loading={isLoading} onClick={handleSubmit} variant="contained" disabled={pageActions.add_perm != 1}>
                      Add
                    </LoadingButton>
                  </span>
                </Tooltip>
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
        <MandalsList pageActions={pageActions} loading={fetchLoading} mandalList={fetchedData.mandal} handleEdit={handleEdit} handleDelete={handleDelete} />
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

export default connect(mapStateToProps, { showAlert })(MandalPage);
