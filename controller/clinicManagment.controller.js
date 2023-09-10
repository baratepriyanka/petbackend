const Validator = require("fastest-validator");
const models = require("../models");
const db = require("../models/index");

function getAddclinicManagment(req, res) {
    const userData = {
      clinic_name: req.body.clinic_name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
    //   role: req.body.role,
      status: 0,
    };
    const schema = {
      clinic_name: { type: "string", optional: false },
      address: { type: "string", optional: false },
      email: { type: "string", optional: false },
      phone: { type: "string", optional: false },
    //   role: { type: "string", optional: false },
     
    };
    const v = new Validator();
    const validateResponse = v.validate(userData, schema);
    if (validateResponse !== true) {
      return res.status(400).json({
        message: "Validstion failed",
        errors: validateResponse,
      });
    }
    models.ClinicManagment.create(userData)
      .then((result) => {
        res.status(200).json({
          message: "User add successfully",
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
  
  function getUpdateclinicManagment(req, res){
   const id= req.params.id;
    const updateUserData={
      clinic_name: req.body.clinic_name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
    //   role: req.body.role,
    };
    const status = 0;
    const schema = {
      clinic_name: { type: "string", optional: false },
      address: { type: "string", optional: false },
      email: { type: "string", optional: false },
      phone: { type: "string", optional: false },
    //   role: { type: "string", optional: false },
     
    };
    const v = new Validator();
    const validateResponse = v.validate(updateUserData, schema);
    if (validateResponse !== true) {
      return res.status(400).json({
        message: "Validstion failed",
        errors: validateResponse,
      });
    }
    models.ClinicManagment.update(updateUserData,{
      where: {
        id:id, status:status
      }, 
    })
    .then((result) => {
      res.status(200).json({
        message: "User update successfully",
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
  
  function getOneclinicManagment(req, res){
   const id = req.params.id;
    models.ClinicManagment.findByPk(id)
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
  function getAllclinicManagment (req, res) {
    models.ClinicManagment.findAll({
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
  
  function getDeleteclinicManagment (req, res) {
  const id= req.params.id;
  models.ClinicManagment.update({
    status: 2,
  }, {
    where: {id:id, status: 0 }
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
  
  module.exports = {
    getAddclinicManagment: getAddclinicManagment,
    getUpdateclinicManagment: getUpdateclinicManagment,
    getOneclinicManagment:getOneclinicManagment,
    getAllclinicManagment:getAllclinicManagment,
    getDeleteclinicManagment:getDeleteclinicManagment
  };