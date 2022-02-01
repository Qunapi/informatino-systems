import { NavBar } from "../../common/Common";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import React from "react";
import { userService } from "../../services/userService";

export const CreateUpdateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      Surname: "sa",
      Name: "asdf",
      MiddleName: "asdf",
      PassportSerialNumber: "asdfasdf",
      PassportNumber: "asdf",
      PlaceOfIssue: "asdf",
      IdentificationalNumber: "asdf",
      PlaceOfBirth: "asdf",
      HomeCity: "asdf",
      HomeAddress: "asdf",
      HomeTelephone: "asdf",
      MobileTelephone: "asdf",
      EMail: "asdf",
      PlaceOfWork: "asdf",
      Position: "asdf",
      FamilyStatus: "asdf",
      Citizenship: "asdf",
      Disability: "asdf",
      Sallary: "45321",
      DateOfBirth: "2022-02-03T16:04:31.000Z",
      DateOfIssue: "2022-02-10T16:04:35.000Z",
      IsRetiree: true,
      IsConscript: true,
    },
  });
  const onSubmit = (data) => {
    userService.createUser(data);
  };

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
                return (
                  <DesktopDatePicker
                    label="DateOfBirth"
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
          <TextField
            sx={{ m: 2 }}
            {...register("PassportSerialNumber")}
            label="PassportSerialNumber"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("PassportNumber")}
            label="PassportNumber"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("PlaceOfIssue")}
            label="PlaceOfIssue"
            variant="outlined"
            required
          />
          <Grid sx={{ m: 2 }}>
            <Controller
              control={control}
              name="DateOfIssue"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => {
                return (
                  <DesktopDatePicker
                    label="DateOfIssue"
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
          <TextField
            sx={{ m: 2 }}
            {...register("IdentificationalNumber")}
            label="IdentificationalNumber"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("PlaceOfBirth")}
            label="PlaceOfBirth"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("HomeCity")}
            label="HomeCity"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("HomeAddress")}
            label="HomeAddress"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("HomeTelephone")}
            label="HomeTelephone"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("MobileTelephone")}
            label="MobileTelephone"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("EMail")}
            label="EMail"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("PlaceOfWork")}
            label="PlaceOfWork"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("Position")}
            label="Position"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("FamilyStatus")}
            label="FamilyStatus"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("Citizenship")}
            label="Citizenship"
            variant="outlined"
            required
          />
          <TextField
            sx={{ m: 2 }}
            {...register("Disability")}
            label="Disability"
            variant="outlined"
            required
          />
          <Typography
            sx={(theme) => ({
              textDecoration: "none",
              padding: theme.spacing(2),
            })}
            variant="h6"
            component="div"
          >
            IsRetiree
          </Typography>
          <Controller
            control={control}
            name="IsRetiree"
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
          <TextField
            sx={{ m: 2 }}
            {...register("Sallary")}
            label="Sallary"
            variant="outlined"
            required
            type="number"
          />
          <Typography
            sx={(theme) => ({
              textDecoration: "none",
              padding: theme.spacing(2),
            })}
            variant="h6"
            component="div"
          >
            IsConscript
          </Typography>
          <Controller
            control={control}
            name="IsConscript"
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
          <Button variant="contained" color="success" type="submit">
            Success
          </Button>
        </form>
      </Paper>
    </>
  );
};

// Id: String,
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
// IsRetiree: Boolean,

// Sallary: Number,
// IsConscript: Boolean
