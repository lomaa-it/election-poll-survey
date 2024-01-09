import { useEffect, useState } from "react";
import { Card, Stack, Grid, Divider, Box, TextField, MenuItem, Button, Popover, IconButton } from "@mui/material";

import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { updateDivisionByIdRoute } from "../../utils/apis";
import { set } from "date-fns";
import instance from "../../utils/axios";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import ApiServices from "../../services/apiservices";
import CircularProgress from "@mui/material/CircularProgress";
import { ROWS_PER_PAGE_OPTION } from "../../constants";

const DivisionList = ({ loading, showAlert, divisionList, handleEdit }) => {
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
              <IconButton color="primary" onClick={(e) => handleEdit(divisionList[index])}>
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
