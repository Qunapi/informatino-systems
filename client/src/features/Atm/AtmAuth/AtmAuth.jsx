import { Button, Paper, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { atmService } from "../../../services/atmService";

export const AtmAuth = ({ setAuthInfo }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {},
  });

  const onSubmit = (data) => {
    atmService
      .authenticate(data)
      .then((e) => {
        setAuthInfo(data);
        toast.success("Success");
      })
      .catch((e) => toast.error("Wrong Card"));
  };

  return (
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
        <TextField
          sx={{ m: 2 }}
          {...register("CardNumber")}
          label="CardNumber"
          variant="outlined"
          type="number"
        />
        <TextField
          sx={{ m: 2 }}
          {...register("CardPassword")}
          label="CardPassword"
          variant="outlined"
          type="number"
        />
        <Button sx={{ m: 2 }} variant="contained" color="success" type="submit">
          Success
        </Button>
      </form>
    </Paper>
  );
};
