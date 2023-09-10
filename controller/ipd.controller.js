const Validator = require("fastest-validator");
const models = require("../models");
const db = require("../models/index");
const ipdPatientMore = db.ipdPatientMore;
const MasterIpdCategory = db.MasterIpdCategory;
const Ipd = db.Ipd;
const MasterBreed = db.MasterBreed;
const MasterColor = db.MasterColor;
const MasterGender = db.MasterGender;
const MasterSpecies = db.MasterSpecies;
const Patient = db.Patient;
const Bed = db.Bed;

const { Sequelize, Op, assert } = require("sequelize");

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
    cage_id: req.body.cage_id,
    status: 0 ,
    added_from: 2,
    hospital_id: req.body.hospital_id,
  };
  const schema = {
    category: { type: "string", optional: false },
    parent_name: { type: "string", optional: false },
    reg_no: { type: "string", optional: false },
    dateofadmission: { type: "string", optional: false },
    address: { type: "string", optional: false },
    fee: { type: "string", optional: false },
    bill_no: { type: "string", optional: false },
    ward_no: { type: "string", optional: false },
    cage_kennel: { type: "string", optional: false },
    patient_name: { type: "string", optional: false },
    breed: { type: "string", optional: false },
    species: { type: "string", optional: false },
    color: { type: "string", optional: false },
    gender: { type: "string", optional: false },
    age: { type: "string", optional: false },
    weight: { type: "string", optional: false },
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
  models.Patient.create(ipdData,
    { 
      attributes:{exclude:[""]}
    })
    .then((result) => {
      const pat_id = result.id
      const number ="P"+pat_id
      models.Patient.update({Patient_id: number},
        {  where: {id:pat_id}})

      const id =ipdData.cage_id
      models.Bed.update({in_used:1},
      {  where: {id:id}})
      res.status(200).json({
        // message: "Patient add successfully",
        post: result.id,
      });
      res.status(200).json({
        message: "ipd add successfully",
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

var getIpdAddMore = async (req, res) => {
  const id = req.params.id;
  
  const IpdMoreData = Array({
    ipdId: id,
    type: req.body.type,
    temp: req.body.temp,
    feeding: req.body.feeding,
    clinical: req.body.clinical,
    treatment: req.body.treatment,
    hospital_id: req.body.hospital_id,
    added_type:1
  });
    // console.log(IpdMoreData);

  var promises = IpdMoreData.map((source) =>
    models.ipdPatientMore.create(source)
  );
  Promise.all(promises).then((result) => {});
};

var getIpdAddMoreUpdatePaitent = async (req, res) => {
  const id = req.params.id;
  const status = 0;
  // console.log(id);

  const IpdMoreData = Array({
    ipdId: id,
    type: req.body.type,
    temp: req.body.temp,
    feeding: req.body.feeding,
    clinical: req.body.clinical,
    treatment: req.body.treatment,
  });
  //   console.log(opdMoreData);

  var promises = IpdMoreData.map((source) =>
    models.ipdPatientMore.update(source, { where: { id: id, status: status} })
  );
  Promise.all(promises).then((result) => {
    res.status(200).json([result]);
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
    cage_id: req.body.cage_id,
    hospital_id: req.body.hospital_id,
  };
  const schema = {
    category: { type: "string", optional: false },
    parent_name: { type: "string", optional: false },
    reg_no: { type: "string", optional: false },
    dateofadmission: { type: "string", optional: false },
    address: { type: "string", optional: false },
    fee: { type: "string", optional: false },
    bill_no: { type: "string", optional: false },
    ward_no: { type: "string", optional: false },
    cage_kennel: { type: "string", optional: false },
    patient_name: { type: "string", optional: false },
    breed: { type: "string", optional: false },
    species: { type: "string", optional: false },
    color: { type: "string", optional: false },
    gender: { type: "string", optional: false },
    age: { type: "string", optional: false },
    weight: { type: "string", optional: false },
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
  models.Patient.update(ipdUpdateData, {
    where: { status: status, id: id},
  })
    .then((result) => {
      const cageId =ipdUpdateData.cage_id
      models.Bed.update({in_used:1},
      {  where: {id:cageId}})
      
      res.status(200).json({
        // message: "ipd updated successfully",
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

// function getAllIpd(req, res) {
//   models.Ipd.findAll({
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

function getAllIpd(req, res) {
  const  hospital_id=req.params.id;
  models.Patient.findAll({
    where: {
      status: 0,
      added_from: 2,
      hospital_id:hospital_id
     
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

function getOneIpd(req, res) {
  const id = req.params.id;
  models.Patient.findByPk(id,
    { where: { added_from: 2 }})
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
  // console.log("hnghhg");
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
  const hospital_id=req.params.id;
  models.Patient.count({
    where: {
      status: 0,
      added_from: 2,
      hospital_id: hospital_id

    },
  }).then((result) => {
    res.status(200).json(result);
  });
}

function getDeleteIpdMorePaitent (req, res) {
  const id = req.params.id;
  models.ipdPatientMore.update(
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

module.exports = {
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
  getDeleteIpdMorePaitent:getDeleteIpdMorePaitent
};
