const models = require("../models");
const db = require("../models/index");
const Validator = require("fastest-validator");
const Prescription = db.Prescription;
const Doctor = db.Doctor;
const Medicine = db.Medicine;
const Patient = db.Patient;
const opdIpd = db.opdIpd;
const { Sequelize, Op, assert } = require("sequelize");

function getAllPrescription(req, res) {
  const hospital_id= req.params.id
  models.Patient.findAll({
    where: {
      hospital_id:hospital_id,
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

function getAddPrescriptionPatient (req, res){
  const patient_id= req.params.id
  models.opdIpd.findAll({
    where: {
      patient_id:patient_id,
    },
  })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}


function getDeletePrescription(req, res){
  const id = req.params.id;
  models.Prescription.update(
    {
      status: 2,
    },
    {where:{
      id:id ,status:0,
    
    }}
    ).then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Prescription deleted successfully",
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

function getAddPrescription(req, res) {
  // var doctorID = "D" + Math.floor(Math.random() * 1000);
  const prescriptionData = {
    date: req.body.date,
    patientid: req.body.patientid,
    doctorid: req.body.doctorid,
    medicineid: req.body.medicineid,    
    note: req.body.note,    
    history: req.body.history,   
    hospital_id: req.body.hospital_id,
    status: 0,
  };
  const schema = {
    date: { type: "string", optional: false },
    patientid: { type: "string", optional: false },
    doctorid: { type: "string", optional: false },
    medicineid: { type: "string", optional: false }, 
    note: { type: "string", optional: false },   
    history: { type: "string", optional: false },  
  };
  const v = new Validator();
  const validateResponse = v.validate(prescriptionData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  models.Prescription.create(prescriptionData)
    .then((result) => {
      res.status(200).json({
        message: "Prescription add successfully",
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

function getUpdatePrescription(req, res) {
  const id = req.params.id;
  const prescriptionUpdateData = {
    date: req.body.date,
    patientid: req.body.patientid,
    doctorid: req.body.doctorid,
    medicineid: req.body.medicineid,    
    note: req.body.note,    
    history: req.body.history, 
    hospital_id: req.body.hospital_id,   
  };
  const schema = {
    date: { type: "string", optional: false },
    patientid: { type: "string", optional: false },
    doctorid: { type: "string", optional: false },
    medicineid: { type: "string", optional: false }, 
    note: { type: "string", optional: false },   
    history: { type: "string", optional: false },  
  };
  const v = new Validator();
  const validateResponse = v.validate(prescriptionUpdateData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  const status = 0;
  models.Prescription.update(prescriptionUpdateData, {
    where: { status: status, id: id},
  })
    .then((result) => {
      res.status(200).json({
        message: "prescription updated successfully",
        // post: prescriptionUpdateData
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getOnePrescription(req, res) {
  const id = req.params.id;
  models.Prescription.findByPk(id)
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



function getOneinfoPrescription(req, res) {
  console.log("getOneinfoPrescription");
  const id = req.params.id;
  models.Prescription.findByPk(id,{
   
    include: [
    {
      model: Doctor,

      attribute: [[Sequelize.col("Doctor.doctor_name")]],
    },
    {
      model: Patient,

      attribute: [[Sequelize.col("Patient.patient_name")]],
    },
    {
      model: Medicine,

      attribute: [[Sequelize.col("Medicine.medicine_name")]],
    },
  ]
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
  getAddPrescription: getAddPrescription,
  getUpdatePrescription: getUpdatePrescription,
  getAllPrescription: getAllPrescription,
  getOnePrescription: getOnePrescription,
  getDeletePrescription: getDeletePrescription,
  getOneinfoPrescription:getOneinfoPrescription,
  getAddPrescriptionPatient:getAddPrescriptionPatient
};
