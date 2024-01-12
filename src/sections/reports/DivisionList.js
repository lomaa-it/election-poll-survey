import { useEffect, useState } from "react";
import { Card, Stack, Grid, Divider, Box, TextField, MenuItem, Button, Popover, IconButton } from "@mui/material";

import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";

import Tooltip from "@material-ui/core/Tooltip";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { updateDivisionByIdRoute } from "../../utils/apis";
import { set } from "date-fns";
import instance from "../../utils/axios";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import ApiServices from "../../services/apiservices";
import CircularProgress from "@mui/material/CircularProgress";
import { ROWS_PER_PAGE_OPTION } from "../../constants";
import { useAlertContext } from "../../components/AlertProvider";

const DivisionList = ({ loading, showAlert, divisionList, handleEdit, pageActions, handleDelete }) => {
  const { showLoading, hideLoading, showAlertDialog } = useAlertContext();
  const columns = [
    {
      name: "district_name",
      label: "District Name",
    },
    {
      name: "consistency_name",
      label: "Constituency Name",
    },
    {
      name: "mandal_name",
      label: "Mandal Name",
    },
    {
      name: "division_name",
      label: "Division Name",
    },
    {
      name: "division_id",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = divisionList.findIndex((e) => e.division_id == value);

          return (
            <Stack direction="row">
              <Tooltip title={pageActions.edit_perm != 1 ? "You don't have access to edit" : ""}>
                <span>
                  <IconButton color="primary" onClick={(e) => handleEdit(divisionList[index])} disabled={pageActions.edit_perm != 1}>
                    <EditNoteIcon />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title={pageActions.delete_perm != 1 ? "You don't have access to delete" : ""}>
                <span>
                  <IconButton color="error" onClick={(e) => handleConfirmDelete(divisionList[index])} disabled={pageActions.delete_perm != 1}>
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
      description: "Are you sure? Do you want to delete this division?",
      agreeCallback: async () => {
        showLoading();
        await handleDelete(data);
        hideLoading();
      },
    });
  };
  // // update details
  // const handleSubmit = async () => {
  //   console.log("selectedValues", selectedValues);

  //   if (!selectedValues.state_id) {
  //     showAlert({ text: "Please select state", color: "error" });
  //     return;
  //   }

  //   if (!selectedValues.district_id) {
  //     showAlert({ text: "Please select district", color: "error" });
  //     return;
  //   }

  //   if (!selectedValues.consistency_id) {
  //     showAlert({ text: "Please select constituency", color: "error" });
  //     return;
  //   }

  //   if (!selectedValues.mandal_id) {
  //     showAlert({ text: "Please select mandal", color: "error" });
  //     return;
  //   }

  //   if (!selectedValues.division_name) {
  //     showAlert({ text: "Please enter division name", color: "error" });
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.putRequest(updateDivisionByIdRoute + selectedValues.division_id, {
  //       mandal_id: selectedValues.mandal_id,
  //       division_name: selectedValues.division_name,
  //     });

  //     console.log("Division Updated", response.data.message);
  //     setIsLoading(false);
  //     showAlert({ text: "Division Updated Successfully", color: "success" });
  //     setRefresh((prevState) => !prevState);

  //     setSelectedValues({
  //       state_id: "",
  //       district_id: "",
  //       consistency_id: "",
  //       mandal_id: "",
  //       division_id: "",
  //       division_name: "",
  //     });
  //     setAnchorEl(null);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     showAlert({ text: "Something went wrong", color: "error" });
  //     setRefresh((prevState) => !prevState);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   console.log("Division Id", id);
  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.deleteRequest(updateDivisionByIdRoute + id);
  //     console.log("Division Deleted", response.data.message);
  //     showAlert({ text: "Division Deleted Successfully", color: "success" });
  //     setIsLoading(false);
  //     setRefresh((prevState) => !prevState);
  //   } catch (error) {
  //     console.log(error);
  //     showAlert({ text: "Something went wrong", color: "error" });
  //     setIsLoading(false);
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

      {!loading && <CustomMuiDataTable title="" columns={columns} data={divisionList} options={options} />}
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
})(DivisionList);
