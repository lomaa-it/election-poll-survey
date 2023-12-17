import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider } from "../../../components/hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import RHFTextField, {
  RHFTextField2,
} from "../../../components/hook-form/RHFTextField";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { saveNewPassword } from "../../../utils/apis";
import { Try } from "@mui/icons-material";
import instance from "../../../utils/axios";

const OtpSubmitForm = ({ formValues, showAlert }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const OtpSubmitSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .min(6, "OTP must be at least 6 characters"),
    new_password: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
  });

  const defaultValues = {
    otp: "",
    new_password: "",
    confirm_password: "",
  };

  const methods = useForm({
    resolver: yupResolver(OtpSubmitSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await instance.post(saveNewPassword, {
        otp: data.otp,
        username: formValues.username,
        password: data.confirm_password,
      });
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        showAlert({ text: "Password Updated Successfully", color: "success" });

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      showAlert({ text: error.message, color: "error" });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        Enter OTP sent to your {`+91(${formValues?.username})`}
      </Typography>
      <Stack spacing={3}>
        <RHFTextField name="otp" label="OTP" />

        <RHFTextField2
          name="new_password"
          label="New Password"
          type="password"
        />

        <RHFTextField2 name="confirm_password" label="Confirm Password" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Submit
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default OtpSubmitForm;
