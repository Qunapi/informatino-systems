import { useAccountFormOptions } from "../../hooks/useAccountFormOptions";
import { accountService } from "../../services/accountService";
import { CreateUpdateAccount } from "./CreateUpdateAccount";

export const CreateAccount = () => {
  const onSubmit = (data) => {
    accountService.createAccount(data);
  };

  const options = useAccountFormOptions();

  return <CreateUpdateAccount options={options} onSubmit={onSubmit} />;
};
