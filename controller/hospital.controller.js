const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const user = db.user;
const Hospital = db.Hospital;

function getAddHospital(req, res) {
  const addHospitalData = {
    hname: req.body.hname,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    state: req.body.state,
  };
  models.Hospital.create(addHospitalData)
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

function getAllHospitalName(req, res) {
  models.Hospital.findAll({
    where: {
      statuss: 0,
    },
    attributes: ["id", "hname"],
  })
    .then((result) => {
      res.status(200).json(result)
    }).catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
}

module.exports = {
  getAddHospital: getAddHospital,
  getAllHospitalName: getAllHospitalName,
};
