import { Grid, Container, Typography, Box, TextField, Card, FormControlLabel } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import { CheckBox } from "@mui/icons-material";
import { useState } from "react";

const VoterRegistrationPage = ({ dashboard }) => {
  return (
    <Page title="Voter Registration">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Add Voter
        </Typography>

        <Card sx={{ p: 3 }}>
          <Typography sx={{ pb: 2 }}>Basic Info</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={3}>
              <Box px={2}>
                <FormControlLabel control={<CheckBox />} label={<Typography style={{ marginLeft: "10px" }}>Is New Voter?</Typography>} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                type="file"
                label="Upload Proof"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}></Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Voter Name *" fullWidth />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Guardian:</FormLabel>
                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="father" name="radio-buttons-group" row>
                  <FormControlLabel value="father" control={<Radio />} label="Father" />
                  <FormControlLabel value="mother" control={<Radio />} label="Mother" />
                  <FormControlLabel value="husband" control={<Radio />} label="Husband" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Guardian Name *" fullWidth />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Voter ID *" fullWidth />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Gender" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Age *" fullWidth />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Volunteer ID *" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Gruhasaradhi ID *" fullWidth select />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Phone Number *" fullWidth select />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              sx={{
                marginLeft: "14px",
              }}
            >
              <FormControlLabel control={<CheckBox />} label={<Typography style={{ marginLeft: "10px" }}>Resident</Typography>} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField label="Permenent Address 1 *" fullWidth multiline rows={4} rowsMax={8} />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <TextField label="Current Address 1 *" fullWidth multiline rows={4} rowsMax={8} />
            </Grid>
          </Grid>
        </Card>

        <Card sx={{ p: 3, mt: 1 }}>
          <Typography sx={{ pb: 2 }}>Assign Authority</Typography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Select State *" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Select Consistency *" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Select Mandal *" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Select Division *" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Select Sachivalayam *" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Select Booth/Part *" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Select Village *" fullWidth select />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField label="Part SL No" fullWidth />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              sx={{
                marginLeft: "auto",
                marginTop: "55px",
              }}
            >
              <LoadingButton
                variant="contained"
                sx={{
                  padding: "15px 40px",
                }}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>

        <Box p={1} />
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, null)(VoterRegistrationPage);
