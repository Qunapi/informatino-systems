import { useAccountFormOptions } from "../../hooks/useAccountFormOptions";
import { accountService } from "../../services/accountService";
import { CreateUpdateAccount } from "./CreateUpdateAccount";
import { toast } from "react-toastify";
import * as dayjs from "dayjs";

export const CreateAccount = () => {
  const onSubmit = (data) => {
    data.EndDate = dayjs(data.EndDate).subtract(1, "day").toISOString();
    const condition = data.AccountTypeName.value
      .toLowerCase()
      .includes("deposit");

    if (condition) {
      accountService.createDeposit(data).then(toast("Deposit Created"));
    } else {
      accountService.createCredit(data).then(toast("Credit Created"));
    }
  };

  const options = useAccountFormOptions();

  return <CreateUpdateAccount options={options} onSubmit={onSubmit} />;
};
