import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import Page from "../components/Page";
import { connect } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckBox } from "@mui/icons-material";
import {
  getAllDesignationsRoute,
  getAllStatesRoute,
  getAllDistrictsRoute,
  getAllConstituenciesRoute,
  getAllMandalRoute,
  getAllDivisionRoute,
  getAllSachivalayamRoute,
  getAllPartsRoute,
  getAllVillageRoute,
  createUsersRoute,
} from "../utils/apis";
import { useEffect, useState } from "react";
import instance from "../utils/axios";
import { set } from "date-fns";
import { showAlert } from "../actions/alert";
import { FormProvider, RHFTextField } from "../components/hook-form";
import SearchByFilter from "../sections/common/SearchByFilter";
import { phoneRegExp } from "../constants";

const UserRegistrationPage = ({ common, showAlert }) => {
  const props = useLocation().state;

  const pageName = props?.userData == null ? "Add User" : "Edit User";
  const navigate = useNavigate();

  const [filterValues, setFilterValues] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const schema = Yup.object().shape({
    user_displayname: Yup.string().required("Full name is required"),
    username: Yup.string()
      .matches(phoneRegExp, "User Name is not valid")
      .required("User Name is required"),
    // password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    phone_no: Yup.string().test(
      "phone_no",
      "Phone number must start with 6, 7, 8, or 9",
      function (value) {
        if (!value || value.length === 0) {
          return true; // bypass the test if the phone number is not provided
        }
        return /^[6-9]\d*$/.test(value); // test the phone number if it's provided
      }
    ),
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
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { handleSubmit, reset, watch } = methods;
  const watchedFields = watch();

  const onSubmit = async (data) => {
    if (
      !filterValues["mandal"] ||
      !filterValues["division"] ||
      !filterValues["sachivalayam"]
    ) {
      showAlert({ text: "Please select mandal & division & sachivalyam" });
      return;
    }

    setLoading(true);
    try {
      var jsonData = {
        ...data,
        state_id: 5,
        district_id: 6,
        consistency_id: 3,
        mandal_id: filterValues.mandal.mandal_pk,
        division_id: filterValues.division.division_pk,
        sachivalayam_id: filterValues.sachivalayam.sachivalayam_pk,
      };
      console.log("props?.userData", props?.userData);

      if (props?.userData != null) {
        await instance.put(
          `${createUsersRoute}/${props.userData.user_pk}`,
          jsonData
        );
        showAlert({ text: "User updated successfully", color: "success" });

        navigate(-1);

        reset();
      } else {
        await instance.post(createUsersRoute, jsonData);
        showAlert({ text: "User added successfully", color: "success" });
        reset();
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      showAlert({ text: "Something went wrong" });
      setLoading(false);
    }
  };

  console.log("props?.userData", props?.userData);
  console.log("watchedFields", watchedFields); // This will log the current form data whenever it changes

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
                <RHFTextField name="username" label="Username/Phone Number *" />
              </Grid>

              {/* <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="password" label="Password *" />
              </Grid> */}

              <Grid item xs={12} md={6} lg={3}>
                <RHFTextField name="phone_no" label="Office Phone Number" />
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
                >
                  {common.designation?.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFTextField>
              </Grid>
              {watchedFields.designation_id == 33 && (
                <Grid item xs={12} md={6} lg={3}>
                  <RHFTextField name="mandal_pk" label="Select Mandal*" select>
                    {common.mandals?.map((item, index) => (
                      <MenuItem key={index} value={item.mandal_pk}>
                        {item.mandal_name}
                      </MenuItem>
                    ))}
                  </RHFTextField>
                </Grid>
              )}

              <SearchByFilter
                lg={3}
                defaultValues={defaultValues}
                showPartNo={false}
                showVillage={false}
                showOtherFilters={false}
                showSearchButton={false}
                onChanged={(value) => setFilterValues(value)}
              />
            </Grid>
          </Card>

          <Box sx={{ pt: 2, textAlign: "end" }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
            >
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
    common: state.common,
  };
};

export default connect(mapStateToProps, { showAlert })(UserRegistrationPage);
