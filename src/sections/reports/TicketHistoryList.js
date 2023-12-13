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
  MenuItem,
} from "@mui/material";
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
import {
  getAllNavaratnaluRoute,
  getAllTicketsRoute,
  getNextLevelUserRoute,
  getTicketStatusRoute,
  updateTicketStatusRoute,
  getTicketHistoryRoute,
} from "../../utils/apis";

const TicketHistoryList = ({ showAlert, account }) => {
  const [isLoading, setLoading] = useState(false);
  const [fechtedData, setFechtedData] = useState({
    ticketHistory: [],
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const ticketHistoryResponse = await instance.post(getTicketHistoryRoute);
      console.log("ticketHistoryResponse", ticketHistoryResponse);
      setFechtedData((state) => ({
        ...state,
        ticketHistory: ticketHistoryResponse.data.message,
      }));
    };
    fetchData();
  }, [refresh]);

  const columns = [
    {
      label: "Reason",
    },
    {
      label: "Created on",
    },
    {
      label: "Created by",
    },
    {
      label: "Status",
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

  /// formatdata for MUIDataTable using fechtedData and filter navaratnalu_name in navaratnalu with   navaratnalu_pk in tickets
  const formatData = fechtedData.ticketHistory.map((history) => {
    return [
      history.reason,
      history.created_on,
      history.created_by,
      history.status_id,
    ];
  });

  return (
    <Card elevation={1}>
      <Stack>
        <Divider />

        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            title="Ticket History List"
            columns={columns}
            data={formatData}
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
    account: state.auth,
  };
};

export default connect(mapStateToProps, {
  showAlert,
})(TicketHistoryList);
