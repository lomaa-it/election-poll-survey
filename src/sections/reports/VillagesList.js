import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, Button, Popover, FormControlLabel, MenuItem } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import { LoadingButton } from "@mui/lab";
import { set } from "date-fns";
import ApiServices from "../../services/apiservices";
import { createVillagesRoute } from "../../utils/apis";
import CircularProgress from "@mui/material/CircularProgress";
const VillagesList = ({ showAlert, villageList, fetchedData, setFetchedData, refresh, setRefresh }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_id: "",
    consistency_id: "",
    mandal_id: "",
    division_id: "",
    sachivalayam_id: "",
    part_no: "",
    village_id: "",
    village_name: "",
  });

  const columns = [
    {
      label: "District Name",
    },
    {
      label: "Constituency Name",
    },
    {
      label: "Mandal Name",
    },
    {
      label: "Division Name",
    },

    {
      label: "Sachivalayam",
    },
    {
      label: "Part Number",
    },
    {
      label: "Village Name",
    },

    {
      label: "Edit/Delete",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    rowsPerPageOptions: [100, 150, 200],
    rowsPerPage: 100,
  };

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);

    console.log("hihihiihihih");
    console.log("data", data);
    console.log("fetchedData", fetchedData);

    const sachivalayam_id = fetchedData.part.find((part_no) => part_no.part_no === data.part_no).sachivalayam_id;
    console.log("sachivalayam_id", sachivalayam_id);

    const division_id = fetchedData.sachivalayam.find((sachivalayam) => sachivalayam.sachivalayam_pk === sachivalayam_id).division_pk;
    console.log("division_id", division_id);

    const mandal_id = fetchedData.division.find((division) => division.division_pk === division_id).mandal_id;
    console.log("mandal_id", mandal_id);

    const consistency_id = fetchedData.mandal.find((mandal) => mandal.mandal_pk === mandal_id).consistency_id;
    console.log("consistency_id", consistency_id);

    const district_id = fetchedData.consistency.find((consistency) => consistency.consistency_pk === consistency_id).district_pk;
    console.log("district_id", district_id);

    const state_id = fetchedData.district.find((district) => district.district_pk === district_id).state_id;
    console.log("state_id", state_id);

    setSelectedValues((prevState) => ({
      ...prevState,
      state_id: state_id,
      district_id: district_id,
      consistency_id: consistency_id,
      mandal_id: mandal_id,
      division_id: division_id,
      sachivalayam_id: sachivalayam_id,
      part_no: data.part_no,
      village_id: data.village_pk,
      village_name: data.village_name,
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedValues((prevState) => ({
      ...prevState,
      state_id: "",
      district_id: "",
      consistency_id: "",
      mandal_id: "",
      division_id: "",
      sachivalayam_id: "",
      part_no: "",
      village_id: "",
      village_name: "",
    }));
  };

  const onCancel = () => {
    setAnchorEl(null);
    setSelectedValues((prevState) => ({
      ...prevState,
      state_id: "",
      district_id: "",
      consistency_id: "",
      mandal_id: "",
      division_id: "",
      sachivalayam_id: "",
      part_no: "",
      village_id: "",
      village_name: "",
    }));
  };

  const handleSubmit = async () => {
    if (!selectedValues.district_id) {
      showAlert({ text: "Please select district", color: "error" });
      return;
    }
    if (!selectedValues.consistency_id) {
      showAlert({ text: "Please select constistuency", color: "error" });
      return;
    }

    if (!selectedValues.mandal_id) {
      showAlert({ text: "Please select mandal", color: "error" });
      return;
    }

    if (!selectedValues.division_id) {
      showAlert({ text: "Please select division", color: "error" });

      return;
    }

    if (!selectedValues.sachivalayam_id) {
      showAlert({ text: "Please select sachivalayam", color: "error" });
      return;
    }

    if (!selectedValues.part_no) {
      showAlert({ text: "Please select part", color: "error" });
      return;
    }

    if (!selectedValues.village_name) {
      showAlert({ text: "Please enter village name", color: "error" });
      return;
    }

    try {
      setIsLoading(true);
      const response = await ApiServices.putRequest(createVillagesRoute + selectedValues.village_id, {
        village_name: selectedValues.village_name,
        part_no: selectedValues.part_no,
      });

      showAlert({ text: "Village Updated Successfully", color: "success" });
      console.log("response", response);
      setIsLoading(false);
      setSelectedValues({
        state_id: "",
        district_id: "",
        consistency_id: "",
        mandal_id: "",
        division_id: "",
        sachivalayam_id: "",
        part_no: "",
        village_id: "",
        village_name: "",
      });

      setRefresh(!refresh);
      setAnchorEl(null);
    } catch (error) {
      setIsLoading(false);
      showAlert({ text: "Something went wrong", color: "error" });
      setRefresh(!refresh);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await ApiServices.deleteRequest(createVillagesRoute + id);
      showAlert({ text: "Village Deleted Successfully", color: "success" });
      console.log("response", response);
      setIsLoading(false);
      setSelectedValues({
        state_id: "",
        district_id: "",
        consistency_id: "",
        mandal_id: "",
        division_id: "",
        sachivalayam_id: "",
        part_no: "",
        village_id: "",
        village_name: "",
      });

      setRefresh(!refresh);
      setAnchorEl(null);
    } catch (error) {
      setIsLoading(false);
      showAlert({ text: "Something went wrong", color: "error" });
      setRefresh(!refresh);
    }
  };

  const renderEditAndDelete = (data) => {
    // Create a popover for the mandal
    const open = Boolean(anchorEl);
    const id = open ? `simple-popover-${data.village_pk}` : undefined;

    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: "5px",
          }}
        >
          <Button
            aria-describedby={id}
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
              color: "red",
            }}
            onClick={() => {
              handleDelete(data.village_pk);
            }}
          >
            {isLoading ? <CircularProgress size={20} /> : <DeleteForeverIcon />}
          </Button> */}
        </Box>

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
                      mandal_id: "",
                      division_id: "",
                      sachivalayam_id: "",
                      part_no: "",
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
                      mandal_id: "",
                      division_id: "",
                      sachivalayam_id: "",
                      part_no: "",
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
                  label="Select Constituency"
                  fullWidth
                  select
                  value={selectedValues.consistency_id}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      consistency_id: e.target.value,
                      mandal_id: "",
                      division_id: "",
                      sachivalayam_id: "",
                      part_no: "",
                    }));
                  }}
                >
                  {/* filter constituency based on district_id */}
                  {fetchedData.consistency
                    .filter((consistency) => consistency.district_pk === selectedValues.district_id)
                    .map((consistency) => {
                      return <MenuItem value={consistency.consistency_pk}>{consistency.consistency_name}</MenuItem>;
                    })}
                </TextField>
                <TextField
                  size="small"
                  label="Select Mandal"
                  fullWidth
                  select
                  value={selectedValues.mandal_id}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      mandal_id: e.target.value,
                      division_id: "",
                      sachivalayam_id: "",
                      part_no: "",
                    }));
                  }}
                >
                  {/* filter mandal based on consistency_id */}
                  {fetchedData.mandal
                    .filter((mandal) => mandal.consistency_id === selectedValues.consistency_id)
                    .map((mandal) => {
                      return <MenuItem value={mandal.mandal_pk}>{mandal.mandal_name}</MenuItem>;
                    })}
                </TextField>
                <TextField
                  size="small"
                  label="Select Division"
                  fullWidth
                  select
                  value={selectedValues.division_id}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      division_id: e.target.value,
                      sachivalayam_id: "",
                      part_no: "",
                    }));
                  }}
                >
                  {/* filter division based on mandal_id */}
                  {fetchedData.division
                    .filter((division) => division.mandal_id === selectedValues.mandal_id)
                    .map((division) => {
                      return <MenuItem value={division.division_pk}>{division.division_name}</MenuItem>;
                    })}
                </TextField>
                <TextField
                  size="small"
                  label="Select Sachivalayam "
                  fullWidth
                  select
                  value={selectedValues.sachivalayam_id}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      sachivalayam_id: e.target.value,
                      part_no: "",
                    }));
                  }}
                >
                  {/* filter sachivalayam based on division_id */}
                  {fetchedData.sachivalayam
                    .filter((sachivalayam) => sachivalayam.division_pk === selectedValues.division_id)
                    .map((sachivalayam) => {
                      return <MenuItem value={sachivalayam.sachivalayam_pk}>{sachivalayam.sachivalayam_name}</MenuItem>;
                    })}
                </TextField>
                <TextField
                  size="small"
                  label="Select Part"
                  fullWidth
                  select
                  value={selectedValues.part_no}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      part_no: e.target.value,
                    }));
                  }}
                >
                  {/* filter part based on sachivalayam_id */}
                  {fetchedData.part
                    .filter((part) => part.sachivalayam_id === selectedValues.sachivalayam_id)
                    .map((part) => {
                      return <MenuItem value={part.part_no}>{part.part_no}</MenuItem>;
                    })}
                </TextField>
                <TextField
                  size="small"
                  label="Village Name"
                  fullWidth
                  value={selectedValues.village_name}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      village_name: e.target.value,
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

  const formartedData = fetchedData.village.map((village) => {
    return [
      village.district_name || "District",
      village.consistency_name || "Constituency",
      village.mandal_name || "Mandal",
      village.division_name || "Division",
      village.sachivalayam_name || "Sachivalayam",
      village.part_no || "Part No",
      village.village_name || "Village Name",
      renderEditAndDelete(village),
    ];
  });

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
})(VillagesList);
