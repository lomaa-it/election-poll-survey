import { useFormContext, Controller } from "react-hook-form";
import { Select, TextField } from "@mui/material";

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
          value={typeof field.value === "number" && field.value === 0 ? "" : field.value}
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

export function UncontrolledTextField({ name, inputRef, onChange, ...other }) {
  return (
    <TextField
      {...other}
      name={name}
      size="small"
      inputRef={inputRef}
      onChange={onChange}
      fullWidth
      sx={{
        backgroundColor: "#fff",
        borderRadius: "5px",
      }}
    />
  );
}
