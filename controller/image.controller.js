
const models = require("../models");
const db = require("../models");
var fs = require("fs");
const Doctor= db.Doctor;
// function upload(req, res) {
//         let fileName = req.body.doctor_name + req.file.filename;
//         if(fileName){
//             res.status(200).json({
//                 message: "image upload successful",
//                 url: fileName
//             });
//         }else{
//             res.status(404).json({
//                 message: "something went worg",
//             });
//         }
    
// }var imageData = fs.readFileSync(req.file.path);


var upload = async (req, res) => {
//  const profiledata= req.file.filename;
//  console.log(profiledata);
  var imageData = {
    // profile: profiledata,
    // doctor_name: req.body.doctor_name,
    // doctor_id: req.body.doctor_id,  
    // email: req.body.email,
    // phone: req.body.phone,
    // department: req.body.department,
    // // profile: req.body.profile,
    // education: req.body.education,
    // gender: req.body.gender,
    patient_name: req.body.patient_name,
    Patient_id: req.body.patient_id,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    birthday: req.body.birthday,
    gender: req.body.gender,
    bloodgroup: req.body.bloodgroup,
    doctor_id: req.body.doctor_id,
    // profile: req.file,
    profile: req.body.profile,
  }
  db.Patient.create(imageData)
  .then(image => {
  res.json(image)
  })
    // try {    
    //   const data= req.file.filename
    //     let fileName =data + req.body.doctor_name 
    //     // let fileName = await Doctor.create(data, req.body.doctor_name ); 
    //     // let fileName = req.body.doctor_name + req.file.filename;
    //      console.log(fileName);
    //   res.json();
    //   // res.json({})
    // } catch (error) {
    //   console.log(error)
    //   res.status(500)    
    // }
  }
module.exports ={
    upload:upload
}