import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, FormControlLabel, Popover, Button, MenuItem } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import ViewUserPage from "../../pages/ViewUserPage";
import Sachivalayam from "../../pages/Sachivalayam";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import CircularProgress from "@mui/material/CircularProgress";
import { set } from "date-fns";
import { createDistrictsRoute } from "../../utils/apis";
import ApiServices from "../../services/apiservices";

const DistrictsList = ({ showAlert, districtList, fetchedData, setFetchedData, refresh, setRefresh }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_id: "",
    district_name: "",
  });

  const columns = [
    {
      label: "State Name",
    },
    {
      label: "District Name",
    },

    {
      label: "Edit/Delete",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);

    // find state id based on district id
    const state_id = data.state_id;

    setSelectedValues((prevState) => ({
      ...prevState,
      state_id: state_id,
      district_id: data.district_pk,
      district_name: data.district_name,
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);

    setSelectedValues((prevState) => ({
      ...prevState,
      state_id: "",
      district_id: "",
      district_name: "",
    }));
  };

  const onCancel = () => {
    setAnchorEl(null);
    setSelectedValues({
      state_id: "",
      district_id: "",
      district_name: "",
    });
  };

  const handleSubmit = async () => {
    if (!selectedValues.state_id) {
      showAlert({ text: "Please select state", color: "error" });
      return;
    }

    if (!selectedValues.district_name) {
      showAlert({ text: "Please enter district name", color: "error" });
      return;
    }

    try {
      setIsLoading(true);
      const response = await ApiServices.putRequest(createDistrictsRoute + selectedValues.district_id, {
        district_name: selectedValues.district_name,
        state_id: selectedValues.state_id,
      });
      console.log("response", response.data.message);
      setIsLoading(false);
      setRefresh((prevState) => !prevState);
      showAlert({ text: "District Updated Successfully", color: "success" });
      setAnchorEl(null);
      setSelectedValues({
        state_id: "",
        district_id: "",
        district_name: "",
      });
      setAnchorEl(null);
    } catch (error) {
      setIsLoading(false);
      showAlert({ text: "District Not Updated", color: "error" });
      setRefresh((prevState) => !prevState);
      setAnchorEl(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await ApiServices.deleteRequest(createDistrictsRoute + id);
      console.log("response", response.data.message);
      setIsLoading(false);
      setRefresh((prevState) => !prevState);
      showAlert({ text: "District Deleted Successfully", color: "success" });
    } catch (error) {
      setIsLoading(false);
      showAlert({ text: "District Not Deleted", color: "error" });
      setRefresh((prevState) => !prevState);
    }
  };

  const renderEditAndDelete = (data) => {
    const open = Boolean(anchorEl);
    const id = open ? `simple-popover-${data.district_pk}` : undefined;

    return (
      <Box>
        <Button
          aria-describedby={id}
          variant="contained"
          onClick={(e) => {
            handleClick(e, data);
          }}
          sx={{
            marginRight: "10px",
          }}
        >
          <EditNoteIcon />
        </Button>
        {/* <Button
          sx={{
            backgroundColor: "red",
          }}
          variant="contained"
          onClick={() => {
            handleDelete(data.district_pk);
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
                >
                  {fetchedData.states.map((state) => {
                    return <MenuItem value={state.state_pk}>{state.state_name}</MenuItem>;
                  })}
                </TextField>

                <TextField
                  size="small"
                  label="District Name"
                  fullWidth
                  value={selectedValues.district_name}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      district_name: e.target.value,
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
  // convert districtList to muitable format
  const formartedData = fetchedData.district.map((district) => {
    return [district.state_name, district.district_name, renderEditAndDelete(district)];
  });

  console.log("fetchedData.district", fetchedData.district);
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
})(DistrictsList);
