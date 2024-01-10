import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, FormControlLabel, Popover, Button, MenuItem, IconButton } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import ViewUserPage from "../../pages/ViewUserPage";
import Sachivalayam from "../../pages/Sachivalayam";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import { set } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";

import ApiServices from "../../services/apiservices";
import { UpdateAndDeleteConstituenciesRoute } from "../../utils/apis";
import { ROWS_PER_PAGE_OPTION } from "../../constants";

const ConstituenciesList = ({ loading, showAlert, constituenciesList, handleEdit }) => {
  const columns = [
    {
      name: "district_name",
      label: "District Name",
    },
    {
      name: "consistency_no",
      label: "Constituency No",
    },
    {
      name: "consistency_name",
      label: "Constituency Name",
    },

    {
      name: "consistency_id",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = constituenciesList.findIndex((e) => e.consistency_id == value);

          return (
            <Stack direction="row">
              <IconButton color="primary" onClick={(e) => handleEdit(constituenciesList[index])}>
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
  //   if (!selectedValues.district_id) {
  //     showAlert({ text: "Please select district", color: "error" });
  //     return;
  //   }

  //   if (!selectedValues.consistency_name) {
  //     showAlert({ text: "Please enter constituency name", color: "error" });

  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.putRequest(UpdateAndDeleteConstituenciesRoute + selectedValues.consistency_id, {
  //       district_pk: selectedValues.district_id,
  //       consistency_name: selectedValues.consistency_name,
  //     });

  //     setIsLoading(false);
  //     showAlert({ text: "Constituency Updated Successfully11", color: "success" });
  //     setRefresh((prevState) => !prevState);
  //     setSelectedValues({
  //       state_id: "",
  //       district_id: "",
  //       consistency_id: "",
  //       consistency_name: "",
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
  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.deleteRequest(UpdateAndDeleteConstituenciesRoute + id);
  //     setIsLoading(false);
  //     showAlert({ text: "Constituency Deleted Successfully", color: "success" });
  //     setRefresh((prevState) => !prevState);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //     showAlert({ text: "Something went wrong", color: "error" });
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

      {!loading && <CustomMuiDataTable title="" columns={columns} data={constituenciesList} options={options} />}
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
})(ConstituenciesList);
