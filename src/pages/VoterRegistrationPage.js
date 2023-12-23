import {
  Grid,
  Container,
  Typography,
  Box,
  TextField,
  Card,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import { useRef, useState } from "react";
import SearchByFilter from "../sections/common/SearchByFilter";
import { numRegExp, phoneRegExp } from "../constants";
import {
  FormProvider,
  RHFCheckbox,
  RHFRadio,
  RHFTextField,
} from "../components/hook-form";
import instance from "../utils/axios";
import { showAlert } from "../actions/alert";
import { addVoters } from "../utils/apis";
import { set } from "date-fns";

const VoterRegistrationPage = ({ dashboard, showAlert }) => {
  const filterRef = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const [filterValues, setFilterValues] = useState({
    mandal: null,
    division: null,
    sachivalayam: null,
    partno: null,
    village: null,
  });

  const schema = Yup.object().shape({
    voter_name: Yup.string().required("Voter name is required"),
    guardian: Yup.string().required("Voter name is required"),
    guardian_name: Yup.string().required("Guardian name is required"),
    isnewvoter: Yup.boolean(),
    voter_id: Yup.string(),
    age: Yup.string()
      .matches(numRegExp, "Must be only digits")
      .max(2, "Age should be less than 100")
      .required("Age is required"),
    phone_no: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    resident: Yup.boolean(),
    permenent_address: Yup.string(),
    current_address: Yup.string().required("Current address is required"),
    part_slno: Yup.string().required("Part slno is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const defaultValues = {
    voter_name: "",
    guardian: "16",
    guardian_name: "",
    voter_id: "",
    age: "",
    phone_no: "",
    permenent_address: "",
    current_address: "",
    part_slno: "",
    gender: "",
    isnewvoter: false,
    resident: false,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, watch, setError, clearErrors } = methods;
  const resident = watch("resident");
  const isNewVoter = watch("isnewvoter");

  console.log("resident", resident);
  console.log("isNewVoter", isNewVoter);

  const onSubmit = async (data) => {
    clearErrors("voter_id");
    if (data.isnewvoter == false && data.voter_id == "") {
      setError("voter_id", {
        message: "Voter ID is required",
      });
      return;
    }

    if (data.resident == true && data.permenent_address == "") {
      setError("permenent_address", {
        message: "Permenent address is required",
      });
      return;
    }

    var hasErrors = false;
    filterRef.current.setErrors({
      mandal: null,
      division: null,
      sachivalayam: null,
      partno: null,
    });

    if (!filterValues["mandal"]) {
      filterRef.current.setErrors({ mandal: "Mandal is required" });
      hasErrors = true;
    }

    if (!filterValues["division"]) {
      filterRef.current.setErrors({ division: "Division is required" });
      hasErrors = true;
    }

    if (!filterValues["sachivalayam"]) {
      filterRef.current.setErrors({ sachivalayam: "Sachivalayam is required" });
      hasErrors = true;
    }

    if (!filterValues["partno"]) {
      filterRef.current.setErrors({ partno: "Part no is required" });
      hasErrors = true;
    }

    if (!filterValues["village"]) {
      filterRef.current.setErrors({ village: "Village is required" });
      hasErrors = true;
    }

    if (hasErrors) return;
    console.log(data);
    console.log("filterValues", filterValues);
    setLoading(true);
    try {
      var jsonData = {
        ...data,
        state_id: 5,
        district_id: 6,
        consistency_id: 3,
        mandal_id: filterValues.mandal?.mandal_pk ?? null,
        division_id: filterValues.division?.division_pk ?? null,
        sachivalayam_id: filterValues.sachivalayam?.sachivalayam_pk ?? null,
        part_no: filterValues.partno?.part_no ?? null,
        village_id: filterValues.village?.village_pk ?? null,
      };

      await instance.post(addVoters, jsonData);
      showAlert({ text: "Voter added successfully", color: "success" });
      reset();
      filterRef.current.reset();

      setLoading(false);
    } catch (error) {
      showAlert({
        text: error.response?.data?.error ?? "Something went wrong",
      });
      setLoading(false);
    }
  };

  return (
    <Page title="Add Voter">
      <Container maxWidth="xl">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Add Voter
        </Typography> */}
          <Card sx={{ p: 3, mt: 1, mb: 2 }}>
            <Typography sx={{ pb: 2 }}>Assign Authority</Typography>

            <Grid container spacing={2} alignItems="start">
              <SearchByFilter
                ref={filterRef}
                showOtherFilters={false}
                showSearchButton={false}
                onChanged={(value) => setFilterValues(value)}
                lg={3}
              />

              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="part_slno" label="Part SL No" />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography sx={{ pb: 2 }}>Basic Info</Typography>

            <Grid container spacing={2} alignItems="start">
              <Grid item xs={12} md={6} lg={3}>
                <RHFCheckbox name="isnewvoter" label="is New Voter?" />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  name="file"
                  type="file"
                  label="Upload Proof"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="voter_name" label="Voter Name" />
              </Grid>
              {isNewVoter == false && (
                <Grid item xs={12} md={6} lg={3}>
                  <RHFTextField name="voter_id" label="Voter ID" />
                </Grid>
              )}

              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="age" label="Age" />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <RHFRadio
                  name="guardian"
                  filedLabel="Guardian"
                  options={[
                    {
                      label: "Father",
                      value: 16,
                    },
                    {
                      label: "Mother",
                      value: 17,
                    },
                    {
                      label: "Husband",
                      value: 18,
                    },
                  ]}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="guardian_name" label="Guardian Name" />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="gender" label="Gender" select>
                  <MenuItem value={13}>Male</MenuItem>
                  <MenuItem value={14}>Female</MenuItem>
                  <MenuItem value={15}>Transgender</MenuItem>
                </RHFTextField>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField
                  name="phone_no"
                  label="Phone Number"
                  inputProps={{ maxLength: 10 }}
                />
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
                <RHFCheckbox name="resident" label="Resident" />
              </Grid>
              {resident == true && (
                <Grid item xs={12} md={6} lg={6}>
                  <RHFTextField
                    name="permenent_address"
                    label="Permenent Address"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>
              )}

              <Grid item xs={12} md={6} lg={5}>
                <RHFTextField
                  name="current_address"
                  label="Current Address"
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                lg={12}
                sx={{
                  marginLeft: "auto",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <LoadingButton
                  type="submit"
                  loading={isLoading}
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
        </FormProvider>
      </Container>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
  };
};

export default connect(mapStateToProps, { showAlert })(VoterRegistrationPage);
