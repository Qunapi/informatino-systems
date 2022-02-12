import { NavBar } from "../../common/Common";
import { useForm } from "react-hook-form";
import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { ControlledAutocomplete } from "../../common/AutoComplete";
import { yupResolver } from "@hookform/resolvers/yup";
import { ACCOUNT_VALIDATION_SCHEMA } from "./accountValidationSchema";
import { Errors } from "../../common/Errors";
import { DatePicker } from "../../common/DatePicker";
import * as dayjs from "dayjs";
import { useEffect } from "react";

export const CreateUpdateAccount = ({
  defaultValues,
  onSubmit,
  options: {
    depositTypes = [{ name: "deposit 15%", value: "id" }],
    currencyTypes = [{ name: "$%", value: "id" }],
  } = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({
    defaultValues: { StartDate: dayjs(), EndDate: dayjs(), ...defaultValues },
    resolver: yupResolver(ACCOUNT_VALIDATION_SCHEMA),
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  const [StartDate, EndDate] = watch(["StartDate", "EndDate"]);

  const dateDiff = EndDate?.diff(StartDate, "day");
  useEffect(() => {
    console.log("here", dateDiff);
    setValue("ContractTime", `${dateDiff} days`);
  }, [dateDiff, setValue]);

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
          <ControlledAutocomplete
            control={control}
            name="AccountTypeId"
            options={depositTypes}
            getOptionLabel={(option) => `${option.name}`}
            renderInput={(params) => (
              <TextField {...params} label="AccountTypeId" margin="normal" />
            )}
            defaultValue={null}
          />
          <TextField
            sx={{ m: 2 }}
            {...register("AccountNumber")}
            label="AccountNumber"
            variant="outlined"
          />
          <ControlledAutocomplete
            control={control}
            name="AccountCurrencyTypeId"
            options={currencyTypes}
            getOptionLabel={(option) => `${option.name}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="AccountCurrencyTypeId"
                margin="normal"
              />
            )}
            defaultValue={null}
          />
          <DatePicker control={control} name="StartDate" />
          <DatePicker control={control} name="EndDate" />
          <TextField
            sx={{ m: 2 }}
            {...register("ContractTime")}
            label="ContractTime"
            variant="outlined"
            disabled
          />
          <TextField
            sx={{ m: 2 }}
            {...register("ContractStartDeposit")}
            label="ContractStartDeposit"
            variant="outlined"
            type="text"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("ContractPercent")}
            label="ContractPercent"
            variant="outlined"
            type="number"
          />
          {/*  */}
          {/* <CheckboxComponent name="IsRetiree" control={control} /> */}

          <Button
            sx={{ m: 2 }}
            variant="contained"
            color="success"
            type="submit"
          >
            Success
          </Button>
        </form>
      </Paper>
    </>
  );
};
