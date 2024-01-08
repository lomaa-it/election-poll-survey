import { Grid, Container, Typography, Box, TextField, Card, FormControlLabel, MenuItem } from "@mui/material";
import * as Yup from "yup";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";

import { useEffect, useRef, useState } from "react";
import SearchByFilter from "../sections/common/SearchByFilter";
import { numRegExp, phoneRegExp } from "../constants";
import { FormProvider, RHFCheckbox, RHFRadio, RHFTextField } from "../components/hook-form";
import instance from "../utils/axios";
import { showAlert } from "../actions/alert";
import { addVoters } from "../utils/apis";
import { useLocation, useNavigate } from "react-router-dom";
import { is } from "date-fns/locale";
import ApiServices from "../services/apiservices";

const VoterRegistrationPage = ({ account, showAlert }) => {
  const props = useLocation().state;
  const navigate = useNavigate();
  const filterRef = useRef(null);

  const [isLoading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    mandal: null,
    division: null,
    sachivalayam: null,
    partno: null,
    village: null,
  });

  const pageName = props?.voterData == null ? "Add Voter" : "Edit Voter";

  const schema = Yup.object().shape({
    voter_name: Yup.string().required("Voter name is required"),
    guardian: Yup.string().required("Voter name is required"),
    guardian_name: Yup.string().required("Guardian name is required"),
    is_newregistration: Yup.boolean(),
    voter_id: Yup.string(),
    age: Yup.string().matches(numRegExp, "Must be only digits").max(2, "Age should be less than 100").required("Age is required"),
    phone_no: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    is_resident: Yup.boolean(),
    permenent_address: Yup.string(),
    current_address: Yup.string().required("Current address is required"),
    part_slno: Yup.string(),
    gender: Yup.string().required("Gender is required"),
  });

  console.log("props for edit", props?.voterData);
  const defaultValues = {
    voter_name: props?.voterData?.voter_name ?? "",
    guardian: props?.voterData?.guardian ?? "16",
    guardian_name: props?.voterData?.guardian_name ?? "",
    voter_id: props?.voterData?.voter_id ?? "",
    age: props?.voterData?.voter_age ?? "",
    phone_no: props?.voterData?.voter_phone_no ?? "",
    permenent_address: props?.voterData?.permenent_address ?? "",
    current_address: props?.voterData?.current_address ?? "",
    part_slno: props?.voterData?.part_slno ?? "",
    gender: props?.voterData?.gender ?? "",
    is_newregistration: props?.voterData?.is_newregistration ?? false,
    is_resident: props?.voterData?.is_resident ?? false,
  };

  const filterDefaultValues = {
    mandal_pk: props?.voterData?.mandal_id ?? "",
    division_pk: props?.voterData?.division_id ?? "",
    sachivalayam_pk: props?.voterData?.sachivalayam_id ?? "",
    part_no: props?.voterData?.part_no ?? null,
    village_pk: props?.voterData?.village_id ?? null,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, watch, setError, clearErrors } = methods;
  const resident = watch("is_resident");
  const isNewVoter = watch("is_newregistration");

  console.log("resident", resident);
  console.log("isNewVoter", isNewVoter);
  useEffect(() => {
    filterRef.current.reset();
  }, [isNewVoter]);

  const onSubmit = async (data) => {
    clearErrors();

    console.log("data", data.is_newregistration);
    if (data.is_newregistration == false && data.part_slno == "") {
      setError("part_slno", {
        message: "Part SL No is required",
      });

      console.log("Part SL No is required");
      return;
    }
    if (data.is_newregistration == false && data.voter_id == "") {
      setError("voter_id", {
        message: "Voter ID is required",
      });
      console.log("Voter ID is required");
      return;
    }

    if (data.is_resident == true && data.permenent_address == "") {
      setError("permenent_address", {
        message: "Permenent address is required",
      });
      console.log("Permenent address is required");
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

    if (!filterValues["partno"] && data.is_newregistration == false) {
      filterRef.current.setErrors({ partno: "Part no is required" });
      hasErrors = true;
    }

    if (!filterValues["village"]) {
      filterRef.current.setErrors({ village: "Village is required" });
      hasErrors = true;
    }

    if (hasErrors) return;

    setLoading(true);
    if (props?.voterData == null) {
      try {
        var jsonData = {
          ...data,
          part_slno: data.part_slno == "" ? null : data.part_slno,
          state_id: account.user?.state_pk ?? null,
          district_id: account.user?.district_pk ?? null,
          consistency_id: account.user?.consistency_pk ?? null,
          mandal_id: filterValues.mandal?.mandal_pk ?? null,
          division_id: filterValues.division?.division_pk ?? null,
          sachivalayam_id: filterValues.sachivalayam?.sachivalayam_pk ?? null,
          part_no: filterValues.partno?.part_no ?? null,
          village_id: filterValues.village?.village_pk ?? null,
          createdby: account.user.user_pk,
        };

        await ApiServices.postRequest(addVoters, jsonData);
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
    } else {
      try {
        var jsonData = {
          ...data,
          part_slno: data.part_slno == "" ? null : data.part_slno,
          state_id: account.user?.state_pk ?? null,
          district_id: account.user?.district_pk ?? null,
          consistency_id: account.user?.consistency_pk ?? null,
          mandal_id: filterValues.mandal?.mandal_pk ?? null,
          division_id: filterValues.division?.division_pk ?? null,
          sachivalayam_id: filterValues.sachivalayam?.sachivalayam_pk ?? null,
          part_no: filterValues.partno?.part_no ?? null,
          village_id: filterValues.village?.village_pk ?? null,
          updatedby: account.user.user_pk,
        };

        await ApiServices.putRequest(`${addVoters}/${props.voterData.voter_pkk}`, jsonData);
        showAlert({ text: "Voter Update successfully", color: "success" });
        reset();
        filterRef.current.reset();

        setLoading(false);
        navigate(-1);
      } catch (error) {
        showAlert({
          text: error.response?.data?.error ?? "Something went wrong",
        });
        setLoading(false);
      }
    }
  };

  return (
    <Page title={pageName}>
      <Container maxWidth="xl">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {/* <Typography variant="h4" sx={{ mb: 1 }}>
          Add Voter
        </Typography> */}
          <Card sx={{ p: 3, mt: 1, mb: 2 }}>
            <Grid
              container
              spacing={2}
              alignItems="start"
              sx={{
                marginBottom: "20px",
              }}
            >
              <Grid item xs={12} md={6} lg={6}>
                {/* <RHFCheckbox name="is_newregistration" label="is New Voter?" /> */}
                <RHFTextField name="is_newregistration" label="Voter Type?" select>
                  <MenuItem value={false}>New voter</MenuItem>
                  <MenuItem value={true}>New Registration</MenuItem>
                </RHFTextField>
              </Grid>
            </Grid>
            {/* <Typography sx={{ pb: 2 }}>Assign Authority</Typography> */}

            <Grid container spacing={2} alignItems="start">
              <SearchByFilter
                ref={filterRef}
                defaultValues={filterDefaultValues}
                showOtherFilters={false}
                addVoterVillage={isNewVoter ? true : false}
                showVillage={isNewVoter ? false : true}
                showSearchButton={false}
                showPartNo={isNewVoter ? false : true}
                onChanged={(value) => setFilterValues(value)}
                addVoterVillageLg={6}
                lg={3}
              />
              {isNewVoter == false && (
                <Grid item xs={12} md={6} lg={6}>
                  <RHFTextField name="part_slno" label="Part SL No" />
                </Grid>
              )}

              {/* <Typography sx={{ pb: 2 }}>Basic Info</Typography> */}

              {isNewVoter == false && (
                <Grid item xs={12} md={6} lg={6}>
                  <RHFTextField name="voter_id" label="Voter ID" />
                </Grid>
              )}
              <Grid item xs={12} md={6} lg={6}>
                <RHFTextField name="voter_name" label="Voter Name" />
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
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

              <Grid item xs={12} md={6} lg={6} alignSelf={"flex-end"}>
                <RHFTextField name="guardian_name" label="Guardian Name" />
              </Grid>

              <Grid item xs={12} md={6} lg={6} alignSelf={"flex-end"}>
                <RHFTextField name="gender" label="Gender" select>
                  <MenuItem value={13}>Male</MenuItem>
                  <MenuItem value={14}>Female</MenuItem>
                  <MenuItem value={15}>Transgender</MenuItem>
                </RHFTextField>
              </Grid>
              <Grid item xs={12} md={6} lg={6} alignSelf={"flex-end"}>
                <RHFTextField name="age" label="Age" />
              </Grid>

              {resident == true && (
                <Grid item xs={12} md={6} lg={6}>
                  <RHFTextField name="permenent_address" label="Permenent Address" multiline rows={4} fullWidth />
                </Grid>
              )}

              <Grid item xs={12} md={6} lg={6}>
                <RHFTextField name="current_address" label="Current Address" multiline rows={4} fullWidth />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <RHFTextField name="phone_no" label="Phone Number" inputProps={{ maxLength: 10 }} />
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <RHFCheckbox name="is_resident" label="Is Resident" />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  name="file"
                  type="file"
                  size="large"
                  label="Upload Proof"
                  InputLabelProps={{
                    shrink: true,
                  }}
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
    account: state.auth,
  };
};

export default connect(mapStateToProps, { showAlert })(VoterRegistrationPage);
