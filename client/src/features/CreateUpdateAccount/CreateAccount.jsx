import { useAccountFormOptions } from "../../hooks/useAccountFormOptions";
import { accountService } from "../../services/accountService";
import { CreateUpdateAccount } from "./CreateUpdateAccount";
import { toast } from "react-toastify";

export const CreateAccount = () => {
  const onSubmit = (data) => {
    accountService.createAccount(data).then(toast("Account Created"));
  };

  const options = useAccountFormOptions();

  return <CreateUpdateAccount options={options} onSubmit={onSubmit} />;
};
