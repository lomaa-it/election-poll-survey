import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, FormControlLabel, FormGroup, RadioGroup, FormControl, Radio, FormLabel } from "@mui/material";

export function RHFCheckbox({ name, onChange, value, disabled, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          disabled={disabled}
          render={({ field }) => (
            <Checkbox
              {...field}
              disabled={disabled}
              checked={value == null ? field.value : value}
              onChange={(e) => {
                field.onChange(e.target.checked);
                onChange && onChange(e);
              }}
            />
          )}
        />
      }
      {...other}
    />
  );
}

export function RHFMultiCheckbox({ name, options, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const onSelected = (option) => (field.value.includes(option) ? field.value.filter((value) => value !== option) : [...field.value, option]);

        return (
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel key={option.value} control={<Checkbox checked={field.value.includes(option.value)} onChange={() => field.onChange(onSelected(option.value))} />} label={option.label} {...other} />
            ))}
          </FormGroup>
        );
      }}
    />
  );
}

export function RHFRadio({ name, filedLabel, options, onChange, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControl>
      <FormLabel>{filedLabel}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup row {...field}>
            {options?.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={item.custom ? item.custom : <Radio />}
                label={item.label}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                  onChange && onChange(e);
                }}
                {...other}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
}
