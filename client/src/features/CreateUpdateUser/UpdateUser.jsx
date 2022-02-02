import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateUpdateUser } from "./CreateUpdateUser";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormOptions } from "../../hooks/useFormOptions";

export const UpdateUser = () => {
  const { id } = useParams();

  const [user, setUser] = useState();
  let navigate = useNavigate();

  const getUser = useCallback(async () => {
    const response = await userService.getUser(id);
    const { client } = response.data;

    client.DateOfBirth = client.DateOfBirth && new Date(client.DateOfBirth);
    client.DateOfIssue = client.DateOfIssue && new Date(client.DateOfIssue);

    client.HomeCity = { name: client.HomeCity };
    client.Citizenship = { name: client.Citizenship };
    client.Disability = { name: client.Disability };

    setUser(client);
  }, [id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const onSubmit = (data) => {
    console.log(data);
    userService
      .updateUser(id, data)
      .then((e) => toast.success("user updated"))
      .then((e) => navigate("/users"));
  };

  const options = useFormOptions();

  return user && options.success ? (
    <CreateUpdateUser
      options={options}
      defaultValues={user}
      onSubmit={onSubmit}
    />
  ) : (
    <CircularProgress />
  );
};
