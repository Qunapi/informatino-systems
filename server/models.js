const mongoose = require("mongoose");
const { string } = require("yup/lib/locale");
const { Schema } = mongoose;

const AccountSchema = new mongoose.Schema(
  {
    Id: String,
    ClientId: [{ type: Schema.Types.ObjectId, ref: "Clients" }],
    AccountNumber: String,
    AccountCode: String,
    AccountActiveType: Number,
    AccountTypeId: [{ type: Schema.Types.ObjectId, ref: "Types" }],
    AccountCurrencyTypeId: [{ type: Schema.Types.ObjectId, ref: "Types" }],
    AccountName: String,
    ContractNumber: String,
    ContractTime: Number,
    ContractPercent: Number,
    ContractStartDeposit: Number,
    IncomePerDay: Number,
    Credit: Number,
    Debit: Number,
    Saldo: Number,
    IsActive: Boolean,
    StartDate: Date,
    EndDate: Date,
    IsMain: Boolean,
  },
  { timestamps: true },
);

const ClientSchema = new mongoose.Schema(
  {
    Id: String,
    Surname: String,
    Name: String,
    MiddleName: String,
    DateOfBirth: Date,
    PassportSerialNumber: String,
    PassportNumber: String,
    PlaceOfIssue: String,
    DateOfIssue: Date,
    IdentificationalNumber: String,
    PlaceOfBirth: String,
    HomeCity: [{ type: Schema.Types.ObjectId, ref: "Types" }],
    HomeAddress: String,
    HomeTelephone: String,
    MobileTelephone: String,
    EMail: String,
    PlaceOfWork: String,
    Position: String,
    FamilyStatus: String,
    Citizenship: [{ type: Schema.Types.ObjectId, ref: "Types" }],
    Disability: [{ type: Schema.Types.ObjectId, ref: "Types" }],
    IsRetiree: Boolean,
    Sallary: Number,
    IsConscript: Boolean,
  },
  { timestamps: true },
);

const TypeSchema = new mongoose.Schema(
  {
    TypeGroup: Number,
    TypeName: String,
  },
  { timestamps: true },
);

const TransactionLogSchema = new mongoose.Schema(
  {
    ContractNumber: String,
    Date: Date,
    FromAccount: String,
    FromAccountName: String,
    ToAccount: String,
    ToAccountName: String,
    Cash: Number,
    TypeTo: String,
    TypeFrom: String,
  },
  { timestamps: true },
);

const BankCardSchema = new mongoose.Schema(
  {
    CardNumber: String,
    CardPassword: String,
    ClientId: String,
    MainAccountId: String,
    ContractNumber: String,
  },
  { timestamps: true },
);

module.exports = {
  AccountSchema,
  ClientSchema,
  TypeSchema,
  TransactionLogSchema,
  BankCardSchema,
};
