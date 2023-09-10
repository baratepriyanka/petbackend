const Validator = require("fastest-validator");
const models = require("../models");
const db = require("../models/index");
const MasterColor = db.MasterColor;
const MasterBreed = db.MasterBreed;
const MasterSpecies = db.MasterSpecies;
const MasterGender = db.MasterGender;
const DeathReport = db.DeathReport;
const Patient = db.Patient;
const MasterIpdCategory = db.MasterIpdCategory;
const Bed = db.Bed;
const MasterAge = db.MasterAge;
const CaseTable = db.CaseTable;
const HealthReport = db.HealthReport;

const { Sequelize, Op, assert } = require("sequelize");

function getAddDeathReport(req, res) {

  const id= req.params.id;
  const deathReportData = {
    date_of_release: req.body.date_of_release,
    cause_of_death: req.body.cause_of_death,
    cause_of_treatment:  req.body.cause_of_treatment,
    hospital_id: req.body.hospital_id,
    certified_reason:req.body.certified_reason,
    contract_no: req.body.contract_no,
    patient_id: id,
    status: 1,
  };
  const schema = {
    date_of_release: { type: "string", optional: false },
    cause_of_death: { type: "string", optional: false },
    certified_reason: { type: "string", optional: false },
    cause_of_treatment: { type: "string", optional: false },
    hospital_id: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(deathReportData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  models.DeathReport.create(deathReportData, {where :{patient_id: id}})
    .then((result) => {
      const pat_id = result.patient_id;
      models.Patient.update({status:2,discharge_death_status:2},{ where : {id: pat_id } });
      models.CaseTable.update(
        {status: 2 },
        { where: { patient_id: id } ,status: 1}
      );
      models.HealthReport.update(
        {status: 1 },
        { where: { patient_id: id } }
      );
      res.status(200).json({
        message: "Death Report add successfully",
        post: result.id,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });

}

function geteUpdateDeathReport(req, res) {
  const id = req.params.id;
  const deathReportUpdateData = {
    ownerName: req.body.ownerName,
    contractNo: req.body.contractNo,
    dateOfAdmission: req.body.dateOfAdmission,
    address: req.body.address,
    breed: req.body.breed,
    species: req.body.species,
    color: req.body.color,
    age: req.body.age,
    genderid: req.body.genderid,
    diseases: req.body.diseases,
    causeOfDeath: req.body.causeOfDeath,
    date: req.body.date,
    releaseTime: req.body.releaseTime,
    veterinaryDoctor: req.body.veterinaryDoctor,
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
    diseases: { type: "string", optional: false },
    causeOfDeath: { type: "string", optional: false },
    date: { type: "string", optional: false },
    releaseTime: { type: "string", optional: false },
    veterinaryDoctor: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(deathReportUpdateData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  const status = 0;
  models.DeathReport.update(deathReportUpdateData, {
    where: { status: status, id: id},
  })
    .then((result) => {
      res.status(200).json({
        message: "Death Report updated successfully",
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

function getAllDeathReport(req, res) {
  const hospital_id=req.params.id
  models.DeathReport.findAll({
    where: {
      status: 0,
      hospital_id:hospital_id
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

function getOneDeathReport(req, res) {
  const id = req.params.id;
  models.DeathReport.findOne({where:{patient_id:id}})
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

function getDeleteDeathReport(req, res) {
  const id = req.params.id;
  models.DeathReport.update(
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
        message: "Death Report deleted successfully",
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

function getOneInfoDeathReport(req, res) {
  const id = req.params.id;
  models.DeathReport.findByPk(id, {
   
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

function getDeathHealthReport (req, res) {
  const hospital_id = req.params.id;
  models.Patient.findAll({ where: { status: 2, hospital_id: hospital_id , discharge_death_status:2},
    include:[
      {
        model: CaseTable,
        where: { status: 2,hospital_id: hospital_id}
      },{
        model: DeathReport,
        where: { status: 1,hospital_id: hospital_id}
      }
    ] })
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
function  getIpdOpdDeathReport(req ,res){
  const id = req.params.id;
  models.Patient.findByPk(id,{ where :{ status :2,discharge_death_status:2 }, 
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
        model:DeathReport,
        attribute: [[Sequelize.col("DeathReport.patient_id")]],
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
  getAddDeathReport: getAddDeathReport,
  geteUpdateDeathReport: geteUpdateDeathReport,
  getAllDeathReport: getAllDeathReport,
  getDeleteDeathReport: getDeleteDeathReport,
  getOneDeathReport: getOneDeathReport,
  getOneInfoDeathReport: getOneInfoDeathReport,
  getDeathHealthReport:getDeathHealthReport,
  getIpdOpdDeathReport:getIpdOpdDeathReport
};
