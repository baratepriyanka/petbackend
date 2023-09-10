// import fetch from "node-fetch";
const models = require("../models");
const multer = require("multer");
const fetch = require("node-fetch");
const awsS3 = require("../config/s3config");
const AWS = require("aws-sdk");
const path = require("path");
const db = require("../models/index");
const Validator = require("fastest-validator");

// create main Model
const Product = db.documents;
const Doctor = db.Doctor;
const Patient = db.Patient;
const User = db.user;
const Images = db.Images;
const opdIpdPatMediaType = db.opdIpdPatMediaType;
// const Review = db.reviews

// main work

// 1. create product
let s3imagelocation;
const uploadS3 = async (filepath, key) => {
  // console.log("filepath:" + filepath);
  AWS.config = new AWS.Config({
    region: awsS3.region,
    accessKeyId: awsS3.accessKeyId,
    secretAccessKey: awsS3.secretAccessKey,
    signatureVersion: "v4",
  });

  const s3 = new AWS.S3();

  const imageURL = "http://localhost:8086/" + filepath;
  const res = await fetch(imageURL);
  const blob = await res.buffer();

  // const imagePath = "../"+filepath;
  // const blob = fs.readFileSync(imagePath)

  const uploadedImage = await s3
    .upload({
      Bucket: awsS3.FILEBUCKET,
      Key: key,
      Body: blob,
      ACL: "public-read",
    })
    .promise();
  // console.log(s3);
  // console.log(filepath,key);
  s3imagelocation = uploadedImage.Location;
  // console.log("uploadedImage.Location:" + uploadedImage.Location);
};

const addProduct = async (req, res) => {
  const productData = {
    document: req.file.path,
    date: req.body.date,
    patient: req.body.patient,
    description: req.body.description,
    hospital_id: req.body.hospital_id,
    status: 0,
  };

  const schema = {
    patient: { type: "string", optional: false },
    date: { type: "string", optional: false },
    description: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(productData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  const product = await Product.create(productData);
  await uploadS3(productData.document, productData.document);

  if (product) {
    let productData1 = {
      s3image: s3imagelocation,
    };

    const status = 0;
    const id = product.id;
    // console.log("patient.id:" + product.id);

    const product1 = await Product.update(productData1, {
      where: { id: id, status: status },
    });
    // console.log("product1:" + product1);
    // await uploadS3(info.image,info.image);
    res.status(200).send(product1);
  }
};

const addDoctor = async (req, res) => {
  //    const image= req.file.path;
  const addDoctor = {
    doctor_name: req.body.doctor_name,
    address: req.body.address,
    password: req.body.password,
    email: req.body.email,
    phone: req.body.phone,
    department: req.body.department,
    hospital_id: req.body.hospital_id,
    profile: req.file.path,
    status: 0,
  };
  const schema = {
    doctor_name: { type: "string", optional: false },
    address: { type: "string", optional: false },
    password: { type: "string", optional: false },
    email: { type: "string", optional: false },
    phone: { type: "string", optional: false },
    department: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(addDoctor, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  const doctor = await Doctor.create(addDoctor);

  await uploadS3(addDoctor.profile, addDoctor.profile);
  // res.status(200).send(doctor)

  if (doctor) {
    let doctorData1 = {
      s3image: s3imagelocation,
    };

    const status = 0;
    const id = doctor.id;
    // console.log("doctor.id:" + doctor.id);

    const doctor1 = await Doctor.update(doctorData1, {
      where: { id: id, status: status },
    });

    // await uploadS3(info.image,info.image);
    res.status(200).send({
      message: "Image added successfully",
      post: doctor1,
    });
  }
};

const getAddPatient = async (req, res) => {
  //    const image= req.file.path;
  const patientData = {
    profile: req.file.path,
    patient_name: req.body.patient_name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    birthday: req.body.birthday,
    gender: req.body.gender,
    bloodgroup: req.body.bloodgroup,
    doctor_id: req.body.doctor_id,
    s3image: "",
    status: 0,
  };
  const schema = {
    patient_name: { type: "string", optional: false },
    email: { type: "string", optional: false },
    phone: { type: "string", optional: false },
    password: { type: "string", optional: false },
    address: { type: "string", optional: false },
    birthday: { type: "string", optional: false },
    gender: { type: "string", optional: false },
    bloodgroup: { type: "string", optional: false },
  };
  const v = new Validator();
  const validateResponse = v.validate(patientData, schema);
  if (validateResponse !== true) {
    return res.status(400).json({
      message: "Validstion failed",
      errors: validateResponse,
    });
  }
  const patient = await Patient.create(patientData);
  await uploadS3(patientData.profile, patientData.profile);
  // const result = res.status(200).send(patient)
  if (patient) {
    let patientData1 = {
      s3image: s3imagelocation,
    };
    const status = 0;
    const id = patient.id;

    const patient1 = await Patient.update(patientData1, {
      where: { id: id, status: status },
    });
    // console.log("patient1:" + patient1);
    // await uploadS3(info.image,info.image);
    res.status(200).send(patient1);
  }
};

const getAddUserProfile = async (req, res) => {
  const id = req.params.id;
  const userId = {
    profile: req.file.path,
    s3image: "",
  };
  const users = await User.findByPk(id, {
    user2: userId,
  });
  await uploadS3(userId.profile, userId.profile);
  if (users) {
    let userData1 = {
      s3image: s3imagelocation,
    };
    const newId = users.id;
    const status = 0;
    const userImg = await User.update(userData1, {
      where: { id: newId, status: status },
    });
    res.status(200).send({
      message: "Image added successfully",
      post: users.id,
    });
  }
};

const getUpdateDoctor = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const updateDoctorData = {
    profile: req.file.path,
    s3image: "",
  };
  await uploadS3(updateDoctorData.profile, updateDoctorData.profile);
  if (updateDoctorData) {
    let updateDoctor = {
      s3image: s3imagelocation,
    };
    const status = 0;
    const doctorupid = await Doctor.update(updateDoctor, {
      where: { id: id, status: status },
    });
    res.status(200).send({
      message: "Image added successfully",
      post: doctorupid,
    });
  }
};

const getUpdatepatient = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const UpdatepatientData = {
    profile: req.file.path,
    s3image: "",
  };
  await uploadS3(UpdatepatientData.profile, UpdatepatientData.profile);
  if (UpdatepatientData) {
    let updatepatient = {
      s3image: s3imagelocation,
    };
    const status = 0;
    const patientupid = await Patient.update(updatepatient, {
      where: { id: id, status: status },
    });
    res.status(200).send({
      message: "Image added successfully",
      post: patientupid,
    });
  }
};

const addOpdmg = async (req, res) => {
  const id = req.params.id;
  const addOpdimg = {
    profile: req.file.path,
    s3image: " ",
  };
console.log(id +"111111111111111111111");
console.log(addOpdimg+"222222222222222");
  await uploadS3(addOpdimg.profile, addOpdimg.profile);
  console.log(addOpdimg.profile, addOpdimg.profile)
  if (addOpdimg) {
    let opdImg = {
      s3image: s3imagelocation,
    };
    console.log(opdImg+"3333333333333333333");

    const status = 0;
    const patientupid = await Patient.update(opdImg, {
      where: { id: id, status: status, added_from: 0 },
    });
    console.log(patientupid);
    res.status(200).send({
      message: "Image added successfully",
      post: patientupid,
    });
  }
};
const addIpdmg = async (req, res) => {
  const id = req.params.id;
  const addOpdmg = {
    profile: req.file.path,
    s3image: "",
  };
  await uploadS3(addOpdmg.profile, addOpdmg.profile);

  if (addOpdmg) {
    let opdImg = {
      s3image: s3imagelocation,
    };
    const status = 0;
    const patientupid = await Patient.update(opdImg, {
      where: { id: id, status: status, added_from: 2 },
    });
 
    res.status(200).send({
      message: "Image added successfully",
      post: patientupid,
    });
  }
};

const getAddUploadReport = async (req, res) => {
  const Id = req.params.id;

  const caseId = Id;
  const string = `${caseId}`;
  var maxLength = 5;
  var case_id = string.padStart(maxLength, "0");

  const addReportData = {
    patient_id: Id,
    opd_ipd_id: req.body.opd_ipd_id,
    hospital_id: req.body.hospital_id,
    url: req.file.path,
    s3_url: "",
    img_url_type: "",
    case_id: case_id,
  };
  // console.log(addReportData)
  const patientData = await opdIpdPatMediaType.create(addReportData);

  await uploadS3(addReportData.url, addReportData.url);

  const fileExt = patientData.url.split(".")[1];

  if (fileExt == "pdf") {
    // console.log("1")
    if (patientData) {
      let patientimg = {
        s3_url: s3imagelocation,
        img_url_type: 2,
      };

      const status = 0;
      const id = patientData.id;
      const patient1 = await opdIpdPatMediaType.update(
        patientimg,

        {
          where: { id: id, status: status },
        }
      );
      // console.log("patient1:" + patient1);
      // await uploadS3(info.image,info.image);
      res.status(200).send({
        message: "Report added successfully",
        post: patient1,
      });
      //
    }
  } else if (fileExt == "jpg" || fileExt == "png") {
    if (patientData) {
      let patientimg = {
        s3_url: s3imagelocation,
        img_url_type: 1,
      };

      const status = 0;
      const id = patientData.id;
      // console.log(id);
      const patient1 = await opdIpdPatMediaType.update(patientimg, {
        where: { id: id, status: status },
      });
      // console.log("patient1:" + patient1);
      // await uploadS3(info.image,info.image);
      res.status(200).send({
        message: "Report added successfully",
        post: patient1,
      });
    }
  }
};

// const uploadMultiple = async (req, res) => {
//   const id= req.params.id;

//   const  profile1= req.files;
//   // const imageadata=models.Images.create(mulImg,{where:{profileid:id}} )
//   // console.log(imageadata)
//   // await uploadS3(mulImg.profile, mulImg.profile)
//   // if (imageadata) {
//   //   let patientData1 = {
//   //     s3image: s3imagelocation,
//   //   };
//   //   const imgId=imageadata.id
//   //   const status = 0;
//   //   const patientimg = await Images.update(patientData1, {
//   //     where: { profileid:imgId, status:status},
//   //   });
//   //   res.status(200).send({
//   //     message: "Report added successfully",
//   //     post:patientimg});

//   // }
//   const promises = profile1.forEach( async (element ,result) => {
//     // console.log(element.path)
//     const opdMoreData = {
//           profileid: id,
//           profile: element.path,
//           s3image: "",
//        }
//        console.log(opdMoreData)
//     const imageadata=models.Images.create(opdMoreData)
//     await uploadS3(opdMoreData.profile, opdMoreData.profile);
//     if (imageadata) {
//       let patientData1 = {
//         s3image: s3imagelocation,
//       };
//       const status = 0;
//       const patient1 = await Images.update(patientData1, {
//         where: { profileid: id, status:status},
//       });

//       // Promise.all(patient1).then(result)
//       res.status(200).send(patient1);
//     }

//   })

// };
// 8. Upload Image Controller

function uploadMultiple(req, res) {
  // console.log(req.body, 10)
  const id = req.params.id;
  const hospital_id = req.body.hospital_id;
  const caseId = id;
  const string = `${caseId}`;
  var maxLength = 5;
  var case_id = string.padStart(maxLength, "0");

  req.files.forEach((file) => {
    const data = Images.create({
      profile: file.path,
      profileid: id,
      hospital_id: hospital_id,
      case_id: case_id,
    })
      .then(async (response) => {
        await uploadS3(response.profile, response.profile);
        // console.log(data)
        if (response) {
          let patientData = {
            s3image: s3imagelocation,
          };
          const mid = response.id;
          const mulImg = await Images.update(patientData, {
            where: { id: mid, status: 0 },
          });

          res.status(200).send({
            message: "Image added successfully",
            post: mulImg,
          });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Give proper files formate to upload",
          post: error,
        });
      });
  });
}

const getAddUserDoctorProfile = async (req, res) => {
  const id = req.params.id;
  const userDocProfile = {
    profile: req.file.path,
    s3image: "",
  };
  await uploadS3(userDocProfile.profile, userDocProfile.profile);

  if (userDocProfile) { 
    let userProDoc = {
      s3image: s3imagelocation,
    };

    const status = 0;
    const patientupid = await User.update(userProDoc, {
      where: { id: id, status: status },
    });
    res.status(200).send({
      message: "Image added successfully",
      post: patientupid,
    });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("document");

//upload profile for doctor
const uploaddoctor = multer({
  storage: storage,
  limits: { fileSize: "1000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("profile");

//upload profile for patient
const uploadpatient = multer({
  storage: storage,
  limits: { fileSize: "1000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("profile");

//upload profile for User profile
const uploadUserProfile = multer({
  storage: storage,
  limits: { fileSize: "1000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("profile");

//updatedoctorprofile
const uploadDoctorProfile = multer({
  storage: storage,
  limits: { fileSize: "1000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("profile");

//patient update profile
const uploadPatientProfile = multer({
  storage: storage,
  limits: { fileSize: "1000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("profile");

const uploadOpdimg = multer({
  storage: storage,
  limits: { fileSize: "1000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("profile");

const uploadIpdimg = multer({
  storage: storage,
  limits: { fileSize: "1000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("profile");

//multiple upload files
const uploadmultiple = multer({
  storage: storage,
  limits: { fileSize: "5000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).array("profile", 10);

const uploadReport = multer({
  storage: storage,
  limits: { fileSize: "5,000,000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    // console.log(file.originalname.split('.')[1])
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload The minimum file size is 1 MB.");
  },
}).single("url");

const uploadUserDoctorProfile = multer({
  storage: storage,
  limits: { fileSize: "1000000" },

  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("profile");

module.exports = {
  addProduct: addProduct,
  upload: upload,
  addDoctor: addDoctor,
  uploaddoctor: uploaddoctor,
  getAddPatient: getAddPatient,
  uploadpatient: uploadpatient,
  uploadmultiple: uploadmultiple,
  uploadMultiple: uploadMultiple,
  uploadS3: uploadS3,
  uploadUserProfile: uploadUserProfile,
  getAddUserProfile: getAddUserProfile,
  uploadDoctorProfile: uploadDoctorProfile,
  getUpdateDoctor: getUpdateDoctor,
  uploadPatientProfile: uploadPatientProfile,
  getUpdatepatient: getUpdatepatient,
  uploadOpdimg: uploadOpdimg,
  addOpdmg: addOpdmg,
  uploadIpdimg: uploadIpdimg,
  addIpdmg: addIpdmg,
  uploadReport: uploadReport,
  getAddUploadReport: getAddUploadReport,
  uploadUserDoctorProfile,
  getAddUserDoctorProfile,
};
