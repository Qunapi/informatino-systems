import * as yup from "yup";

export const USER_VALIDATION_SCHEMA = yup.object().shape({
  Surname: yup
    .string()
    .trim()
    .matches(/^([a-zA-zА-Яа-я])*$/, "Surname is invalid")
    .required("Surname is required"),
  Name: yup
    .string()
    .trim()
    .matches(/^([a-zA-zА-Яа-я])*$/, "Surname is invalid")
    .required("Name is required"),
  MiddleName: yup
    .string()
    .trim()
    .matches(/^([a-zA-zА-Яа-я])*$/, "Surname is invalid")
    .required("MiddleName is required"),
  PassportSerialNumber: yup
    .string()
    .trim()
    .required("PassportSerialNumber is required"),
  PassportNumber: yup
    .string()
    .trim()
    .matches(/^[1-9]{1}[0-9]{6}$/, "PassportNumber is invalid")
    .required("PassportNumber is required"),
  PlaceOfIssue: yup.string().trim().required("PlaceOfIssue is required"),
  IdentificationalNumber: yup
    .string()
    .trim()
    .matches(
      /^[1-6]{1}([0][1-9]|[12][0-9]|3[01]){1}([0][1-9]|[1][0-2]){1}([0][1-9]|[1-9][0-9]){1}([ABCKEMH]){1}((00[1-9])|(0[1-9][0-9])|([1-9][1-9][0-9])){1}((PB)|(BA)|(BI)){1}([0-9]){1}$/,
      "IdentificationalNumber is invalid",
    )
    .required("IdentificationalNumber is required"),
  PlaceOfBirth: yup.string().trim().required("PlaceOfBirth is required"),
  HomeCity: yup
    .string()
    .transform((value) => value?.name)
    .trim()
    .typeError("Error: HomeCity is required")
    .required("HomeCity is required"),
  HomeAddress: yup.string().trim().required("HomeAddress is required"),
  HomeTelephone: yup
    .string()
    .trim()
    .matches(/^[1-9]{1}[0-9]{6}$/, "HomeTelephone is invalid"),
  MobileTelephone: yup
    .string()
    .trim()
    .matches(
      /^(\+375){1}((25)|(29)|(33)|(44)){1}([1-9][0-9]{6}){1}$/,
      "MobileTelephone is invalid",
    ),
  EMail: yup.string().trim().email(),
  PlaceOfWork: yup.string().trim(),
  Position: yup.string().trim(),
  FamilyStatus: yup.string().trim().required("FamilyStatus is required"),
  Citizenship: yup
    .string()
    .transform((value) => value?.name)
    .typeError("Error: Citizenship is required")
    .required("Citizenship is required"),
  Disability: yup
    .string()
    .transform((value) => value?.name)
    .typeError("Error: Disability is required")
    .required("Disability is required"),
  Sallary: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value)),
  DateOfBirth: yup.date().required("DateOfBirth is required"),
  DateOfIssue: yup.date().required("DateOfIssue is required"),
  IsRetiree: yup.bool().required("IsRetiree is required"),
  IsConscript: yup.bool().required("IsConscript is required"),
});
