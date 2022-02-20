const mongoose = require("mongoose");
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

module.exports = { AccountSchema };
