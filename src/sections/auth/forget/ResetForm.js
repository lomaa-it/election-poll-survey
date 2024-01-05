import * as Yup from "yup";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { connect } from "react-redux";
import { showAlert } from "../../../actions/alert";
import instance from "../../../utils/axios";
import { resetPswdRoute } from "../../../utils/apis";
import Iconify from "../../../components/Iconify";
import ApiServices from "../../../services/apiservices";

const ResetForm = ({ showAlert }) => {
  const navigate = useNavigate();
  const props = useLocation().state;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    newpswd: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Password must have at least: 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    // ),
    confirmpswd: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newpswd")], "Confirm password must match"),
  });

  const defaultValues = {
    newpswd: "",
    confirmpswd: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(props);

    try {
      var jsonData = {
        user_pk: props?.user_pk,
        password: data.newpswd,
      };

      await instance.post(resetPswdRoute, jsonData);

      setLoading(false);
      showAlert({ text: "Password reset completed", color: "success" });

      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      showAlert({ text: "Something went wrong" });
      setLoading(false);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack my={3} spacing={3}>
        <RHFTextField
          name="newpswd"
          label="New Password"
          type={showPassword ? "text" : "password"}
          inputProps={{ maxLength: 10 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmpswd"
          label="Confirm New Password"
          type={showConfirmPassword ? "text" : "password"}
          inputProps={{ maxLength: 10 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth loading={isLoading} size="large" type="submit" variant="contained">
        Submit
      </LoadingButton>
    </FormProvider>
  );
};

export default connect(null, { showAlert })(ResetForm);
