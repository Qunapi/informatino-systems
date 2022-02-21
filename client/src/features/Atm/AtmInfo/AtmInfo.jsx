import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { atmService } from "../../../services/atmService";

export const AtmInfo = ({ authInfo, setAuthInfo }) => {
  const [info, setInfo] = useState({});

  async function fetchInfo() {
    atmService
      .getStatus(authInfo)
      .then((data) => setInfo(data.data.mainAccount));
  }

  useEffect(() => {
    fetchInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    if (data.Amount <= 0) {
      toast.error("Enter value > 0");
      return;
    }
    atmService
      .withdraw({ ...data, ...authInfo })
      .then((e) => {
        toast.success("Success");
        fetchInfo();
      })
      .catch((e) => toast.error("Error"));
  };

  const ejectCard = () => {
    setAuthInfo(undefined);
  };

  return (
    <Paper>
      {Object.entries(info).map(([key, value]) => {
        const filter = (value) =>
          !(
            key === "_id" ||
            key === "Id" ||
            key === "updatedAt" ||
            key === "createdAt" ||
            key === "StartDate" ||
            key === "EndDate" ||
            key === "IsMain"
          );
        return (
          <React.Fragment key={key}>
            {value && filter(value) ? (
              <Typography
                sx={(theme) => ({
                  textDecoration: "none",
                  padding: theme.spacing(1),
                })}
              >
                {key}: {value.toString()}
              </Typography>
            ) : null}
          </React.Fragment>
        );
      })}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ m: 2 }}
          {...register("Amount")}
          label="Amount"
          variant="outlined"
          type="number"
          min="1"
        />
        <Button sx={{ m: 2 }} variant="contained" color="success" type="submit">
          Withdraw
        </Button>
      </form>
      <Button
        sx={{ m: 2 }}
        variant="contained"
        color="warning"
        type="button"
        onClick={ejectCard}
      >
        Eject Card
      </Button>
    </Paper>
  );
};
