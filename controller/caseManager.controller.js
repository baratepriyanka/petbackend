const models = require("../models");
const Validator = require("fastest-validator");
const db = require("../models/index");
const Doctor = db.Doctor;
const MasterBloodGroups = db.MasterBloodGroups;
const Patient = db.Patient;

const { Sequelize, Op, assert } = require("sequelize");

function getCaseManager(req, res) {
//   const hosid= req.params.id;
// const data = models.Hospital.findOne({
//  where: { id: hosid },
// });
// data.then(function (result) {
  // const  hospital_id= result.id;
  const caseData = {
    patient: req.body.patient,
    date: req.body.date,
    title: req.body.title,
    case: req.body.case,
    hospital_id:req.body.hospital_id,
    status: 0,
  };
  const schema = {
    patient: { type: "string", optional: false },
    date: { type: "string", optional: false },
    title: { type: "string", optional: false },
    case: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(caseData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  models.CaseManager.create(caseData)
    .then((result) => {
      res.status(202).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "someting went wrong",
        post: error,
      });
    });
// })
  
}
function getUpdateCase(req, res) {
  const id = req.params.id;
  const updateCaseData = {
    patient: req.body.patient,
    date: req.body.date,
    title: req.body.title,
    case: req.body.case,
    hospital_id:req.body.hospital_id
  };
  const status = 0;
  const schema = {
    patient: { type: "string", optional: false },
    date: { type: "string", optional: false },
    title: { type: "string", optional: false },
    case: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(updateCaseData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  models.CaseManager.update(updateCaseData, {
    where: { status: status, id: id},
  })
    .then((result) => {
      res.status(200).json(updateCaseData);
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went wrong",
        post: error,
      });
    });
}
function getAllCase(req, res) {
  const hospital_id= req.params.id;
  models.CaseManager.findAll({
    where: {
      status: 0,
      hospital_id:hospital_id
    },
    include: [
      {
        model: Patient,
        where: {
          status: 0,
          hospital_id:hospital_id
        },
        attribute: [[Sequelize.col("Patient.patient_name")]],
      },
    ],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went wrong",
        post: error,
      });
    });
}
function getOneCaseId(req, res) {
  const id = req.params.id;
  models.CaseManager.findByPk(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went wrong",
        post: error,
      });
    });
}
function getDeleteAddcase(req, res) {
  const id = req.params.id;
  models.CaseManager.update(
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
      res.status(200).json({
        message: "success",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went wrong",
        post: error,
      });
    });
}
function getOneInfoCaseId(req, res) {
  const id = req.params.id;
  models.CaseManager.findByPk(id, {
   
    include: [
      {
        model: Patient,

        attribute: [[Sequelize.col("Patient.patient_name")]],
      },
    ],
  })
    .then((result) => {
      res.status(200).json([result]);
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went wrong",
        post: error,
      });
    });
}

module.exports = {
  getCaseManager: getCaseManager,
  getUpdateCase: getUpdateCase,
  getAllCase: getAllCase,
  getOneCaseId: getOneCaseId,
  getDeleteAddcase: getDeleteAddcase,
  getOneInfoCaseId: getOneInfoCaseId,
};
