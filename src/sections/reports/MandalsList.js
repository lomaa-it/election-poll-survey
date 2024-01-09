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
import { set } from "date-fns";
import { updateMandalByIdRoute } from "../../utils/apis";
import instance from "../../utils/axios";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import ApiServices from "../../services/apiservices";
import CircularProgress from "@mui/material/CircularProgress";
import { ROWS_PER_PAGE_OPTION } from "../../constants";

const MandalsList = ({ loading, showAlert, mandalList, handleEdit }) => {
  useEffect(() => {}, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedValues, setSelectedValues] = useState({
    state_id: "",
    district_id: "",
    consistency_id: "",
    mandal_id: "",
    mandal_name: "",
  });

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
      name: "mandal_id",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = mandalList.findIndex((e) => e.mandal_id == value);

          return (
            <Stack direction="row">
              <IconButton color="primary" onClick={(e) => handleEdit(mandalList[index])}>
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
  //   // console.log("selectedValues", selectedValues);

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

  //   if (!selectedValues.mandal_name) {
  //     showAlert({ text: "Please enter mandal name", color: "error" });
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.putRequest(updateMandalByIdRoute + selectedValues.mandal_id, {
  //       consistency_id: selectedValues.consistency_id,
  //       mandal_name: selectedValues.mandal_name,
  //     });

  //     setIsLoading(false);
  //     showAlert({ text: "Mandal Updated Successfully", color: "success" });
  //     setRefresh((prevState) => !prevState);
  //     setSelectedValues({
  //       state_id: "",
  //       district_id: "",
  //       consistency_id: "",
  //       mandal_id: "",
  //       mandal_name: "",
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
  //     const response = await ApiServices.deleteRequest(updateMandalByIdRoute + id);
  //     showAlert({ text: "Mandal Deleted Successfully", color: "success" });
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

      {!loading && <CustomMuiDataTable title="" columns={columns} data={mandalList} options={options} />}
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
})(MandalsList);
