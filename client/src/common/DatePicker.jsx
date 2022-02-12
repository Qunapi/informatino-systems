import { Controller } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import React from "react";

export const DatePicker = ({ control, name }) => {
  return (
    <Grid>
      <Grid sx={{ m: 2 }}>
        <Controller
          control={control}
          name={name}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => {
            return (
              <DesktopDatePicker
                label={name}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
                inputRef={ref}
              />
            );
          }}
        />
      </Grid>
    </Grid>
  );
};
