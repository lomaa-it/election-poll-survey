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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { searchFiltercolor } from "../../constants";

const VoterAndVolunteerMappingList = ({ showAlert }) => {
  useEffect(() => {}, []);

  const columns = [
    {
      label: "Select",
    },
    {
      label: "Voter ID",
    },
    {
      label: "Voter Name",
    },
    {
      label: "Father Name",
    },

    {
      label: "Cell",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };
  const renderCheckBox = () => {
    return <CheckBox />;
  };

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
            title=""
            columns={columns}
            data={[
              [
                renderCheckBox(),
                "IAX1916410",
                "SAMEEULLA SYED",
                "SILAR SAHEB SYED",
                "912345678",
              ],
              [
                renderCheckBox(),
                "IAX1916378",
                "ZEENAT SYED ",
                "AMEEULLA SYED",
                "912345678",
              ],
              [
                renderCheckBox(),
                "IAX1897867",
                "SEEMA S",
                "CHAN BASHA S",
                "912345678",
              ],
            ]}
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
  };
};

export default connect(mapStateToProps, {
  showAlert,
})(VoterAndVolunteerMappingList);
