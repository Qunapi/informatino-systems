import * as yup from "yup";

var date = new Date();
date.setDate(date.getDate() - 1);

export const ACCOUNT_VALIDATION_SCHEMA = yup.object().shape({
  ContractNumber: yup.string().min(5).max(20),
  PassportSerialNumber: yup
    .string()
    .trim()
    .required("PassportSerialNumber is required"),
  PassportNumber: yup
    .string()
    .trim()
    .matches(/^[1-9]{1}[0-9]{6}$/, "PassportNumber is invalid")
    .required("PassportNumber is required"),
  StartDate: yup.date().required("StartDate is required").min(date),
  EndDate: yup.date().required("EndDate is required"),
  ContractTime: yup
    .string()
    .transform((value) => value.split(" ")[0])
    .test("> 0", "ContractTime should be > 0", (value) => +value > 0)
    .required("ContractTime should be > 0 days"),
  ContractStartDeposit: yup
    .number()
    .moreThan(0)
    .required("ContractStartDeposit is required"),
  ContractPercent: yup
    .number()
    .moreThan(0)
    .lessThan(100)
    .required("ContractTime should be > 0")
    .typeError("ContractTime should be > 0"),
});
