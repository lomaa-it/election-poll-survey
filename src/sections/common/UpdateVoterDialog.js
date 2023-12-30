import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Box, IconButton, Dialog, MenuItem, Grid, Radio, DialogContent, DialogTitle, FormControlLabel, DialogActions, Button, Typography, FormLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";

import { PARTY_ID, casteList, phoneRegExp, religionList } from "../../constants";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import { BJPRadio, CongressRadio, JSPRadio, NeutralRadio, OthersRadio, TDPRadio, YCPRadio } from "./PartyRadioButtons";
import { FormProvider, RHFRadio, RHFTextField } from "../../components/hook-form";
import { connect } from "react-redux";
import { showAlert } from "../../actions/alert";
import { updateVoterDetails } from "../../actions/voter";

const UpdateVoterDialog = ({ account, common, voterData, showAlert, updateVoterDetails, isActive }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open]);

  // const schema = Yup.object().shape({
  //   phone_no: Yup.string()
  //     .matches(phoneRegExp, "Phone number is not valid")
  //     .min(10, "Phone number must be at least 10 digits")
  //     .required("Phone number is required"),
  //   is_resident: Yup.string().required("Resident status is required"),
  //   religion_id: Yup.string().required("Religion is required"),
  //   caste_id: Yup.string().required("Caste is required"),
  //   disability: Yup.string().required("Disability status is required"),
  //   govt_employee: Yup.string().required(
  //     "Government employee status is required"
  //   ),
  //   current_address: Yup.string().required("Current address is required"),
  //   permenent_address: Yup.string().required("Permanent address is required"),
  //   intrested_party: Yup.string().required("Interested party is required"),
  // });

  const schema = Yup.object().shape({
    phone_no: Yup.string().matches(phoneRegExp, "Phone number is not valid").min(10, "Phone number must be at least 10 digits").required("Phone number is required"),
    is_resident: Yup.string().required("Resident status is required"),
    religion_id: Yup.string().required("Religion is required"),
    caste_id: Yup.string().required("Caste is required"),
    disability: Yup.string().required("Disability status is required"),
    govt_employee: Yup.string().required("Government employee status is required"),
    current_address: Yup.string(),
    permenent_address: Yup.string().required("Permanent address is required"),
    intrested_party: Yup.string().required("Interested party is required"),
  });

  const defaultValues = {
    phone_no: voterData.voter_phone_no ?? "",
    is_resident: voterData.is_resident ?? "",
    religion_id: voterData.religion_id ?? "",
    caste_id: voterData.caste_id ?? "",
    disability: voterData.disability ?? "",
    govt_employee: voterData.govt_employee ?? 2,
    current_address: voterData.current_address ?? "",
    permenent_address: voterData.permenent_address ?? "",
    intrested_party: voterData.opinionparty ?? "",
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const residential = watch(["is_resident"]);

  const onSubmit = async (data) => {
    if (data.intrested_party == null) {
      showAlert({ text: "Interested party is required" });
      return;
    }

    setLoading(true);

    const jsonData = {
      ...data,
      volunteer_id: account.user.user_pk,
      voter_phone_no: data.phone_no,
      govt_employee: data.govt_employee == 2 ? null : data.govt_employee,
      religion_name: common.religion.find((e) => e.value == data.religion_id)?.label ?? "",
      caste_name: common.caste.find((e) => e.value == data.caste_id)?.label ?? "",
      createdby: account.user.user_pk,
      updatedby: account.user.user_pk,
    };

    var result = await updateVoterDetails(voterData.voter_pkk, jsonData);
    if (result) {
      showAlert({ text: "Voter updated", color: "success" });
      handleClose();
    }

    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log("voterData", voterData);

  return (
    <>
      <IconButton
        color={isActive ? "success" : "default"}
        onClick={() => setOpen(true)}
        sx={{
          p: 0,
        }}
      >
        <EditIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Update Details</DialogTitle>
          <DialogContent>
            <Box py={1}>
              <Typography sx={{ mb: 1 }}>Voter ID: {voterData.voter_id}</Typography>
              <Typography sx={{ mb: 3 }}>Name: {voterData.voter_name}</Typography>

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={12} lg={12}>
                  <RHFTextField name="phone_no" label="Phone Number" type="text" required inputProps={{ maxLength: 10 }} />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <RHFRadio
                    required
                    name="is_resident"
                    options={[
                      { label: "Is Residential", value: 1 },
                      { label: "Non-Residential", value: 0 },
                    ]}
                  />
                </Grid>
                {residential == 0 && (
                  <Grid item xs={12} md={12} lg={12}>
                    <RHFTextField name="current_address" label="Current Address" required />
                  </Grid>
                )}

                <Grid item xs={12} md={12} lg={12}>
                  <RHFTextField name="permenent_address" label="Permanent Address" disabled={true} />
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <RHFTextField name="religion_id" label="Religion" select required>
                    {common.religion.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </RHFTextField>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <RHFTextField name="caste_id" label="Caste" select required>
                    {common.caste.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </RHFTextField>
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                  <RHFRadio
                    required
                    name="disability"
                    filedLabel="Disability"
                    options={[
                      { label: "Yes", value: 1 },
                      { label: "No", value: 0 },
                    ]}
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={7}>
                  <RHFRadio
                    required
                    name="govt_employee"
                    filedLabel="Govt Employee"
                    options={[
                      { label: "Yes", value: 1 },
                      { label: "No", value: 0 },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <RHFRadio
                    filedLabel="Interested Party"
                    required
                    name="intrested_party"
                    labelPlacement="top"
                    options={[
                      {
                        label: "Neutral",
                        value: PARTY_ID.NEUTRAL,
                        custom: <NeutralRadio fontSize={22} />,
                      },
                      {
                        label: "YSRCP",
                        value: PARTY_ID.YSRCP,
                        custom: <YCPRadio fontSize={22} />,
                      },
                      {
                        label: "TDP",
                        value: PARTY_ID.TDP,
                        custom: <TDPRadio fontSize={22} />,
                      },
                      {
                        label: "JSP",
                        value: PARTY_ID.JANASENA,
                        custom: <JSPRadio fontSize={22} />,
                      },
                      {
                        label: "BJP",
                        value: PARTY_ID.BJP,
                        custom: <BJPRadio fontSize={22} />,
                      },
                      {
                        label: "INC",
                        value: PARTY_ID.CONGRESS,
                        custom: <CongressRadio fontSize={22} />,
                      },
                      // {
                      //   label: "Others",
                      //   value: PARTY_ID.OTHERS,
                      //   custom: <OthersRadio fontSize={22} />,
                      // },
                    ]}
                    sx={{
                      ".MuiFormControlLabel-label": {
                        marginLeft: "8px",
                        fontSize: "1rem",
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>

            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              Submit
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
    account: state.auth,
  };
};

export default connect(mapStateToProps, { showAlert, updateVoterDetails })(UpdateVoterDialog);
