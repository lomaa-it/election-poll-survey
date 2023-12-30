import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Container, Typography, Box, TextField, Card, FormControlLabel, MenuItem } from "@mui/material";
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckBox } from "@mui/icons-material";
import { createUsersRoute } from "../utils/apis";
import { useEffect, useRef, useState } from "react";
import instance from "../utils/axios";
import { set } from "date-fns";
import { showAlert } from "../actions/alert";
import { FormProvider, RHFTextField } from "../components/hook-form";
import SearchByFilter from "../sections/common/SearchByFilter";
import { phoneRegExp } from "../constants";

const PRIORITY1 = [33, 34, 35, 36, 37, 38];
const PRIORITY2 = [34, 35, 36, 37, 38];
const PRIORITY3 = [35, 36, 37, 38];
const PRIORITY4 = [36, 37, 38];

const UserRegistrationPage = ({ account, common, showAlert }) => {
  const props = useLocation().state;
  const navigate = useNavigate();
  const filterRef = useRef(null);

  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const pageName = props?.userData == null ? "Add User" : "Edit User";

  const schema = Yup.object().shape({
    user_displayname: Yup.string().required("Full name is required"),
    username: Yup.string().matches(phoneRegExp, "User Name is not valid").required("User Name is required"),
    // password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    phone_no: Yup.string().test("phone_no", "Phone number is not valid", function (value) {
      if (!value || value.length === 0) {
        return true;
      }
      return phoneRegExp.test(value);
    }),
    age: Yup.string(),
    email: Yup.string().email(),
    designation_id: Yup.string().required("Designation id is required"),
  });

  const defaultValues = {
    user_displayname: props?.userData?.user_displayname ?? "",
    username: props?.userData?.username ?? "",
    // password: props?.userData?.password ?? "",
    phone_no: props?.userData?.phone_no ?? "",
    age: props?.userData?.age ?? "",
    email: props?.userData?.email ?? "",
    designation_id: props?.userData?.designation_id ?? "",
    mandal_pk: props?.userData?.mandal_pk ?? "",
    division_pk: props?.userData?.division_pk ?? "",
    sachivalayam_pk: props?.userData?.sachivalayam_pk ?? "",
    part_no: props?.userData?.part_no ?? null,
    village_pk: props?.userData?.village_pk ?? null,
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const designation_id = watch("designation_id");

  const onSubmit = async (data) => {
    var hasErrors = false;
    filterRef.current.setErrors({
      mandal: null,
      division: null,
      sachivalayam: null,
      partno: null,
    });
    const designationId = Number(data.designation_id);

    if (PRIORITY1.includes(designationId) && !filterValues["mandal"]) {
      filterRef.current.setErrors({ mandal: "Mandal is required" });
      hasErrors = true;
    }

    if (PRIORITY2.includes(designation_id) && !filterValues["division"]) {
      filterRef.current.setErrors({ division: "Division is required" });
      hasErrors = true;
    }

    if (PRIORITY3.includes(designation_id) && !filterValues["sachivalayam"]) {
      filterRef.current.setErrors({ sachivalayam: "Sachivalayam is required" });
      hasErrors = true;
    }

    if (PRIORITY4.includes(designation_id) && !filterValues["partno"]) {
      filterRef.current.setErrors({ partno: "Part no is required" });
      hasErrors = true;
    }

    if (hasErrors) return;

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

      if (props?.userData != null) {
        await instance.put(`${createUsersRoute}/${props.userData.user_pk}`, { ...jsonData, updatedby: account.user?.user_pk });
        showAlert({ text: "User updated successfully", color: "success" });
        navigate(-1);
      } else {
        await instance.post(createUsersRoute, { ...jsonData, createdby: account.user?.user_pk });
        showAlert({ text: "User added successfully", color: "success" });
        reset();
        filterRef.current.reset();
        setFilterValues(null);
      }

      setLoading(false);
    } catch (error) {
      showAlert({ text: error.response?.data?.error ?? "Something went wrong" });
      setLoading(false);
    }
  };

  return (
    <Page title={pageName}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 1 }}>
            {pageName}
          </Typography>

          <Card sx={{ p: 3 }}>
            <Typography sx={{ pb: 2 }}>Basic Info</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="user_displayname" label="Full name *" />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField
                  name="username"
                  label="Username/Phone Number *"
                  inputProps={{ maxLength: 10 }}
                  onKeyDown={(event) => {
                    if (!/[0-9]/.test(event.key) && !["Backspace", "ArrowRight", "ArrowLeft"].includes(event.key)) {
                      event.preventDefault();
                    }
                    if (event.key === "Enter") {
                      document.getElementsByName("phone_no")[0].focus();
                    }
                  }}
                />
              </Grid>

              {/* <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="password" label="Password *" />
              </Grid> */}

              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField
                  name="phone_no"
                  label="Office Phone Number"
                  inputProps={{ maxLength: 10 }}
                  onKeyDown={(event) => {
                    if (!/[0-9]/.test(event.key) && !["Backspace", "ArrowRight", "ArrowLeft"].includes(event.key)) {
                      event.preventDefault();
                    }
                    if (event.key === "Enter") {
                      document.getElementsByName("age")[0].focus();
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="age" label="Age" />
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="email" label="Email" />
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ p: 3, mt: 1 }}>
            <Typography sx={{ pb: 2 }}>Assign Authority</Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField
                  name="designation_id"
                  label="Select Designation*"
                  select
                  onChange={() => {
                    setFilterValues(null);
                    filterRef.current.reset();
                  }}
                >
                  {common.designation?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFTextField>
              </Grid>

              <SearchByFilter
                ref={filterRef}
                lg={3}
                defaultValues={defaultValues}
                showMandal={PRIORITY1.includes(designation_id)}
                showDivision={PRIORITY2.includes(designation_id)}
                showSachivalayam={PRIORITY3.includes(designation_id)}
                showPartNo={PRIORITY4.includes(designation_id)}
                showVillage={false}
                showOtherFilters={false}
                showSearchButton={false}
                onChanged={(value) => setFilterValues(value)}
              />
            </Grid>
          </Card>

          <Box sx={{ pt: 2, textAlign: "end" }}>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              Submit
            </LoadingButton>
          </Box>

          {/* <Card sx={{ p: 3, mt: 1 }}>
            <Typography sx={{ pb: 2 }}>Assign Authority</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6} lg={2}>
                <FormControlLabel control={<CheckBox />} label="View" />
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <FormControlLabel control={<CheckBox />} label="Add" />
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <FormControlLabel control={<CheckBox />} label="Update" />
              </Grid>
              <Grid item xs={12} md={6} lg={2}>
                <FormControlLabel control={<CheckBox />} label="Delete" />
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                lg={2}
                sx={{
                  marginLeft: "auto",
                }}
              >
                {userData === null ? (
                  <LoadingButton
                    loading={isLoading}
                    onClick={handleSubmit}
                    variant="contained"
                    sx={{
                      padding: "15px 40px",
                    }}
                  >
                    Submit
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    loading={isLoading}
                    onClick={handleEditComplete}
                    variant="contained"
                    sx={{
                      padding: "15px 20px",
                    }}
                  >
                    Update Details
                  </LoadingButton>
                )}
              </Grid>
            </Grid>
          </Card> */}
        </Container>
      </FormProvider>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.auth,
    common: state.common,
  };
};

export default connect(mapStateToProps, { showAlert })(UserRegistrationPage);
