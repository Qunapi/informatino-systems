import * as yup from "yup";

export const ACCOUNT_VALIDATION_SCHEMA = yup.object().shape({
  AccountTypeId: yup
    .string()
    .transform((value) => value?.value)
    .typeError("AccountTypeId is required")
    .required("AccountTypeId is required"),
  AccountNumber: yup
    .string()
    .trim()
    .matches(/^([0-9])*$/, "AccountNumber is invalid")
    .required("AccountNumber is required"),
  AccountCurrencyTypeId: yup
    .string()
    .transform((value) => value?.value)
    .typeError("AccountCurrencyTypeId is required")
    .required("AccountCurrencyTypeId is required"),
  StartDate: yup.date().required("StartDate is required"),
  EndDate: yup.date().required("EndDate is required"),
  ContractTime: yup
    .string()
    .transform((value) => value.split(" ")[0])
    .test("> 0", "ContractTime should be > 0", (value) => +value > 0)
    .required("ContractTime should be > 0 days"),
  ContractStartDeposit: yup.string().required("ContractStartDeposit"),
  ContractPercent: yup
    .number()
    .moreThan(0)
    .required("ContractTime should be > 0")
    .typeError("ContractTime should be > 0"),
});
