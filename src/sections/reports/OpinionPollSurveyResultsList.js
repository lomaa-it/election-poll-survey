import { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Box,
  CircularProgress,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { searchFiltercolor } from "../../constants";

const OpinionPollSurveyResultsList = ({ dashboard, showAlert }) => {
  useEffect(() => {}, []);

  const columns = [
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
      label: "Sachivalayam Name",
    },
    {
      name: "part_no",
      label: "Part No",
    },
    {
      name: "village_name",
      label: "Village Name",
    },
    {
      name: "totalvoters",
      label: "Total Votes",
    },
    {
      name: "neutral",
      label: "Neutral",
    },
    {
      name: "ysrcp",
      label: "YCP",
    },
    {
      name: "tdp",
      label: "TDP",
    },
    {
      name: "janasena",
      label: "JSP",
    },
    {
      name: "congress",
      label: "Congress",
    },
    {
      name: "bjp",
      label: "BJP",
    },
    {
      name: "otherss",
      label: "Others",
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

  const renderHighVote = () => {
    return (
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        45445
        {
          <KeyboardDoubleArrowUpIcon
            sx={{
              color: "red",
              fontSize: "30px",
            }}
          />
        }
      </Typography>
    );
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
    <>
      <TableContainer component={Paper} elevation={1}>
        <Table
          sx={{
            "& .MuiTableCell-head": {
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
            },
            "& .MuiTableCell-body": {
              fontSize: "1.2rem",
              fontWeight: "bold",
              textAlign: "center",
              color: "blue",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Constituency Votes</TableCell>
              <TableCell>Neutral</TableCell>
              <TableCell>YCP</TableCell>
              <TableCell>TDP</TableCell>
              <TableCell>JSP</TableCell>
              <TableCell>Congress</TableCell>
              <TableCell>BJP</TableCell>
              <TableCell>Others</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {dashboard.opinionResults.reduce(
                  (sum, e) => sum + e.totalvoters,
                  0
                )}
              </TableCell>
              <TableCell>
                {dashboard.opinionResults.reduce(
                  (sum, e) => sum + e.neutral,
                  0
                )}
              </TableCell>
              <TableCell>
                {dashboard.opinionResults.reduce((sum, e) => sum + e.ysrcp, 0)}
              </TableCell>
              <TableCell>
                {dashboard.opinionResults.reduce((sum, e) => sum + e.tdp, 0)}
              </TableCell>
              <TableCell>
                {dashboard.opinionResults.reduce(
                  (sum, e) => sum + e.janasena,
                  0
                )}
              </TableCell>
              <TableCell>
                {dashboard.opinionResults.reduce(
                  (sum, e) => sum + e.congress,
                  0
                )}
              </TableCell>
              <TableCell>
                {dashboard.opinionResults.reduce((sum, e) => sum + e.bjp, 0)}
              </TableCell>
              <TableCell>
                {dashboard.opinionResults.reduce(
                  (sum, e) => sum + e.otherss,
                  0
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box p={1} />

      <Card elevation={1}>
        {dashboard.isLoading && (
          <Box
            minHeight={200}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}

        {!dashboard.isLoading && (
          <ThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title="Opinion Results"
              columns={columns}
              data={dashboard.opinionResults}
              options={options}
            />
          </ThemeProvider>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, {
  showAlert,
})(OpinionPollSurveyResultsList);
