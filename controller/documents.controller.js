const models = require("../models");
const Validator = require("fastest-validator");
// const db = require("../models/index");


function getAddDocuments(req, res) {
  const documentsData={
    patient: req.body.patient,
    date: req.body.date,
    description: req.body.description,
    document: req.body.document,
    status:0
  }  
  console.log(documentsData);

  models.documents.create(documentsData)
  .then((result) =>{
    res.status(202).json(result);
  }).catch((error) =>{
    res.status(500).json({ 
        message: "someting went wrong",
        post: error
    });
  });
}

function getUpdateDocuments(req, res){
   const id=req.params.id;
    const updateDocumentsData={
        patient: req.body.patient,
        date: req.body.date,
        description: req.body.description,
        document: req.body.document,
        hospital_id: req.body.hospital_id,
    }
    const status = 0
    models.documents.update(updateDocumentsData,{
        where: { status: status, id: id},
    })
    .then((result) => {
        res.status(200).json([updateDocumentsData]
        );
    }).catch((error) =>{
        res.status(404).json({ 
            message: "something went wrong",
            post:error
        })
    })
}
function getAllDocuments(req, res){
    const hospital_id=req.params.id;
    // console.log("getAllDocuments");
    models.documents.findAll({
        where: {
            status: 0,
            hospital_id:hospital_id
          },
    }).then((result)=>{
        res.status(200).json(result);
    }).catch((error) =>{
        res.status(404).json({
            message: "something went wrong",
            post:error
        });
    });
}
function getOneDocument(req, res){
    const id = req.params.id
    models.documents.findByPk(id)
    .then((result)=>{
        res.status(200).json(result);
    }).catch((error) =>{
        res.status(404).json({
            message: "something went wrong",
            post:error
        });
    });
}

function getDeleteDocument(req, res){
    const id = req.params.id
    models.documents.update(
         {
            status:2
        },
        {
            where:{
            id:id ,status:0,
      

            }
        },
    ).then((result) =>{
        res.status(200).json({
            message: "success",
        });
    }).catch((error) =>{
        res.status(404).json({
            message: "something went wrong",
            post:error
        });
    });
}
module.exports = {
    getAddDocuments:getAddDocuments,
    getUpdateDocuments:getUpdateDocuments,
    getAllDocuments:getAllDocuments,
    getOneDocument:getOneDocument,
    getDeleteDocument:getDeleteDocument
  }; 