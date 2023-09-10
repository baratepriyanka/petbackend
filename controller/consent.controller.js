const Validator = require("fastest-validator");
const models = require("../models");
const db = require("../models/index");
const MasterColor = db.MasterColor;
const MasterBreed = db.MasterBreed;
const MasterSpecies = db.MasterSpecies;
const MasterGender = db.MasterGender;
const Consent = db.Consent;
const { Sequelize, Op, assert } = require("sequelize");

function getAddConsent(req, res) {

  const consentData = {
    ownerName: req.body.ownerName,
    contractNo: req.body.contractNo,
    dateOfAdmission: req.body.dateOfAdmission,
    address: req.body.address,
    breed: req.body.breed,
    species: req.body.species,
    color: req.body.color,
    age: req.body.age,
    genderid: req.body.genderid,
    undersigned: req.body.undersigned,
    time: req.body.time,
    idNo: req.body.idNo,
    vehicleNo: req.body.vehicleNo,
    status: 0,
    hospital_id:req.body.hospital_id,
  };
  // console.log(consentData);
  const schema = {
    ownerName: { type: "string", optional: false },
    contractNo: { type: "string", optional: false },
    dateOfAdmission: { type: "string", optional: false },
    address: { type: "string", optional: false },
    breed: { type: "string", optional: false },
    species: { type: "string", optional: false },
    color: { type: "string", optional: false },
    age: { type: "string", optional: false },
    genderid: { type: "string", optional: false },
    undersigned: { type: "string", optional: false },
    time: { type: "string", optional: false },
    idNo: { type: "string", optional: false },
    vehicleNo: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(consentData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  models.Consent.create(consentData)
    .then((result) => {
      res.status(200).json({
        message: "Health Report add successfully",
        post: result,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });

}

function geteUpdateConsent(req, res) {
  const id = req.params.id;
  const consentUpdateData = {
    ownerName: req.body.ownerName,
    contractNo: req.body.contractNo,
    dateOfAdmission: req.body.dateOfAdmission,
    address: req.body.address,
    breed: req.body.breed,
    species: req.body.species,
    color: req.body.color,
    age: req.body.age,
    genderid: req.body.genderid,
    undersigned: req.body.undersigned,
    time: req.body.time,
    idNo: req.body.idNo,
    vehicleNo: req.body.vehicleNo,
    hospital_id:req.body.hospital_id,
  };
  const schema = {
    ownerName: { type: "string", optional: false },
    contractNo: { type: "string", optional: false },
    dateOfAdmission: { type: "string", optional: false },
    address: { type: "string", optional: false },
    breed: { type: "string", optional: false },
    species: { type: "string", optional: false },
    color: { type: "string", optional: false },
    age: { type: "string", optional: false },
    genderid: { type: "string", optional: false },
    undersigned: { type: "string", optional: false },
    time: { type: "string", optional: false },
    idNo: { type: "string", optional: false },
    vehicleNo: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(consentUpdateData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  const status = 0;
  models.Consent.update(consentUpdateData, {
    where: { status: status, id: id },
  })
    .then((result) => {
      res.status(200).json({
        message: "Health Report updated successfully",
        // post: result
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}

// function getAllConsent(req, res) {
//   models.consent.findAll({
//     where: {
//       status: 0,
//     },
//   })
//     .then((result) => {
//       // console.log(result);
//       res.status(200).json(result);
//     })
//     .catch((error) => {
//       res.status(404).json({
//         message: "something went worg",
//         post: error,
//       });
//     });
// }
function getAllConsent(req, res) {
  const hospital_id=req.params.id
  models.Consent.findAll({
    where: {
      status: 0,
      hospital_id: hospital_id
    },
  })
    .then((result) => {
      // console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getOneConsent(req, res) {
  const id = req.params.id;
  models.Consent.findByPk(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getDeleteConsent(req, res) {
  const id = req.params.id;
  models.Consent
    .update(
      {
        status: 2,
      },
      {
        where: {
          id: id,
          status: 0,
        
        },
      }
    )
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Health Report deleted successfully",
        // post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getOneInfoConsent(req, res) {
  console.log("hdfbhjdfbg");
  const id = req.params.id;
  models.Consent.findByPk(id, {
   
    include: [
      {
        model: MasterColor,
        attribute: [[Sequelize.col("MasterColor.name")]],
      },
      {
        model: MasterBreed,

        attribute: [[Sequelize.col("MasterBreed.name")]],
      },
      {
        model: MasterSpecies,

        attribute: [[Sequelize.col("MasterSpecies.name")]],
      },
      {
        model: MasterGender,

        attribute: [[Sequelize.col("MasterGender.name")]],
      },
    ],
  })
    .then((result) => {
      res.status(200).json([result]);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}

module.exports = {
  getAddConsent: getAddConsent,
  geteUpdateConsent: geteUpdateConsent,
  getAllConsent: getAllConsent,
  getDeleteConsent: getDeleteConsent,
  getOneConsent: getOneConsent,
  getOneInfoConsent: getOneInfoConsent,
};
