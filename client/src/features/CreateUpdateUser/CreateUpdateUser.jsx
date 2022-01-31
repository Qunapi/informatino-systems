import { NavBar } from "../../common/Common";
import { useForm, Controller } from "react-hook-form";
import { Button, Grid, Paper, TextField } from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import React from "react";

export const CreateUpdateUser = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <>
      <NavBar />
      <Paper
        sx={(theme) => ({
          margin: theme.spacing(2),
          padding: theme.spacing(2),
        })}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <TextField
            sx={{ m: 2 }}
            {...register("Surname")}
            label="Surname"
            variant="outlined"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("Name")}
            label="Name"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("MiddleName")}
            label="MiddleName"
            variant="outlined"
            required
          />
          <Grid sx={{ m: 2 }}>
            <Controller
              control={control}
              name="DateOfBirth"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => {
                console.log(value);
                return (
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="MM/dd/yyyy"
                    onBlur={onBlur}
                    selected={value || {}}
                    onChange={onChange}
                    renderInput={(params) => <TextField {...params} />}
                    inputRef={ref}
                  />
                );
              }}
            />
          </Grid>
          <Button variant="contained" color="success" type="submit">
            Success
          </Button>
        </form>
      </Paper>
    </>
  );
};

// Surname: String,
// Name: String,
// MiddleName: String,
// DateOfBirth: Date,
// PassportSerialNumber: String,
// PassportNumber: String,
// PlaceOfIssue: String,
// DateOfIssue: Date,
// IdentificationalNumber: String,
// PlaceOfBirth: String,
// HomeCity: String,
// HomeAddress: String,
// HomeTelephone: String,
// MobileTelephone: String,
// EMail: String,
// PlaceOfWork: String,
// Position: String,
// FamilyStatus: String,
// Citizenship: String,
// Disability: String,
// Retiree: Boolean,
// Sallary: Number,
// IsConscript: Boolean,
