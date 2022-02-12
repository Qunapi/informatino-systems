import { NavBar } from "../../common/Common";
import { useForm } from "react-hook-form";
import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { ControlledAutocomplete } from "../../common/AutoComplete";
import { yupResolver } from "@hookform/resolvers/yup";
import { USER_VALIDATION_SCHEMA } from "./userValidationSchema";
import { CheckboxComponent } from "../../common/Checkbox";
import { DatePicker } from "../../common/DatePicker";
import { Errors } from "../../common/Errors";

export const CreateUpdateUser = ({
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
    resolver: yupResolver(USER_VALIDATION_SCHEMA),
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <>
      <NavBar />
      <Errors errors={errors} />
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
          <DatePicker control={control} name="DateOfBirth" />
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
          <DatePicker control={control} name="DateOfIssue" />
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
          <CheckboxComponent name="IsRetiree" control={control} />
          <CheckboxComponent name="IsConscript" control={control} />
          <Button variant="contained" color="success" type="submit">
            Success
          </Button>
        </form>
      </Paper>
    </>
  );
};
