import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Container, Typography, Box, TextField, Card, InputAdornment, IconButton, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, RHFTextField } from "../components/hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { showAlert } from "../actions/alert";
import TicketHistoryList from "../sections/reports/TicketHistoryList";
import { addVoterTicket, updateReplyVoterTicket, clearTicketReducer, getVoterTicketHistory } from "../actions/ticket";

const ViewTicketsHistoryPage = ({ account, common, ticket, showAlert, getVoterTicketHistory, clearTicketReducer }) => {
  const navigate = useNavigate();
  const props = useLocation().state;

  const isNew = props.data?.ticket_master_pk == null;
  const isVolunteer = props.data?.status_id == null;

  const [isLoading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    navaratnalu_id: Yup.string().required("Navaratnalu is required"),
    status_id: Yup.string().when("navaratnalu_id", {
      is: isVolunteer != true,
      then: Yup.string().required("Status id is required"),
    }),
    reason: Yup.string().required("Reason is required"),
  });

  const defaultValues = {
    navaratnalu_id: props.data?.navaratnalu_id ?? "",
    status_id: props.data?.status_id ?? "",
    reason: "",
  };

  useEffect(() => {
    getVoterTicketHistory(props.data.voter_pkk);

    return () => {
      clearTicketReducer();
    };
  }, []);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, resetField, setValue } = methods;

  const onSubmit = (data) => {
    if (isNew) {
      handleAddTicket(data);
    } else {
      handleUpadateTicket(data);
    }
  };

  const handleAddTicket = async (data) => {
    setLoading(true);
    var result = await addVoterTicket(props.data.voter_pkk, data, account);
    setLoading(false);
    if (result.status) {
      props.data.ticket_master_pk = result.message;
      props.data.navaratnalu_id = Number(data.navaratnalu_id);

      showAlert({ text: "Ticket submitted", color: "success" });
      resetField("reason");

      getVoterTicketHistory(props.data.voter_pkk);
    } else {
      showAlert({ text: result.message });
    }
  };

  const handleUpadateTicket = async (data) => {
    setLoading(true);
    var result = await updateReplyVoterTicket(props.data.ticket_master_pk, data, account);
    setLoading(false);
    if (result.status) {
      showAlert({ text: "Ticket submitted", color: "success" });
      resetField("reason");

      getVoterTicketHistory(props.data.voter_pkk);
    }
  };

  return (
    <Page title="View Ticket History">
      <Container maxWidth="xl">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" sx={{ mb: 1, display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            Create Ticket
          </Typography>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6">
              Voter Name : {props.data?.voter_name}
              <br />
              (Ph: {props.data?.voter_phone_no})
              <br />
              Voter ID : {props.data?.voter_id}
            </Typography>

            {!isNew && (
              <Typography variant="h6" sx={{ mb: 2 }}>
                Ticket ID : {props.data?.ticket_master_pk ?? "-"}
              </Typography>
            )}

            <Typography sx={{ pb: 2 }}>Basic Info</Typography>

            <Grid container spacing={2} alignItems="start">
              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="navaratnalu_id" label="Navaratnalu ID" select disabled={!isNew}>
                  {common.navaratnalu.map((item, index) => (
                    <MenuItem key={index} value={item.navaratnalu_pk}>
                      {item.navaratnalu_name}
                    </MenuItem>
                  ))}
                </RHFTextField>
              </Grid>

              {!isVolunteer && (
                <Grid item xs={12} md={6} lg={3}>
                  <RHFTextField name="status_id" label="Status" select>
                    {common.ticket.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </RHFTextField>
                </Grid>
              )}

              <Grid item xs={12} md={6} lg={9}>
                <RHFTextField name="reason" label="Write Reason..." fullWidth multiline rows={4} />
              </Grid>

              <Grid item xs={12} md={6} lg={3} sx={{ mt: "auto" }}>
                <LoadingButton type="submit" loading={isLoading} variant="contained">
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </Card>

          <Box p={1} />

          <TicketHistoryList />

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
    account: state.auth,
    common: state.common,
    ticket: state.ticket,
  };
};

export default connect(mapStateToProps, { showAlert, getVoterTicketHistory, clearTicketReducer })(ViewTicketsHistoryPage);
