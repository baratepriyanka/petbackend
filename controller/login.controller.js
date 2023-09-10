const models = require("../models");
// const models = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const Validator = require("fastest-validator");
const nodemailer = require("nodemailer");
const creds = require("../credential");
const user = db.user;
const MasterUserRoles = db.MasterUserRoles;
const UserManagment = db.UserManagment;
const Hospital = db.Hospital;

const { Sequelize, Op, assert } = require("sequelize");

// function getLogin(req, res) {
var getLogin = async (req, res, next) => {
  const userData = await user
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      // const password= bcryptjs.compare(user.password)
      // console.log(password)
      if (user === null) {
        // if (!user )  {
        res.status(401).json({
          message: "Please enter valid email ",
        });
      } else {
        // console.log(user.password+"jhfdgjfghjfgh");
        bcryptjs.compare(
          req.body.password,
          user.password,
          function (err, result, id) {
            if (result === true) {
              const token = jwt.sign(
                {
                  email: user.email,
                  password: user.password,
                  id: user.id,
                },
                "secret",
                function (err, token) {
                  const uid = user.id;
                  const hid = user.hospital_id;

                  if (uid && hid == "0") {
                    const data = models.Hospital.findOne({
                      where: { user_id: uid },
                    });
                    data.then(function (result) {
                      res.status(200).json({
                        message: "Authentication Successfully",
                        token: token,
                        id: user.id,
                        hospital_id: result.id,
                        h_id: result.hosp_id,
                      }); // "Some User token"
                    });
                  } else {
                    res.status(200).json({
                      message: "Authentication Successfully",
                      token: token,
                      id: user.id,
                      hid: user.id,
                      hospita_id: user.hospital_id,
                      //   // hello : result.hosp_id
                    }); // "Some User token"
                    // });
                  }
                }
              );
            } else {
              res.status(401).json({
                message: "Please enter valid password",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "something went worg",
        post: err,
      });
    });
};
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
//signup
// models.user.findOne({where:{email: req.body.email}})
function getUser(req, res) {
  models.user.findOne({ where: { email: req.body.email } }).then((result) => {
    if (result) {
      res.status(200).json({
        message: "Email already exists!",
        // message2: "password already exists!",
      });
    } else {
      bcryptjs.genSalt(10, function (err, salt) {
        bcryptjs.hash(req.body.password, salt, function (err, hash) {
          const registerData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
            hospital_id: 0,
            status: 0,
          };
          const schema = {
            first_name: { type: "string", optional: false },
            last_name: { type: "string", optional: false },
            email: { type: "string", optional: false },
          };
          const v = new Validator();
          const validateResponse = v.validate(registerData, schema);
          if (validateResponse !== true) {
            return res.status(400).json({
              message: "Validstion failed",
              errors: validateResponse,
            });
          }
          // console.log(registerData)
          const mailOptions = {
            from: registerData.first_name,
            to: registerData.email,
            subject: "Contact Details",

            html: `
            <div style="padding:10px;border-style: ridge">
            <p>You have a new contact request.</p>
            <h3>Contact Details</h3>
            <ul>
                <li>First Name: ${registerData.first_name}</li>
                <li>Last Name: ${registerData.last_name}</li>
                <li>Email: ${registerData.email}</li>
            </ul>
            `,
          };


          // transporter.sendMail(mailOptions, function (error, info) {
          //   if (error) {
          //     res.json({ status: true, respMesg: "Email Sent Successfully" });
          //   } else {
          //     res.json({ status: true, respMesg: "Email Sent Successfully" });
          //   }
          //   // console.log("Email.sent")
          // });
          models.user
            .create(registerData)
            .then((result) => {
              const id = result.id;
              const number = "U" + id;
              models.user.update(
                { user_id: number },
                { where: { id: id, status: 0 } }
              );
              const hosData = {
                hname: req.body.hname,
                user_id: id,
              };
              models.Hospital.create(hosData, { where: { id: id } }).then(
                (result) => {
                  const hos_id = result.id;
                  const number = "H" + hos_id;
                  models.Hospital.update(
                    { hosp_id: number },
                    { where: { id: hos_id } }
                  );
                  //     const hospital_id=result.id
                  //     console.log(hospital_id)
                  //  models.user.update({hospital_id:hospital_id}, {where: { id: hos_id} })

                  //     .then(
                  //       (result) => {
                  //         console.log(result)
                  //       })
                  // data.then(function (result) {
                  //   console.log(result.id)
                  // })
                }
              );
              res.status(201).json({
                message: "Register successful",
                post: result.id,
              });
            })
            .catch((error) => {
              req.status(500).json({
                message: "something went wrong",
                post: error,
              });
            });
        });
      });
    }
  });
}

function getLoginDetails(req, res) {
  const id = req.params.id;
  models.user
    .findByPk(id, {
      include: [
        {
          model: Hospital,
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

function getOneUser(req, res) {
  const id = req.params.id;
  models.user
    .findByPk(id)
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

function geteUpdateUserProfile(req, res) {
  const id = req.params.id;
  const updatUserData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };
  // console.log(updatUserData);
  const status = 0;
  models.user
    .update(updatUserData, { where: { id: id, status: status } })
    .then((result) => {
      // console.log(result);
      res.status(200).json({
        // up/datUserData
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



// function getSendPasswordLink(req, res) {
// var getSendPasswordLink = async (req, res, next) => {
//   const { email } = req.body;

//   if (!email) {
//     res.status(401).json({ status: 401, message: "Enter Your Email" });
//   }

//   try {
//     const userfind = await user.findOne({where:{ email: email }});
//     // console.log(userfind)
//     const token = jwt.sign(
//       {
//         email: userfind.email,
//         id: userfind.id,
//       },
//       "secret"
//     );

//     const id = userfind.id;
//     const setusertoken = await user.update({ token: token }, { where: { id: id } } );
//         console.log(email)
//     if (setusertoken) {
//       const mailOptions = {
//         from: creds.auth.user,
//         to: email,
//         subject: "Sending Email For password Reset",
//         // text: `This Link Valid For 2 MINUTES http://localhost:3000/#/UpdatePassword`,
//         html: `
//         <div style="padding:10px;border-style: ridge">
//         <p>You have a new contact request.</p>
//         <h3>Contact Details</h3>
//         <a href="http://petsoftwareweb.regenapps.com/#/UpdatePassword">This Link Valid For 2 MINUTES </a> `
//       };
//       // <a href="http://localhost:3000/#/UpdatePassword">This Link Valid For 2 MINUTES </a>
//       // http://petsoftwareweb.regenapps.com/#/UpdatePassword
//       console.log(mailOptions)
//       // We have received a request to reset the password of your PetSoftware account.
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log("error", error);
//           res.status(401).json({ status: 401, message: "email not send" });
//         } else {
//           console.log("Email sent");
//           res.status(201).json({
//             status: 201,
//             message: "Email sent Succsfully",
//             token: token,
//             id: id,
//           });
//         }
//       });
//     }
//   } catch (error) {
//     res.status(401).json({ status: 401, message: "invalid user" });
//   }
// };

function  getSendPasswordLink (req, res) {
  models.user.findOne({ where: { email: req.body.email } }).then((result) => {
    // console.log(result);
    if (!result) {

      res.status(401).json({
        message: "invalid email!",
        // message2: "password already exists!",
      });
    } 
    else {
      // const token = jwt.sign(
      //         {
      //           email: result.email,
      //           id: result.id,
      //         },
      //         "secret"
      //       );
      //       console.log(token);
            const id = result.id;
            const email=result.email;
            // models.user.update({ token: token }, { where: { id: id } } );
            const mailOptions = {
                      from: creds.auth.user,
                      to: email,
                      subject: "Sending Email For password Reset",
                      // text: `This Link Valid For 2 MINUTES http://localhost:3000/#/UpdatePassword`,
                      html: `
                      <div style="padding:10px;border-style: ridge">
                      <p>You have a new contact request.</p>
                      <h3>Contact Details</h3>
                      <a href="http://petsoftwareweb.regenapps.com/#/UpdatePassword">This Link Valid For 2 MINUTES </a> `
                    };
                   
                    transporter.sendMail(mailOptions, function (error, info) {
                      if (error) {
                        res.json({ status: true, respMesg: "Email Sent Successfully" });
                      } else {
                        res.json({ status: true, respMesg: "Email Sent Successfully" });
                      }
                      // console.log("Email.sent")
                    });
                    res.status(201).json({
                    status: 201,
                    message: "Email sent Succsfully",
                    id: id,
                  });  
    }
  })
}

// function getVerifyPassword(req, res) {
var getVerifyPassword = async (req, res, next) => {
  const id = req.params.id;
  // const token = req.params.token;
  try {
    const validuser = await user.findOne({_id:id});
    // console.log(validuser);
    // const verifyToken = jwt.verify(token, keysecret);

    // console.log(verifyToken)

    if(validuser ){
        res.status(201).json({status:201,validuser})
    }else{
        res.status(401).json({status:401,message:"user not exist"})
    }

} catch (error) {
    res.status(401).json({status:401,message: "invalid user"})
}
}


// function getUpdatePassword (req, res) {
var getUpdatePassword = async (req, res, next) => {
  const id = req.params.id;

  // var token = req.params.token;
  var password = req.body.password;
  try {
    const validuser = await user.findOne({ id: id });

    if(validuser){
        const newpassword = await bcryptjs.hash(password,12);
        // bcryptjs.genSalt(10, function (err, salt) {
          // const newpassword = await  bcryptjs.hash(req.body.password, salt, function (err, hash) {
            // console.log(newpassword);

          // })
        // })
        const setnewuserpass = await user.update({password:newpassword}, {where:{id:id}});

        // setnewuserpass.save();
        res.status(201).json({status:201,setnewuserpass})

    }else{
        res.status(401).json({status:401,message:"user not exist"})
    }
  } 
  catch (error) {
    res.status(401).json({ status: 401, error });
  }
}

module.exports = {
  getLogin: getLogin,
  getUser: getUser,
  getLoginDetails: getLoginDetails,
  getOneUser: getOneUser,
  geteUpdateUserProfile: geteUpdateUserProfile,
  getSendPasswordLink: getSendPasswordLink,
  getUpdatePassword: getUpdatePassword,
  getVerifyPassword:getVerifyPassword
};
