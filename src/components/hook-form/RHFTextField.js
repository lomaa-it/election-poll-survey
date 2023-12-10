import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

export default function RHFTextField({ name, onChange, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          size="small"
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          onChange={(e) => {
            field.onChange(e.target.value);
            onChange && onChange(e);
          }}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

export function RHFTextField2({ name, onChange, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          size="small"
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          onChange={(e) => {
            // Check if the value is a number and its length is less than or equal to 10
            if (!isNaN(e.target.value) && e.target.value.length <= 10) {
              field.onChange(e.target.value);
              onChange && onChange(e);
            }
          }}
          error={!!error}
          helperText={error?.message}
          inputProps={{ maxLength: 10, pattern: "\\d*" }} // Add this line
          {...other}
        />
      )}
    />
  );
}
