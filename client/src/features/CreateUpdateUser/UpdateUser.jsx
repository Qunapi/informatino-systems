import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateUpdateUser } from "./CreateUpdateUser";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useUserFormOptions } from "../../hooks/useUserFormOptions";
import { accountService } from "../../services/accountService";

export const UpdateUser = () => {
  const { id } = useParams();

  const [user, setUser] = useState();
  const [accounts, setAccounts] = useState([]);
  let navigate = useNavigate();

  const getUser = useCallback(async () => {
    const client = await userService.getUser(id);

    client.DateOfBirth = client.DateOfBirth && new Date(client.DateOfBirth);
    client.DateOfIssue = client.DateOfIssue && new Date(client.DateOfIssue);
    client.HomeCity = { name: client.HomeCity };
    client.Citizenship = { name: client.Citizenship };
    client.Disability = { name: client.Disability };

    setUser(client);
  }, [id]);

  const getUserAccounts = async (id) => {
    const result = await accountService.getUserAccounts(id);
    setAccounts(result.data.accounts);
  };
  console.log(accounts);
  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    if (user) {
      getUserAccounts(user._id);
    }
  }, [user]);

  const onSubmit = (data) => {
    userService
      .updateUser(id, data)
      .then((e) => toast.success("user updated"))
      .then((e) => navigate("/users"))
      .catch((e) => {
        toast.error(e?.response?.data?.message || "update error");
      });
  };

  const options = useUserFormOptions();

  return user && options.success ? (
    <CreateUpdateUser
      options={options}
      defaultValues={user}
      onSubmit={onSubmit}
    >
      {accounts.map((account) => {
        return (
          <Button
            onClick={() => {
              navigate(`/accounts/${account.ContractNumber}`);
            }}
            key={account._id}
            sx={{ m: 2 }}
            variant="contained"
          >
            {account.AccountName}
          </Button>
        );
      })}
    </CreateUpdateUser>
  ) : (
    <CircularProgress />
  );
};
