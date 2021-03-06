import { NavBar } from "../../common/Common";
import { useForm } from "react-hook-form";
import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { ControlledAutocomplete } from "../../common/AutoComplete";
import { yupResolver } from "@hookform/resolvers/yup";
import { ACCOUNT_VALIDATION_SCHEMA } from "./accountValidationSchema";
import { Errors } from "../../common/Errors";
import { DatePicker } from "../../common/DatePicker";
import * as dayjs from "dayjs";
import { useEffect } from "react";
import { userService } from "../../services/userService";
import { PercentDialog } from "./percentModal";

const clientStateOptions = [
  {
    label: "Физический",
    value: 1,
  },
  {
    label: "Юридический",
    value: 2,
  },
  {
    label: "ИП",
    value: 3,
  },
];

export const CreateUpdateAccount = ({
  defaultValues,
  onSubmit,
  options: { depositOptions = [], currencyOptions = [] } = {},
}) => {
  const [percentOpen, setPercentOpen] = useState(false);

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

  const [user, setUser] = useState(undefined);

  const [
    StartDate,
    EndDate,
    PassportSerialNumber,
    PassportNumber,
    ContractStartDeposit,
    ContractPercent,
  ] = watch([
    "StartDate",
    "EndDate",
    "PassportSerialNumber",
    "PassportNumber",
    "ContractStartDeposit",
    "ContractPercent",
  ]);

  async function getUser() {
    const user = await userService.getUserByPassport(
      PassportSerialNumber,
      PassportNumber,
    );
    setUser(user);
  }

  const onFormSubmit = (data) => {
    onSubmit(data);
    if (data.AccountTypeName.value === "Annuity Credit") {
      setPercentOpen(true);
    }
  };

  React.useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PassportSerialNumber, PassportNumber]);

  const dateDiff = EndDate?.diff(StartDate, "day");
  useEffect(() => {
    setValue("ContractTime", `${dateDiff} days`);
  }, [dateDiff, setValue]);

  return (
    <>
      <PercentDialog
        ContractStartDeposit={ContractStartDeposit}
        StartDate={StartDate}
        ContractPercent={ContractPercent}
        EndDate={EndDate}
        setOpen={setPercentOpen}
        open={percentOpen}
      />
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
          {
            <Typography
              sx={(theme) => ({
                textDecoration: "none",
                padding: theme.spacing(2),
              })}
              variant="h6"
              component="div"
            >
              {user
                ? `${user?.MiddleName} ${user?.Name} ${user?.Surname}`
                : "User not Found"}
            </Typography>
          }
          <ControlledAutocomplete
            control={control}
            name="AccountTypeName"
            options={depositOptions}
            renderInput={(params) => (
              <TextField {...params} label="AccountTypeName" margin="normal" />
            )}
            defaultValue={null}
          />

          <TextField
            sx={{ m: 2 }}
            {...register("ContractNumber")}
            label="ContractNumber"
            variant="outlined"
          />
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

          <ControlledAutocomplete
            control={control}
            name="ClientState"
            options={clientStateOptions}
            renderInput={(params) => (
              <TextField {...params} label="ClientState" margin="normal" />
            )}
            defaultValue={null}
          />
          <ControlledAutocomplete
            control={control}
            name="CurrencyType"
            options={currencyOptions}
            renderInput={(params) => (
              <TextField {...params} label="CurrencyType" margin="normal" />
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
            type="number"
          />
          <TextField
            sx={{ m: 2 }}
            {...register("ContractPercent")}
            label="ContractPercent"
            variant="outlined"
            type="number"
          />
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
