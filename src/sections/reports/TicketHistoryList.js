import { useEffect, useState } from "react";
import { Typography, Card, Stack, Grid, Switch, Divider, Box, Chip, TextField, MenuItem, CircularProgress } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { LoadingButton } from "@mui/lab";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getMuiTableTheme, getTicketStatusById, searchFiltercolor } from "../../constants";
import { fToNow } from "../../utils/formatTime";

const TicketHistoryList = ({ ticket, showAlert }) => {
  const columns = [
    { name: "ticket_master_pk", label: "Ticket Id" },
    {
      name: "user_displayname",
      label: "Created by",
    },

    {
      name: "reason",
      label: "Reason",
    },
    {
      name: "createdon",
      label: "Created on",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return fToNow(value, true);
        },
      },
    },

    {
      name: "status_id",
      label: "Status",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return getTicketStatusById(value);
        },
      },
    },
  ];

  const options = {
    elevation: 0,
    selectableRows: "none",
    responsive: "standard",
  };

  return (
    <Card elevation={1}>
      {ticket.isLoading && (
        <Box minHeight={200} display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}

      {!ticket.isLoading && (
        <ThemeProvider theme={getMuiTableTheme()}>
          <MUIDataTable title="Ticket History List" columns={columns} data={ticket.history ?? []} options={options} />
        </ThemeProvider>
      )}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return { ticket: state.ticket };
};

export default connect(mapStateToProps, {
  showAlert,
})(TicketHistoryList);
