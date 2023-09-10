const Validator = require("fastest-validator");
const models = require("../models");
const db = require("../models/index");
const Doctor = db.Doctor;
const Patient = db.Patient;
const user = db.user;

const Appointment = db.Appointment;
const MasterAvaliableSlots = db.MasterAvaliableSlots;
const MasterAppointmentStatus = db.MasterAppointmentStatus;
const Hospital = db.Hospital;

const { Sequelize, Op, assert } = require("sequelize");
function getAddAppointment(req, res) {
 
  const appointmentData = {
    user_id: req.body.user_id,
    patient: req.body.patient,
    date: req.body.date,
    available_slot: req.body.available_slot,
    appointment_status: req.body.appointment_status,
    remarks: req.body.remarks,
    hospital_id: req.body.hospital_id,
    status: 0,
  };
  const schema = {
    user_id: { type: "string", optional: false },
    patient: { type: "string", optional: false },
    appointment_status: { type: "string", optional: false },
    remarks: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(appointmentData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  models.Appointment.create(appointmentData)
    .then((result) => {
      const pat_id = result.id;
      const number = `${pat_id}`;
      var maxLength = 5; 
      var appointmentid = number.padStart(maxLength, "0");
      var appointment_id= "P"+appointmentid;
      models.Appointment.update(
        { appointment_id: appointment_id },
        { where: { id: pat_id }}
      );
      res.status(200).json({
        message: "Appointment add successfully",
        post: result,
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });

  // })
  // console.log(data);
  // const appointmentData = {
  //   doctor: req.body.doctor,
  //   patient: req.body.patient,
  //   date: req.body.date,
  //   available_slot: req.body.available_slot,
  //   appointment_status: req.body.appointment_status,
  //   remarks: req.body.remarks,
  //   hospital_id: req.body.hospital_id,
  //   status: 0,
  // };
  // const schema = {
  //   doctor: {type: "string", optional: false},
  //   patient: {type: "string", optional: false},
  //   date: {type: "string", optional: false},
  //   appointment_status: {type: "string", optional: false},
  //   remarks: {type: "string", optional: false},
  // };
  // const v = new Validator();
  // const validateResponse = v.validate(appointmentData, schema);
  // if (validateResponse !== true) {
  //   return res.status(400).json({
  //     message: "Validstion failed",
  //     errors: validateResponse,
  //   });
  // }
  // models.Appointment.create(appointmentData)
  //   .then((result) => {
  //     res.status(200).json({
  //       message: "Appointment add successfully",
  //       post: result,
  //     });
  //   })
  //   .catch((error) => {
  //     res.status(404).json({
  //       message: "something went worg",
  //       post: error,
  //     });
  //   });
}

function getUpdateAppointment(req, res) {
  const id = req.params.id;
  const appointmentUpdateData = {
    user_id: req.body.user_id,
    patient: req.body.patient,
    date: req.body.date,
    // avaliable_slot: req.body.avaliable_slot,
    available_slot:req.body.available_slot,
    appointment_status: req.body.appointment_status,
    remarks: req.body.remarks,
    hospital_id: req.body.hospital_id,
  };
  // console.log(appointmentUpdateData)
  // console.log("appointmentUpdateData")
  const schema = {
    user_id: { type: "string", optional: false },
    patient: { type: "string", optional: false },
    appointment_status: { type: "string", optional: false },
    remarks: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(appointmentUpdateData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  const status = 0;

  models.Appointment.update(appointmentUpdateData, {
    where: { status: status, id: id },
  })
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        message: "Appointment updated successfully",
        post: result
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getAllAppointment(req, res) {
  const hospital_id = req.params.id;
  models.Appointment.findAll({
    where: {
      status: 0,
      hospital_id: hospital_id,
    },
    include: [
      {
        model: user, 
      },
      {
        model: Patient,
        where: {
          status: 0,
          hospital_id: hospital_id,
        },
        attribute: [[Sequelize.col("patient_name")]],
      },
      {
        model: MasterAppointmentStatus,
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
  //  })
}

function getOneAppointment(req, res) {
  const id = req.params.id;
  models.Appointment.findByPk(id)
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

function getDeleteAppointment(req, res) {
  const id = req.params.id;
  models.Appointment.update(
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
        message: "Appointment delete successfully",
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
function getMasterAppointmentStatus(req, res) {
  models.MasterAppointmentStatus.findAll({
    where: {
      status: 0,
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
function getMasterAppointmentSlots(req, res) {
// var getMasterAppointmentSlots = async (req, res) => {
  models.MasterAvaliableSlots.findAll({
    where: {
      status: 0,
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

  // const appointment = await Appointment.findOne({
  //   where: { date: req.body.date },
  // });
  // if (appointment === null) {
  //   const mAvSlot1 = await MasterAvaliableSlots.findAll({
  //     where: {
  //       status: 0,
  //     },
  //   });
  //   res.status(200).json(mAvSlot1);
  // } else {
  //   const avaliable_slotid = appointment.available_slot;
  //   const mAvSlot = await MasterAvaliableSlots.findOne({
  //     where: { avaliable_slotid: avaliable_slotid },
  //   });
  //   const dat1 = mAvSlot.avaliable_slotid;
  //   if (dat1 == 1) {
  //     const mAvSlot1 = await MasterAvaliableSlots.findAll();
  //     const data2 = mAvSlot1.splice(1, 2);
  //     res.status(200).send(data2);
  //   } else if (dat1 == 2) {
  //     const mAvSlot1 = await MasterAvaliableSlots.findAll();
  //     const data2 = mAvSlot1.splice(0, 1);
  //     const data3 = mAvSlot1.splice(1, 2);
  //     const data4 = data2.concat(data3);
  //     res.status(200).send(data4);
  //   } else if (dat1 == 3) {
  //     const mAvSlot1 = await MasterAvaliableSlots.findAll();
  //     const data5 = mAvSlot1.splice(0, 2);
  //     res.status(200).send(data5);
  //   }
  // }
};

function getAllPatientName(req, res) {
  const hospital_id = req.params.id;
  models.Patient.findAll({
    where: {
      status: 0,
      hospital_id: hospital_id,
    },
    attributes: ["id", "patient_name"],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: "somwthing went wrong",
        post: error,
      });
    });
}
function getAllTodaysAppointment(req, res) {
  const hospital_id = req.params.id;
  let newDate = new Date();
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const separator = "-";
  const date = `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${day < 10 ? `0${day}` : `${day}`}`; //`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${day}`
  // const current = new Date();
  // const date = `${current.getDate()}-${current.getMonth()+1}-${current.getFullYear()}`;
  models.Appointment.findAll({
    where: {
      status: 0,
      appointment_status: 2,
      date: date,
      hospital_id: hospital_id,
    },
    include: [
      {
        model: user,

        // attribute: [[Sequelize.col("doctor_name")]],
      },
      {
        model: Patient,

        attribute: [[Sequelize.col("patient_name")]],
      },
      {
        model: MasterAppointmentStatus,
        attribute: [[Sequelize.col("MasterAppointmentStatus.name")]],
      },
    ],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: "somwthing went wrong",
        post: error,
      });
    });
}

function getAllUpcomingAppointment(req, res) {
  const hospital_id = req.params.id;
  models.Appointment.findAll({
    where: {
      status: 0,
      appointment_status: 1,
      hospital_id: hospital_id,
    },

    include: [
     
      {
        model: user,
        attribute: [[Sequelize.col("first_name","last_name")]],
      },
      {
        model: Patient,
        where: {
          status: 0,
          hospital_id: hospital_id,
        },
        attribute: [[Sequelize.col("patient_name")]],
      },

      {
        model: MasterAppointmentStatus,
        attribute: [[Sequelize.col("MasterAppointmentStatus.name")]],
      },
    ],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: "somwthing went wrong",
        post: error,
      });
    });
}

function getOneInfoAppointment(req, res) {
  // console.log("req");
  const id = req.params.id;
  models.Appointment.findByPk(id, {
    where: { hospital_id: 1 },
    include: [
      {
        model: user,
        attribute: [[Sequelize.col("first_name","last_name")]],
      },
      {
        model: Patient,
        attribute: [[Sequelize.col("patient_name")]],
      },
      {
        model: MasterAvaliableSlots,
        attribute: [[Sequelize.col("MasterAvaliableSlots.name")]],
      },
      {
        model: MasterAppointmentStatus,
        attribute: [[Sequelize.col("MasterAppointmentStatus.name")]],
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

function getTodaysAppointmentCount(req, res) {
  const hospital_id = req.params.id;
  let newDate = new Date();
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const separator = "-";
  const date = `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${day < 10 ? `0${day}` : `${day}`}`; //`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${day}`

  models.Appointment.count({
    where: {
      status: 0,
      appointment_status: 2,
      date: date,
      hospital_id: hospital_id,
    },
  }).then((result) => {
    res.status(200).json(result);
  });
}
const getAppointmentDateSlot = async (req, res) => {
     const mAvSlot1 = await MasterAvaliableSlots.findAll({
        where: {
          status: 0,
        },
      
      }).then((result) => {
      res.status(200).json(result)
    }).catch((error) => {
     res.status(404).json({
      message: "somwthing went wrong",
      post: error
     })
  
    })
};

var array11 = [1, 2, 3, 4, 5, 6];
var array22 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var array1 = ["cat", "sum", "fun", "run"],
    array2 = ["bat", "cat", "dog", "sun", "hut", "gut"];

function getMatch(a, b) {
    var matches = [];

    for ( var i = 0; i < a.length; i++ ) {
        for ( var e = 0; e < b.length; e++ ) {
            if ( a[i] === b[e] ) matches.push( a[i] );
        }
    }
    return matches;
}

getMatch(array11, array22); // ["cat"]
console.log(getMatch(array11, array22))

const demo = async () =>{
  console.log("hello demo")
}


module.exports = {
  demo:demo,
  getAddAppointment: getAddAppointment,
  getUpdateAppointment: getUpdateAppointment,
  getAllAppointment: getAllAppointment,
  getOneAppointment: getOneAppointment,
  getDeleteAppointment: getDeleteAppointment,
  getMasterAppointmentStatus: getMasterAppointmentStatus,
  getMasterAppointmentSlots: getMasterAppointmentSlots,
  getAllPatientName: getAllPatientName,
  getAllTodaysAppointment: getAllTodaysAppointment,
  getAllUpcomingAppointment: getAllUpcomingAppointment,
  getOneInfoAppointment: getOneInfoAppointment,
  getTodaysAppointmentCount: getTodaysAppointmentCount,
  getAppointmentDateSlot: getAppointmentDateSlot,
};
