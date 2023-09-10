const db = require("../models");
const models = require("../models");
const Validator = require("fastest-validator");
const { Sequelize, Op, assert } = require("sequelize");
const Doctor = db.Doctor;
const Patient = db.Patient;
const MasterDepartment = db.MasterDepartment;
const Appointment = db.Appointment;
const MasterAppointmentStatus = db.MasterAppointmentStatus;
const MasterBloodGroups = db.MasterBloodGroups;
const MasterGender = db.MasterGender;
// add doctor
// function getAddDoctor(req, res) {
//   // var randomnumber=Math.random(5);
//   // var doctorID = "D" + Math.floor(Math.random() * 1000);

//   const addDoctor = {
//     doctor_name: req.body.doctor_name,
//     doctor_id: req.body.doctor_id,
//     email: req.body.email,
//     phone: req.body.phone,
//     department: req.body.department,
//     profile: req.body.profile,
//     education: req.body.education,
//     gender: req.body.gender,
//     status: 0,
//   };
//   // console.log(addDoctor);
//   models.Doctor.create(addDoctor)
//     .then((result) => {
//       res.status(200).json({
//         message: "Doctor add successfully",
//         post: result,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "something went worg",
//         post: error,
//       });
//     });
// }

// edit Doctor
function geteUpdateDoctor(req, res) {
  const id = req.params.id;
  const updateDoctorData = {
    doctor_name: req.body.doctor_name,
    address: req.body.address,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    department: req.body.department,
    profile: req.file,
    hospital_id:req.body.hospital_id
  };
  const status = 0;
  models.Doctor.update(updateDoctorData, { where: { id: id, status: status } })
    .then((result) => {
      res.status(200).json(
        // message: "Patient add successfully",
        { post: id }
      );
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}

//all Doctor display
function getAllDoctor(req, res) {
  const hospital_id=req.params.id;
  models.Doctor.findAll({
    where: {
      status: 0,
      hospital_id:hospital_id
    },
    include: [
      {
        model: MasterDepartment,
        where: {
          status: 0,
        },
        attribute: [[Sequelize.col("MasterDepartment.name")]],
      },
    ],
  })
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

// one doctor display id

function getOneDoctor(req, res) {
  const id = req.params.id;
  models.Doctor.findByPk(id)
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

function getDeleteDoctor(req, res) {
  const id = req.params.id;
  models.Doctor.update(
    { status: 2 },
    {
      where: { id: id, status: 0 },
    }
  )
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        message: "doctor delete successfully",
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

// Doctor Treatment History
// var getDoctorTreatmentHistory = async(req, res) =>{
//   try {
//    var result = await Doctor.findAll(
//     {
//       where: {
//         status: 0,
//       },
//       attributes:['id','doctor_name'],
//       // raw: true,
//       include:[{
//         model:Patient,
//         // { model: ProductionPrints, as: 'prints' }
//         where: { status:0},
//         // as:'patienttreatcount',
//         // on: {where: Sequelize.where(Sequelize.col("Doctor.id"), "=", Sequelize.col("Patients.doctor_id"))},
//         attributes: [[Sequelize.fn("COUNT", Sequelize.col("Patients.doctor_id")),
//           "totalTask"]],
//       }], //cont doctor id
//     group:['Doctor.id']
//    });

//     res.status(200).json(result);
//   }catch (error) {
//     console.log(error)
//     res.status(500)
//   }
// }
var getDoctorTreatmentHistory = async (req, res) => {
  try {
    const hospital_id =req.params.id;
    var result = await Doctor.findAll({
      where: {
        status: 0,
        hospital_id:hospital_id
      },
      attributes: ["id", "doctor_name"],
      // raw: true,
      // include:[{
      //   model:Patient,
      //   // { model: ProductionPrints, as: 'prints' }
      //   where: { status:0},
      //   // as:'patienttreatcount',
      //   // on: {where: Sequelize.where(Sequelize.col("Doctor.id"), "=", Sequelize.col("Patients.doctor_id"))},
      //   attributes: [[Sequelize.fn(["COUNT"], Sequelize.col("Patients.doctor_id")),
      //     "totalTask"]],
      // }], //cont doctor id
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("Patients.doctor_id")),
            "patientCount",
          ],
        ],
      },
      include: [{ model: Patient, attributes: [] }],
      group: ["Doctor.id"],
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
function getMasterDepartment(req, res) {
  models.MasterDepartment.findAll({
    where: {
      status: 0,
    },
  })
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

function getOneInfoDoctor(req, res) {

  const id = req.params.id;
  models.Doctor.findByPk(id, {
    
    include: [
      {
        model: MasterDepartment,
        attribute: [[Sequelize.col("MasterDepartment.name")]],
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

function getDoctorAppointment(req, res) {
  const id = req.params.id;
  models.Doctor.findByPk(id, {
    include: [
      {
        where: {
          status: 0,
         
        },
        model: Appointment,
        include: [
          {
            model: Patient,
            attribute: [[Sequelize.col("patient_name")]],
          },
          {
            model: MasterAppointmentStatus,
            attribute: [[Sequelize.col("MasterAppointmentStatus.name")]],
          },
        ],
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

// function getDocApaitdetails (req, res) {

var getDocApaitdetails = async (req, res) => {
  const id = req.params.id;
  // Doctor.findAll({
    models.Doctor.findAll({
      where: {
        id:id,

      },
      attributes: {exclude: ['id','doctor_name','password','address','email','department','phone','department','profile','s3image','status','createdAt','updatedAt','doctor_id','education','gender']},
      include: 
        {
          model: Patient,
          include: [
            {
              model: MasterBloodGroups,
              attribute: [[Sequelize.col("patient_name")]],
            },
            {
              model: MasterGender,
              attribute: [[Sequelize.col("MasterAppointmentStatus.name")]],
            },
          ]
        },

      
     
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
};

module.exports = {
  // getAddDoctor: getAddDoctor,
  geteUpdateDoctor: geteUpdateDoctor,
  getAllDoctor: getAllDoctor,
  getOneDoctor: getOneDoctor,
  getDeleteDoctor: getDeleteDoctor,
  getDoctorTreatmentHistory: getDoctorTreatmentHistory,
  getMasterDepartment: getMasterDepartment,
  getOneInfoDoctor: getOneInfoDoctor,
  getDoctorAppointment: getDoctorAppointment,
  getDocApaitdetails: getDocApaitdetails,
};
