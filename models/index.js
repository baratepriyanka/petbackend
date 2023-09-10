'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const db = {};
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
.readdirSync(__dirname)
.filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// const Categories = Product.hasMany(Tag, { as: 'categories' });
db.Hospital=require("./hospital.js")(sequelize,Sequelize.DataTypes);
db.MasterUserRoles=require("./MasterUserRoles.js")(sequelize,Sequelize.DataTypes);
db.ClinicManagment=require("./ClinicManagment.js")(sequelize,Sequelize.DataTypes);
db.UserManagment=require("./UserManagment.js")(sequelize,Sequelize.DataTypes);
db.user=require("./User.js")(sequelize,Sequelize.DataTypes);
db.OpdPatient=require("./opd.js")(sequelize,Sequelize.DataTypes);
db.OpdPatientMore=require("./OpdPatientMore.js")(sequelize,Sequelize.DataTypes);
db.ipdPatientMore=require("./ipdpatientmore.js")(sequelize,Sequelize.DataTypes);
db.MasterGender=require("./MasterGender.js")(sequelize,Sequelize.DataTypes);
db.MasterState=require("./MasterState.js")(sequelize,Sequelize.DataTypes);
db.products = require('./documents.js')(sequelize, Sequelize.DataTypes);
db.MasterSpecies = require('./MasterSpecies.js')(sequelize, Sequelize.DataTypes);
db.MasterBreed = require('./MasterBreed.js')(sequelize, Sequelize.DataTypes);
db.MasterColor = require('./MasterColor.js')(sequelize, Sequelize.DataTypes)
db.MasterGender = require('./MasterGender.js')(sequelize, Sequelize.DataTypes)
db.MasterCities = require('./MasterCities.js')(sequelize, Sequelize.DataTypes)
db.Ipd = require('./ipd.js')(sequelize, Sequelize.DataTypes)
db.MasterIpdCategory = require('./MasterIpdCategory.js')(sequelize, Sequelize.DataTypes)
db.Appointment = require('./Appointment.js')(sequelize, Sequelize.DataTypes)
db.MasterAvaliableSlots = require('./MasterAvaliableSlots.js')(sequelize, Sequelize.DataTypes)
db.MasterAppointmentStatus = require('./MasterAppointmentStatus.js')(sequelize, Sequelize.DataTypes)
db.Prescription = require('./prescription.js')(sequelize, Sequelize.DataTypes)
db.Medicine = require('./medicine.js')(sequelize, Sequelize.DataTypes)
db.MasterCategory = require('./MasterCategory.js')(sequelize, Sequelize.DataTypes)
db.Patient = require('./Patient.js')(sequelize, Sequelize.DataTypes)
// db.Patient = require("./Patient")(sequelize,Sequelize.DataTypes)
db.MasterBloodGroups =require("./MasterBloodGroups")(sequelize,Sequelize.DataTypes)
db.MasterDepartment = require('./MasterDepartment.js')(sequelize, Sequelize.DataTypes)
db.Doctor=require("./Doctor")(sequelize,Sequelize.DataTypes)
db.CaseManager=require("./casemanager")(sequelize,Sequelize.DataTypes)
db.Consent=require("./consent")(sequelize,Sequelize.DataTypes)
db.HealthReport=require("./healthreport")(sequelize,Sequelize.DataTypes)
db.DeathReport=require("./deathreport")(sequelize,Sequelize.DataTypes)
db.Bed=require("./Bed")(sequelize,Sequelize.DataTypes)
db.BedAllotment=require("./bedallotment")(sequelize,Sequelize.DataTypes)
db.MasterBedCategories=require("./MasterBedCategories")(sequelize,Sequelize.DataTypes)
// db.MasterWardNumber = require("./MasterWardNumber")(sequelize,Sequelize.DataTypes)
db.Images=require("./images")(sequelize,Sequelize.DataTypes)
db.UploadReport=require("./UploadReport")(sequelize,Sequelize.DataTypes)
db.ReationOpdIpd=require("./ReationOpd_Ipd")(sequelize,Sequelize.DataTypes)
db.MasterAge=require("./MasterAge")(sequelize,Sequelize.DataTypes)
db.opdIpdPatMediaType=require("./opd_ipd_patient_media_type")(sequelize,Sequelize.DataTypes)
db.MasterWardNumber=require("./MasterWardNumber")(sequelize,Sequelize.DataTypes)
db.opdIpd=require("./opd_Ipd")(sequelize,Sequelize.DataTypes)
db.WardCategory=require("./WardCategory")(sequelize,Sequelize.DataTypes);
db.CaseTable=require("./CaseTable")(sequelize,Sequelize.DataTypes);



db.Appointment.belongsTo(db.user ,{foreignKey:"user_id"});
db.user.hasMany(db.Appointment,{foreignKey:"user_id"});

db.Patient.hasMany(db.HealthReport ,{foreignKey:"patient_id"});
db.HealthReport.belongsTo(db.Patient,{foreignKey:"patient_id"});

db.HealthReport.belongsTo(db.CaseTable ,{foreignKey:"case_id"});
db.CaseTable.hasMany(db.HealthReport,{foreignKey:"case_id"});
db.opdIpd.belongsTo(db.CaseTable ,{foreignKey:"case_id"});
db.CaseTable.hasMany(db.opdIpd,{foreignKey:"case_id"});

db.Patient.hasMany(db.CaseTable ,{foreignKey:"patient_id"});
db.CaseTable.belongsTo(db.Patient,{foreignKey:"patient_id"});

db.Patient.hasMany(db.DeathReport ,{foreignKey:"patient_id"});
db.DeathReport.belongsTo(db.Patient,{foreignKey:"patient_id"});

db.Patient.belongsTo(db.MasterAge ,{foreignKey:"age"});
db.MasterAge.hasMany(db.Patient,{foreignKey:"age"});
db.Patient.hasMany(db.opdIpdPatMediaType,{foreignKey:"patient_id"});
db.opdIpdPatMediaType.belongsTo(db.Patient,{foreignKey:"patient_id"});

db.Hospital.belongsTo(db.user ,{foreignKey:"user_id"});
db.user.hasOne(db.Hospital,{foreignKey:"user_id"});
db.WardCategory.hasMany(db.Bed,{foreignKey:"ward_no"});
db.Bed.belongsTo(db.WardCategory,{foreignKey:"ward_no"});

db.Bed.belongsTo(db.MasterBedCategories,{foreignKey:"bedcategory"});
db.MasterBedCategories.hasMany(db.Bed,{foreignKey:"bedcategory"});

db.BedAllotment.belongsTo(db.Patient,{foreignKey:"patient"});
db.Patient.hasMany(db.BedAllotment,{foreignKey:"patient"});

db.Consent.belongsTo(db.MasterGender ,{foreignKey:"genderid"});
db.MasterGender.hasMany(db.Consent,{foreignKey:"genderid"});

db.Consent.belongsTo(db.MasterBreed ,{foreignKey:"breed"});
db.MasterBreed.hasMany(db.Consent,{foreignKey:"breed"});

db.Consent.belongsTo(db.MasterSpecies ,{foreignKey:"species"});
db.MasterSpecies.hasMany(db.Consent,{foreignKey:"species"});

db.Consent.belongsTo(db.MasterColor ,{foreignKey:"color"});
db.MasterColor.hasMany(db.Consent,{foreignKey:"color"});

db.CaseManager.belongsTo(db.Patient ,{foreignKey:"patient"});
db.Patient.hasMany(db.CaseManager,{foreignKey:"patient"});

db.Medicine.belongsTo(db.MasterCategory ,{foreignKey:"category"});
db.MasterCategory.hasMany(db.Medicine,{foreignKey:"category"});

// opdpaitents

db.Patient.belongsTo(db.MasterState ,{foreignKey:"state"});
db.MasterState.hasMany(db.Patient,{foreignKey:"state"});

db.Patient.belongsTo(db.MasterSpecies ,{foreignKey:"species"});
db.MasterSpecies.hasMany(db.Patient,{foreignKey:"species"});

db.Patient.belongsTo(db.WardCategory ,{foreignKey:"ward_no"});
db.WardCategory.hasMany(db.Patient,{foreignKey:"ward_no"});

db.Patient.belongsTo(db.MasterBreed ,{foreignKey:"breed"});
db.MasterBreed.hasMany(db.Patient,{foreignKey:"breed"});

db.Patient.belongsTo(db.MasterColor ,{foreignKey:"color"});
db.MasterColor.hasMany(db.Patient,{foreignKey:"color"});

db.Patient.belongsTo(db.MasterCities ,{foreignKey:"city"});
db.MasterCities.hasMany(db.Patient,{foreignKey:"city"});

db.Patient.hasMany(db.OpdPatientMore,{foreignKey:"opdId"});
db.OpdPatientMore.belongsTo(db.Patient,{foreignKey:"opdId"});

db.Bed.hasMany(db.Patient,{foreignKey:"cage_id"});
db.Patient.belongsTo(db.Bed,{foreignKey:"cage_id"});

db.MasterWardNumber.hasMany(db.Bed,{foreignKey:"ward_no"});
db.Bed.belongsTo(db.MasterWardNumber,{foreignKey:"ward_no"});

// ipdpaitent
db.Patient.belongsTo(db.MasterIpdCategory ,{foreignKey:"category"});
db.MasterIpdCategory.hasMany(db.Patient,{foreignKey:"category"});

db.Ipd.belongsTo(db.MasterBreed ,{foreignKey:"breed"});
db.MasterBreed.hasMany(db.Ipd,{foreignKey:"breed"});

db.Ipd.belongsTo(db.MasterSpecies ,{foreignKey:"species"});
db.MasterSpecies.hasMany(db.Ipd,{foreignKey:"species"});

db.Ipd.belongsTo(db.MasterGender ,{foreignKey:"gender"});
db.MasterGender.hasMany(db.Ipd,{foreignKey:"gender"});

db.Ipd.belongsTo(db.MasterColor ,{foreignKey:"color"});
db.MasterColor.hasMany(db.Ipd,{foreignKey:"color"});

// appoinment

db.Appointment.belongsTo(db.Hospital ,{foreignKey:"hospital_id"});
db.Hospital.hasOne(db.Appointment,{foreignKey:"hospital_id"});
// db.Appointment.belongsTo(db.Doctor ,{foreignKey:"doctor"});
// db.Doctor.hasMany(db.Appointment,{foreignKey:"doctor"});

db.Appointment.belongsTo(db.Patient ,{foreignKey:"patient"});
db.Patient.hasMany(db.Appointment,{foreignKey:"patient"});

db.Appointment.belongsTo(db.MasterAvaliableSlots ,{foreignKey:"available_slot"});
db.MasterAvaliableSlots.hasMany(db.Appointment,{foreignKey:"available_slot"});

db.Appointment.belongsTo(db.MasterAppointmentStatus ,{foreignKey:"appointment_status"});
db.MasterAppointmentStatus.hasMany(db.Appointment,{foreignKey:"appointment_status"});

db.Prescription.belongsTo(db.Doctor ,{foreignKey:"doctorid"});
db.Doctor.hasMany(db.Prescription,{foreignKey:"doctorid"});

db.Prescription.belongsTo(db.Patient ,{foreignKey:"patientid"});
db.Patient.hasMany(db.Prescription,{foreignKey:"patientid"});

db.Prescription.belongsTo(db.Medicine ,{foreignKey:"medicineid"});
db.Medicine.hasMany(db.Prescription,{foreignKey:"medicineid"});

db.Doctor.belongsTo(db.MasterDepartment ,{foreignKey:"department"});
db.MasterDepartment.hasMany(db.Doctor,{foreignKey:"department"});

db.Patient.belongsTo(db.MasterBloodGroups ,{foreignKey:"bloodgroup"});
db.MasterBloodGroups.hasMany(db.Patient,{foreignKey:"bloodgroup"});

db.Patient.belongsTo(db.Doctor ,{foreignKey:"doctor_id"});
db.Doctor.hasMany(db.Patient,{foreignKey:"doctor_id"});

db.Patient.belongsTo(db.MasterGender ,{foreignKey:"gender"});
db.MasterGender.hasMany(db.Patient,{foreignKey:"gender"});

db.Doctor.hasMany(db.Patient,{foreignKey:"doctor_id"}); //defult id
db.Patient.belongsTo(db.Doctor,{foreignKey:"doctor_id"});

db.Appointment.hasMany(db.MasterAvaliableSlots ,{foreignKey:"avaliable_slotid"});
db.MasterAvaliableSlots.belongsTo(db.Appointment,{foreignKey:"avaliable_slotid"});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
