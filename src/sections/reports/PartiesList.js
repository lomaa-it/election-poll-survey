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
import { createPartyRoute } from "../../utils/apis";
import ApiServices from "../../services/apiservices";
import { ROWS_PER_PAGE_OPTION } from "../../constants";

const PartiesList = ({ loading, showAlert, partiesList, handleEdit }) => {
  const columns = [
    { name: "lookup_sequence", label: "Sequence Number" },
    { name: "lookup_valuename", label: "Party Name" },

    {
      name: "lookup_sequence",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = partiesList.findIndex((e) => e.lookup_sequence == value);

          return (
            <Stack direction="row">
              <IconButton color="primary" onClick={(e) => handleEdit(partiesList[index])}>
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
  //   setIsLoading(true);

  //   if (selectedValues.lookup_valuename === "") {
  //     showAlert({ text: "Please enter party name", color: "error" });
  //     setIsLoading(false);
  //     return;
  //   }

  //   if (selectedValues.lookup_sequence === "") {
  //     showAlert({ text: "Please enter sequence number", color: "error" });
  //     setIsLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await ApiServices.putRequest(createPartyRoute + selectedValues.lookup_pk, {
  //       lookup_sequence: selectedValues.lookup_sequence,
  //       lookup_name: selectedValues.lookup_name,
  //       lookup_valuename: selectedValues.lookup_valuename,
  //     });
  //     console.log(response.data.message);
  //     showAlert({ text: "Party Added", color: "success" });
  //     setSelectedValues({
  //       ...selectedValues,
  //       lookup_valuename: "",
  //       lookup_sequence: "",
  //     });
  //     setAnchorEl(null);

  //     setIsLoading(false);
  //     setRefresh((prev) => !prev);
  //   } catch (error) {
  //     console.log(error);
  //     showAlert({ text: "Party Not Added", color: "error" });
  //     setIsLoading(false);
  //     setRefresh((prev) => !prev);
  //     setAnchorEl(null);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await ApiServices.deleteRequest(createPartyRoute + id);
  //     console.log(response.data.message);
  //     showAlert({ text: "Party Deleted Successfully", color: "success" });
  //     setIsLoading(false);
  //     setRefresh((prev) => !prev);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     showAlert({ text: "Party Not Deleted", color: "error" });
  //     setRefresh((prev) => !prev);
  //   }
  // };

  return (
    <Card elevation={1}>
      {loading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!loading && <CustomMuiDataTable title="" columns={columns} data={partiesList} options={options} />}
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
})(PartiesList);
