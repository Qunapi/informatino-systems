import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox, Grid, Typography } from "@mui/material";

export const CheckboxComponent = ({ control, name }) => {
  return (
    <Grid direction="row" container alignItems="center" justifyContent="center">
      <Typography
        sx={(theme) => ({
          textDecoration: "none",
          padding: theme.spacing(2),
        })}
        variant="h6"
        component="div"
      >
        {name}
      </Typography>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <Checkbox
            onBlur={onBlur} // notify when input is touched
            onChange={onChange} // send value to hook form
            checked={value}
            inputRef={ref}
          />
        )}
      />
    </Grid>
  );
};
