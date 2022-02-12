const { Schema } = mongoose;
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://User:1111@cluster0.9sxyn.mongodb.net/BankDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error"));
db.once("open", async function () {
  console.log("-Connected-");

  var uniqueNumber = Math.floor(Math.random() * 99999999).toString();  
  uniqueNumber = "7327" + uniqueNumber + "9";

  let newBankDevelopmentAccount = new Account({
    Id: uuidv4(),
    ClientId: null,
    AccountNumber: uniqueNumber,
    AccountCode: "73",
    AccountActiveType: 3,
    AccountTypeId: 0,
    AccountCurrencyTypeId: 0,
    ContractNumber: null,
    ContractTime: 0,
    ContractPercent: 0,
    ContractStartDeposit: 0,
    Credit: 0,
    Debit: 0,
    Saldo: 0,
    IsActive: true,
    StartDate: 0,
    EndDate: 0,
    IsMain: true,
  });
  await newBankDevelopmentAccount.save();

  uniqueNumber = Math.floor(Math.random() * 99999999).toString();  
  uniqueNumber = "1010" + uniqueNumber + "9";

  let newBankCashRegisterAccount = new Account({
    Id: uuidv4(),
    ClientId: null,
    AccountNumber: uniqueNumber,
    AccountCode: "10",
    AccountActiveType: 1,
    AccountTypeId: 0,
    AccountCurrencyTypeId: 0,
    ContractNumber: null,
    ContractTime: 0,
    ContractPercent: 0,
    ContractStartDeposit: 0,
    Credit: 0,
    Debit: 0,
    Saldo: 0,
    IsActive: true,
    StartDate: 0,
    EndDate: 0,
    IsMain: true,
  });
  await newBankCashRegisterAccount.save();

  let currencyType = new Type({
      TypeGroup: 5,
      TypeName: "BYN"
  });
  await currencyType.save();

  currencyType = new Type({
    TypeGroup: 4,
    TypeName: "Urgent deposit"
});
await currencyType.save();

currencyType = new Type({
    TypeGroup: 4,
    TypeName: "Revocate deposit"
});
await currencyType.save();

var date = new Date();

currencyType = new Type({
    TypeGroup: 6,
    TypeName: date.toString()
});
await currencyType.save();

});

const AccountSchema = new mongoose.Schema(
    {
      Id: String,
      ClientId: [{ type: Schema.Types.ObjectId, ref: "Clients" }],
      AccountNumber: String,
      AccountCode: String,
      AccountActiveType: Number,
      AccountTypeId: [{ type: Schema.Types.ObjectId, ref: "Types" }],
      AccountCurrencyTypeId: [{ type: Schema.Types.ObjectId, ref: "Types" }],
      ContractNumber: String,
      ContractTime: Number,
      ContractPercent: Number,
      ContractStartDeposit: Number,
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
  const Account = mongoose.model("Accounts", AccountSchema);

  const TypeSchema = new mongoose.Schema(
    {
      TypeGroup: Number,
      TypeName: String,
    },
    { timestamps: true },
  );
  const Type = mongoose.model("Types", TypeSchema);

