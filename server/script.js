const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { Schema } = mongoose;

const CashAccuracy = 100000;

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
    Id: "61ef1321-a92c-4e6a-b8f4-86c9af319e10",
    ClientId: null,
    AccountNumber: uniqueNumber,
    AccountCode: "73",
    AccountActiveType: 3,
    AccountTypeId: null,
    AccountCurrencyTypeId: null,
    AccountName: "Bank Development Account",
    ContractNumber: null,
    ContractTime: 0,
    ContractPercent: 0,
    ContractStartDeposit: 0,
    IncomePerDay: 0,
    Credit: 100000000000 * CashAccuracy,
    Debit: 0,
    Saldo: 100000000000 * CashAccuracy,
    IsActive: true,
    StartDate: 0,
    EndDate: 0,
    IsMain: true,
  });
  await newBankDevelopmentAccount.save();

  uniqueNumber = Math.floor(Math.random() * 99999999).toString();
  uniqueNumber = "1010" + uniqueNumber + "9";

  let newBankCashRegisterAccount = new Account({
    Id: "0ea9555e-9968-460b-8b15-660c62ecb3de",
    ClientId: null,
    AccountNumber: uniqueNumber,
    AccountCode: "10",
    AccountActiveType: 1,
    AccountTypeId: null,
    AccountCurrencyTypeId: null,
    AccountName: "Cash Register",
    ContractNumber: null,
    ContractTime: 0,
    ContractPercent: 0,
    ContractStartDeposit: 0,
    IncomePerDay: 0,
    Credit: 0,
    Debit: 0,
    Saldo: 0,
    IsActive: true,
    StartDate: 0,
    EndDate: 0,
    IsMain: true,
  });
  await newBankCashRegisterAccount.save();

  let newType = new Type({
    TypeGroup: 5,
    TypeName: "BYN",
  });
  await newType.save();

  newType = new Type({
    TypeGroup: 4,
    TypeName: "Urgent",
  });
  await newType.save();

  newType = new Type({
    TypeGroup: 4,
    TypeName: "Revocate",
  });
  await newType.save();

  var date = new Date();
  newType = new Type({
    TypeGroup: 6,
    TypeName: date.toUTCString(),
  });
  await newType.save();

  var newCity = new Type({
    TypeGroup: 1,
    TypeName: "Minsk",
  });
  await newCity.save();

  var newCitizenship = new Type({
    TypeGroup: 2,
    TypeName: "Belarus",
  });
  await newCitizenship.save();

  var newDisability = new Type({
    TypeGroup: 3,
    TypeName: "None",
  });
  await newDisability.save();

  let newClient = new Client({
    Id: "8c8e7386-b764-4ba7-96b4-341a6c027126",
    Surname: "Yushkevich",
    Name: "Andrei",
    MiddleName: "Olegovich",
    DateOfBirth: "2022-02-01T16:09:08.000+00:00",
    PassportSerialNumber: "MP",
    PassportNumber: "1235123",
    PlaceOfIssue: "Minsk",
    DateOfIssue: "2022-02-01T16:09:16.000+00:00",
    IdentificationalNumber: "1310399A090PB9",
    PlaceOfBirth: "Minsk",
    HomeCity: newCity._id,
    HomeAddress: "Surganova",
    HomeTelephone: "3234323",
    MobileTelephone: "+375293562907",
    EMail: "and.yushkevich@gmail.com",
    PlaceOfWork: "Epam",
    Position: "Lead",
    FamilyStatus: "Divorced",
    Citizenship: newCitizenship._id,
    Disability: newDisability._id,
    IsRetiree: false,
    Sallary: "4321",
    IsConscript: true,
  });
  await newClient.save();

  console.log("Completed");
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
const Account = mongoose.model("Accounts", AccountSchema);

const TypeSchema = new mongoose.Schema(
  {
    TypeGroup: Number,
    TypeName: String,
  },
  { timestamps: true },
);
const Type = mongoose.model("Types", TypeSchema);

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
const Client = mongoose.model("Clients", ClientSchema);
