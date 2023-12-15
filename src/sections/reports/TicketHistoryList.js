import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, MenuItem } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { searchFiltercolor } from "../../constants";
import instance from "../../utils/axios";
import { getAllNavaratnaluRoute, getAllTicketsRoute, getNextLevelUserRoute, getTicketStatusRoute, updateTicketStatusRoute, getTicketHistoryRoute } from "../../utils/apis";

const TicketHistoryList = ({ data, showAlert, account }) => {
  const columns = [
    {
      name: "createdby",
      label: "Created by",
    },
    {
      name: "createdon",
      label: "Created on",
    },
    {
      name: "reason",
      label: "Reason",
    },

    {
      name: "status_id",
      label: "Status",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          let statusname = "";
          if (value === 1) {
            statusname = "Open";
          }
          if (value === 2) {
            statusname = "Resolved";
          }
          if (value === 3) {
            statusname = "Cancelled";
          }
          if (value === 4) {
            statusname = "Escalated";
          }

          return statusname;
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
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
          <MUIDataTable title="Ticket History List" columns={columns} data={data.ticketHistory} options={options} />
        </ThemeProvider>
      </Stack>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {
  showAlert,
})(TicketHistoryList);
