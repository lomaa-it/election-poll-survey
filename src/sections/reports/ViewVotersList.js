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
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { searchFiltercolor } from "../../constants";

const ViewVotersList = ({ showAlert, votersData, voter }) => {
  useEffect(() => {}, []);

  // console.log("votersDataList", votersData);

  const columns = [
    { name: "voter_id", label: "Voter ID" },
    {
      name: "part_slno",
      label: "Part Slno",
    },
    {
      name: "voter_name",
      label: "Voter Name",
    },
    { name: "guardian_name", label: "Father/Mother/Husband" },
    {
      label: "Gender",
    },
    {
      label: "Is Resident",
    },
    {
      label: "Phone",
    },

    {
      label: "Age",
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

  const filterChartData = votersData.map((item) => {
    return [...item, renderEditAndDelete()];
  });

  const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: searchFiltercolor,
            },
          },
        },
      },
    });

  return (
    <Card elevation={1}>
      <Stack>
        <Divider />
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title="Voter List"
            columns={columns}
            data={voter.data}
            options={options}
          />
        </ThemeProvider>
      </Stack>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    batches: state.common,
    students: state.management,
    voter: state.voter,
  };
};

export default connect(mapStateToProps, {
  showAlert,
})(ViewVotersList);
