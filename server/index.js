const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
var cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { Schema } = mongoose;
const yup = require("yup");
const { userInfo } = require("os");

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
  Sallary: yup
    .number(),
  DateOfBirth: yup.date().required("DateOfBirth is required"),
  DateOfIssue: yup.date().required("DateOfIssue is required"),
  IsRetiree: yup.bool().required("IsRetiree is required"),
  IsConscript: yup.bool().required("IsConscript is required"),
});

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
    HomeCity: [{ type: Schema.Types.ObjectId, ref: 'Types'}],
    HomeAddress: String,
    HomeTelephone: String,
    MobileTelephone: String,
    EMail: String,
    PlaceOfWork: String,
    Position: String,
    FamilyStatus: String,
    Citizenship: [{ type: Schema.Types.ObjectId, ref: 'Types'}],
    Disability: [{ type: Schema.Types.ObjectId, ref: 'Types'}],
    IsRetiree: Boolean,
    Sallary: Number,
    IsConscript: Boolean,
  },
  { timestamps: true },
);
const Client = mongoose.model("Clients", ClientSchema);

const TypeSchema = new mongoose.Schema(
  {
    TypeGroup: Number,
    TypeName: String,
  },
  { timestamps: true },
);
const Type = mongoose.model("Types", TypeSchema);

const CityGroupNumber = 1;
const CitizenshipGroupNumber = 2;
const DisabilityGroupNumber = 3;

app.post("/clients", async function (req, res) {
  let clientData = req.body;

  try {
    var s = await USER_VALIDATION_SCHEMA.validate(clientData);
  } catch (e) {
    res.status(422);
    res.send(e.errors);
    return;
  }

  var client = await Client.findOne({ PassportSerialNumber: clientData.PassportSerialNumber, PassportNumber: clientData.PassportNumber });
  if (client){
      res.status(422);
      res.send({message: "Client already exists"});
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
  res.send({newClient});
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
    var clients = await Client.find().populate("HomeCity").populate("Citizenship").populate("Disability");
    res.status(200);
    res.send({ clients });
});

app.get("/clients/:id", async function (req, res) {
    var client = await Client.findOne({Id: req.params.id}).populate("HomeCity").populate("Citizenship").populate("Disability");
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

  try {
    var s = await USER_VALIDATION_SCHEMA.validate(clientData);
  } catch (e) {
    res.status(422);
    res.send(e.errors);
    return;
  }

    var clientToUpdate = await Client.findOne({ Id: req.params.id });
    if (!clientToUpdate){
        res.status(404);
        res.send();
        return; 
    }

    var client = await Client.findOne({ PassportSerialNumber: clientData.PassportSerialNumber, PassportNumber: clientData.PassportNumber });
    if (client){
        res.status(422);
        res.send({message: "Client already exists"});
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

    var result = await Client.replaceOne({Id: req.params.id} ,{
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
      });
  
    res.status(200);
    res.send({result});
  });
