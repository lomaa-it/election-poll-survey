import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, IconButton, InputAdornment, TextField, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/Iconify";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
import { connect } from "react-redux";
import { authSuccess } from "../../../actions/auth";
import { showAlert } from "../../../actions/alert";
import { LOGIN_TYPES, PUBLIC_URL, phoneRegExp } from "../../../constants";
import instance from "../../../utils/axios";
import { getAuthPermissionListRoute, getPermissionListRoute, loginRoute } from "../../../utils/apis";
import { he } from "date-fns/locale";
import CachedIcon from "@mui/icons-material/Cached";
import ApiServices from "../../../services/apiservices";
import { getAccessNavConfig } from "../../../layouts/dashboard/nav/config";

const LoginForm = ({ showAlert, authSuccess }) => {
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const canvasRef = useRef(null);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
    password: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    //   "Password must have at least: 1 uppercase, 1 lowercase, 1 number, and 1 special character."
    // ),
    captcha: Yup.string().required("Captcha is required"),
  });

  const defaultValues = {
    username: "",
    password: "",
    captcha: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  /// catpcha code

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    initializeCaptcha(ctx);
  }, []);

  const generateRandomChar = (min, max) => String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

  const generateCaptchaText = () => {
    let captcha = "";
    for (let i = 0; i < 2; i++) {
      captcha += generateRandomChar(65, 90);
      captcha += generateRandomChar(97, 122);
      captcha += generateRandomChar(48, 57);
    }
    return captcha
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
    const letterSpace = 150 / captcha.length;
    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25;
      ctx.font = "20px Roboto Mono";
      ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
      ctx.fillText(captcha[i], xInitialSpace + i * letterSpace, Math.floor(Math.random() * 16 + 25), 100);
    }
  };

  const initializeCaptcha = (ctx) => {
    setUserInput("");
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  ////

  const { handleSubmit, resetField } = methods;

  const onSubmit = async (data) => {
    if (data.captcha !== captchaText) {
      showAlert({ text: "Incorrect captcha" });
      resetField("captcha");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      initializeCaptcha(ctx);
      return;
    }

    setLoading(true);
    try {
      const response = await instance.post(loginRoute, data);
      const responseData = response.data?.message ?? [];
      const userPermissionsResponse = await instance.post(getAuthPermissionListRoute, { designation_id: responseData?.desgination_id ?? null });
      const userPermissionsData = userPermissionsResponse.data?.message ?? [];
      responseData.permissions = userPermissionsData;

      console.log("responseData", responseData);
      setLoading(false);
      console.log("responseData", responseData.length);

      if (responseData) {
        var userData = responseData;
        if (userData.is_first_login == 1) {
          navigate("/reset-password", { replace: true, state: userData });
        } else {
          authSuccess(userData);

          const accessPages = getAccessNavConfig(userData.permissions);
          if (accessPages.length > 0) {
            const accessPath = accessPages[0].children ? accessPages[0].children[0].path : accessPages[0].path;
            navigate(accessPath, { replace: true });
          } else {
            console.log("No pages available");
          }
        }

        return;
      } else {
        showAlert({ text: "Invalid Credientials" });
      }
    } catch (error) {
      console.error(error);
      showAlert({ text: "Invalid Credientials" });
      setLoading(false);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1.5}>
        <RHFTextField name="username" label="User Name" type="number" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
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
        {/* <Box component="img" src={PUBLIC_URL + "/static/images/captcha.jpg"} sx={{ width: "150px" }} /> */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",

            gap: "1rem",
            height: "50px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              border: "2px solid #73B97F",
              borderRadius: "20px",
            }}
          >
            <canvas ref={canvasRef} width="195" height="46"></canvas>
          </Box>
          <CachedIcon onClick={() => initializeCaptcha(canvasRef.current.getContext("2d"))} />
        </Box>
        {/* <img
          className="captcha-image"
          src="https://miro.medium.com/v2/resize:fit:1024/0*obnHri9w__4Cmhbj.jpg"
          alt="captcha"
        /> */}

        <RHFTextField
          name="captcha"
          label="Enter Captcha"
          sx={{
            height: "35px",
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 1 }}>
        <Link to="/forget-password" underline="hover" style={{ fontSize: 16 }}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth loading={isLoading} size="medium" type="submit" variant="contained">
        Login
      </LoadingButton>
    </FormProvider>
  );
};

export default connect(null, { showAlert, authSuccess })(LoginForm);
