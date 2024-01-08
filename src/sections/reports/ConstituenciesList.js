import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, FormControlLabel, Popover, Button, MenuItem } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import ViewUserPage from "../../pages/ViewUserPage";
import Sachivalayam from "../../pages/Sachivalayam";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import { set } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";

import ApiServices from "../../services/apiservices";
import { UpdateAndDeleteConstituenciesRoute } from "../../utils/apis";

const ConstituenciesList = ({ showAlert, constituenciesList, fetchedData, setFetchedData, refresh, setRefresh }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_id: "",
    consistency_id: "",
    consistency_name: "",
  });

  const columns = [
    {
      label: "District Name",
    },
    {
      label: "Constituency Name",
    },

    // {
    //   label: "Edit/Delete",
    // },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    rowsPerPageOptions: [100, 150, 200],
    rowsPerPage: 100,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
  };

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);

    // find state id based on district id
    const district = fetchedData.district.find((district) => district.district_pk === data.district_pk);
    const state_id = district ? district.state_id : null;

    setSelectedValues((prevState) => ({
      ...prevState,
      state_id: state_id,
      district_id: data.district_pk,
      consistency_id: data.consistency_pk,
      consistency_name: data.consistency_name,
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedValues({
      state_id: "",
      district_id: "",
      consistency_id: "",
      consistency_name: "",
    });
  };

  const onCancel = () => {
    setAnchorEl(null);
    setSelectedValues({
      state_id: "",
      district_id: "",
      consistency_id: "",
      consistency_name: "",
    });
  };

  const handleSubmit = async () => {
    if (!selectedValues.district_id) {
      showAlert({ text: "Please select district", color: "error" });
      return;
    }

    if (!selectedValues.consistency_name) {
      showAlert({ text: "Please enter constituency name", color: "error" });

      return;
    }

    try {
      setIsLoading(true);
      const response = await ApiServices.putRequest(UpdateAndDeleteConstituenciesRoute + selectedValues.consistency_id, {
        district_pk: selectedValues.district_id,
        consistency_name: selectedValues.consistency_name,
      });

      setIsLoading(false);
      showAlert({ text: "Constituency Updated Successfully11", color: "success" });
      setRefresh((prevState) => !prevState);
      setSelectedValues({
        state_id: "",
        district_id: "",
        consistency_id: "",
        consistency_name: "",
      });
      setAnchorEl(null);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showAlert({ text: "Something went wrong", color: "error" });
      setRefresh((prevState) => !prevState);
    }
  };
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await ApiServices.deleteRequest(UpdateAndDeleteConstituenciesRoute + id);
      setIsLoading(false);
      showAlert({ text: "Constituency Deleted Successfully", color: "success" });
      setRefresh((prevState) => !prevState);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showAlert({ text: "Something went wrong", color: "error" });
      setRefresh((prevState) => !prevState);
    }
  };

  const renderEditAndDelete = (data) => {
    const open = Boolean(anchorEl);
    const id = open ? `simple-popover-${data.consistency_pk}` : undefined;

    return (
      <Box>
        {/* <Button
          aria-describedby={id}
          onClick={(e) => {
            handleClick(e, data);
          }}
          sx={{
            marginRight: "10px",
          }}
        >
          <EditNoteIcon />
        </Button> */}
        {/* <Button
          sx={{
            color: "red",
          }}
         
          onClick={() => {
            handleDelete(data.consistency_pk);
          }}
        >
          {isLoading ? <CircularProgress size={20} /> : <DeleteForeverIcon />}
        </Button> */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <Card sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid
                item
                xs={12}
                md={6}
                lg={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <TextField
                  size="small"
                  label="Select State"
                  fullWidth
                  select
                  value={selectedValues.state_id}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      state_id: e.target.value,
                      district_id: "",
                      consistency_id: "",
                    }));
                  }}
                  disabled
                >
                  {fetchedData.states.map((state) => {
                    return <MenuItem value={state.state_pk}>{state.state_name}</MenuItem>;
                  })}
                </TextField>
                <TextField
                  size="small"
                  label="Select District"
                  fullWidth
                  select
                  value={selectedValues.district_id}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      district_id: e.target.value,
                      consistency_id: "",
                    }));
                  }}
                >
                  {/* filter districk based on state_id */}
                  {fetchedData.district
                    .filter((district) => district.state_id === selectedValues.state_id)
                    .map((district) => {
                      return <MenuItem value={district.district_pk}>{district.district_name}</MenuItem>;
                    })}
                </TextField>

                <TextField
                  size="small"
                  label="Constitency Name"
                  fullWidth
                  value={selectedValues.consistency_name}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      consistency_name: e.target.value,
                    }));
                  }}
                />
                <LoadingButton
                  loading={isLoading}
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    padding: "15px",
                  }}
                >
                  Update
                </LoadingButton>
                <LoadingButton
                  onClick={onCancel}
                  variant="contained"
                  sx={{
                    padding: "10px",
                    backgroundColor: "#f44336",
                  }}
                >
                  Cancel
                </LoadingButton>
              </Grid>
            </Grid>
          </Card>
        </Popover>
        {/* <DeleteForeverIcon
          sx={{
            color: "#f44336",
            marginLeft: "10px",
          }}
        /> */}
      </Box>
    );
  };

  const formartedData = fetchedData.consistency.map((consistency) => {
    return [consistency.district_name || "district name", consistency.consistency_name, renderEditAndDelete(consistency)];
  });

  console.log("fetchedData.con", fetchedData.consistency);
  return (
    <Card elevation={1}>
      <Stack>
        <Divider />

        <CustomMuiDataTable title="" columns={columns} data={formartedData} options={options} />
      </Stack>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    batches: state.common,
    students: state.management,
  };
};

export default connect(mapStateToProps, {
  showAlert,
})(ConstituenciesList);
