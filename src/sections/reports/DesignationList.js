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
import { createDesignationsRoute } from "../../utils/apis";
import ApiServices from "../../services/apiservices";

const DesignationList = ({ showAlert, designationlist, fetchedData, setFetchedData, refresh, setRefresh }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({
    lookup_name: "designationlist",
    lookup_valuename: "",
    lookup_pk: "",
  });

  const columns = [
    {
      label: "Designation Name",
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

    setSelectedValues((prevState) => ({
      ...prevState,
      lookup_valuename: data.designation_name,
      lookup_pk: data.lookup_pk,
    }));
  };

  const handleClose = () => {
    setAnchorEl(null);

    setSelectedValues((prevState) => ({
      ...prevState,
      lookup_valuename: "",
      lookup_pk: "",
    }));
  };

  const onCancel = () => {
    setAnchorEl(null);
    setSelectedValues((prevState) => ({
      ...prevState,
      lookup_valuename: "",
      lookup_pk: "",
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    if (selectedValues.lookup_valuename === "") {
      showAlert({ text: "Please enter designation name", color: "error" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await ApiServices.putRequest(createDesignationsRoute + selectedValues.lookup_pk, {
        lookup_name: selectedValues.lookup_name,
        lookup_valuename: selectedValues.lookup_valuename,
      });
      console.log(response.data.message);
      showAlert({ text: "Designation Updated Successfully", color: "success" });
      setSelectedValues({
        ...selectedValues,
        lookup_valuename: "",
        lookup_pk: "",
      });
      setIsLoading(false);
      setAnchorEl(null);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showAlert({ text: "Designation Not Updated", color: "error" });
      setAnchorEl(null);
      setRefresh(!refresh);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await ApiServices.deleteRequest(createDesignationsRoute + id);
      console.log(response.data.message);
      showAlert({ text: "Designation Deleted", color: "success" });
      setIsLoading(false);
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showAlert({ text: "Designation Not Deleted", color: "error" });
      setRefresh(!refresh);
    }
  };

  const renderEditAndDelete = (data) => {
    const open = Boolean(anchorEl);
    const id = open ? `simple-popover-${data.district_pk}` : undefined;

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
            handleDelete(data.lookup_pk);
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
                  label="Designation Name"
                  fullWidth
                  value={selectedValues.lookup_valuename}
                  onChange={(e) => {
                    setSelectedValues((prevState) => ({
                      ...prevState,
                      lookup_valuename: e.target.value,
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

  const formartedData = fetchedData.designation.map((designation) => {
    return [designation.designation_name, renderEditAndDelete(designation)];
  });

  console.log("fetch", fetchedData.designation);

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
})(DesignationList);
