import { Grid, Container, Typography, Box, TextField, Card, Stack } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import ViewUsersList from "../sections/reports/ViewUsersList";
import Button from "@mui/material/Button";
import DesignationList from "../sections/reports/DesignationList";
import { useEffect, useState } from "react";
import { getAllDesignationsRoute, createDesignationsRoute } from "../utils/apis";

import { add, set } from "date-fns";
import { showAlert } from "../actions/alert";
import ApiServices from "../services/apiservices";
import { Edit } from "@mui/icons-material";

const DesignationPage = ({ dashboard, showAlert }) => {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEditState, setEditState] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    designation: [],
  });

  const [formValues, setFormValues] = useState({
    lookup_name: "designationlist",
    lookup_valuename: "",
  });

  useEffect(() => {
    fetchDesignationData();
  }, []);

  const fetchDesignationData = async () => {
    try {
      const response = await ApiServices.postRequest(getAllDesignationsRoute);
      console.log(response.data.message);
      setFetchedData({
        designation: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (data) => {
    setEditState(true);
    console.log("data", data);
    setFormValues((prevState) => ({
      ...prevState,
      lookup_valuename: data.lookup_valuename,
      lookup_id: data.lookup_id,
    }));
  };

  const handleSubmit = async () => {
    if (formValues.lookup_valuename === "") {
      showAlert({ text: "Please Enter Designation Name", color: "error" });
      return;
    }

    setLoading(true);

    var body = {
      lookup_name: "designationlist",
      lookup_valuename: formValues.lookup_valuename,
    };

    if (!isEditState) {
      await addDesignation(body);
    } else {
      await updateDesignation(formValues.lookup_id, body);
    }
    setLoading(false);
  };

  const handleReset = () => {
    setEditState(false);
    setFormValues({
      lookup_name: "designationlist",
      lookup_valuename: "",
    });
  };

  const addDesignation = async (body) => {
    console.log("addme");
    try {
      await ApiServices.postRequest(createDesignationsRoute, body);

      showAlert({ text: "Designation Created Successfully", color: "success" });
      fetchDesignationData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Designation Created Failed", color: "error" });
    }
  };

  const updateDesignation = async (id, body) => {
    console.log("updateme");
    try {
      await ApiServices.putRequest(`${createDesignationsRoute}${id}`, body);

      showAlert({ text: "Designation Updated Successfully", color: "success" });
      fetchDesignationData();
      handleReset();
    } catch (error) {
      console.log(error);
      showAlert({ text: "Designation Updated Failed", color: "error" });
    }
  };

  return (
    <Page title="Designations">
      <Container maxWidth="xl">
        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>{isEditState ? "Edit Designation" : "Add Designation"}</Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid
              item
              xs={12}
              md={6}
              lg={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField
                size="small"
                label="Designation Name"
                fullWidth
                value={formValues.lookup_valuename}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    lookup_valuename: e.target.value,
                  });
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
        <DesignationList loading={fetchLoading} designationList={fetchedData.designation} handleEdit={handleEdit} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, { showAlert })(DesignationPage);
