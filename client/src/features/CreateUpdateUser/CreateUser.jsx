import { CreateUpdateUser } from "./CreateUpdateUser";
import { userService } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormOptions } from "../../hooks/useFormOptions";

export const CreateUser = () => {
  let navigate = useNavigate();

  const onSubmit = (data) => {
    userService
      .createUser(data)
      .then((e) => toast.success("user created"))
      .then((e) => navigate("/users"))
      .catch((e) => {
        console.log(e);
        toast.error("create error");
      });
  };
  const options = useFormOptions();

  return <CreateUpdateUser options={options} onSubmit={onSubmit} />;
};
