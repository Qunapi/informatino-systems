import { CreateUpdateAccount } from "./CreateUpdateAccount";

export const CreateAccount = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return <CreateUpdateAccount onSubmit={onSubmit} />;
};
