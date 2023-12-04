import React from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

export default function RHFAutoComplete({ name, value, options, getOptionLabel, onChange, loading, disabled = false, ...other }) {
  return (
    <Autocomplete
      fullWidth
      size="small"
      name={name}
      value={value}
      options={options ?? []}
      getOptionLabel={getOptionLabel}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "5px",
      }}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          {...other}
        />
      )}
      onChange={(e, value) => onChange(name, value)}
    />
  );
}
