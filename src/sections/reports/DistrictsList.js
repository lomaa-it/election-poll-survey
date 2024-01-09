import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, FormControlLabel, Popover, Button, MenuItem, IconButton } from "@mui/material";
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
import { ROWS_PER_PAGE_OPTION } from "../../constants";

const DistrictsList = ({ loading, showAlert, districtsList, handleEdit }) => {
  const columns = [
    {
      name: "district_name",
      label: "District Name",
    },

    {
      name: "district_id",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = districtsList.findIndex((e) => e.district_id == value);

          return (
            <Stack direction="row">
              <IconButton color="primary" onClick={(e) => handleEdit(districtsList[index])}>
                <EditNoteIcon />
              </IconButton>
              {/* <IconButton color="error">
                <DeleteForeverIcon />
              </IconButton> */}
            </Stack>
          );
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
    rowsPerPageOptions: ROWS_PER_PAGE_OPTION,
    rowsPerPage: 100,
    download: false,
    print: false,
    viewColumns: false,
    filter: false,
  };

  // const handleSubmit = async () => {
  //   if (!selectedValues.state_id) {
  //     showAlert({ text: "Please select state", color: "error" });
  //     return;
  //   }

  //   if (!selectedValues.district_name) {
  //     showAlert({ text: "Please enter district name", color: "error" });
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.putRequest(createDistrictsRoute + selectedValues.district_id, {
  //       district_name: selectedValues.district_name,
  //       state_id: selectedValues.state_id,
  //     });
  //     console.log("response", response.data.message);
  //     setIsLoading(false);
  //     setRefresh((prevState) => !prevState);
  //     showAlert({ text: "District Updated Successfully", color: "success" });
  //     setAnchorEl(null);
  //     setSelectedValues({
  //       state_id: "",
  //       district_id: "",
  //       district_name: "",
  //     });
  //     setAnchorEl(null);
  //   } catch (error) {
  //     setIsLoading(false);
  //     showAlert({ text: "District Not Updated", color: "error" });
  //     setRefresh((prevState) => !prevState);
  //     setAnchorEl(null);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.deleteRequest(createDistrictsRoute + id);
  //     console.log("response", response.data.message);
  //     setIsLoading(false);
  //     setRefresh((prevState) => !prevState);
  //     showAlert({ text: "District Deleted Successfully", color: "success" });
  //   } catch (error) {
  //     setIsLoading(false);
  //     showAlert({ text: "District Not Deleted", color: "error" });
  //     setRefresh((prevState) => !prevState);
  //   }
  // };

  return (
    <Card elevation={1}>
      {loading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!loading && <CustomMuiDataTable title="" columns={columns} data={districtsList} options={options} />}
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
