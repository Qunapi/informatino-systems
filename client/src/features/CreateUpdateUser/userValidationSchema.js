import * as yup from "yup";

export const USER_VALIDATION_SCHEMA = yup.object().shape({
  Surname: yup.string().required("Surname is required"),
  Name: yup.string().required("Name is required"),
  MiddleName: yup.string().required("MiddleName is required"),
  PassportSerialNumber: yup
    .string()
    .required("PassportSerialNumber is required"),
  PassportNumber: yup.string().required("PassportNumber is required"),
  PlaceOfIssue: yup.string().required("PlaceOfIssue is required"),
  IdentificationalNumber: yup
    .string()
    .required("IdentificationalNumber is required"),
  PlaceOfBirth: yup.string().required("PlaceOfBirth is required"),
  HomeAddress: yup.string().required("HomeAddress is required"),
  HomeTelephone: yup.string().required("HomeTelephone is required"),
  MobileTelephone: yup.string().required("MobileTelephone is required"),
  EMail: yup.string().required("EMail is required"),
  PlaceOfWork: yup.string().required("PlaceOfWork is required"),
  Position: yup.string().required("Position is required"),
  FamilyStatus: yup.string().required("FamilyStatus is required"),
  Citizenship: yup.string().required("Citizenship is required"),
  Disability: yup.string().required("Disability is required"),
  Sallary: yup.string().required("Sallary is required"),
  DateOfBirth: yup.string().required("DateOfBirth is required"),
  DateOfIssue: yup.string().required("DateOfIssue is required"),
  IsRetiree: yup.string().required("IsRetiree is required"),
  IsConscript: yup.string().required("IsConscript is required"),
});
