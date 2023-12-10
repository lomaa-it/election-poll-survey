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
  Box,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/Iconify";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { connect } from "react-redux";
import { authSuccess } from "../../../actions/auth";
import { showAlert } from "../../../actions/alert";
import { LOGIN_TYPES, PUBLIC_URL, phoneRegExp } from "../../../constants";
import instance from "../../../utils/axios";
import { loginRoute } from "../../../utils/apis";
import { RHFTextField2 } from "../../../components/hook-form/RHFTextField";

const LoginForm = ({ showAlert, authSuccess }) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    phone_no: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
    password: Yup.string().required("Password is required").min(4, "Password must be at least 4 characters"),
  });

  const defaultValues = {
    phone_no: "",
    password: "",
    captcha: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await instance.post(loginRoute, data);
      const responseData = response.data?.message ?? [];
      console.log(responseData);
      setLoading(false);

      if (responseData.length == 1) {
        var userData = responseData[0];
        if (userData.is_first_login == 1) {
          navigate("/reset-password", { replace: true, state: userData });
        } else {
          authSuccess(userData);

          if (userData.desgination_name == LOGIN_TYPES[6]) {
            navigate("/gruhasarathi/opinionsurvey/survey", { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
        }

        return;
      } else {
        showAlert({ text: "Invalid Credientials" });
      }
    } catch (error) {
      console.error(error);
      showAlert({ text: "Something went wrong" });
      setLoading(false);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <RHFTextField2 name="phone_no" label="Phone number" type="number" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box
          component="img"
          src={PUBLIC_URL + "/static/images/captcha.jpg"}
          sx={{ width: "55%" }}
        />
        {/* <img
          className="captcha-image"
          src="https://miro.medium.com/v2/resize:fit:1024/0*obnHri9w__4Cmhbj.jpg"
          alt="captcha"
        /> */}

        <RHFTextField name="captcha" label="Enter Captcha" />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="end"
        sx={{ my: 1 }}
      >
        <Link to="/forget-password" variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        loading={isLoading}
        size="medium"
        type="submit"
        variant="contained"
      >
        Login
      </LoadingButton>
    </FormProvider>
  );
};

export default connect(null, { showAlert, authSuccess })(LoginForm);
