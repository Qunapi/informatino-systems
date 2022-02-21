const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
var cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { Schema } = mongoose;
const yup = require("yup");
const { userInfo } = require("os");
const e = require("express");
var dayjs = require("dayjs");
const { off } = require("process");
const { AccountSchema } = require("./models");
const { ClientSchema } = require("./models");
const { TypeSchema } = require("./models");
const { TransactionLogSchema } = require("./models");
const { BankCardSchema } = require("./models");

const USER_VALIDATION_SCHEMA = yup.object().shape({
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
    .typeError("Error: Citizenship is required")
    .required("Citizenship is required"),
  Disability: yup
    .string()
    .typeError("Error: Disability is required")
    .required("Disability is required"),
  Sallary: yup.number(),
  DateOfBirth: yup.date().required("DateOfBirth is required"),
  DateOfIssue: yup.date().required("DateOfIssue is required"),
  IsRetiree: yup.bool().required("IsRetiree is required"),
  IsConscript: yup.bool().required("IsConscript is required"),
});

const app = express();
app.use(cors());
const httpServer = http.Server(app);

httpServer.listen(8000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://User:1111@cluster0.9sxyn.mongodb.net/BankDB?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "DB connection error"));
db.once("open", async function () {
  console.log("-Connected-");
});

const Account = mongoose.model("Accounts", AccountSchema);

const Client = mongoose.model("Clients", ClientSchema);

const Type = mongoose.model("Types", TypeSchema);

const TransactionLog = mongoose.model("TransactionLogs", TransactionLogSchema);

const BankCard = mongoose.model("BankCards", BankCardSchema);

const CityGroupNumber = 1;
const CitizenshipGroupNumber = 2;
const DisabilityGroupNumber = 3;
const AccountTypeGroupNumber = 4;
const AccountCurrencyTypeGroupNumber = 5;
const AccountDateGroupNumber = 6;

const CheckKey = "9";

const LegalEntity = 1;
const IndividualEntrepreneur = 2;
const Individual = 3;
const LegalEntityCode = "3012";
const IndividualEntrepreneurCode = "3013";
const IndividualCode = "3014";

const DepositAccountCode = "34";

const AccountActiveTypeActive = 1;
const AccountActiveTypeActivePassive = 2;
const AccountActiveTypePassive = 3;

const CurrencyFromPhisicalMoney = "PhisicalMoney";
const CashRegisterAccountId = "0ea9555e-9968-460b-8b15-660c62ecb3de";
const BankDevelopmentAccountId = "61ef1321-a92c-4e6a-b8f4-86c9af319e10";

const MainDepositAccountName = "Main Account";
const SecondDepositAccountName = "Percent Account";

const TransactionDebitTypeName = "Debit";
const TransactionCreditTypeName = "Credit";

const UrgentDepositName = "Urgent Deposit";
const RevocateDepositName = "Revocate Deposit";
const AnnuityCreditName = "Annuity Credit";
const DifferentiatedeCreditName = "Differentiated Credit";

const CashAccuracy = 100000;

app.post("/clients", async function (req, res) {
  let clientData = req.body;

  try {
    var s = await USER_VALIDATION_SCHEMA.validate(clientData);
  } catch (e) {
    res.status(422);
    res.send(e.errors);
    return;
  }

  var client = await Client.findOne({
    PassportSerialNumber: clientData.PassportSerialNumber,
    PassportNumber: clientData.PassportNumber,
  });
  if (client) {
    res.status(422);
    res.send({ message: "Client already exists" });
    return;
  }

  client = await Client.findOne({
    IdentificationalNumber: clientData.IdentificationalNumber,
  });
  if (client) {
    res.status(422);
    res.send({ message: "Client already exists" });
    return;
  }

  let clientHomeCityId;

  if (clientData.HomeCity) {
    var clientHomeCity = await Type.findOne({
      TypeGroup: CityGroupNumber,
      TypeName: clientData.HomeCity,
    });
    if (clientHomeCity) {
      clientHomeCityId = clientHomeCity._id;
    } else {
      clientHomeCityId = new mongoose.Types.ObjectId();
      let newHomeCity = new Type({
        _id: clientHomeCityId,
        TypeGroup: CityGroupNumber,
        TypeName: clientData.HomeCity,
      });
      await newHomeCity.save();
    }
  }

  let citizenshipId;

  if (clientData.Citizenship) {
    var clientCitizenship = await Type.findOne({
      TypeGroup: CitizenshipGroupNumber,
      TypeName: clientData.Citizenship,
    });
    if (clientCitizenship) {
      citizenshipId = clientCitizenship._id;
    } else {
      citizenshipId = new mongoose.Types.ObjectId();
      let newCitizenship = new Type({
        _id: citizenshipId,
        TypeGroup: CitizenshipGroupNumber,
        TypeName: clientData.Citizenship,
      });
      await newCitizenship.save();
    }
  }

  let disabilityId;

  if (clientData.Disability) {
    var clientDisability = await Type.findOne({
      TypeGroup: DisabilityGroupNumber,
      TypeName: clientData.Disability,
    });
    if (clientDisability) {
      disabilityId = clientDisability._id;
    } else {
      disabilityId = new mongoose.Types.ObjectId();
      let newDisability = new Type({
        _id: disabilityId,
        TypeGroup: DisabilityGroupNumber,
        TypeName: clientData.Disability,
      });
      await newDisability.save();
    }
  }

  let newClient = new Client({
    Id: uuidv4(),
    Surname: clientData.Surname,
    Name: clientData.Name,
    MiddleName: clientData.MiddleName,
    DateOfBirth: clientData.DateOfBirth,
    PassportSerialNumber: clientData.PassportSerialNumber,
    PassportNumber: clientData.PassportNumber,
    PlaceOfIssue: clientData.PlaceOfIssue,
    DateOfIssue: clientData.DateOfIssue,
    IdentificationalNumber: clientData.IdentificationalNumber,
    PlaceOfBirth: clientData.PlaceOfBirth,
    HomeCity: clientHomeCityId,
    HomeAddress: clientData.HomeAddress,
    HomeTelephone: clientData.HomeTelephone,
    MobileTelephone: clientData.MobileTelephone,
    EMail: clientData.EMail,
    PlaceOfWork: clientData.PlaceOfWork,
    Position: clientData.Position,
    FamilyStatus: clientData.FamilyStatus,
    Citizenship: citizenshipId,
    Disability: disabilityId,
    IsRetiree: clientData.IsRetiree,
    Sallary: clientData.Sallary,
    IsConscript: clientData.IsConscript,
  });
  await newClient.save();

  res.status(200);
  res.send({ newClient });
});

app.get("/cities", async function (req, res) {
  var cities = await Type.find({ TypeGroup: CityGroupNumber });
  res.status(200);
  res.send({ cities });
});

app.get("/citizenships", async function (req, res) {
  var citizenships = await Type.find({ TypeGroup: CitizenshipGroupNumber });
  res.status(200);
  res.send({ citizenships });
});

app.get("/disabilities", async function (req, res) {
  var disabilities = await Type.find({ TypeGroup: DisabilityGroupNumber });
  res.status(200);
  res.send({ disabilities });
});

app.get("/clients", async function (req, res) {
  var clients = await Client.find()
    .populate("HomeCity")
    .populate("Citizenship")
    .populate("Disability");
  res.status(200);
  res.send({ clients });
});

app.get("/clients/find", async function (req, res) {
  var client = await Client.findOne({
    PassportSerialNumber: req.query.PassportSerialNumber,
    PassportNumber: req.query.PassportNumber,
  })
    .populate("HomeCity")
    .populate("Citizenship")
    .populate("Disability");
  if (client) {
    res.status(200);
  } else {
    res.status(404);
  }
  res.send({ client });
});

app.get("/clients/:id", async function (req, res) {
  var client = await Client.findOne({ Id: req.params.id })
    .populate("HomeCity")
    .populate("Citizenship")
    .populate("Disability");
  if (client) {
    res.status(200);
  } else {
    res.status(404);
  }
  res.send({ client });
});

app.delete("/clients/:id", async function (req, res) {
  var client = await Client.deleteOne({ Id: req.params.id });

  if (!client) {
    res.status(500);
  } else if (client.deletedCount == 0) {
    res.status(404);
  } else {
    res.status(200);
  }
  res.send({ client });
});

app.patch("/clients/:id", async function (req, res) {
  let clientData = req.body;

  try {
    var s = await USER_VALIDATION_SCHEMA.validate(clientData);
  } catch (e) {
    res.status(422);
    res.send(e.errors);
    return;
  }

  var clientToUpdate = await Client.findOne({ Id: req.params.id });
  if (!clientToUpdate) {
    res.status(404);
    res.send();
    return;
  }

  var client = await Client.findOne({
    PassportSerialNumber: clientData.PassportSerialNumber,
    PassportNumber: clientData.PassportNumber,
  });
  if (client) {
    if (req.params.id !== client.Id) {
      res.status(422);
      res.send({ message: "Client already exists" });
      return;
    }
  }

  client = await Client.findOne({
    IdentificationalNumber: clientData.IdentificationalNumber,
  });
  if (client) {
    if (req.params.id !== client.Id) {
      res.status(422);
      res.send({ message: "Client already exists" });
      return;
    }
  }

  let clientHomeCityId;

  if (clientData.HomeCity) {
    var clientHomeCity = await Type.findOne({
      TypeGroup: CityGroupNumber,
      TypeName: clientData.HomeCity,
    });
    if (clientHomeCity) {
      clientHomeCityId = clientHomeCity._id;
    } else {
      clientHomeCityId = new mongoose.Types.ObjectId();
      let newHomeCity = new Type({
        _id: clientHomeCityId,
        TypeGroup: CityGroupNumber,
        TypeName: clientData.HomeCity,
      });
      await newHomeCity.save();
    }
  }

  let citizenshipId;

  if (clientData.Citizenship) {
    var clientCitizenship = await Type.findOne({
      TypeGroup: CitizenshipGroupNumber,
      TypeName: clientData.Citizenship,
    });
    if (clientCitizenship) {
      citizenshipId = clientCitizenship._id;
    } else {
      citizenshipId = new mongoose.Types.ObjectId();
      let newCitizenship = new Type({
        _id: citizenshipId,
        TypeGroup: CitizenshipGroupNumber,
        TypeName: clientData.Citizenship,
      });
      await newCitizenship.save();
    }
  }

  let disabilityId;

  if (clientData.Disability) {
    var clientDisability = await Type.findOne({
      TypeGroup: DisabilityGroupNumber,
      TypeName: clientData.Disability,
    });
    if (clientDisability) {
      disabilityId = clientDisability._id;
    } else {
      disabilityId = new mongoose.Types.ObjectId();
      let newDisability = new Type({
        _id: disabilityId,
        TypeGroup: DisabilityGroupNumber,
        TypeName: clientData.Disability,
      });
      await newDisability.save();
    }
  }

  var result = await Client.replaceOne(
    { Id: req.params.id },
    {
      Id: req.params.id,
      Surname: clientData.Surname,
      Name: clientData.Name,
      MiddleName: clientData.MiddleName,
      DateOfBirth: clientData.DateOfBirth,
      PassportSerialNumber: clientData.PassportSerialNumber,
      PassportNumber: clientData.PassportNumber,
      PlaceOfIssue: clientData.PlaceOfIssue,
      DateOfIssue: clientData.DateOfIssue,
      IdentificationalNumber: clientData.IdentificationalNumber,
      PlaceOfBirth: clientData.PlaceOfBirth,
      HomeCity: clientHomeCityId,
      HomeAddress: clientData.HomeAddress,
      HomeTelephone: clientData.HomeTelephone,
      MobileTelephone: clientData.MobileTelephone,
      EMail: clientData.EMail,
      PlaceOfWork: clientData.PlaceOfWork,
      Position: clientData.Position,
      FamilyStatus: clientData.FamilyStatus,
      Citizenship: citizenshipId,
      Disability: disabilityId,
      IsRetiree: clientData.IsRetiree,
      Sallary: clientData.Sallary,
      IsConscript: clientData.IsConscript,
    },
  );

  res.status(200);
  res.send({ result });
});

app.get("/account/types", async function (req, res) {
  var accountTypes = await Type.find({ TypeGroup: AccountTypeGroupNumber });
  res.status(200);
  res.send({ accountTypes });
});

app.get("/account/currencies", async function (req, res) {
  var accountCurrencies = await Type.find({
    TypeGroup: AccountCurrencyTypeGroupNumber,
  });
  res.status(200);
  res.send({ accountCurrencies });
});

app.post("/account/register/deposit", async function (req, res) {
  let requestData = req.body;

  var client = await Client.findOne({
    PassportSerialNumber: requestData.PassportSerialNumber,
    PassportNumber: requestData.PassportNumber,
  });
  if (!client) {
    res.status(422);
    res.send({ message: "Client does not exists" });
    return;
  }

  if (
    requestData.AccountTypeName != UrgentDepositName &&
    requestData.AccountTypeName != RevocateDepositName
  ) {
    res.status(422);
    res.send({ message: "Wrong deposit type" });
    return;
  }

  var accountType = await Type.findOne({
    TypeGroup: AccountTypeGroupNumber,
    TypeName: requestData.AccountTypeName,
  });
  if (!accountType) {
    res.status(422);
    res.send({ message: "Account Type does not exists" });
    return;
  }

  var currencyType = await Type.findOne({
    TypeGroup: AccountCurrencyTypeGroupNumber,
    TypeName: requestData.CurrencyType,
  });
  if (!currencyType) {
    res.status(422);
    res.send({ message: "Currency Type does not exists" });
    return;
  }

  var contractAccount = await Account.findOne({
    ContractNumber: requestData.ContractNumber,
  });
  if (contractAccount) {
    res.status(500);
    res.send({ message: "Contract Number already exists" });
    return;
  }

  var uniqueNumberMain =
    Math.floor(Math.random() * 99999999).toString() + CheckKey;
  var uniqueNumber = Math.floor(Math.random() * 99999999).toString() + CheckKey;

  switch (requestData.ClientState) {
    case LegalEntity:
      uniqueNumber = LegalEntityCode + uniqueNumber;
      uniqueNumberMain = LegalEntityCode + uniqueNumberMain;
      break;
    case IndividualEntrepreneur:
      uniqueNumber = IndividualEntrepreneurCode + uniqueNumber;
      uniqueNumberMain = IndividualEntrepreneurCode + uniqueNumberMain;
      break;
    case Individual:
      uniqueNumber = IndividualCode + uniqueNumber;
      uniqueNumberMain = IndividualCode + uniqueNumberMain;
      break;
  }
  var ExistingAccount = await Account.findOne({ AccountNumber: uniqueNumber });
  if (ExistingAccount) {
    res.status(500);
    res.send({ message: "Account already exists" });
    return;
  }
  ExistingAccount = await Account.findOne({ AccountNumber: uniqueNumberMain });
  if (ExistingAccount) {
    res.status(500);
    res.send({ message: "Account already exists" });
    return;
  }

  var dateDifference = dayjs(requestData.EndDate).diff(
    requestData.StartDate,
    "day",
  );

  let newAccount = new Account({
    Id: uuidv4(),
    ClientId: client._id,
    AccountNumber: uniqueNumberMain,
    AccountCode: DepositAccountCode,
    AccountActiveType: AccountActiveTypePassive,
    AccountTypeId: accountType._id,
    AccountCurrencyTypeId: currencyType._id,
    AccountName: MainDepositAccountName + +requestData.AccountTypeName,
    ContractNumber: requestData.ContractNumber,
    ContractTime: requestData.ContractTime,
    ContractPercent: requestData.ContractPercent,
    ContractStartDeposit: Math.trunc(
      requestData.ContractStartDeposit * CashAccuracy,
    ),
    IncomePerDay: Math.trunc(
      requestData.ContractStartDeposit *
        (requestData.ContractPercent / 365 / 100) *
        CashAccuracy,
    ),
    Credit: 0,
    Debit: 0,
    Saldo: 0,
    IsActive: true,
    StartDate: requestData.StartDate,
    EndDate: requestData.EndDate,
    IsMain: true,
  });
  await newAccount.save();

  let newAccountDeposit = new Account({
    Id: uuidv4(),
    ClientId: client._id,
    AccountNumber: uniqueNumber,
    AccountCode: DepositAccountCode,
    AccountActiveType: AccountActiveTypePassive,
    AccountTypeId: accountType._id,
    AccountCurrencyTypeId: currencyType._id,
    AccountName: SecondDepositAccountName + +requestData.AccountTypeName,
    ContractNumber: requestData.ContractNumber,
    ContractTime: requestData.ContractTime,
    ContractPercent: requestData.ContractPercent,
    ContractStartDeposit: Math.trunc(
      requestData.ContractStartDeposit * CashAccuracy,
    ),
    IncomePerDay: Math.trunc(
      requestData.ContractStartDeposit *
        (requestData.ContractPercent / 365 / 100) *
        CashAccuracy,
    ),
    Credit: 0,
    Debit: 0,
    Saldo: 0,
    IsActive: true,
    StartDate: requestData.StartDate,
    EndDate: requestData.EndDate,
    IsMain: false,
  });
  await newAccountDeposit.save();

  var date = await Type.findOne({ TypeGroup: AccountDateGroupNumber });
  date = new Date(date.TypeName);

  var cash = Math.trunc(requestData.ContractStartDeposit * CashAccuracy);
  var result = await ExecuteTransactionAsync(
    CurrencyFromPhisicalMoney,
    CashRegisterAccountId,
    cash,
    date,
    requestData.ContractNumber,
  );
  if (!result.isSucces) {
    res.status(500);
    res.send({ result });
    return;
  }
  result = await ExecuteTransactionAsync(
    CashRegisterAccountId,
    newAccount.Id,
    cash,
    date,
    requestData.ContractNumber,
  );
  if (!result.isSucces) {
    res.status(500);
    res.send({ result });
    return;
  }
  result = await ExecuteTransactionAsync(
    newAccount.Id,
    BankDevelopmentAccountId,
    cash,
    date,
    requestData.ContractNumber,
  );
  if (!result.isSucces) {
    res.status(500);
    res.send({ result });
    return;
  }

  res.status(200);
  res.send({ newAccount });
  return;
});

app.post("/account/close/day", async function (req, res) {
  var date = await Type.findOne({ TypeGroup: AccountDateGroupNumber });
  date = new Date(date.TypeName);
  date = new Date(date.setDate(date.getDate() + 1));
  await Type.replaceOne(
    { TypeGroup: AccountDateGroupNumber },
    { TypeGroup: AccountDateGroupNumber, TypeName: date.toUTCString() },
  );

  var depositTypes = await Type.find({ TypeGroup: AccountTypeGroupNumber });
  var depositTypeRevocate;
  var depositTypeUrgent;
  var creditTypeDifferentiatede;
  var creditTypeAnnuity;
  depositTypes.forEach((e) => {
    if (e.TypeName == UrgentDepositName) {
      depositTypeUrgent = e;
    }
    if (e.TypeName == RevocateDepositName) {
      depositTypeRevocate = e;
    }
    if (e.TypeName == AnnuityCreditName) {
      creditTypeAnnuity = e;
    }
    if (e.TypeName == DifferentiatedeCreditName) {
      creditTypeDifferentiatede = e;
    }
  });

  var result;
  var accounts = await Account.find();
  for (var i = 0; i < accounts.length; i++) {
    var e = accounts[i];
    if (
      e.IsActive &&
      e.Id != BankDevelopmentAccountId &&
      e.Id != CashRegisterAccountId
    ) {
      if (
        e.AccountTypeId[0].equals(creditTypeAnnuity._id) ||
        e.AccountTypeId[0].equals(creditTypeDifferentiatede._id)
      ) {
        if (e.IsMain) {
          var isAnnuityCredit = e.AccountTypeId[0].equals(creditTypeAnnuity._id)
            ? true
            : false;
          result = await MainCreditAccountEndDay(
            e,
            date,
            e.ContractNumber,
            isAnnuityCredit,
          );
          if (!result.isSucces) {
            res.status(500);
            return;
          }
        } else {
          result = await SecondCreditAccountEndDay(e, date, e.ContractNumber);
          if (!result.isSucces) {
            res.status(500);
            return;
          }
        }
      } else {
        if (e.IsMain) {
          result = await MainAccountEndDay(e, date, e.ContractNumber);
          if (!result.isSucces) {
            res.status(500);
            return;
          }
        } else {
          var isUrgent = e.AccountTypeId[0].equals(depositTypeUrgent._id)
            ? true
            : false;
          var result = await SecondAccountEndDay(
            e,
            date,
            isUrgent,
            e.ContractNumber,
          );
          if (!result.isSucces) {
            res.status(500);
            return;
          }
        }
      }
    }
  }

  res.send({ result });
});

async function MainCreditAccountEndDay(
  account,
  date,
  contractNumber,
  isAnnuityCredit,
) {
  var result;
  if (isAnnuityCredit) {
    if (date.getDate() == 1 && !(new Date(account.EndDate) < date)) {
      result = await ExecuteTransactionAsync(
        CurrencyFromPhisicalMoney,
        CashRegisterAccountId,
        account.IncomePerDay,
        date,
        contractNumber,
      );
      if (!result.isSucces) {
        return result;
      }
      result = await ExecuteTransactionAsync(
        CashRegisterAccountId,
        account.Id,
        account.IncomePerDay,
        date,
        contractNumber,
      );
      if (!result.isSucces) {
        return result;
      }
      result = await ExecuteTransactionAsync(
        account.Id,
        BankDevelopmentAccountId,
        account.IncomePerDay,
        date,
        contractNumber,
      );
      if (!result.isSucces) {
        return result;
      }
    }
  }
  if (new Date(account.EndDate) < date) {
    account.IsActive = false;
    await Account.replaceOne({ Id: account.Id }, account);

    result = await ExecuteTransactionAsync(
      CurrencyFromPhisicalMoney,
      CashRegisterAccountId,
      account.IncomePerDay,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
    result = await ExecuteTransactionAsync(
      CashRegisterAccountId,
      account.Id,
      account.IncomePerDay,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
    result = await ExecuteTransactionAsync(
      account.Id,
      BankDevelopmentAccountId,
      account.IncomePerDay,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
  }

  return { isSucces: true, error: "" };
}

async function SecondCreditAccountEndDay(account, date, contractNumber) {
  var result = await ExecuteTransactionAsync(
    account.Id,
    BankDevelopmentAccountId,
    account.IncomePerDay,
    date,
    contractNumber,
    true,
  );
  if (!result.isSucces) {
    return result;
  }

  if (date.getDate() == 1 && !(new Date(account.EndDate) < date)) {
    var cash = -1 * account.Saldo;
    result = await ExecuteTransactionAsync(
      CurrencyFromPhisicalMoney,
      CashRegisterAccountId,
      cash,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
    result = await ExecuteTransactionAsync(
      CashRegisterAccountId,
      account.Id,
      cash,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
  }

  if (new Date(account.EndDate) < date) {
    account.IsActive = false;
    await Account.replaceOne({ Id: account.Id }, account);

    var cash = -1 * account.Saldo;
    result = await ExecuteTransactionAsync(
      CurrencyFromPhisicalMoney,
      CashRegisterAccountId,
      cash,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
    result = await ExecuteTransactionAsync(
      CashRegisterAccountId,
      account.Id,
      cash,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
  }

  return { isSucces: true, error: "" };
}

async function RevokeDeposit(contractNumber, res) {
  var accounts = await Account.find({
    ContractNumber: contractNumber,
    IsActive: true,
  });
  if (accounts?.length == 0) {
    res.status(422);
    return { message: "Account does not exists" };
  }

  var date = await Type.findOne({ TypeGroup: AccountDateGroupNumber });
  date = new Date(date.TypeName);

  var depositTypes = await Type.find({ TypeGroup: AccountTypeGroupNumber });
  var depositTypeRevocate;
  var depositTypeUrgent;
  depositTypes.forEach((e) => {
    if (e.TypeName == UrgentDepositName) {
      depositTypeUrgent = e;
    }
    if (e.TypeName == RevocateDepositName) {
      depositTypeRevocate = e;
    }
  });

  if (!accounts[0].AccountTypeId[0].equals(depositTypeRevocate._id)) {
    res.status(422);
    return { message: "Cannot revocate account" };
  }

  for (var i = 0; i < accounts.length; i++) {
    var acc = accounts[i];

    if (acc.IsMain) {
      acc.IsActive = false;
      await Account.replaceOne({ Id: acc.Id }, acc);

      var result = await ExecuteTransactionAsync(
        BankDevelopmentAccountId,
        acc.Id,
        acc.ContractStartDeposit,
        date,
        contractNumber,
      );
      if (!result.isSucces) {
        res.status(500);
        return result;
      }
      result = await ExecuteTransactionAsync(
        acc.Id,
        CashRegisterAccountId,
        acc.ContractStartDeposit,
        date,
        contractNumber,
      );
      if (!result.isSucces) {
        res.status(500);
        return result;
      }
      result = await ExecuteTransactionAsync(
        CashRegisterAccountId,
        CurrencyFromPhisicalMoney,
        acc.ContractStartDeposit,
        date,
        contractNumber,
      );
      if (!result.isSucces) {
        res.status(500);
        return result;
      }
    } else {
      acc.IsActive = false;
      await Account.replaceOne({ Id: acc.Id }, acc);

      var cash = acc.Saldo;
      result = await ExecuteTransactionAsync(
        acc.Id,
        CashRegisterAccountId,
        cash,
        date,
        contractNumber,
      );
      if (!result.isSucces) {
        res.status(500);
        return result;
      }

      result = await ExecuteTransactionAsync(
        CashRegisterAccountId,
        CurrencyFromPhisicalMoney,
        cash,
        date,
        contractNumber,
      );
      if (!result.isSucces) {
        return result;
      }
    }
  }
  res.status(200);
}

async function MainAccountEndDay(account, date, contractNumber) {
  if (new Date(account.EndDate) < date) {
    account.IsActive = false;
    await Account.replaceOne({ Id: account.Id }, account);

    var result = await ExecuteTransactionAsync(
      BankDevelopmentAccountId,
      account.Id,
      account.ContractStartDeposit,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
    result = await ExecuteTransactionAsync(
      account.Id,
      CashRegisterAccountId,
      account.ContractStartDeposit,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
    result = await ExecuteTransactionAsync(
      CashRegisterAccountId,
      CurrencyFromPhisicalMoney,
      account.ContractStartDeposit,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
  }

  return { isSucces: true, error: "" };
}

async function SecondAccountEndDay(account, date, isUrgent, contractNumber) {
  var result = await ExecuteTransactionAsync(
    BankDevelopmentAccountId,
    account.Id,
    account.IncomePerDay,
    date,
    contractNumber,
  );
  if (!result.isSucces) {
    return result;
  }

  if (new Date(account.EndDate) < date) {
    account.IsActive = false;
    await Account.replaceOne({ Id: account.Id }, account);

    var cash = account.Saldo;
    result = await ExecuteTransactionAsync(
      account.Id,
      CashRegisterAccountId,
      cash,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }

    result = await ExecuteTransactionAsync(
      CashRegisterAccountId,
      CurrencyFromPhisicalMoney,
      cash,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
  }

  if (date.getDate() == 1 && !isUrgent) {
    var cash = account.Saldo;
    result = await ExecuteTransactionAsync(
      account.Id,
      CashRegisterAccountId,
      cash,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
    result = await ExecuteTransactionAsync(
      CashRegisterAccountId,
      CurrencyFromPhisicalMoney,
      cash,
      date,
      contractNumber,
    );
    if (!result.isSucces) {
      return result;
    }
  }

  return { isSucces: true, error: "" };
}

async function ExecuteTransactionAsync(
  from,
  to,
  value,
  date,
  contractNumber,
  isCredit = false,
) {
  var source;
  var destination;
  if (from != CurrencyFromPhisicalMoney) {
    source = await Account.findOne({ Id: from });
    if (!source) {
      return { isSucces: false, error: "Error while executing transaction" };
    }
  }

  if (to != CurrencyFromPhisicalMoney) {
    destination = await Account.findOne({ Id: to });
    if (!destination) {
      return { isSucces: false, error: "Error while executing transaction" };
    }
  }

  if (from != CurrencyFromPhisicalMoney) {
    if (!isCredit) {
      if (source.Saldo - value < 0) {
        return { isSucces: false, error: "Not enough money" };
      }
    }

    if (source.AccountActiveType == AccountActiveTypeActive) {
      source.Credit = source.Credit + value;
      source.Saldo = source.Debit - source.Credit;
    } else {
      source.Debit = source.Debit + value;
      source.Saldo = source.Credit - source.Debit;
    }

    await Account.replaceOne({ Id: source.Id }, source);
  }

  if (to != CurrencyFromPhisicalMoney) {
    if (destination.AccountActiveType == AccountActiveTypeActive) {
      destination.Debit = destination.Debit + value;
      destination.Saldo = destination.Debit - destination.Credit;
    } else {
      destination.Credit = destination.Credit + value;
      destination.Saldo = destination.Credit - destination.Debit;
    }

    await Account.replaceOne({ Id: destination.Id }, destination);
  }

  var newLog = new TransactionLog({
    ContractNumber: contractNumber,
    Date: date,
    FromAccount: source?.Id,
    FromAccountName: source?.AccountName,
    ToAccount: destination?.Id,
    ToAccountName: destination?.AccountName,
    Cash: value / CashAccuracy,
    TypeFrom:
      source?.AccountActiveType == AccountActiveTypeActive
        ? TransactionCreditTypeName
        : TransactionDebitTypeName,
    TypeTo:
      destination?.AccountActiveType == AccountActiveTypeActive
        ? TransactionDebitTypeName
        : TransactionCreditTypeName,
  });
  await newLog.save();

  return { isSucces: true, error: "" };
}

app.get("/client/:id/accounts", async function (req, res) {
  var accounts = await Account.find({
    ClientId: req.params.id,
    IsMain: true,
  });
  res.status(200);
  res.send({ accounts });
});

app.get("/accounts/:id", async function (req, res) {
  var account = await Account.findOne({
    _id: req.params.id,
    IsMain: true,
  });
  res.status(200);
  res.send({ account });
});

app.get("/account/transactions/:ContractNumber", async function (req, res) {
  var transactions = await TransactionLog.find({
    ContractNumber: req.params.ContractNumber,
  });
  res.status(200);
  res.send({ transactions });
});

app.post("/account/revoke/:id", async function (req, res) {
  var resault = await RevokeDeposit(req.params.id, res);
  res.send({ resault });
});

app.post("/account/register/credit", async function (req, res) {
  let requestData = req.body;

  var client = await Client.findOne({
    PassportSerialNumber: requestData.PassportSerialNumber,
    PassportNumber: requestData.PassportNumber,
  });
  if (!client) {
    res.status(422);
    res.send({ message: "Client does not exists" });
    return;
  }

  if (
    requestData.AccountTypeName != AnnuityCreditName &&
    requestData.AccountTypeName != DifferentiatedeCreditName
  ) {
    res.status(422);
    res.send({ message: "Wrong credit type" });
    return;
  }

  var accountType = await Type.findOne({
    TypeGroup: AccountTypeGroupNumber,
    TypeName: requestData.AccountTypeName,
  });
  if (!accountType) {
    res.status(422);
    res.send({ message: "Account Type does not exists" });
    return;
  }

  var currencyType = await Type.findOne({
    TypeGroup: AccountCurrencyTypeGroupNumber,
    TypeName: requestData.CurrencyType,
  });
  if (!currencyType) {
    res.status(422);
    res.send({ message: "Currency Type does not exists" });
    return;
  }

  var contractAccount = await Account.findOne({
    ContractNumber: requestData.ContractNumber,
  });
  if (contractAccount) {
    res.status(500);
    res.send({ message: "Contract Number already exists" });
    return;
  }

  var uniqueNumberMain =
    Math.floor(Math.random() * 99999999).toString() + CheckKey;
  var uniqueNumber = Math.floor(Math.random() * 99999999).toString() + CheckKey;

  switch (requestData.ClientState) {
    case LegalEntity:
      uniqueNumber = LegalEntityCode + uniqueNumber;
      uniqueNumberMain = LegalEntityCode + uniqueNumberMain;
      break;
    case IndividualEntrepreneur:
      uniqueNumber = IndividualEntrepreneurCode + uniqueNumber;
      uniqueNumberMain = IndividualEntrepreneurCode + uniqueNumberMain;
      break;
    case Individual:
      uniqueNumber = IndividualCode + uniqueNumber;
      uniqueNumberMain = IndividualCode + uniqueNumberMain;
      break;
  }
  var ExistingAccount = await Account.findOne({ AccountNumber: uniqueNumber });
  if (ExistingAccount) {
    res.status(422);
    res.send({ message: "Account already exists" });
    return;
  }
  ExistingAccount = await Account.findOne({ AccountNumber: uniqueNumberMain });
  if (ExistingAccount) {
    res.status(422);
    res.send({ message: "Account already exists" });
    return;
  }

  var dateDifference = dayjs(requestData.EndDate).diff(
    requestData.StartDate,
    "day",
  );
  var monthDifference =
    dayjs(requestData.EndDate).diff(requestData.StartDate, "month") + 1;

  let newAccount = new Account({
    Id: uuidv4(),
    ClientId: client._id,
    AccountNumber: uniqueNumberMain,
    AccountCode: DepositAccountCode,
    AccountActiveType: AccountActiveTypeActive,
    AccountTypeId: accountType._id,
    AccountCurrencyTypeId: currencyType._id,
    AccountName: MainDepositAccountName + requestData.AccountTypeName,
    ContractNumber: requestData.ContractNumber,
    ContractTime: requestData.ContractTime,
    ContractPercent: requestData.ContractPercent,
    ContractStartDeposit: Math.trunc(
      requestData.ContractStartDeposit * CashAccuracy,
    ),
    IncomePerDay: 0,
    Credit: 0,
    Debit: 0,
    Saldo: 0,
    IsActive: true,
    StartDate: requestData.StartDate,
    EndDate: requestData.EndDate,
    IsMain: true,
  });
  if (requestData.AccountTypeName == AnnuityCreditName) {
    newAccount.IncomePerDay = Math.trunc(
      newAccount.ContractStartDeposit / monthDifference,
    );
  } else {
    newAccount.IncomePerDay = newAccount.ContractStartDeposit;
  }
  await newAccount.save();

  let newAccountCredit = new Account({
    Id: uuidv4(),
    ClientId: client._id,
    AccountNumber: uniqueNumber,
    AccountCode: DepositAccountCode,
    AccountActiveType: AccountActiveTypeActive,
    AccountTypeId: accountType._id,
    AccountCurrencyTypeId: currencyType._id,
    AccountName: SecondDepositAccountName + requestData.AccountTypeName,
    ContractNumber: requestData.ContractNumber,
    ContractTime: requestData.ContractTime,
    ContractPercent: requestData.ContractPercent,
    ContractStartDeposit: Math.trunc(
      requestData.ContractStartDeposit * CashAccuracy,
    ),
    IncomePerDay: Math.trunc(
      requestData.ContractStartDeposit *
        (requestData.ContractPercent / 365 / 100) *
        CashAccuracy,
    ),
    Credit: 0,
    Debit: 0,
    Saldo: 0,
    IsActive: true,
    StartDate: requestData.StartDate,
    EndDate: requestData.EndDate,
    IsMain: false,
  });
  await newAccountCredit.save();

  var date = await Type.findOne({ TypeGroup: AccountDateGroupNumber });
  date = new Date(date.TypeName);

  var cash = Math.trunc(requestData.ContractStartDeposit * CashAccuracy);
  var result = await ExecuteTransactionAsync(
    BankDevelopmentAccountId,
    newAccount.Id,
    cash,
    date,
    requestData.ContractNumber,
  );
  if (!result.isSucces) {
    res.status(500);
    res.send({ result });
    return;
  }
  result = await ExecuteTransactionAsync(
    newAccount.Id,
    CashRegisterAccountId,
    cash,
    date,
    requestData.ContractNumber,
  );
  if (!result.isSucces) {
    res.status(500);
    res.send({ result });
    return;
  }
  result = await ExecuteTransactionAsync(
    CashRegisterAccountId,
    CurrencyFromPhisicalMoney,
    cash,
    date,
    requestData.ContractNumber,
  );
  if (!result.isSucces) {
    res.status(500);
    res.send({ result });
    return;
  }

  var bankCard = await RegisterBankCardAsync(
    client.Id,
    newAccount.Id,
    requestData.ContractNumber,
  );

  res.status(200);
  res.send({ newAccount, bankCard });
  return;
});

app.get("/card/authenticate", async function (req, res) {
  var query = req.query;
  var validationResult = await ValidateBankCardAsync(
    query.CardNumber,
    query.CardPassword,
  );
  if (!validationResult.isSucces) {
    res.status(401);
    res.send({ validationResult });
    return;
  }

  res.status(200);
  res.send({ validationResult });
});

app.get("/card/status", async function (req, res) {
  var query = req.query;
  var validationResult = await ValidateBankCardAsync(
    query.CardNumber,
    query.CardPassword,
  );
  if (!validationResult.isSucces) {
    res.status(403);
    res.send({ validationResult });
    return;
  }

  var bankCard = await BankCard.findOne({ CardNumber: query.CardNumber });
  var mainAccount = await Account.findOne({ Id: bankCard.MainAccountId });
  if (!mainAccount) {
    res.status(500);
    res.send({ message: "Account does not exists" });
    return;
  }

  mainAccount.Saldo = Math.trunc(mainAccount.Saldo) / CashAccuracy;
  mainAccount.Credit = Math.trunc(mainAccount.Credit) / CashAccuracy;
  mainAccount.Debit = Math.trunc(mainAccount.Debit) / CashAccuracy;

  res.send({ mainAccount });
});

app.get("/card/withdraw", async function (req, res) {
  var query = req.query;
  var validationResult = await ValidateBankCardAsync(
    query.CardNumber,
    query.CardPassword,
  );
  if (!validationResult.isSucces) {
    res.status(403);
    res.send({ validationResult });
    return;
  }

  var bankCard = await BankCard.findOne({ CardNumber: query.CardNumber });
  var mainAccount = await Account.findOne({ Id: bankCard.MainAccountId });
  if (!mainAccount) {
    res.status(500);
    res.send({ message: "Account does not exists" });
    return;
  }

  if (!query.Amount || isNaN(query.Amount) || query.Amount <= 0) {
    res.status(422);
    res.send({ message: "Value cannot be lesser than 0" });
    return;
  }

  var date = await Type.findOne({ TypeGroup: AccountDateGroupNumber });
  date = new Date(date.TypeName);

  var result = await ExecuteTransactionAsync(
    bankCard.MainAccountId,
    CashRegisterAccountId,
    Math.trunc(query.Amount * CashAccuracy),
    date,
    mainAccount.ContractNumber,
    true,
  );
  if (!result.isSucces) {
    res.status(500);
    res.send({ result });
    return;
  }
  result = await ExecuteTransactionAsync(
    CashRegisterAccountId,
    CurrencyFromPhisicalMoney,
    Math.trunc(query.Amount * CashAccuracy),
    date,
    mainAccount.ContractNumber,
  );
  if (!result.isSucces) {
    res.status(500);
    res.send({ result });
    return;
  }

  res.status(200);
  res.send({ isSucces: true });
});

async function RegisterBankCardAsync(clientId, mainAccountId, contractNumber) {
  var password = Math.floor(Math.random() * 8999 + 1000);
  var bankCardNumber = Math.floor(
    Math.random() * 8999999999999999 + 1000000000000000,
  );
  var bankCard = new BankCard({
    CardNumber: bankCardNumber,
    CardPassword: password.toString(),
    ClientId: clientId,
    MainAccountId: mainAccountId,
    ContractNumber: contractNumber,
  });
  await bankCard.save();
  return bankCard;
}

async function ValidateBankCardAsync(cardNumber, cardPassword) {
  var bankCard = await BankCard.findOne({ CardNumber: cardNumber });
  if (!bankCard) {
    return {
      isSucces: false,
      message: "Card with this Number does not exists",
    };
  }

  if (bankCard.CardPassword != cardPassword) {
    return {
      isSucces: false,
      message: "Invalid password",
    };
  }

  return { isSucces: true };
}
