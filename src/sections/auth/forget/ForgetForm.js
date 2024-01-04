import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/Iconify";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { connect } from "react-redux";
import { showAlert } from "../../../actions/alert";
import { newPasswordUpdateRoute, saveNewPassword, userValidationwithPhonenoRoute } from "../../../utils/apis";
import instance from "../../../utils/axios";
import OtpSubmitForm from "./OtpSubmitForm";
import ApiServices from "../../../services/apiservices";

const ForgetForm = ({ showAlert, otpSent, setOtpSent, isVerified, setIsVerified }) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  // const [otpSent, setOtpSent] = useState(null);
  const [otp, setOtp] = useState(null);
  const [otpError, setOtpError] = useState();
  const [passwordDetails, setPasswordDetails] = useState(null);

  const [formValues, setFormValues] = useState(null);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Phone Number is required"),
  });

  const defaultValues = {
    username: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    // showAlert({ text: "We will sent reset password link to your email.", color: "success" });
    // navigate("/reset-password");

    try {
      var jsonData = {
        username: data.username,
      };
      console.log("jsondata", jsonData);
      const response = await ApiServices.postRequest(userValidationwithPhonenoRoute, jsonData);
      console.log("phione response", response);
      if (response.status == 200) {
        showAlert({ text: `${response.data?.message}`, color: "success" });
      } else {
        showAlert({ text: "Invalid Phone Number", color: "error" });
      }
    } catch (error) {
      console.error(error);
      showAlert({ text: "Invalid Phone Number", color: "error" });
      setLoading(false);
      return;
    }

    setOtpSent("123456");
    setFormValues(data);
    setLoading(false);
  };

  const onOtpSubmit = async () => {
    setOtpError(null);

    const { new_password, confirm_password } = passwordDetails;

    if (new_password !== confirm_password) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      var jsonData = {
        username: formValues?.username,
        otp: otp,
        password: passwordDetails?.confirm_password,
      };
      console.log("jsondata", jsonData);
      const response = await ApiServices.postRequest(saveNewPassword, jsonData);
      console.log("phione response", response);
      if (response.status == 200) {
        showAlert({ text: `${response.data?.message}`, color: "success" });
        navigate("/login", { replace: true });
      } else {
        showAlert({ text: "Invalid OTP", color: "error" });
      }
    } catch (error) {
      console.error(error);
      showAlert({ text: "Invalid OTP", color: "error" });
      setLoading(false);
      return;
    }
  };

  if (!!otpSent) {
    return <OtpSubmitForm formValues={formValues} showAlert={showAlert} />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack my={3} spacing={3}>
        <RHFTextField name="username" label="User Name/Phone No" />
      </Stack>

      <LoadingButton fullWidth loading={isLoading} size="large" type="submit" variant="contained">
        Verify
      </LoadingButton>
    </FormProvider>
  );
};

export default connect(null, { showAlert })(ForgetForm);
