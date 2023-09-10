const Validator = require("fastest-validator");
const models = require("../models");
const db = require("../models/index");
const MasterColor = db.MasterColor;
const MasterBreed = db.MasterBreed;
const MasterSpecies = db.MasterSpecies;
const MasterGender = db.MasterGender;
const HealthReport = db.HealthReport;
const Patient = db.Patient;
const MasterIpdCategory = db.MasterIpdCategory;
const Bed = db.Bed;
const MasterAge = db.MasterAge;
const CaseTable= db.CaseTable;
const opdIpd = db.opdIpd;

const WardCategory = db.WardCategory;

const { Sequelize, Op, assert, where } = require("sequelize");

function getAddHealthReport(req, res) {
  const id = req.params.id;

    const healthReportData = {
      date_of_release: req.body.date_of_release,
      certified_reason: req.body.certified_reason,
      animal: req.body.animal,
      hospital_id: req.body.hospital_id,
      contract_no: req.body.contract_no,
      patient_id: id,
      case_id: req.body.case_id,
      status: 0,
    };
    const schema = {
      date_of_release: { type: "string", optional: false },
      certified_reason: { type: "string", optional: false },
      animal: { type: "string", optional: false },
      hospital_id: { type: "string", optional: false },
    };
    const v = new Validator();
    const validateResponse = v.validate(healthReportData, schema);
    if (validateResponse !== true) {
      return res.status(400).json({
        message: "Validstion failed",
        errors: validateResponse,
      });
    }
    models.HealthReport.create(healthReportData, {
      where: { patient_id: id },
    })
      .then((result) => {
        const pat_id = result.patient_id;
        models.Patient.update(
          { discharge_death_status: 1, status: 2 },
          { where: { id: pat_id } }
        );
        models.CaseTable.update(
          {status: 2},
          { where: { patient_id: id, status: 1 } }
        );
        models.opdIpd.update({ status: 2}, { where: { patient_id: id} });
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

function geteUpdateHealthReport(req, res) {
  const id = req.params.id;
  const healthReportUpdateData = {
    ownerName: req.body.ownerName,
    contractNo: req.body.contractNo,
    dateOfAdmission: req.body.dateOfAdmission,
    dateOfRelease: req.body.dateOfRelease,
    address: req.body.address,
    breed: req.body.breed,
    species: req.body.species,
    color: req.body.color,
    age: req.body.age,
    genderid: req.body.genderid,
    diseases: req.body.diseases,
    treatment: req.body.treatment,
    animal: req.body.animal,
    releaseTime: req.body.releaseTime,
    veterinaryDoctor: req.body.veterinaryDoctor,
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
    diseases: { type: "string", optional: false },
    treatment: { type: "string", optional: false },
    animal: { type: "string", optional: false },
    releaseTime: { type: "string", optional: false },
    veterinaryDoctor: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(healthReportUpdateData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  const status = 0;
  models.HealthReport.update(healthReportUpdateData, {
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

function getAllHealthReport(req, res) {
  const id = req.params.id;
  models.CaseTable.findAll({ where: {patient_id: id},
    include: [{ 
        model:HealthReport,
       },
       { 
        model:opdIpd,
       },
      ]
  })
 
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getOneHealthReport(req, res) {
  const id = req.params.id;
  models.HealthReport.findOne({ where: { patient_id: id } })
    .then((result) => {
      res.status(200).json([result]);
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getDeleteHealthReport(req, res) {
  const id = req.params.id;
  models.HealthReport.update(
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
      // console.log(result);
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

function getOneInfoHealthReport(req, res) {
  const id = req.params.id;
  models.HealthReport.findByPk(id, {
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
function getPatientHealthReport(req, res) {
  const hospital_id = req.params.id;
  models.Patient.findAll({ where: { hospital_id: hospital_id },
    // include:[
    //   {
    //     model: CaseTable,
    //     where: { status: 2,hospital_id: hospital_id}
    //   }, ] 
     })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getIpdOpdHealthReport(req, res) {
  const id = req.params.id;
  models.Patient.findByPk(id, {
    // where: { status: 0 },
    include: [
      {
        model: MasterIpdCategory,

        attribute: [[Sequelize.col("MasterIpdCategory.name")]],
      },
      {
        model: MasterBreed,

        attribute: [[Sequelize.col("MasterBreed.name")]],
      },
      {
        model: MasterColor,

        attribute: [[Sequelize.col("MasterColor.name")]],
      },
      {
        model: MasterGender,

        attribute: [[Sequelize.col("MasterGender.name")]],
      },
      {
        model: MasterSpecies,

        attribute: [[Sequelize.col("MasterSpecies.name")]],
      },
      {
        model: Bed,
        attribute: [[Sequelize.col("Bed")]],
      },
      {
        model: MasterAge,
        attribute: [[Sequelize.col("MasterAge.age")]],
      },
      {
        model:CaseTable,
        // attribute: [[Sequelize.col("HealthReport.patient_id")]],
      }
    ],
  })
    .then((result) => {
      res.status(200).json([result]);
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}

module.exports = {
  getAddHealthReport: getAddHealthReport,
  geteUpdateHealthReport: geteUpdateHealthReport,
  getAllHealthReport: getAllHealthReport,
  getDeleteHealthReport: getDeleteHealthReport,
  getOneHealthReport: getOneHealthReport,
  getOneInfoHealthReport: getOneInfoHealthReport,
  getPatientHealthReport: getPatientHealthReport,
  getIpdOpdHealthReport: getIpdOpdHealthReport,
};
