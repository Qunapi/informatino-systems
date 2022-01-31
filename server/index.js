const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const app = express();
const httpServer = http.Server(app);

httpServer.listen(80);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/BankDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'))
db.once('open', async function() {
    console.log('-Connected-');
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
        IsConscript: Boolean
    },
    { timestamps: true }
); 
const Client = mongoose.model("Clients", ClientSchema);

const TypeSchema = new mongoose.Schema(
    {
        Id: String,
        TypeGroup: Number,
        TypeName: String
    },
    { timestamps: true }
);
const Type = mongoose.model("Types", TypeSchema);

const CityGroupNumber = 1;
const CitizenshipGroupNumber = 2;
const DisabilityGroupNumber = 3;

app.post("/clients", async function(req, res) {
    console.log(req.body);

    let clientData = req.body;
    if (!(clientData.Surname && clientData.Name && clientData.MiddleName && clientData.DateOfBirth && clientData.PassportSerialNumber && clientData.PassportNumber && clientData.PlaceOfIssue 
        && clientData.DateOfIssue && clientData.IdentificationalNumber && clientData.PlaceOfBirth && clientData.HomeCity && clientData.HomeAddress && clientData.FamilyStatus 
        && clientData.Citizenship && clientData.Disability && clientData.Retiree  && clientData.IsConscript)){
        res.status(422);
        res.send();
    }

    let clientHomeCityId;

    var clientHomeCity = await Type.findOne({TypeGroup: CityGroupNumber, TypeName: clientData.HomeCity});
    if (clientHomeCity){
        clientHomeCityId = clientHomeCity.Id;
    }else{
        clientHomeCityId = uuidv4();
        let newHomeCity = new Type({Id: clientHomeCityId, TypeGroup: CityGroupNumber, TypeName: clientData.HomeCity});
        await newHomeCity.save();
    }

    let citizenshipId;
    
    var clientCitizenship = await Type.findOne({TypeGroup: CitizenshipGroupNumber, TypeName: clientData.Citizenship});
    if (clientCitizenship){
        citizenshipId = clientCitizenship.Id;
    }else{
        citizenshipId = uuidv4();
        let newCitizenship = new Type({Id: citizenshipId, TypeGroup: CitizenshipGroupNumber, TypeName: clientData.Citizenship});
        await newCitizenship.save();
    }

    let disabilityId;
    
    var clientCitizenship = await Type.findOne({TypeGroup: CitizenshipGroupNumber, TypeName: clientData.Citizenship});
    if (clientCitizenship){
        citizenshipId = clientCitizenship.Id;
    }else{
        citizenshipId = uuidv4();
        let newCitizenship = new Type({Id: citizenshipId, TypeGroup: CitizenshipGroupNumber, TypeName: clientData.Citizenship});
        await newCitizenship.save();
    }

    let newClient = new Client({ Id: uuidv4(), Surname: "Android", Name: "Der"});
    await newClient.save();

    res.send();
    //res.send({});
})

app.get("*", function(req, res) {
    res.send({});
})