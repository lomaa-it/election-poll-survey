import * as Yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/Iconify";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { connect } from "react-redux";
import { showAlert } from "../../../actions/alert";
import { isOtpValid } from "../../../constants";
import { RHFTextField2 } from "../../../components/hook-form/RHFTextField";
import {
  newPasswordUpdateRoute,
  saveNewPassword,
  userValidationwithPhonenoRoute,
} from "../../../utils/apis";
import instance from "../../../utils/axios";

const ForgetForm = ({
  showAlert,
  otpSent,
  setOtpSent,
  isVerified,
  setIsVerified,
}) => {
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
      const response = await instance.post(
        userValidationwithPhonenoRoute,
        jsonData
      );
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

  // const onOtpSubmit = async () => {
  //   setOtpError(null);

  //   if (!isOtpValid(otp)) {
  //     setOtpError("OTP must be 6 characters");
  //     return;
  //   }

  //   if (otp != otpSent) {
  //     setOtpError("Invalid OTP");
  //     return;
  //   }

  //   setLoading(true);
  //   navigate("/forget-reset-password", { replace: true });
  //   setLoading(false);
  // };

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
      const response = await instance.post(saveNewPassword, jsonData);
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
    return (
      <Stack spacing={3}>
        <Typography
          gutterBottom
          variant="body2"
          sx={{ color: "text.secondary" }}
        >
          Enter the OTP sent to +91 - {formValues?.username}
        </Typography>

        <TextField
          size="small"
          name="otp"
          label="OTP"
          fullWidth
          error={!!otpError}
          helperText={otpError}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <TextField
          size="small"
          name="new_password"
          label="New Password"
          fullWidth
          type="password"
          required
          value={passwordDetails?.new_password}
          onChange={(e) =>
            setPasswordDetails({
              ...passwordDetails,
              new_password: e.target.value,
            })
          }
        />
        <TextField
          size="small"
          name="confirm_password"
          label="Confirm Password"
          fullWidth
          type="password"
          required
          value={passwordDetails?.confirm_password}
          onChange={(e) =>
            setPasswordDetails({
              ...passwordDetails,
              confirm_password: e.target.value,
            })
          }
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
          onClick={onOtpSubmit}
        >
          Submit
        </LoadingButton>
      </Stack>
    );
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack my={3} spacing={3}>
        <RHFTextField2 name="username" label="User Name/Phone No" />
      </Stack>

      <LoadingButton
        fullWidth
        loading={isLoading}
        size="large"
        type="submit"
        variant="contained"
      >
        Verify
      </LoadingButton>
    </FormProvider>
  );
};

export default connect(null, { showAlert })(ForgetForm);
