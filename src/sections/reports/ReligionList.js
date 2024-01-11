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
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import { set } from "date-fns";
import { createDesignationsRoute } from "../../utils/apis";
import ApiServices from "../../services/apiservices";
import { ROWS_PER_PAGE_OPTION } from "../../constants";

const ReligionList = ({ loading, showAlert, religionList, handleEdit, pageActions, handleDelete }) => {
  const columns = [
    { name: "lookup_valuename", label: "Religion Name" },
    {
      name: "lookup_id",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = religionList.findIndex((e) => e.lookup_id == value);
          console.log("index", index);
          return (
            <Stack direction="row">
              <Tooltip title={pageActions.edit_perm != 1 ? "You don't have access to edit" : ""}>
                <span>
                  <IconButton color="primary" onClick={(e) => handleEdit(religionList[index])} disabled={pageActions.edit_perm != 1}>
                    <EditNoteIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Tooltip title={pageActions.delete_perm != 1 ? "You don't have access to delete" : ""}>
                <span>
                  <IconButton color="error" onClick={(e) => handleDelete(religionList[index])} disabled={pageActions.delete_perm != 1}>
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

  // const handleSubmit = async () => {
  //   setIsLoading(true);

  //   if (selectedValues.lookup_valuename === "") {
  //     showAlert({ text: "Please enter designation name", color: "error" });
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await ApiServices.putRequest(createDesignationsRoute + selectedValues.lookup_pk, {
  //       lookup_name: selectedValues.lookup_name,
  //       lookup_valuename: selectedValues.lookup_valuename,
  //     });
  //     console.log(response.data.message);
  //     showAlert({ text: "Designation Updated Successfully", color: "success" });
  //     setSelectedValues({
  //       ...selectedValues,
  //       lookup_valuename: "",
  //       lookup_pk: "",
  //     });
  //     setIsLoading(false);
  //     setAnchorEl(null);
  //     setRefresh(!refresh);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     showAlert({ text: "Designation Not Updated", color: "error" });
  //     setAnchorEl(null);
  //     setRefresh(!refresh);
  //   }
  // };

  console.log("religionList", religionList);

  return (
    <Card elevation={1}>
      {loading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!loading && <CustomMuiDataTable title="" columns={columns} data={religionList} options={options} />}
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
})(ReligionList);
