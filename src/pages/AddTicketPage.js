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

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addVoterTicket } from "../actions/voter";
import { showAlert } from "../actions/alert";

const AddTicketPage = ({ common, voter, showAlert }) => {
  const navigate = useNavigate();
  const props = useLocation().state;

  const [isLoading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    navaratnalu_id: Yup.string().required("Navaratnalu is required"),
    reason: Yup.string().required("Reason is required"),
  });

  const defaultValues = {
    navaratnalu_id: "",
    reason: "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    var result = await addVoterTicket(props[0], data);
    setLoading(false);

    if (result) {
      showAlert({ text: "Ticket submitted", color: "success" });
      reset();
    }
  };

  return (
    <Page title="Add Ticket">
      <Container maxWidth="xl">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" sx={{ mb: 1, display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            Create Ticket
          </Typography>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Voter info : {props[3]} (Ph: {props[6]})
            </Typography>

            <Typography sx={{ pb: 2 }}>Basic Info</Typography>

            <Grid container spacing={2} alignItems="start">
              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="navaratnalu_id" label="Navaratnalu ID" select>
                  {common.navaratnalu.map((item, index) => (
                    <MenuItem key={index} value={item.navaratnalu_pk}>
                      {item.navaratnalu_name}
                    </MenuItem>
                  ))}
                </RHFTextField>
              </Grid>

              <Grid item xs={12} md={6} lg={9}>
                <RHFTextField name="reason" label="Write Reason..." fullWidth multiline rows={4} />
              </Grid>
            </Grid>
          </Card>

          <Box p={1} />

          <Card sx={{ p: 3 }}>
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
                <TextField size="small" label="Attachment Type *" fullWidth select />
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
                <TextField size="small" label="Attachements Description..." fullWidth multiline rows={4} />
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
                <LoadingButton type="submit" loading={isLoading} variant="contained">
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </Card>
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

export default connect(mapStateToProps, { showAlert })(AddTicketPage);
