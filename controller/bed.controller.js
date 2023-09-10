const models = require("../models");
const db = require("../models/index");
const Moment = require("moment");
const Validator = require("fastest-validator");
const Bed = db.Bed;
const MasterWardNumber = db.MasterWardNumber;
const WardCategory = db.WardCategory;

const MasterBedCategories = db.MasterBedCategories;
const { Sequelize, Op, assert } = require("sequelize");
const Patient = db.Patient;

function getAddbed(req, res) { 
  const ward_no= req.body.ward_no;
  // console.log(ward_no);
  if(ward_no){
    models.Bed.findOne({ where: { bedid: req.body.bedid , ward_no:ward_no} }).then((result) => {
      if (result) {
        res.status(208).json({
          message: "Cage/Kennel number already exists!",
          // message2: "password already exists!",
        });
      }else{
        const addBed = {
          bedid: req.body.bedid, // cage number
          ward_no: req.body.ward_no, // ward category
          description: req.body.description,
          hospital_id: req.body.hospital_id,
          status: 0,
        };
        models.Bed.create(addBed)
          .then((result) => {
            res.status(200).json({
              message: "Bed add successfully",
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
    }).catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
  
  }


}

function getUpdateBed(req, res) {
  const id = req.params.id;
//    const updateBedData = {
//     bedid: req.body.bedid, // cage number
//     ward_no: req.body.ward_no, // ward category
//     description: req.body.description,
//     hospital_id: req.body.hospital_id,
//   };
//   const status = 0;
//   console.log(updateBedData)
//  const data= models.Bed.findOne({ where: {bedid: req.body.bedid} });
//     data.then((result) => {
//       if(result.bedid === updateBedData.bedid ){
//         res.status(208).json({
//           message: "Cage/Kennel number already exists!",
//           // message2: "password already exists!",
//         });

//       }else if(result.bedid !== updateBedData.bedid ){
//         models.Bed.update(updateBedData, { where: { id: id, status: status} })
//           .then((result) => {
//             res.status(200).json({
//               message: "update Bed successfully",
//               post: updateBedData,
//             });
//           })
//           .catch((error) => {
//             res.status(500).json({
//               message: "something went worg",
//               post: error,  
//             });
//           });

//       }
//     })
  const updateBedData = {
    bedid: req.body.bedid, // cage number
    ward_no: req.body.ward_no, // ward category
    description: req.body.description,
    hospital_id: req.body.hospital_id,
  };
  const status = 0;
  models.Bed.update(updateBedData, { where: { id: id, status: status} })
    .then((result) => {
      res.status(200).json({
        message: "update Bed successfully",
        post: updateBedData,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,  
      });
    });
}

function getAllBed(req, res) {
  const hospital_id= req.params.id;
  models.Bed.findAll({
    where: {
      status: 0,
      hospital_id: hospital_id
    },
     include: [
      {
        model: WardCategory,
        where: {
          status: 0,
        },
       
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
function getDeleteBed(req, res) {
  const id = req.params.id;
  models.Bed.update(
    { status: 2 },
    {
      where: { id: id, status: 0},
    }
  )
    .then((result) => {
      // console.log(idChange);
      res.status(200).json({
        message: "Bed delete successfully",
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

function getOneBed(req, res) {
  const id = req.params.id;
  models.Bed.findByPk(id)
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

//all Bed Category display
function getAddbedCategory(req, res) {
  // console.log("hfhgfj");
  const addBedCategory = {
    category_name: req.body.category_name,
    description: req.body.description,
    hospital_id:req.body.hospital_id,
    status: 0,
  };
  // console.log(addBedCategory);
  models.WardCategory.create(addBedCategory)
    .then((result) => {
      res.status(200).json({
        message: "Bed Category added successfully",
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
function getOneBedCategory(req, res) {
  const id = req.params.id;
  models.WardCategory.findByPk(id)
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
function getUpdateBedCategory(req, res) {
  const id = req.params.id;
  const updateBedDatacategory = {
    category_name: req.body.category_name,
    description: req.body.description,
    hospital_id :req.body.hospital_id
  };
  const status = 0;
  models.WardCategory.update(updateBedDatacategory, {
    where: { id: id, status: status },
  })
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        message: "update Bed successfully",
        // post: updateBedData,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}
function getDeleteBedCategory(req, res) {
  const id = req.params.id;
  models.WardCategory.update(
    { status: 2 },
    {
      where: { id: id, status: 0 },
    }
  )
    .then((result) => {
      // console.log(idChange);
      res.status(200).json({
        message: "Bed CategoryData delete successfully",
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
function getMasterBedCategory(req, res) {
  const hospital_id= req.params.id
  models.WardCategory.findAll({
    where: {
      status: 0,
      hospital_id:hospital_id
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

//AddbedAllotment Bed display
function getAddbedAllotment(req, res) {
  // const allotedTime= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  // const dischargeTime= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  // const date_ob = new Date();
  // const day = ("0" + date_ob.getDate()).slice(-2);
  // const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // const year = date_ob.getFullYear();
  // // console.log(day);
  // // console.log("day");

  // const date = year + "-" + month + "-" + day;
  // // console.log(date);

  // const hours = date_ob.getHours();
  // const minutes = date_ob.getMinutes();
  // const seconds = date_ob.getSeconds();

  // const dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  // console.log(dateTime)

  // console.log(dateformate)
  const addBedAllotment = {
    bedId: req.body.bedId,
    patient: req.body.patient,
    // allotedTime: dateTime,
    // dischargeTime: dateTime,
    allotedTime: req.body.allotedTime,
    dischargeTime: req.body.dischargeTime,
    status: 0,
  };
  // console.log(addBedAllotment);
  models.BedAllotment.create(addBedAllotment)
    .then((result) => {
      res.status(200).json({
        message: "Bed Allotment added successfully",
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
function getAllBedAllotment(req, res) {
  // console.log("getAllBedAllotment");
  models.BedAllotment.findAll({
    where: {
      status: 0,
    },
    include: [
      {
        model: Patient,
        where: {
          status: 0,
        },
        attribute: [[Sequelize.col("patient_name")]],
      },
    ],
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

function getOneBedAllotment(req, res) {
  // const allotment = req.body.allotment;
  // const allotedTime = Moment(allotment).format('YYYY-MM-DDThh:mm')
  // const dischargeTime = Moment().format('YYYY-MM-DDThh:mm')
  // console.log(dischargeTime)
  const id = req.params.id;
  models.BedAllotment.findByPk(id)
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

function getDeleteBedAllotment(req, res) {
  const id = req.params.id;
  models.BedAllotment.update(
    { status: 2 },
    {
      where: { id: id, status: 0 },
    }
  )
    .then((result) => {
      // console.log(idChange);
      res.status(200).json({
        message: "Bed delete successfully",
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

function getAllCageId(req, res) {
  const ward_no = req.params.id
  models.Bed.findAll({
    where: {
      status: 0,
      in_used:0,
      ward_no:ward_no
    },
    order: [
      ['bedid', 'DESC'],
      // ['name', 'ASC'],
  ],
    attributes: ["id","bedid","ward_no"],
  },
)
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

function getUpdateAllbedallotment(req, res) {
  // const allotedTime = Moment().format('YYYY-MM-DDThh:mm')
  // const dischargeTime = Moment().format('YYYY-MM-DDThh:mm')
  // const allotedTime= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  // const dischargeTime= new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const id = req.params.id;
  const updateBedData = {
    bedId: req.body.bedId,
    patient: req.body.patient,
    allotedTime: req.body.allotedTime,
    dischargeTime: req.body.dischargeTime,
    // status:0,
  };
  // console.log(updateData);
  const status = 0;
  // const patientId = req.body.patient_id;
  models.BedAllotment.update(updateBedData, {
    where: { id: id, status: status },
  })
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        message: "update Bed successfully",
        post: updateBedData,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
}

function getTotalAvabednumber (req, res){
 const hospital_id=req.params.id;
  models.Bed.count({
    where: {
      status: 0,
      in_used:0,
      hospital_id:hospital_id
     
       },
  }).then((result) => {
    res.status(200).json(result);
  });
}

function getOpenClosebednum(req, res) {
  const id = req.params.id;
  const inused =  0;
  models.Bed.update(
    { in_used: inused },
    {
      where: { id: id, in_used: 1},
    }
  )
   const data =Patient.findOne({ where: { cage_kennel: id ,cage_id:id,  status: 0,} })
  data.then( function (result)  {
      // console.log(result.id)
    models.Patient.update(
        {
          status: 2,
        },
        {
          where: {
            id: result.id,
            status: 0,
            added_from: 2,
          },
        }
       
      );
    
      res.status(200).json({
        message: "ipd patient deleted successfully",
        post: inused
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "something went worg",
        post: error,
      });
    });
} 
function getMsaterWardNumber(req, res) {
  models.MasterWardNumber.findAll({
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
function getWardnumber(req, res) {
  const hospital_id = req.params.id
 models.WardCategory.findAll({
    where: {
      status: 0,
      hospital_id:hospital_id
    },
  },
)
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
function getBedData(req, res) {
  const hospital_id = req.params.id;
  models.Bed.findAll({
    where: {
      hospital_id:hospital_id
    },
    attributes:{exclude:["bedcategory","doctor_id","Patient_id","status","updatedAt"]},
  },
).then((result) => {
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
  getAddbed: getAddbed,
  getAddbedCategory: getAddbedCategory,
  getUpdateBed: getUpdateBed,
  getAllBed: getAllBed,
  getOneBed: getOneBed,
  getDeleteBed: getDeleteBed,
  getMasterBedCategory: getMasterBedCategory,
  getAllCageId: getAllCageId,
  getAddbedAllotment: getAddbedAllotment,
  getAllBedAllotment: getAllBedAllotment,
  getOneBedAllotment: getOneBedAllotment,
  getOneBedCategory: getOneBedCategory,
  getUpdateAllbedallotment: getUpdateAllbedallotment,
  getDeleteBedAllotment: getDeleteBedAllotment,
  getUpdateBedCategory: getUpdateBedCategory,
  getDeleteBedCategory: getDeleteBedCategory,
  getTotalAvabednumber:getTotalAvabednumber,
  getOpenClosebednum:getOpenClosebednum,
  getWardnumber:getWardnumber,
  getMsaterWardNumber:getMsaterWardNumber,
  getBedData:getBedData
};
