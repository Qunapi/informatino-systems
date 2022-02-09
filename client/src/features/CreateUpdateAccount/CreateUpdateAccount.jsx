import { NavBar } from "../../common/Common";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Checkbox,
  Grid,
  Paper,
  TextField,
  Typography,
  CardContent,
  Card,
} from "@mui/material";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import React from "react";
import { ControlledAutocomplete } from "../../common/AutoComplete";
import { yupResolver } from "@hookform/resolvers/yup";
import { ACCOUNT_VALIDATION_SCHEMA } from "./accountValidationSchema";

// ClientId: [{ type: Schema.Types.ObjectId, ref: 'Clients'}],
//     AccountNumber: String,
//     AccountCode: String,
//     AccountActiveType: Number,
//     AccountTypeId: [{ type: Schema.Types.ObjectId, ref: 'Types'}],
//     AccountCurrencyTypeId: [{ type: Schema.Types.ObjectId, ref: 'Types'}],
//     ContractNumber: String,
//     ContractTime: Number,
//     ContractPercent: Number,
//     Credit: Number,
//     Debit: Number,
//     Saldo: Number,
//     IsActive: Boolean,
//     StartDate: Date,
//     EndDate: Date,
//     IsMain: Boolean,

export const CreateUpdateAccount = ({
  defaultValues,
  onSubmit,
  options: { citiesOptions, disabilitiesOptions, citizenshipsOptions },
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: { IsRetiree: false, IsConscript: false, ...defaultValues },
    resolver: yupResolver(ACCOUNT_VALIDATION_SCHEMA),
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <>
      <NavBar />
      {!!Object.entries(errors || {}).length && (
        <Card
          sx={(theme) => ({
            minWidth: 275,
            position: "fixed",
            right: 30,
            top: 100,
            border: `1px solid ${theme.palette.error.main}`,
            maxWidth: 400,
          })}
        >
          <CardContent>
            {Object.entries(errors || {}).map(([key, value]) => {
              return (
                <Typography
                  key={key}
                  // sx={{ fontSize: 14 }}
                  // color="text.error"
                  sx={(theme) => ({ color: theme.palette.error.main })}
                  // gutterBottom
                  variant="body2"
                >
                  {key}: {value.message}
                </Typography>
              );
            })}
            {/* <Typography variant="h5" component="div">
            benevolent
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
          </CardContent>
          {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
        </Card>
      )}
      <Paper
        sx={(theme) => ({
          margin: theme.spacing(2),
          padding: theme.spacing(2),
        })}
      >
        <form
          onSubmit={handleSubmit(onFormSubmit)}
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
          />
          <TextField
            sx={{ m: 2 }}
            {...register("MiddleName")}
            label="MiddleName"
            variant="outlined"
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
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    renderInput={(params) => {
                      return <TextField {...params} />;
                    }}
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
          />
          <TextField
            sx={{ m: 2 }}
            {...register("PassportNumber")}
            label="PassportNumber"
            variant="outlined"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("PlaceOfIssue")}
            label="PlaceOfIssue"
            variant="outlined"
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
          <TextField
            sx={{ m: 2 }}
            {...register("IdentificationalNumber")}
            label="IdentificationalNumber"
            variant="outlined"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("PlaceOfBirth")}
            label="PlaceOfBirth"
            variant="outlined"
          />
          <ControlledAutocomplete
            control={control}
            // {...register("HomeCity")}
            name="HomeCity"
            options={citiesOptions}
            getOptionLabel={(option) => `${option.name}`}
            renderInput={(params) => (
              <TextField {...params} label="HomeCity" margin="normal" />
            )}
            defaultValue={null}
          />
          <TextField
            sx={{ m: 2 }}
            {...register("HomeAddress")}
            label="HomeAddress"
            variant="outlined"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("HomeTelephone")}
            label="HomeTelephone"
            variant="outlined"
            type="tel"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("MobileTelephone")}
            label="MobileTelephone"
            variant="outlined"
            type="tel"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("EMail")}
            label="EMail"
            variant="outlined"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("PlaceOfWork")}
            label="PlaceOfWork"
            variant="outlined"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("Position")}
            label="Position"
            variant="outlined"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("FamilyStatus")}
            label="FamilyStatus"
            variant="outlined"
          />
          <ControlledAutocomplete
            control={control}
            name="Citizenship"
            options={citizenshipsOptions}
            getOptionLabel={(option) => `${option.name}`}
            renderInput={(params) => (
              <TextField {...params} label="Citizenship" margin="normal" />
            )}
            defaultValue={null}
          />
          <ControlledAutocomplete
            control={control}
            name="Disability"
            options={disabilitiesOptions}
            getOptionLabel={(option) => `${option.name}`}
            renderInput={(params) => (
              <TextField {...params} label="Disability" margin="normal" />
            )}
            defaultValue={null}
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
