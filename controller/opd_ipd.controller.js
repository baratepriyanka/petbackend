const Validator = require("fastest-validator");
const models = require("../models");
// const mysql = require('mysql');
const { v4: uuidv4 } = require("uuid");
const db = require("../models/index");
const OpdPatient = db.OpdPatient;
const OpdPatientMore = db.OpdPatientMore;
const MasterState = db.MasterState;
const MasterSpecies = db.MasterSpecies;
const MasterBreed = db.MasterBreed;
const MasterColor = db.MasterColor;
const MasterGender = db.MasterGender;
const MasterCities = db.MasterCities;
const Doctor = db.Doctor;
const Patient = db.Patient;
const Bed = db.Bed;
const Images = db.Images;
const opdIpdPatMediaType = db.opdIpdPatMediaType;
const opdIpd = db.opdIpd;
const UploadReport = db.UploadReport;
const ipdPatientMore = db.ipdPatientMore;
const MasterIpdCategory = db.MasterIpdCategory;
const HealthReport = db.HealthReport;
const Ipd = db.Ipd;
const MasterAge = db.MasterAge;
const DeathReport = db.DeathReport;
const CaseTable= db.CaseTable;
const WardCategory = db.WardCategory;


const { Sequelize, Op, assert } = require("sequelize");

function getAddOpdPatient(req, res) {
  const opdPatientData = {
    dateofadmission: req.body.dateofadmission,
    patient_name: req.body.patient_name,
    parent_name: req.body.parent_name,
    age: req.body.age,
    breed: req.body.breed,
    color: req.body.color,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    phone: req.body.phone,
    species: req.body.species,
    email: req.body.email,
    pincode: req.body.pincode,
    gender: req.body.gender,
    added_from: 0,
    status: 0,
    hospital_id: req.body.hospital_id,
  };

  // const schema = {
  //   patient_name: { type: "string", optional: false },
  //   parent_name: { type: "string", optional: false },
  //   // description: { type: "string", optional: false },
  //   address: { type: "string", optional: false },
  //   // email: { type: "string", optional: false },
  // };
  // const v = new Validator();
  // const validateResponse = v.validate(opdPatientData, schema);
  // if (validateResponse !== true) {
  //   return res.status(400).json({
  //     message: "Validstion failed",
  //     errors: validateResponse,
  //   });
  // }

  models.Patient.create(opdPatientData, {
    attributes: { exclude: [""] },
  })
    .then((result) => {
      const pat_id = result.id;
      const number = `${pat_id}`;
      var maxLength = 5; 
      var patientid = number.padStart(maxLength, "0");
      var patient_id= "P"+patientid;
      models.Patient.update(
        { patient_id: patient_id },
        { where: { id: pat_id, added_from: 0 } }
      );
      const hospitalId =result.hospital_id;
      const addCaseData = { 
        hospital_id: hospitalId,
        patient_id:pat_id,
        status:1,
        
      }
      models.CaseTable.create(addCaseData, { where: { patient_id: pat_id } }).then((resu) => {
        
        const caseId = resu.id;
        const string =`${caseId}`;
        var maxLength = 5; 
        var case_id = string.padStart(maxLength, "0");
        var patCase_id = "CId"+case_id;
        // console.log(patCase_id)
        models.CaseTable.update({ case_id: patCase_id}, { where: { id: caseId } });

        res.status(200).json({
          post: result.id,

        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}

var getOpdAddMorePaitent = async (req, res) => {
  const  patientid = req.params.id;
  const caseId =patientid ;
  const string =`${caseId}`;
  var maxLength = 5; 
  var case_id = string.padStart(maxLength, "0");

  const opdMoreData = Array({
    patient_id: patientid,
    date: req.body.date,
    case_history: req.body.case_history,
    treatment_medicine: req.body.treatment_medicine,
    hospital_id: req.body.hospital_id,
    type_id: 1,
    case_id:case_id,
  });
  //   console.log(opdMoreData);
  var promises = opdMoreData.map((source) => models.opdIpd.create(source));
  // console.log(promises);
  Promise.all(promises)
    .then((result) => {
      res.status(200).json([result]);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
};

var getOpdAddMoreUpdatePatient = async (req, res) => {
  const id = req.params.id;
  const status = 0;
  const type_id = 1;
  const opdMoreData = Array({
    id: req.body.id,
    date: req.body.date,
    case_history: req.body.case_history,
    treatment_medicine: req.body.treatment_medicine,
    hospital_id: req.body.hospital_id,
  });
  console.log(opdMoreData)
  var promises = opdMoreData.map((source) =>
    // console.log(source.Id),
    models.opdIpd.update(source, { where: { id: source.id, patient_id: id,type_id:type_id } })
  );
  // console.log(promises);
  Promise.all(promises)
    .then((result) => {
      // console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
};

// var getOpdAddMoreUpdatePatient = async (req, res) => {
//   const id = req.params.id;
//   const status = 0;
//  const type_id= 1
//  const jlen = [];
//  const opdMoreData =Array({
//       date: req.body.date,
//       case_history: req.body.case_history,
//       treatment_medicine: req.body.treatment_medicine,
//       hospital_id: req.body.hospital_id,
//     });
//     models.opdIpd.findAll({where:{patient_id:id,status:status,type_id:type_id}})
//     // models.opdIpd.update(opdMoreData,{where:{id:id,patient_id:req.body.patient_id}})
//     .then((result) => {
//       // console.log(result);
//       for( let element of result) {
//         // console.log(element);

//         // console.log(element.id);
//         // console.log()
//       models.opdIpd.update(opdMoreData,{where:{id:element.id}})
//        res.status(200).send({
//         message:"fhgf kj hjfghfgjkh"
//        })
//     }
//      }).catch((error) => {
//       res.status(500).json({
//         message: "something went worg",
//         post: error,
//       });
//     });
// }

// var getOpdAddMoreUpdatePatient = async (req, res) => {
//   const id = req.params.id;
//   const status = 0;
//   const type_id= 1
//   const opdMoreData ={
//     date: req.body.date,
//     case_history: req.body.case_history,
//     treatment_medicine: req.body.treatment_medicine,
//     hospital_id: req.body.hospital_id,
//   };
//     models.opdIpd.update(opdMoreData,{where:{id:id,status:status,type_id:type_id,patient_id:req.body.patient_id}}).then((result) => {
//     res.status(200).json(result);
//   })
//   .catch((error) => {
//     res.status(500).json({
//       message: "something went worg",
//       post: error,
//     });
//   });
// };

// var getOpdAddMoreUpdatePatient = async (req, res) => {
//   const id = req.params.id;
//   const status = 0;
//  const type_id= 1
//  const data = [];
//  const opdMoreData = [{
//       date: req.body.date,
//       case_history: req.body.case_history,
//       treatment_medicine: req.body.treatment_medicine,
//       hospital_id: req.body.hospital_id,
//       patient_id: id
//     }];

//   opdMoreData.forEach(function(user){
//     data.push(opdIpd.update(opdMoreData,{where : {patient_id: id}}));
//    });

//    Promise.all(data).then((result)=> {
//     // console.log(data)
//     res.status(200).json(result)
//    }, function(err){
//        // error
//    });

//     // const promises = opdMoreData.map((input,i) => {
//     //   const { model, data } = input;
//     //   console.log(input[i]);
//     //   return opdIpd.update(input, { where: { patient_id: id, status:status, type_id:type_id} })
//     // });
//     // // await Promise.all(promises);
//     // Promise.all(promises).then((result) => {
//     //  res.status(200).json(result);
//     // })
// }

function getOpdPatientMore(req, res) {
  const id = req.params.id;
  // console.log(id);
  models.opdIpd
    .findAll({
      where: {
        status: 0,
        patient_id: id,
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

function getOpdIpdPatientMore (req, res) {
  const id = req.params.id;
  // console.log(id);
  models.opdIpd
    .findAll({
      where: {
        status: 2,
        patient_id: id,
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

function geteUpdatePatient(req, res) {
  const id = req.params.id;
  const updateData = {
    dateofadmission: req.body.dateofadmission,
    patient_name: req.body.patient_name,
    parent_name: req.body.parent_name,
    age: req.body.age,
    breed: req.body.breed,
    color: req.body.color,
    description: req.body.description,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    phone: req.body.phone,
    species: req.body.species,
    email: req.body.email,
    // whatsapp: req.body.whatsapp,
    pincode: req.body.pincode,
    gender: req.body.gender,
    added_from: 0,
    hospital_id: req.body.hospital_id,
  };
  // const schema = {
  //   patient_name: { type: "string", optional: false },
  //   parent_name: { type: "string", optional: false },
  //   description: { type: "string", optional: false },
  //   address: { type: "string", optional: false },
  //   email: { type: "string", optional: false },
  // };
  // const v = new Validator();
  // const validateResponse = v.validate(updateData, schema);
  // if (validateResponse !== true) {
  //   return res.status(400).json({
  //     message: "Validstion failed",
  //     errors: validateResponse,
  //   });
  // }
  const status = 0;
  models.Patient.update(updateData, {
    where: { id: id, status: status },
    attributes: {
      exclude: [
        "password",
        "birthday",
        "bloodgroup",
        "doctor_id",
        "category",
        "reg_no",
        "ward_no",
        "age",
        "weight",
        "xray",
        "diagnosis",
        "bill_no",
      ],
    },
  })
    .then((result) => {
      res.status(200).json({
        post: id,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}

//all patient display
function getAllOpdPatient(req, res) {
  const hospital_id = req.params.id;
  let newDate = new Date();
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const separator = "-";
  const date = `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${day < 10 ? `0${day}` : `${day}`}`; //`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${day}`
  const changeDate = 'T00:00:00.000Z';
  const date1= `${date}${changeDate}`;
  // console.log(date1)
  models.Patient.findAll({
    where: {
      status: 0,
      added_from: 0,
      dateofadmission:date1,
      hospital_id: hospital_id,
    },
    include:[{
      model:MasterGender,
    }],
    attributes: {
      exclude: [
        "password",
        "birthday",
        "bloodgroup",
        "doctor_id",
        "category",
        "reg_no",
        "ward_no",
        "weight",
        "xray",
        "diagnosis",
        "bill_no",
      ],
    },
  })
    .then((result) => {
      // console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getDeleteOpdPatient(req, res) {
  // console.log("getDeleteOpdPatient");
  const id = req.params.id;
  models.Patient.update(
    { status: 2 },
    {
      where: { id: id, status: 0, added_from: 0 },
    }
  )
    .then((result) => {
      // console.log(idChange);
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

function getOneOpd(req, res) {
  // var getOneOpd =async (req, res) => {
  const id = req.params.id;
  models.Patient.findByPk(id, { where: { added_from: 0 },
  include:[{
    model:CaseTable,
    where: {patient_id:id},
  }] 
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

function getOneOpdDemo(req, res) {
  const id = req.params.id;
  models.Patient.findByPk(id, {
    include: [
      {
        model: MasterState,

        attribute: [[Sequelize.col("MasterState.name")]],
      },
      {
        model: MasterSpecies,

        attribute: [[Sequelize.col("MasterSpecies.name")]],
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
        model: MasterCities,

        attribute: [[Sequelize.col("MasterCities.name")]],
      },
      {
        model: Bed,
        attribute: [[Sequelize.col("Bed.id")]],
      },
      {
        model: MasterAge,
        attribute: [[Sequelize.col("MasterAge.age")]],
      },
      {
      model: CaseTable,
      where : {patient_id:id , status: 1}
      }
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

function getMsaterGender(req, res) {
  models.MasterGender.findAll({
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

function getMsaterBreed(req, res) {
  models.MasterBreed.findAll({
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

function getMsaterColor(req, res) {
  models.MasterColor.findAll({
    where: {
      status: 0,
    },
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
function getMsaterCity(req, res) {
  models.MasterCities.findAll({
    where: {
      status: 0,
    },
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

function getMsaterState(req, res) {
  models.MasterState.findAll({
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

function getMsaterSpecies(req, res) {
  models.MasterSpecies.findAll({
    whre: {
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

function getTotalCountOpd(req, res) {
  const hospital_id = req.params.id;
  let newDate = new Date();
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const separator = "-";
  const date = `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${day < 10 ? `0${day}` : `${day}`}`; //`${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${day}`
  const changeDate = 'T00:00:00.000Z';
  const date1= `${date}${changeDate}`;
  models.Patient.count({
    where: {
      status: 0,
      added_from: 0,
      dateofadmission:date1,
      hospital_id: hospital_id,
    },
  }).then((result) => {
    res.status(200).json(result);
  });
}

function getDeleteOpdMorePatient(req, res) {
  const id = req.params.id;
  models.opdIpd
    .update(
      { status: 2 },
      {
        where: { id: id, status: 0 },
      }
    )
    .then((result) => {
      // console.log(idChange);
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

// var getDemo = async (req, res) => {
//   const accountBill = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);

//   // Math.random().substring(2, 8);

//   // `2222${Math.floor(
//   //   Math.random() * 90000000000000000000,
//   // ) + 10000000000000000000}`;
//   console.log("PID"+accountBill)
// }

//get image is agients
function getMultipleImg(req, res) {
  const id = req.params.id;
  // console.log(id);
  models.Images.findAll({
    where: {
      status: 0,
      profileid: id,
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

function getUploadReport(req, res) {
  models.UploadReport.findAll({
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

function getOneUploadReport(req, res) {
  const id = req.params.id;
  models.opdIpdPatMediaType
    .findOne({
      where: {
        status: 0,
        patient_id: id,
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

function getAddIpd(req, res) {
  // var doctorID = "D" + Math.floor(Math.random() * 1000);
  const ipdData = {
    category: req.body.category,
    parent_name: req.body.parent_name,
    reg_no: req.body.reg_no,
    dateofadmission: req.body.dateofadmission,
    address: req.body.address,
    fee: req.body.fee,
    bill_no: req.body.bill_no,
    ward_no: req.body.ward_no,
    cage_kennel: req.body.cage_kennel,
    phone: req.body.phone,
    patient_name: req.body.patient_name,
    breed: req.body.breed,
    species: req.body.species,
    color: req.body.color,
    gender: req.body.gender,
    age: req.body.age,
    weight: req.body.weight,
    xray: req.body.xray,
    diagnosis: req.body.diagnosis,
    // cage_id: req.body.cage_id,
    status: 0,
    added_from: 2,
    hospital_id: req.body.hospital_id,
  };
  const schema = {
    hospital_id: { type: "string", optional: false },
    parent_name: { type: "string", optional: false },
    reg_no: { type: "string", optional: false },
    address: { type: "string", optional: false },
    fee: { type: "string", optional: false },
    bill_no: { type: "string", optional: false },
    patient_name: { type: "string", optional: false },
    xray: { type: "string", optional: false },
    diagnosis: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(ipdData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  // console.log(ipdData);
  models.Patient.create(ipdData, {
    attributes: { exclude: [""] },
  })
    .then((result) => {
      const cageId = result.cage_kennel
      const pat_id = result.id;  
      const number = `${pat_id}`;
      var maxLength = 5; 
      var patientid = number.padStart(maxLength, "0");
      var patient_id= "P"+patientid;
      models.Patient.update({ patient_id: patient_id, cage_id:cageId }, { where: { id: pat_id } });

      const bedid = ipdData.cage_kennel;
      models.Bed.update({ in_used: 1 }, { where: { id: bedid } });

      const hospitalId =result.hospital_id;
      const addCaseData = { 
        hospital_id: hospitalId,
        patient_id:pat_id,
        status:1,
        health_id:0
        // case_id:case_id
      }
      models.CaseTable.create(addCaseData, { where: { patient_id: pat_id } }).then((res) => {
        const caseId = res.id;
        const string =`${caseId}`;
        var maxLength = 5; 
        var case_id = string.padStart(maxLength, "0");
        var patCase_id = "CId"+case_id;
        models.CaseTable.update({ case_id: patCase_id}, { where: { id: caseId } });
      });
      // console.log(addCaseData)
      res.status(200).json({
        message: "Patient add successfully",
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

var getIpdAddMore = async (req, res) => {
  const id = req.params.id;
  const caseDataId =models.CaseTable.findOne({where: {patient_id:id, status:1 }})
  caseDataId.then(function (result) {
    const caseId =result.id;
    const IpdMoreData = Array({
      patient_id: id,
      date: req.body.date,
      temperature: req.body.temperature,
      feeding: req.body.feeding,
      clinical_observ: req.body.clinical_observ,
      treatment_medicine: req.body.treatment_medicine,
      hospital_id: req.body.hospital_id,
      type_id: 2,
      case_id: caseId, 
      status:0
    });
    
    var promises = IpdMoreData.map((source) => models.opdIpd.create(source));
    Promise.all(promises).then((result) => {
      res.status(200).json([result]);
    })
  })
 
  .catch((error) => {
    res.status(500).json({
      message: "something went worg",
      post: error,
    });
  });
};

var getIpdAddMoreUpdatePaitent = async (req, res) => {
  const id = req.params.id;
  const status = 0;
  const type_id = 2;
  const opdipdMoreData = Array({
    Id: req.body.id,
    date: req.body.date,
    temperature: req.body.temperature,
    feeding: req.body.feeding,
    clinical_observ: req.body.clinical_observ,
    treatment_medicine: req.body.treatment_medicine,
    hospital_id: req.body.hospital_id,
    type_id : 2
  });
  var promises = opdipdMoreData.map((source) =>
    // console.log(source)
    // models.opdIpd.update(source,{where:{patient_id:id,status:status,type_id:type_id}})
    models.opdIpd.update(source, { where: { id: source.Id, patient_id: id } })
  );

  Promise.all(promises)
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

function getIpdPatientMore(req, res) {
  const id = req.params.id;
  // console.log(id);
  models.ipdPatientMore
    .findAll({
      where: {
        status: 0,
        ipdId: id,
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

function getUpdateIpd(req, res) {
  const id = req.params.id;
  const ipdUpdateData = {
    category: req.body.category,
    parent_name: req.body.parent_name,
    reg_no: req.body.reg_no,
    dateofadmission: req.body.dateofadmission,
    address: req.body.address,
    fee: req.body.fee,
    bill_no: req.body.bill_no,
    ward_no: req.body.ward_no,
    cage_kennel: req.body.cage_kennel,
    phone: req.body.phone,
    patient_name: req.body.patient_name,
    breed: req.body.breed,
    species: req.body.species,
    color: req.body.color,
    gender: req.body.gender,
    age: req.body.age,
    weight: req.body.weight,
    xray: req.body.xray,
    diagnosis: req.body.diagnosis,
    added_from: 2,
    // cage_id: req.body.cage_id,
    hospital_id: req.body.hospital_id,
  };
  const schema = {
    hospital_id: { type: "string", optional: false },
    parent_name: { type: "string", optional: false },
    reg_no: { type: "string", optional: false },
    address: { type: "string", optional: false },
    fee: { type: "string", optional: false },
    bill_no: { type: "string", optional: false },
    patient_name: { type: "string", optional: false },
    xray: { type: "string", optional: false },
    diagnosis: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(ipdUpdateData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  const status = 0;
  const data = models.Patient.findByPk(id)
    .then((result) => {
      // console.log(result);
      const cageid = result.cage_kennel;
      if (result.cage_kennel != ipdUpdateData.cage_kennel) {
        models.Bed.update({ in_used: 0 }, { where: { id: cageid } });
      }
     const cagePatId = ipdUpdateData.cage_kennel;
      models.Patient.update(ipdUpdateData, {
        where: { status: status, id: id},
      }).then((result) => {

        const cageId = ipdUpdateData.cage_kennel;
        models.Patient.update({cage_id:cageId}, {
          where: { id: id},})
        models.Bed.update({ in_used: 1, }, { where: { id: cageId } });

        res.status(200).json({
          // message: "ipd updated successfully",
          post: id,
        });
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getAllIpd(req, res) {
  const hospital_id = req.params.id;
  models.Patient.findAll({
    where: {
      status: 0,
      added_from: 2,
      hospital_id: hospital_id,
    },
    
      include: [
        {
          model: WardCategory,
          attribute: [[Sequelize.col("WardCategory.category_name")]],
        },
      ]
    
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

function getOneIpd(req, res) {
  const id = req.params.id;
  models.Patient.findByPk(id, { where: { added_from: 2}, 
  include : 
    [
      {
      model: CaseTable,
      where : {patient_id:id , status: 1}
    },
  ]
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

function getDeleteIpd(req, res) {
  const id = req.params.id;
  models.Patient.update(
    {
      status: 2,
    },
    {
      where: {
        id: id,
        status: 0,
        added_from: 2,
      },
    
    }
  )
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        message: "ipd deleted successfully",
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

function getMasterIpdCategory(req, res) {
  models.MasterIpdCategory.findAll({
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

function getOneInfoIpd(req, res) {
  const id = req.params.id;
  models.Patient.findByPk(id, {
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
        // where:{}
      },
      {
        model: MasterAge,
        attribute: [[Sequelize.col("MasterAge.age")]],
      },
      {
        model: WardCategory,
        attribute: [[Sequelize.col("WardCategory.category_name")]],
      },
      {
        model: CaseTable,
        where : {patient_id:id , status: 1}
      },
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

function getTotalCountIpd(req, res) {
  const hospital_id = req.params.id;
  models.Patient.count({
    where: {
      status: 0,
      added_from: 2,
      hospital_id: hospital_id,
    },
  }).then((result) => {
    res.status(200).json(result);
  });
}

function getDeleteIpdMorePaitent(req, res) {
  const id = req.params.id;
  models.opdIpd
    .update(
      { status: 2 },
      {
        where: { id: id, status: 0 },
      }
    )
    .then((result) => {
      // console.log(idChange);
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
function getUploadReportEditPage(req, res) {
  // console.log("dkfjghfdkjgh");
  const Id = req.params.id;
  models.opdIpdPatMediaType
    .findAll({
      where: {
        status: 0,
        patient_id: Id,
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

function getDeletePaitentReport(req, res) {
  const id = req.params.id;
  models.opdIpdPatMediaType
    .update(
      { status: 2 },
      {
        where: { id: id, status: 0 },
      }
    )
    .then((result) => {
      // console.log(idChange);
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

function getMultipleimage(req, res) {
  const id = req.params.id;
  models.Images.findAll({
    where: {
      status: 0,
      profileid: id,
    },
  })
    .then((result) => {
      res.status(200).json({
        message: "Images successfully",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}
function getDeleteMultipleImg(req, res) {
  const id = req.params.id;
  models.Images.update(
    { status: 2 },
    {
      where: { id: id, status: 0 },
    }
  )
    .then((result) => {
      // console.log(idChange);
      res.status(200).json({
        message: "Images delete successfully",
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

function getMasterAge(req, res) {
  models.MasterAge.findAll({ where: { status: 0 } })
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

function getPatientHistory (req, res) {
  const hospital_id = req.params.id;
  models.Patient.findAll({ where: { hospital_id: hospital_id},
   include:[
    {
      model: WardCategory,
      attribute: [[Sequelize.col("WardCategory.category_name")]],
    },
    {
      model: CaseTable,
      where: {hospital_id: hospital_id}
    }
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

function getAllPatient(req, res) {
  const hospital_id= req.params.id
  models.Patient.findAll({
    where: {
      status: 2,
      hospital_id:hospital_id,
      discharge_death_status: 1
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

function getAllIpdPatient (req, res) {
  const id = req.params.id;
  models.Patient.findByPk(id, {
    where :{status :2 ,discharge_death_status: 1},
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
        model: MasterAge,
        attribute: [[Sequelize.col("MasterAge.age")]],
      },
      {
        model: HealthReport,
        where : {patient_id: id, status:0},
     
      },
      {
        model: WardCategory,
        attribute: [[Sequelize.col("WardCategory.category_name")]],
      },
      {
        model: Bed,
        attribute: [[Sequelize.col("Bed.bedid")]],
      },
      {
        model: CaseTable,
        where : {patient_id:id, status: 2}
      },
      
    ],
    order: [  
      [ { model: CaseTable }, 'id', 'DESC'], 
       
        
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
function getIpdPatientActive (req, res) {
const id = req.params.id;
const addCaseData = { 
  hospital_id: req.body.hospital_id,
  patient_id:id,
  status:1,
}
models.CaseTable.create(addCaseData, { where: { patient_id: id } }).then((result) => {
  const caseId = result.id;
  const string =`${caseId}`;
  var maxLength = 5; 
  var case_id = string.padStart(maxLength, "0");
  var patCase_id ="CId"+case_id;
  models.Patient.update({ status: 0, discharge_death_status: 0}, { where: { id: id, status: 2, discharge_death_status: 1} });
  models.HealthReport.update({ status: 2,}, { where: { patient_id: id, status: 0} });
  
  models.CaseTable.update({ case_id: patCase_id}, { where: { id: caseId } });
    res.status(200).json({
      message : 'Case Create successfully',
      post: result,

    });
}).catch((error) => {
  res.status(404).json({
    message: "something went worg",
    post: error,
  });
});

}

function getUpdateIdOnActivePage (req, res, next) {
  const id = req.params.id;
  const ipdUpdateData = {
    ward_no: req.body.ward_no,
    cage_kennel: req.body.cage_kennel,
  };
  const status = 0;
  const data = models.Patient.findByPk(id)
  
    .then((result) => {
      // const cageid= result.ipdUpdateData;
      const cageId = ipdUpdateData.cage_kennel;
      models.Bed.update({ in_used: 1, }, { where: { id: cageId } });
          // if (result.cage_kennel != ipdUpdateData.cage_kennel) {
          //   models.Bed.update({ in_used: 1 }, { where: { bedid: cageid } });
          // }
          models.Patient.update({cage_id:cageId}, {
            where: { id: id},});
            
            models.Patient.update(ipdUpdateData, {
              where: { status: status, id: id},
            })
        

        res.status(200).json({
          message: "ipd updated successfully",
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

function getCaseTableCaseId (req, res) {
  const id=req.params.id;
  models.CaseTable.findOne({where:{status:1,patient_id:id},
   
  }).then((result) => {
    // console.log(resu);
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

function getFindBedWard (req, res) {
  const id = req.params.id;
  models.Patient.findByPk(id, { where: { added_from: 2}})
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

function getInfoPatientHistory (req, res) {
  const id = req.params.id;
  models.Patient.findByPk(id, {
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
        model: WardCategory,
        attribute: [[Sequelize.col("WardCategory.category_name")]],
      },
      {
        model: CaseTable,
        where : {patient_id:id}
      },
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

function DemoString (req, res) {


const string ="madam";
console.log(string.length);
var len =string.length
for(let i = 0; i <len/2; i++){
  // console.log(string[i]);
  // console.log(string[len - 1]);
  console.log(string[len - 1 - i]);
  if(string[i] !== string[len - 1 - i]){
    // console.log("string is not palindrome")
  }
  // console.log("string is  palindrome");
  // if(string[i])
  // return string[i];
  // console.log(string[i]! == string[st]);
}
// console.log(string);
// var maxLength = 5; // maxLength is the max string length, not max # of fills
// var res = string.padStart(maxLength, "0");
// console.log(res); // prints "00014"
}


module.exports = {
  getAddOpdPatient: getAddOpdPatient,
  geteUpdatePatient: geteUpdatePatient,
  getAllOpdPatient: getAllOpdPatient,
  getDeleteOpdPatient: getDeleteOpdPatient,
  getOneOpd: getOneOpd,
  getMsaterGender: getMsaterGender,
  getMsaterBreed: getMsaterBreed,
  getMsaterColor: getMsaterColor,
  getMsaterCity: getMsaterCity,
  getMsaterState: getMsaterState,
  getMsaterSpecies: getMsaterSpecies,
  getOpdAddMorePaitent: getOpdAddMorePaitent,
  getOpdPatientMore: getOpdPatientMore,
  getOneOpdDemo: getOneOpdDemo,
  getTotalCountOpd: getTotalCountOpd,
  getOpdAddMoreUpdatePatient: getOpdAddMoreUpdatePatient,
  getDeleteOpdMorePatient: getDeleteOpdMorePatient,
  getMultipleImg: getMultipleImg,
  getUploadReport: getUploadReport,
  getOneUploadReport: getOneUploadReport,
  getAddIpd: getAddIpd,
  getUpdateIpd: getUpdateIpd,
  getAllIpd: getAllIpd,
  getOneIpd: getOneIpd,
  getDeleteIpd: getDeleteIpd,
  getMasterIpdCategory: getMasterIpdCategory,
  getIpdAddMore: getIpdAddMore,
  getIpdPatientMore: getIpdPatientMore,
  getOneInfoIpd: getOneInfoIpd,
  getTotalCountIpd: getTotalCountIpd,
  getIpdAddMoreUpdatePaitent: getIpdAddMoreUpdatePaitent,
  getDeleteIpdMorePaitent: getDeleteIpdMorePaitent,
  getUploadReportEditPage: getUploadReportEditPage,
  getDeletePaitentReport: getDeletePaitentReport,
  getMultipleimage: getMultipleimage,
  getDeleteMultipleImg: getDeleteMultipleImg,
  getMasterAge: getMasterAge,
  getPatientHistory:getPatientHistory,
  getAllPatient: getAllPatient,
  getAllIpdPatient:getAllIpdPatient,
  getIpdPatientActive:getIpdPatientActive,
  getUpdateIdOnActivePage:getUpdateIdOnActivePage,
  getCaseTableCaseId:getCaseTableCaseId,
  getFindBedWard:getFindBedWard,
  getOpdIpdPatientMore:getOpdIpdPatientMore,
  getInfoPatientHistory:getInfoPatientHistory,

  DemoString:DemoString,
};
