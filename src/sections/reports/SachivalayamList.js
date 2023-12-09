import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Stack,
  Grid,
  Switch,
  Divider,
  Box,
  Chip,
  Button,
  Popover,
  TextField,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import ViewUserPage from "../../pages/ViewUserPage";
import Sachivalayam from "../../pages/Sachivalayam";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const SachivalayamList = ({
  showAlert,
  sachivalayamList,
  fetchedData,
  setFetchedData,
  refresh,
  setRefresh,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_id: "",
    consistency_id: "",
    mandal_id: "",
    division_id: "",
    sachivalayam_id: "",
    sachivalayam_name: "",
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
      label: "Edit/Delete",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

  const handleClick = (event, data) => {};

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedValues({
      state_id: "",
      district_id: "",
      consistency_id: "",
      mandal_id: "",
      division_id: "",
      sachivalayam_id: "",
      sachivalayam_name: "",
    });
  };

  const onCancel = () => {
    setAnchorEl(null);
    setSelectedValues({
      state_id: "",
      district_id: "",
      consistency_id: "",
      mandal_id: "",
      division_id: "",
      sachivalayam_id: "",
      sachivalayam_name: "",
    });
  };

  // update details
  const handleSubmit = async () => {};

  const renderEditAndDelete = (data) => {
    // Create a popover for the mandal
    const open = Boolean(anchorEl);
    const id = open ? `simple-popover-${data.mandal_pk}` : undefined;

    return (
      <Box>
        <Button
          aria-describedby={id}
          variant="contained"
          onClick={(e) => {
            handleClick(e, data);
          }}
        >
          <EditNoteIcon />
        </Button>
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
                    }));
                  }}
                >
                  {fetchedData.states.map((state) => {
                    return (
                      <MenuItem value={state.state_pk}>
                        {state.state_name}
                      </MenuItem>
                    );
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
                    }));
                  }}
                >
                  {/* filter districk based on state_id */}
                  {fetchedData.district
                    .filter(
                      (district) =>
                        district.state_id === selectedValues.state_id
                    )
                    .map((district) => {
                      return (
                        <MenuItem value={district.district_pk}>
                          {district.district_name}
                        </MenuItem>
                      );
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
                    }));
                  }}
                >
                  {/* filter constituency based on district_id */}
                  {fetchedData.consistency
                    .filter(
                      (consistency) =>
                        consistency.district_pk === selectedValues.district_id
                    )
                    .map((consistency) => {
                      return (
                        <MenuItem value={consistency.consistency_pk}>
                          {consistency.consistency_name}
                        </MenuItem>
                      );
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
                    }));
                  }}
                >
                  {/* filter mandal based on consistency_id */}
                  {fetchedData.mandal
                    .filter(
                      (mandal) =>
                        mandal.consistency_id === selectedValues.consistency_id
                    )
                    .map((mandal) => {
                      return (
                        <MenuItem value={mandal.mandal_pk}>
                          {mandal.mandal_name}
                        </MenuItem>
                      );
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
                    }));
                  }}
                >
                  {/* filter division based on mandal_id */}
                  {fetchedData.division
                    .filter(
                      (division) =>
                        division.mandal_id === selectedValues.mandal_id
                    )
                    .map((division) => {
                      return (
                        <MenuItem value={division.division_pk}>
                          {division.division_name}
                        </MenuItem>
                      );
                    })}
                </TextField>
                <TextField
                  size="small"
                  label="Sachivalayam Name"
                  fullWidth
                  value={selectedValues.sachivalayam_name}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      sachivalayam_name: e.target.value,
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

  const formartedData = fetchedData.sachivalayam.map((sachivalayam) => {
    return [
      sachivalayam.district_name || "District",
      sachivalayam.consitency_name || "Constituency",
      sachivalayam.mandal_name || "Mandal",
      sachivalayam.division_name || "Division",
      sachivalayam.sachivalayam_name || "Sachivalayam",
      renderEditAndDelete(),
    ];
  });

  return (
    <Card elevation={1}>
      <Stack>
        <Divider />

        <MUIDataTable
          title=""
          columns={columns}
          data={formartedData}
          options={options}
        />
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
})(SachivalayamList);
