import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, Button, Popover, TextField, FormControlLabel, MenuItem, IconButton } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import Tooltip from "@material-ui/core/Tooltip";
import { LoadingButton } from "@mui/lab";

import ViewUserPage from "../../pages/ViewUserPage";
import Sachivalayam from "../../pages/Sachivalayam";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import { updateAndDeleteSachivalayam } from "../../utils/apis";
import ApiServices from "../../services/apiservices";
import CircularProgress from "@mui/material/CircularProgress";
import { ROWS_PER_PAGE_OPTION } from "../../constants";
import { is } from "date-fns/locale";
import { useAlertContext } from "../../components/AlertProvider";

const SachivalayamList = ({ loading, showAlert, sachivalayamList, handleEdit, pageActions, handleDelete }) => {
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
      name: "sachivalayam_name",
      label: "Sachivalayam",
    },
    {
      name: "sachivalayam_id",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = sachivalayamList.findIndex((e) => e.sachivalayam_id == value);

          return (
            <Stack direction="row">
              <Tooltip title={pageActions.edit_perm != 1 ? "You don't have access to edit" : ""}>
                <span>
                  <IconButton color="primary" onClick={(e) => handleEdit(sachivalayamList[index])} disabled={pageActions.edit_perm != 1}>
                    <EditNoteIcon />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title={pageActions.delete_perm != 1 ? "You don't have access to delete" : ""}>
                <span>
                  <IconButton color="error" onClick={(e) => handleConfirmDelete(sachivalayamList[index])} disabled={pageActions.delete_perm != 1}>
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
      description: "Are you sure? Do you want to delete this sachivalayam?",
      agreeCallback: async () => {
        showLoading();
        await handleDelete(data);
        hideLoading();
      },
    });
  };

  // update details
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
  //   if (!selectedValues.division_id) {
  //     showAlert({ text: "Please select division", color: "error" });
  //     return;
  //   }
  //   if (!selectedValues.sachivalayam_name) {
  //     showAlert({ text: "Please enter sachivalayam name", color: "error" });
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.putRequest(updateAndDeleteSachivalayam + selectedValues.sachivalayam_id, {
  //       sachivalayam_name: selectedValues.sachivalayam_name,
  //       division_pk: selectedValues.division_id,
  //     });
  //     showAlert({ text: "Sachivalayam Updated Successfully", color: "success" });
  //     console.log(response.data.message);
  //     setIsLoading(false);
  //     setSelectedValues({
  //       state_id: "",
  //       district_id: "",
  //       consistency_id: "",
  //       mandal_id: "",
  //       division_id: "",
  //       sachivalayam_id: "",
  //       sachivalayam_name: "",
  //     });
  //     setRefresh(!refresh);
  //     handleClose();
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     showAlert({ text: "Something went wrong", color: "error" });
  //     setRefresh(!refresh);
  //   }
  // };
  // const handleDelete = async (id) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.deleteRequest(updateAndDeleteSachivalayam + id);
  //     showAlert({ text: "Sachivalayam Deleted Successfully", color: "success" });
  //     console.log(response.data.message);
  //     setIsLoading(false);
  //     setSelectedValues({
  //       state_id: "",
  //       district_id: "",
  //       consistency_id: "",
  //       mandal_id: "",
  //       division_id: "",
  //       sachivalayam_id: "",
  //       sachivalayam_name: "",
  //     });
  //     setRefresh(!refresh);
  //     handleClose();
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     showAlert({ text: "Something went wrong", color: "error" });
  //     setRefresh(!refresh);
  //   }
  // };

  return (
    <Card elevation={1}>
      {loading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!loading && <CustomMuiDataTable title="" columns={columns} data={sachivalayamList} options={options} />}
    </Card>
  );
};

export default connect(null, {
  showAlert,
})(SachivalayamList);
