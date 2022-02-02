const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
var cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
const httpServer = http.Server(app);

httpServer.listen(80);
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
    HomeCity: String,
    HomeAddress: String,
    HomeTelephone: String,
    MobileTelephone: String,
    EMail: String,
    PlaceOfWork: String,
    Position: String,
    FamilyStatus: String,
    Citizenship: String,
    Disability: String,
    IsRetiree: Boolean,
    Sallary: Number,
    IsConscript: Boolean,
  },
  { timestamps: true },
);
const Client = mongoose.model("Clients", ClientSchema);

const TypeSchema = new mongoose.Schema(
  {
    Id: String,
    TypeGroup: Number,
    TypeName: String,
  },
  { timestamps: true },
);
const Type = mongoose.model("Types", TypeSchema);

const CityGroupNumber = 1;
const CitizenshipGroupNumber = 2;
const DisabilityGroupNumber = 3;

const IdentificationalNumberRegex = new RegExp('^[1-6]{1}([0][1-9]|[12][0-9]|3[01]){1}([0][1-9]|[1][0-2]){1}([0][1-9]|[1-9][0-9]){1}([ABCKEMH]){1}((00[1-9])|(0[1-9][0-9])|([1-9][1-9][0-9])){1}((PB)|(BA)|(BI)){1}([0-9]){1}$');
const PassportNumberRegex = new RegExp('^[1-9]{1}[0-9]{6}$');
const HomeTelephoneRegex = new RegExp('^[1-9]{1}[0-9]{6}$');
const MobileTelephoneRegex = new RegExp('^(\\+375){1}((25)|(29)|(33)|(44)){1}([1-9][0-9]{6}){1}$');

app.post("/clients", async function (req, res) {
  let clientData = req.body;
  if (
      clientData.Surname &&
      clientData.Name &&
      clientData.MiddleName &&
      clientData.DateOfBirth &&
      clientData.PassportSerialNumber &&
      clientData.PassportNumber &&
      clientData.PlaceOfIssue &&
      clientData.DateOfIssue &&
      clientData.IdentificationalNumber &&
      clientData.PlaceOfBirth &&
      clientData.HomeCity &&
      clientData.HomeAddress &&
      clientData.FamilyStatus &&
      clientData.Citizenship &&
      clientData.Disability &&
      clientData.Retiree &&
      clientData.IsConscript
  ) {
    res.status(422);
    res.send({message: "Requried field is missing"});
    return;
  }

  if (!PassportNumberRegex.test(clientData.PassportNumber)) {
    res.status(422);
    res.send({message: "Passport Number is invalid"});
    return;   
  }

  if (!IdentificationalNumberRegex.test(clientData.IdentificationalNumber)) {
    res.status(422);
    res.send({message: "Identificational Number is invalid"});
    return;   
  }

  if (!HomeTelephoneRegex.test(clientData.HomeTelephone)) {
    res.status(422);
    res.send({message: "Home Telephone Number is invalid"});
    return;   
  }

  if (!MobileTelephoneRegex.test(clientData.MobileTelephone)) {
    res.status(422);
    res.send({message: "Mobile Telephone Number is invalid"});
    return;   
  }

  let clientHomeCityId;

  if (clientData.HomeCity) {
    var clientHomeCity = await Type.findOne({
        TypeGroup: CityGroupNumber,
        TypeName: clientData.HomeCity,
      });
      if (clientHomeCity) {
        clientHomeCityId = clientHomeCity.Id;
      } else {
        clientHomeCityId = uuidv4();
        let newHomeCity = new Type({
          Id: clientHomeCityId,
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
        citizenshipId = clientCitizenship.Id;
      } else {
        citizenshipId = uuidv4();
        let newCitizenship = new Type({
          Id: citizenshipId,
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
        disabilityId = clientDisability.Id;
      } else {
        disabilityId = uuidv4();
        let newDisability = new Type({
          Id: disabilityId,
          TypeGroup: DisabilityGroupNumber,
          TypeName: clientData.Disability,
        });
        await newDisability.save();
      }     
  }

  var clientDisability = await Type.findOne({
    TypeGroup: DisabilityGroupNumber,
    TypeName: clientData.Disability,
  });
  if (clientDisability) {
    disabilityId = clientDisability.Id;
  } else {
    disabilityId = uuidv4();
    let newDisability = new Type({
      Id: disabilityId,
      TypeGroup: DisabilityGroupNumber,
      TypeName: clientData.Disability,
    });
    await newDisability.save();
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
    HomeCity: clientData.HomeCity,
    HomeAddress: clientData.HomeAddress,
    HomeTelephone: clientData.HomeTelephone,
    MobileTelephone: clientData.MobileTelephone,
    EMail: clientData.EMail,
    PlaceOfWork: clientData.PlaceOfWork,
    Position: clientData.Position,
    FamilyStatus: clientData.FamilyStatus,
    Citizenship: clientData.Citizenship,
    Disability: clientData.Disability,
    IsRetiree: clientData.IsRetiree,
    Sallary: clientData.Sallary,
    IsConscript: clientData.IsConscript,
  });
  await newClient.save();

  res.status(200);
  res.send();
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
    var clients = await Client.find();
    res.status(200);
    res.send({ clients });
});

app.get("/clients/:id", async function (req, res) {
    var client = await Client.findOne({Id: req.params.id});
    if(client) {
        res.status(200);
    } else {
        res.status(404);
    }
    res.send({ client });
});

app.delete("/clients/:id", async function (req, res) {
    var client = await Client.deleteOne({Id: req.params.id});
    
    if (!client){
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
    if (
      clientData.Surname &&
      clientData.Name &&
      clientData.MiddleName &&
      clientData.DateOfBirth &&
      clientData.PassportSerialNumber &&
      clientData.PassportNumber &&
      clientData.PlaceOfIssue &&
      clientData.DateOfIssue &&
      clientData.IdentificationalNumber &&
      clientData.PlaceOfBirth &&
      clientData.HomeCity &&
      clientData.HomeAddress &&
      clientData.FamilyStatus &&
      clientData.Citizenship &&
      clientData.Disability &&
      clientData.Retiree &&
      clientData.IsConscript
  ) {
    res.status(422);
    res.send({message: "Requried field is missing"});
    return;
  }

  if (!PassportNumberRegex.test(clientData.PassportNumber)) {
    res.status(422);
    res.send({message: "Passport Number is invalid"});
    return;   
  }

  if (!IdentificationalNumberRegex.test(clientData.IdentificationalNumber)) {
    res.status(422);
    res.send({message: "Identificational Number is invalid"});
    return;   
  }

  if (!HomeTelephoneRegex.test(clientData.HomeTelephone)) {
    res.status(422);
    res.send({message: "Home Telephone Number is invalid"});
    return;   
  }

  if (!MobileTelephoneRegex.test(clientData.MobileTelephone)) {
    res.status(422);
    res.send({message: "Mobile Telephone Number is invalid"});
    return;   
  }

    var clientToUpdate = await Client.findOne({ Id: req.params.id });
    if (!clientToUpdate){
        res.status(404);
        res.send();
        return; 
    }
  
    let clientHomeCityId;

    if (clientData.HomeCity) {
      var clientHomeCity = await Type.findOne({
          TypeGroup: CityGroupNumber,
          TypeName: clientData.HomeCity,
        });
        if (clientHomeCity) {
          clientHomeCityId = clientHomeCity.Id;
        } else {
          clientHomeCityId = uuidv4();
          let newHomeCity = new Type({
            Id: clientHomeCityId,
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
          citizenshipId = clientCitizenship.Id;
        } else {
          citizenshipId = uuidv4();
          let newCitizenship = new Type({
            Id: citizenshipId,
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
          disabilityId = clientDisability.Id;
        } else {
          disabilityId = uuidv4();
          let newDisability = new Type({
            Id: disabilityId,
            TypeGroup: DisabilityGroupNumber,
            TypeName: clientData.Disability,
          });
          await newDisability.save();
        }     
    }

    await Client.replaceOne({Id: req.params.id} ,{
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
        HomeCity: clientData.HomeCity,
        HomeAddress: clientData.HomeAddress,
        HomeTelephone: clientData.HomeTelephone,
        MobileTelephone: clientData.MobileTelephone,
        EMail: clientData.EMail,
        PlaceOfWork: clientData.PlaceOfWork,
        Position: clientData.Position,
        FamilyStatus: clientData.FamilyStatus,
        Citizenship: clientData.Citizenship,
        Disability: clientData.Disability,
        IsRetiree: clientData.IsRetiree,
        Sallary: clientData.Sallary,
        IsConscript: clientData.IsConscript,
      });
  
    res.status(200);
    res.send();
  });

app.get("*", function (req, res) {
  res.send({});
});
