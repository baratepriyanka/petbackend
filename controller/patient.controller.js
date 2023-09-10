const models = require("../models");
const db = require("../models/index");
const Doctor = db.Doctor;
const MasterBloodGroups = db.MasterBloodGroups;
const MasterGender = db.MasterGender;
const Validator = require("fastest-validator");
const { Sequelize, Op, assert } = require("sequelize");

// function getAddPatient(req, res) {
//   // var doctorID = "D" + Math.floor(Math.random() * 1000);
//   const patientData = {
//     patient_name: req.body.patient_name,
//     Patient_id: req.body.patient_id,
//     email: req.body.email,
//     phone: req.body.phone,
//     password: req.body.password,
//     address: req.body.address,
//     birthday: req.body.birthday,
//     gender: req.body.gender,
//     bloodgroup: req.body.bloodgroup,
//     doctor_id: req.body.doctor_id,
//     // profile: req.body.profile,
//     status: 0,
//   };
//   console.log(patientData);
//   models.Patient.create(patientData)
//     .then((result) => {
//       res.status(200).json({
//         message: "Doctor add successfully",
//         post: result,
//       });
//     })
//     .catch((error) => {
//       res.status(404).json({
//         message: "something went worg",
//         post: error,
//       });
//     });
// }

function getAllDoctorName(req, res) {
  models.Doctor.findAll({
    where: {
      status: 0,
    },
    attributes: ["id", "doctor_name"],
  })
    .then((result) => {
      res.status(200).json({
        message: "",
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

function getUpdatePatient(req, res) {
  const id = req.params.id;
  const patientUpdateData = {
    patient_name: req.body.patient_name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    birthday: req.body.birthday,
    gender: req.body.gender,
    bloodgroup: req.body.bloodgroup,
    doctor_id: req.body.doctor_id,
    profile: req.file,
  };
  // const schema = {
  //   patient_name: { type: "string", optional: false },
  //   email: { type: "string", optional: false },
  //   phone: { type: "string", optional: false },
  //   password: { type: "string", optional: false },
  //   address: { type: "string", optional: false },
  //   birthday: { type: "string", optional: false },
  //   gender: { type: "string", optional: false },
  //   bloodgroup: { type: "string", optional: false },

  // };
  // const v = new Validator();
  // const validateResponse = v.validate(patientUpdateData, schema);
  // if (validateResponse !== true) {
  //   return res.status(400).json({
  //     message: "Validstion failed",
  //     errors: validateResponse,
  //   });
  // }
  const status = 0;
  models.Patient.update(patientUpdateData, {
    where: { status: status, id: id },
  })
    .then((result) => {
      res.status(200).json({
        // message: "patient updated successfully",
        post: id,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}



function getOnePatient(req, res) {
  const id = req.params.id;
  models.Patient.findByPk(id)
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

function getDeletePatient(req, res) {
  const id = req.params.id;
  models.Patient.update(
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
        message: "Patient delete successfully",
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
function getMasterBloodGroup(req, res) {
  // console.log("result");
  models.MasterBloodGroups.findAll({
    where: {
      status: 0,
    },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getOneInfoPatient(req, res) {
  const id = req.params.id;
  models.Patient.findByPk(id, {
    include: [
      {
        model: MasterBloodGroups,

        attribute: [[Sequelize.col("masterbloodgroups.name")]],
      },
      {
        model: MasterGender,

        attribute: [[Sequelize.col("mastergender.name")]],
      },
      {
        model: Doctor,
        attribute: [[Sequelize.col("Doctor.doctor_name")]],
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

function getTotalPatientcount(req, res) {
  const hospital_id=req.params.id
  models.Patient.count({
    where: {
      // status: 0,
      hospital_id:hospital_id
      // createdAt:'2022-10-20'
    },
  }).then((result) => {
    res.status(200).json(result);
  });
}

function getMasterAddedfrom(req, res) {
  models.MasterAddedFrom.findAll({
    where: { status: 0 },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went worg",
        post: err,
      });
    });
}

module.exports = {
  getAllDoctorName: getAllDoctorName,
  getUpdatePatient: getUpdatePatient,
  getOnePatient: getOnePatient,
  getDeletePatient: getDeletePatient,
  getMasterBloodGroup: getMasterBloodGroup,
  getOneInfoPatient: getOneInfoPatient,
  getTotalPatientcount: getTotalPatientcount,
  getMasterAddedfrom: getMasterAddedfrom,
};
