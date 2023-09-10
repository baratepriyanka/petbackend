const Validator = require("fastest-validator");
const models = require("../models");
const nodemailer = require("nodemailer");
const db = require("../models/index");
const creds = require("../credential");
const bcryptjs = require("bcryptjs");
const user = db.user;
const Hospital = db.Hospital;
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // host: "smtp.mailtrap.io",
  port: 587,
  service: false,
  auth: {
    user: creds.auth.user,
    pass: creds.auth.pass,
  },
});
function getAddNewUserManagment(req, res) {
  // const id = req.params.id;
  // const userData = {
  //   first_name: req.body.first_name,
  //   last_name: req.body.last_name,
  //   email: req.body.email,
  //   phone: req.body.phone,
    // role: req.body.role,
  //   password: req.body.password,
  //   user_id: id,
  //   status: 0,
  // };

  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     res.json({ status: true, respMesg: "Email Sent Successfully" });
  //   } else {
  //     res.json({ status: true, respMesg: "Email Sent Successfully" });
  //   }
  //   // console.log("Email.sent")
  // });
  // // // console.log(userData);
  // models.UserManagment.create(userData, { where: { user_id: id } });
  models.user.findOne({ where: { email: req.body.email } }).then((result) => {
    const usertype=req.body.user_type;
   const password ='12345';
    if (result) {
      res.status(200).json({
        message: "Email already exists!",
        // message2: "password already exists!",
      });
    } 
    else {
      if(usertype=='1')
      {
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(password, salt, function (err, hash) {
        // console.log(usertype)
         const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            hospital_id: req.body.hospital_id,
            department: req.body.department,
            password:hash,
            user_type: usertype,
            status: 0,
          };
          // console.log(userData)
          const mailOptions = {
            from: userData.first_name,
            to: userData.email,
            subject: "Contact Details",

            html: `
            <div style="padding:10px;border-style: ridge">
            <p>You have a new contact request.</p>
            <h3>Contact Details</h3>
            <ul>
                <li>First Name: ${userData.first_name}</li>
                <li>Last Name: ${userData.last_name}</li>
                <li>Email: ${userData.email}</li>
                <li>Password: ${password}</li>
            </ul>
            `,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.json({ status: true, respMesg: "Email Sent Successfully" });
            } else {
              res.json({ status: true, respMesg: "Email Sent Successfully" });
            }
            // console.log("Email.sent")
          });
          models.user.create(userData).then((result) => {
            const id = result.id;
            const number = "U" + id;
            models.user.update(
              { user_id: number },
              { where: { id: id, status: 0 } }
            );
            res.status(200).json({
              post: result.id,
            });
          });
        });
       });
      }else{
        bcryptjs.genSalt(10, function (err, salt) {
          bcryptjs.hash(password, salt, function (err, hash) {
        // console.log(usertype)
         const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            hospital_id: req.body.hospital_id,
            password:hash,
            user_type: usertype,
            status: 0,
          };
          // console.log(userData)
          const mailOptions = {
            from: userData.first_name,
            to: userData.email,
            subject: "Contact Details",

            html: `
            <div style="padding:10px;border-style: ridge">
            <p>You have a new contact request.</p>
            <h3>Contact Details</h3>
            <ul>
                <li>First Name: ${userData.first_name}</li>
                <li>Last Name: ${userData.last_name}</li>
                <li>Email: ${userData.email}</li>
                <li>Password: ${password}</li>
            </ul>
            `,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              res.json({ status: true, respMesg: "Email Sent Successfully" });
            } else {
              res.json({ status: true, respMesg: "Email Sent Successfully" });
            }
            // console.log("Email.sent")
          });
          models.user.create(userData).then((result) => {
            const id = result.id;
            const number = "U" + id;
            models.user.update(
              { user_id: number },
              { where: { id: id, status: 0 } }
            );
            res.status(200).json({
              post: result.id,
            });
          });
        });
       });
      }



      // bcryptjs.genSalt(10, function (err, salt) {
      //   bcryptjs.hash(req.body.password, salt, function (err, hash) {
      //     // const userData = {
      //     //   first_name: req.body.first_name,
      //     //   last_name: req.body.last_name,
      //     //   email: req.body.email,
      //     //   phone: req.body.phone,
      //     //   // role: req.body.role,
      //     //   // password: req.body.password,

      //     //   hospital_id: req.body.hospital_id,
      //     //   user_type: 3,
      //     //   status: 0,
      //     // };
      //     // const mailOptions = {
      //     //   from: userData.first_name,
      //     //   to: userData.email,
      //     //   subject: "Contact Details",

      //     //   html: `
      //     //   <div style="padding:10px;border-style: ridge">
      //     //   <p>You have a new contact request.</p>
      //     //   <h3>Contact Details</h3>
      //     //   <ul>
      //     //       <li>First Name: ${userData.first_name}</li>
      //     //       <li>Last Name: ${userData.last_name}</li>
      //     //       <li>Email: ${userData.email}</li>
      //     //   </ul>
      //     //   `,
      //     // };

      //     // transporter.sendMail(mailOptions, function (error, info) {
      //     //   if (error) {
      //     //     res.json({ status: true, respMesg: "Email Sent Successfully" });
      //     //   } else {
      //     //     res.json({ status: true, respMesg: "Email Sent Successfully" });
      //     //   }
      //     //   // console.log("Email.sent")
      //     // });
      //     // // console.log(registerData)
      //     // // models.user.create(registerData).then((result) => {
      //     // // // console.log(result);

      //     // //   })
      //     // // // console.log(userData);
      //     // models.user.create(userData).then((result) => {
      //     //   // console.log(result);
      //     //   const id = result.id;
      //     //   const number = "U" + id;
      //     //   models.user.update(
      //     //     { user_id: number },
      //     //     { where: { id: id, status: 0 } }
      //     //   );
      //     // });
      //   });
      // });
    }
  });
}
transporter.verify(function (err, success) {
  if (err) {
    console.error(err);
  } else {
    console.log("server is ready");
  }
});

function getUpdateUserManagment(req, res) {
  const id = req.params.id;
  const updateUserData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    // role: req.body.role,
    hospital_id: req.body.hospital_id,
  };
  const status = 0;
  const user_type = 3;
  const schema = {
    first_name: { type: "string", optional: false },
    last_name: { type: "string", optional: false },
    email: { type: "string", optional: false },
    phone: { type: "string", optional: false },
    role: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(updateUserData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  models.user
    .update(updateUserData, {
      where: {
        id: id,
        status: status,
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

function getOneUserManagment(req, res) {
  const id = req.params.id;
  models.user
    .findByPk(id)
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
function getAllUserManagment(req, res) {
  const hospital_id = req.params.id;
  models.user
    .findAll({
      where: {
        status: 0,
        hospital_id: hospital_id,
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

function getDeleteUserManagment(req, res) {
  const id = req.params.id;
  models.user
    .update(
      {
        status: 2,
      },
      {
        where: { id: id, status: 0 },
      }
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
function getmasterUserRole(req, res) {
  models.MasterUserRoles.findAll()
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

function getClinicHosUserM(req, res) {
  const id = req.params.id;
  models.user
    .findByPk(id)
    .then((result) => {
      // console.log(result);
      const user_id=result.id
      const hospital_id=result.hospital_id
        // console.log(hospital_id);

      if(user_id && hospital_id== "0"){
      const data = models.Hospital.findOne({
        where: { user_id: user_id },
      });
     
      data.then(function (result) {
        // console.log(result);
        res.status(200).json({
          message: "Authentinbgfhgfcation successfully",
          post:result.id,
          post1:result
        });
      });

      }else{
        const data = models.Hospital.findOne({
          where: { id: hospital_id },
        });
         
      data.then(function (result) {
        // console.log(result);
        res.status(200).json({
          message: "Authentication successfully",
          post:result.id,
          post1:result
        });
      });
      }
      
    })
    .catch((error) => {
      res.status(404).json({
        message: "something went worg",
        post: error,
      });
    });
    
}

function getUpdateclinichosMan (req, res){
  const id = req.params.id;
  const updateUserData = {
    hname: req.body.hname,
    address: req.body.address,
    email: req.body.email,
    phone: req.body.phone,
  
  };
  models.Hospital
    .update(updateUserData, {
      where: {
        id: id,
  
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

function getAllDoctorUser (req, res) {
  const hospital_id = req.params.id;
  models.user
    .findAll({
      where: {
        status: 0,
        hospital_id: hospital_id,
        user_type:1
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

module.exports = {
  getAddNewUserManagment: getAddNewUserManagment,
  getUpdateUserManagment: getUpdateUserManagment,
  getOneUserManagment: getOneUserManagment,
  getAllUserManagment: getAllUserManagment,
  getDeleteUserManagment: getDeleteUserManagment,
  getmasterUserRole: getmasterUserRole,
  getClinicHosUserM:getClinicHosUserM,
  getUpdateclinichosMan:getUpdateclinichosMan,
  getAllDoctorUser:getAllDoctorUser
};
