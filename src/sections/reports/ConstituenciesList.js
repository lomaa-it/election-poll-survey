import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Stack,
  Grid,
  Switch,
  Divider,
  Box,
  Chip,
  TextField,
  FormControlLabel,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import ViewUserPage from "../../pages/ViewUserPage";
import Sachivalayam from "../../pages/Sachivalayam";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ConstituenciesList = ({
  showAlert,
  constituenciesList,
  setConstituenciesList,
}) => {
  console.log("constituenciesList", constituenciesList);

  const columns = [
    {
      label: "District Name",
    },
    {
      label: "Constituency Name",
    },

    {
      label: "Edit/Delete",
    },
  ];



  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };
  const renderEditAndDelete = () => {
    return (
      <Box>
        <EditNoteIcon
          sx={{
            color: "#1976d2",
          }}
        />
        <DeleteForeverIcon
          sx={{
            color: "#f44336",
            marginLeft: "10px",
          }}
        />
      </Box>
    );
  };

    //convert constituenciesList format to MUIDataTable format
    const constituenciesListForTable = constituenciesList.map((constituency) => {
      console.log("constituency", constituency);
      return [
        constituency.district_name,
        constituency.consistency_name,
        renderEditAndDelete(),
      ];
    });

  return (
    <Card elevation={1}>
      <Stack>
        <Divider />

        <MUIDataTable
          title=""
          columns={columns}
          data={constituenciesListForTable}
          options={options}
        />
      </Stack>
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
