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
import { createDesignationsRoute } from "../../utils/apis";
import ApiServices from "../../services/apiservices";
import { ROWS_PER_PAGE_OPTION } from "../../constants";

const DesignationList = ({ loading, showAlert, designationList, handleEdit }) => {
  const columns = [
    { name: "lookup_valuename", label: "Designation Name" },
    {
      name: "lookup_id",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = designationList.findIndex((e) => e.lookup_id == value);
          return (
            <Stack direction="row">
              <IconButton color="primary" onClick={(e) => handleEdit(designationList[index])}>
                <EditNoteIcon />
              </IconButton>
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

  // const handleDelete = async (id) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await ApiServices.deleteRequest(createDesignationsRoute + id);
  //     console.log(response.data.message);
  //     showAlert({ text: "Designation Deleted", color: "success" });
  //     setIsLoading(false);
  //     setRefresh(!refresh);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     showAlert({ text: "Designation Not Deleted", color: "error" });
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

      {!loading && <CustomMuiDataTable title="" columns={columns} data={designationList} options={options} />}
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
