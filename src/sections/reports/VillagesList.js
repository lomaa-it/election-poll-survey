import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, Button, Popover, FormControlLabel, MenuItem, IconButton } from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";

import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomMuiDataTable from "../../components/CustomMuiDataTable";
import { LoadingButton } from "@mui/lab";
import { set } from "date-fns";
import ApiServices from "../../services/apiservices";
import { createVillagesRoute } from "../../utils/apis";
import CircularProgress from "@mui/material/CircularProgress";
import { ROWS_PER_PAGE_OPTION } from "../../constants";

const VillagesList = ({ loading, showAlert, villageList, handleEdit }) => {
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
      name: "part_no",
      label: "Part Number",
    },
    {
      name: "village_name",
      label: "Village Name",
    },
    {
      name: "village_id",
      label: "Edit/Delete",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          var index = villageList.findIndex((e) => e.village_id == value);

          return (
            <Stack direction="row">
              <IconButton color="primary" onClick={(e) => handleEdit(villageList[index])}>
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
  //   if (!selectedValues.consistency_id) {
  //     showAlert({ text: "Please select constistuency", color: "error" });
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

  //   if (!selectedValues.sachivalayam_id) {
  //     showAlert({ text: "Please select sachivalayam", color: "error" });
  //     return;
  //   }

  //   if (!selectedValues.part_no) {
  //     showAlert({ text: "Please select part", color: "error" });
  //     return;
  //   }

  //   if (!selectedValues.village_name) {
  //     showAlert({ text: "Please enter village name", color: "error" });
  //     return;
  //   }

  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.putRequest(createVillagesRoute + selectedValues.village_id, {
  //       village_name: selectedValues.village_name,
  //       part_no: selectedValues.part_no,
  //     });

  //     showAlert({ text: "Village Updated Successfully", color: "success" });
  //     console.log("response", response);
  //     setIsLoading(false);
  //     setSelectedValues({
  //       state_id: "",
  //       district_id: "",
  //       consistency_id: "",
  //       mandal_id: "",
  //       division_id: "",
  //       sachivalayam_id: "",
  //       part_no: "",
  //       village_id: "",
  //       village_name: "",
  //     });

  //     setRefresh(!refresh);
  //     setAnchorEl(null);
  //   } catch (error) {
  //     setIsLoading(false);
  //     showAlert({ text: "Something went wrong", color: "error" });
  //     setRefresh(!refresh);
  //   }
  // };

  // const handleDelete = async (id) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await ApiServices.deleteRequest(createVillagesRoute + id);
  //     showAlert({ text: "Village Deleted Successfully", color: "success" });
  //     console.log("response", response);
  //     setIsLoading(false);
  //     setSelectedValues({
  //       state_id: "",
  //       district_id: "",
  //       consistency_id: "",
  //       mandal_id: "",
  //       division_id: "",
  //       sachivalayam_id: "",
  //       part_no: "",
  //       village_id: "",
  //       village_name: "",
  //     });

  //     setRefresh(!refresh);
  //     setAnchorEl(null);
  //   } catch (error) {
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

      {!loading && <CustomMuiDataTable title="" columns={columns} data={villageList} options={options} />}
    </Card>
  );
};

export default connect(null, {
  showAlert,
})(VillagesList);
