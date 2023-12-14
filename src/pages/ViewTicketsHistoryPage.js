import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Card,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, RHFTextField } from "../components/hook-form";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addVoterTicket } from "../actions/voter";
import { showAlert } from "../actions/alert";
import {
  createTicketHistoryRoute,
  createTicketRoute,
  getTicketHistoryRoute,
} from "../utils/apis";
import instance from "../utils/axios";
import TicketHistoryList from "../sections/reports/TicketHistoryList";

const ViewTicketsHistoryPage = ({ common, voter, showAlert }) => {
  const navigate = useNavigate();
  const props = useLocation().state;

  const [isLoading, setLoading] = useState(false);
  const [fechtedData, setFechtedData] = useState({
    isLoading: false,
    ticketHistory: [],
  });

  const schema = Yup.object().shape({
    navaratnalu_id: Yup.string().required("Navaratnalu is required"),
    status_id: Yup.string().required("Status is required"),
    reason: Yup.string().required("Reason is required"),
  });

  const defaultValues = {
    navaratnalu_id: props.data?.navaratnalu_id ?? "",
    status_id: props.data?.status_id ?? "",
    reason: "",
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("props", props);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, resetField } = methods;

  const onSubmit = async (data) => {
    var values = {
      ...data,
      ticket_master_pk: props.data.ticket_master_pk,
      ticket_attachment_id: 6,
    };
    setLoading(true);

    try {
      const result = await instance.post(createTicketHistoryRoute, values);
      console.log("result", result);
      setLoading(false);

      showAlert({ text: "Ticket submitted", color: "success" });
      resetField("reason");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    setFechtedData((state) => ({
      ...state,
      ticketHistory: [],
      isLoading: true,
    }));

    const ticketHistoryResponse = await instance.post(getTicketHistoryRoute, {
      ticket_master_pk: props.data.ticket_master_pk,
    });
    console.log("ticketHistoryResponse", ticketHistoryResponse);

    setFechtedData((state) => ({
      ...state,
      ticketHistory: ticketHistoryResponse.data.message,
      isLoading: false,
    }));
  };

  return (
    <Page title="View Ticket History">
      <Container maxWidth="xl">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h4"
            sx={{ mb: 1, display: "flex", alignItems: "center" }}
          >
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            Create Ticket
          </Typography>

          <Card sx={{ p: 3 }}>
            {/* <Typography variant="h6" sx={{ mb: 2 }}>
              Voter Name : {props[3]}
              <br />
              (Ph: {props[6]})
              <br />
              Voter ID : {props[2]}
            </Typography> */}

            <Typography sx={{ pb: 2 }}>Basic Info</Typography>

            <Grid container spacing={2} alignItems="start">
              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField
                  name="navaratnalu_id"
                  label="Navaratnalu ID"
                  select
                  disabled
                >
                  {common.navaratnalu.map((item, index) => (
                    <MenuItem key={index} value={item.navaratnalu_pk}>
                      {item.navaratnalu_name}
                    </MenuItem>
                  ))}
                </RHFTextField>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="status_id" label="Status" select>
                  {common.ticket.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFTextField>
              </Grid>

              <Grid item xs={12} md={6} lg={9}>
                <RHFTextField
                  name="reason"
                  label="Write Reason..."
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                sx={{
                  mt: "55px",
                }}
              >
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  variant="contained"
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </Card>

          <Box p={1} />
          <TicketHistoryList data={fechtedData} />

          {/* <Card sx={{ p: 3 }}>
            <Typography sx={{ pb: 2 }}>Attachements Info</Typography>

            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  size="small"
                  label="Select Attachment *"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CloudUploadRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  size="small"
                  label="Attachment Type *"
                  fullWidth
                  select
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <TextField size="small" label="Attachment URL" fullWidth />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <AddCircleRoundedIcon
                  sx={{
                    color: "#878F96",
                    marginLeft: "25px",
                    fontSize: "55px",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={9}>
                <TextField
                  size="small"
                  label="Attachements Description..."
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                sx={{
                  ml: "auto",
                  mt: "55px",
                }}
              >
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  variant="contained"
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </Card> */}
        </FormProvider>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
    voter: state.voter,
  };
};

export default connect(mapStateToProps, { showAlert })(ViewTicketsHistoryPage);
