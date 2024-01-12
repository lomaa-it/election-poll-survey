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
import Tooltip from "@material-ui/core/Tooltip";
import { set } from "date-fns";
import { createDistrictsRoute } from "../../utils/apis";
import ApiServices from "../../services/apiservices";
import { ROWS_PER_PAGE_OPTION } from "../../constants";
import { useAlertContext } from "../../components/AlertProvider";

const DistrictsList = ({ loading, showAlert, districtsList, handleEdit, pageActions, handleDelete }) => {
  const { showLoading, hideLoading, showAlertDialog } = useAlertContext();
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
              <Tooltip title={pageActions.edit_perm != 1 ? "You don't have access to edit" : ""}>
                <span>
                  <IconButton color="primary" onClick={(e) => handleEdit(districtsList[index])} disabled={pageActions.edit_perm != 1}>
                    <EditNoteIcon />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title={pageActions.delete_perm != 1 ? "You don't have access to delete" : ""}>
                <span>
                  <IconButton color="error" onClick={(e) => handleConfirmDelete(districtsList[index])} disabled={pageActions.delete_perm != 1}>
                    <DeleteForeverIcon />
                  </IconButton>
                </span>
              </Tooltip>
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

  const handleConfirmDelete = (data) => {
    showAlertDialog({
      description: "Are you sure? Do you want to delete this district?",
      agreeCallback: async () => {
        showLoading();
        await handleDelete(data);
        hideLoading();
      },
    });
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
