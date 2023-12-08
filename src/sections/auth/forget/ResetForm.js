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

const ResetForm = ({ showAlert }) => {
  const navigate = useNavigate();
  const props = useLocation().state;

  const [isLoading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    newpswd: Yup.string().required("Password is required").min(8, "Password must be at least 8 characters"),
    confirmpswd: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newpswd")], "Confirm password must be match"),
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
        <RHFTextField name="newpswd" label="New Password" type="password" />

        <RHFTextField name="confirmpswd" label="Confirm New Password" />
      </Stack>

      <LoadingButton fullWidth loading={isLoading} size="large" type="submit" variant="contained">
        Submit
      </LoadingButton>
    </FormProvider>
  );
};

export default connect(null, { showAlert })(ResetForm);
