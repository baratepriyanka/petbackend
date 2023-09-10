const Validator = require("fastest-validator");
const models = require("../models");
const db = require("../models/index");
const MasterCategory = db.MasterCategory;
const { Sequelize, Op, assert } = require("sequelize");

function getAddMedicine(req, res) {
  // var doctorID = "D" + Math.floor(Math.random() * 1000);
  const medicineData = {
    medicine_name: req.body.medicine_name,
    generic_name: req.body.generic_name,
    patient_id: req.body.patient_id,    
    purchase_price: req.body.purchase_price,
    sale_price: req.body.sale_price,
    quantity: req.body.quantity,   
    company: req.body.company,
    effects: req.body.effects,
    store_box: req.body.store_box,
    exp_date: req.body.exp_date,
    category: req.body.category,
    status: 0,
    hospital_id: req.body.hospital_id,
  };

  models.Medicine.create(medicineData)
    .then((result) => {
      res.status(200).json({
        message: "Medicine added successfully",
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

// function getAllMedicine(req, res) {
//   models.Medicine.findAll({
//     where: {
//       status: 0,
//     },
//     attributes: ["id", "medicine_name"],
//   })
//     .then((result) => {
//       res.status(200).json({
//         message: "",
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

function getUpdateMedicine(req, res) {
  const id = req.params.id;
  const medicineUpdateData = {
    medicine_name: req.body.medicine_name,
    generic_name: req.body.generic_name,
    patient_id: req.body.patient_id,    
    purchase_price: req.body.purchase_price,
    sale_price: req.body.sale_price,
    quantity: req.body.quantity,   
    doctor_id: req.body.doctor_id,
    company: req.body.company,
    effects: req.body.effects,
    store_box: req.body.store_box,
    exp_date: req.body.exp_date,
    category: req.body.category,
    hospital_id: req.body.hospital_id,
  };
  const status = 0;
  models.Medicine.update(medicineUpdateData, {
    where: { status: status, id: id},
  })
    .then((result) => {
      res.status(200).json({
        message: "meidicne updated successfully",
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

function getAllMedicine(req, res) {
  const hospital_id= req.params.id;
  models.Medicine.findAll({
    where: {
      status: 0,
      hospital_id:hospital_id
    }, 
    
    include: [
      {
        model: MasterCategory,
        where: {
          status: 0
        },
        attribute: [[Sequelize.col("MasterCategory.name")]]
      },
    ]
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

function getOneMedicine(req, res) {
  const id = req.params.id;
  models.Medicine.findByPk(id)
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

// function getOneMedicine(req, res) {
//   const id = req.params.id;
//   models.Medicine.findByPk(id)
//     .then((result) => {
//       if (result) {
//         console.log(result);
//         res.json(result);
//       } else {
//         res.status(404).json({
//           message: "medicine not found",
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(error).json({
//         message: "something went worg",
//         post: error,
//       });
//     });
// }

function getDeleteMedicine(req, res){
  const id = req.params.id;
  models.Medicine.update(
    {
      status: 2,
    },
    {where:{
      id:id ,status:0
    }}
    ).then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Medicine delete successfully",
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

function getMasterCategory(req, res) {

  models.MasterCategory.findAll({
    where: {
      status: 0,
    },
  }).then((result) => {
    res.status(200).json(result);
  }).catch((error) => {
    res.status(404).json({
      message:"something went worg",
      post: error,
    })
  })
  
}

function getAddMasterCategory(req, res){
  const categoryData={
    name: req.body.name,
    description: req.body.description,
    status:0
  }
  // console.log(categoryData);
  models.MasterCategory.create(categoryData)
  .then((result) => {
    
    res.status(200).json(result);
  }).catch((error) => {
    res.status(404).json({
      message: "something went worg",
      post: error,
    })
  })
}

function getUpdateMasterCategory(req, res){
  const id=req.params.id;
  const categoryData={
    name: req.body.name,
    description: req.body.description,
  
  }
  const status = 0;
  models.MasterCategory.update(categoryData,{
    where: {id:id, status: status}
  })
  .then((result) => {
    
    res.status(200).json(result);
  }).catch((error) => {
    res.status(404).json({
      message: "something went worg",
      post: error,
    })
  })
}

function getdeleteMasterCategory(req, res){
  const id = req.params.id;
  models.MasterCategory.update(
 {status: 2},
 {where: {id:id, status: 0}}
  ).then((result) => {
    res.status(200).json(result);
  }).catch((error) => {
    res.status(404).json({
      message: "something went worg",
      post: error,
    })
  })
}

function getOneMasterCategory(req, res) {
  const id = req.params.id;
  models.MasterCategory.findByPk(id)
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

function getOneInfoMedicine(req, res) {
  const id = req.params.id;
  models.Medicine.findByPk(id,{
   
    include: [
      {
        model: MasterCategory,
  
        attribute: [[Sequelize.col("MasterCategory.name")]],
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
  getAddMedicine: getAddMedicine,
  getAllMedicine: getAllMedicine,
  getUpdateMedicine: getUpdateMedicine,
  getOneMedicine: getOneMedicine,
  getDeleteMedicine: getDeleteMedicine,
  getMasterCategory :getMasterCategory,
  getAddMasterCategory:getAddMasterCategory,
  getUpdateMasterCategory:getUpdateMasterCategory,
  getdeleteMasterCategory:getdeleteMasterCategory,
  getOneMasterCategory:getOneMasterCategory,
  getOneInfoMedicine:getOneInfoMedicine
};
