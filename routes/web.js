const express = require('express');
// const fetch = require('node-fetch');
const router = express.Router();
const imageController =require('../controller/image.controller');
const imageUploader = require('../helpers/image-uploader');
const loginController = require('../controller/login.controller');
const opdIpdController = require('../controller/opd_ipd.controller');
const doctorController = require('../controller/doctor.controller');
const patientController = require('../controller/patient.controller');
const bedController = require('../controller/bed.controller');
const appointmentController = require('../controller/appointment.controller');
const medicineController=require('../controller/medicine.controller');
const prescriptionController=require('../controller/prescription.controller');
const ipdController=require('../controller/ipd.controller');
const healthreportController=require('../controller/healthreport.controller');
const deathreportController=require('../controller/deathreport.controller');
const consentController=require('../controller/consent.controller');
const caseManagerController=require('../controller/caseManager.controller');
const documentsController=require('../controller/documents.controller');
const fileuploadController = require('../controller/fileupload.controller');
const userManagment=require('../controller/userManagment.controller');
const clinicManagment=require('../controller/clinicManagment.controller');

const hospitalController=require('../controller/hospital.controller');

router.post('/add-hospital', hospitalController.getAddHospital);
router.get('/all-hospital-name', hospitalController.getAllHospitalName);


router.post('/login', loginController.getLogin);
router.post('/user', loginController.getUser);
router.get('/user-details/:id',loginController.getLoginDetails);
router.get('/get-one-user/:id',loginController.getOneUser);
router.post('/update-user-profile/:id',loginController.geteUpdateUserProfile);
router.post('/sendpasswordlink',loginController.getSendPasswordLink);
router.post('/verifypassword/:id',loginController.getVerifyPassword);
router.post('/updatepassword/:id',loginController.getUpdatePassword);

//OPD ipd controller Path

router.post('/addpatient',opdIpdController.getAddOpdPatient);
router.post('/updatepatient/:id',opdIpdController.geteUpdatePatient);
router.post('/opdAddMore-updatepatient/:id',opdIpdController.getOpdAddMoreUpdatePatient);
router.get('/get-all-opdPatient/:id', opdIpdController.getAllOpdPatient);
router.post('/delete-opdpatient/:id', opdIpdController.getDeleteOpdPatient);
router.get('/get-one-opd/:id',opdIpdController.getOneOpd);
router.get('/get-master-gender',opdIpdController.getMsaterGender);
router.get('/get-master-breed',opdIpdController.getMsaterBreed);
router.get('/get-master-color',opdIpdController.getMsaterColor);
router.get('/get-master-city',opdIpdController.getMsaterCity);
router.get('/get-master-state',opdIpdController.getMsaterState);
router.get('/get-master-species',opdIpdController.getMsaterSpecies);
router.post('/get-opdAddMore-paitent/:id',opdIpdController.getOpdAddMorePaitent);
router.get('/get-opdAddMore/:id',opdIpdController.getOpdPatientMore);
router.get('/get-opd-ipdAddMore/:id',opdIpdController.getOpdIpdPatientMore);
router.get('/get-getOneOpdDemo/:id',opdIpdController.getOneOpdDemo);
router.get('/total-opd-patient/:id',opdIpdController.getTotalCountOpd);
router.post('/delete-opd-morepatient/:id',opdIpdController.getDeleteOpdMorePatient); 
router.get('/get-multiple-img/:id',opdIpdController.getMultipleImg); 
router.get('/get-upload-report',opdIpdController.getUploadReport); 
router.get('/get-one-upload-report/:id',opdIpdController.getOneUploadReport); 
router.get('/get-uploadreport-editpage/:id',opdIpdController.getUploadReportEditPage); 
router.post('/deletepatient-report/:id',opdIpdController.getDeletePaitentReport);

router.post('/add-ipd', opdIpdController.getAddIpd);
router.post('/update-ipd/:id', opdIpdController.getUpdateIpd);
router.get('/get-all-ipd/:id', opdIpdController.getAllIpd);
router.get('/get-one-ipd/:id',opdIpdController.getOneIpd);
router.post('/delete-ipd/:id',opdIpdController.getDeleteIpd);
router.get('/ipd-category',opdIpdController.getMasterIpdCategory);
router.post('/get-ipdAddMore-paitent/:id',opdIpdController.getIpdAddMore);
router.post('/get-ipdAddMore-updatepaitent/:id',opdIpdController.getIpdAddMoreUpdatePaitent);
router.get('/get-ipdAddMore/:id',opdIpdController.getIpdPatientMore);
router.get('/get-one-info-ipd/:id',opdIpdController.getOneInfoIpd);
router.get('/total-ipd-patient/:id',opdIpdController.getTotalCountIpd);
router.post('/delete-ipdmore-patient/:id',opdIpdController.getDeleteIpdMorePaitent);
router.get('/get-multiple-images/:id',opdIpdController.getMultipleimage);
router.post('/delete-mulimg/:id',opdIpdController.getDeleteMultipleImg);
router.get('/get-master-age',opdIpdController.getMasterAge);
router.get('/get-patient-history/:id',opdIpdController.getPatientHistory);
router.get('/demoString',opdIpdController.DemoString);
router.get('/get-all-patient/:id', opdIpdController.getAllPatient);
router.get('/get-all-ipdpatient/:id',opdIpdController.getAllIpdPatient);
router.post('/get-ipdpatient-active/:id',opdIpdController.getIpdPatientActive);
router.post('/get-updatebedid-onactivepage/:id',opdIpdController.getUpdateIdOnActivePage);
router.get('/get-casetable-caseid/:id',opdIpdController.getCaseTableCaseId);
router.get('/find-bed-ward/:id',opdIpdController.getFindBedWard);
router.get('/get-info-ptient-history/:id',opdIpdController.getInfoPatientHistory);

// router.get('/demo',opdIpdController.getDemo);

// doctor conroller path 

// router.post('/adddoctor',doctorController.getAddDoctor);
router.post('/updatedoctor/:id',doctorController.geteUpdateDoctor);
router.get('/get-all-doctor/:id',doctorController.getAllDoctor);
router.get('/get-one-doctor/:id',doctorController.getOneDoctor);
router.post('/delete-doctor/:id',doctorController.getDeleteDoctor);
router.get('/get-doctor-Treatment/:id',doctorController.getDoctorTreatmentHistory);
router.get('/get-master-department',doctorController.getMasterDepartment);
router.get('/get-one-info-doctor/:id',doctorController.getOneInfoDoctor);
router.get('/doctor-appointment/:id',doctorController.getDoctorAppointment);
router.get('/docappointment-paitentdetails/:id',doctorController.getDocApaitdetails);

// patient conroller path
// router.post('/add-patient', patientController.getAddPatient);
router.post('/update-patient/:id', patientController.getUpdatePatient);
router.get('/patient-all-doctor', patientController.getAllDoctorName);

router.get('/get-one-patient/:id',patientController.getOnePatient);
router.post('/delete-patient/:id',patientController.getDeletePatient);
router.get('/get-master-bloodgroup',patientController.getMasterBloodGroup);
router.get('/get-one-info-patient/:id',patientController.getOneInfoPatient);
router.get('/total-patient/:id',patientController.getTotalPatientcount);
router.get('/get-master-addedfrom',patientController.getMasterAddedfrom);

// medicine conroller path
router.post('/add-medicine', medicineController.getAddMedicine);
router.post('/update-medicine/:id', medicineController.getUpdateMedicine);
router.get('/get-all-medicine/:id', medicineController.getAllMedicine);
router.get('/get-one-medicine/:id',medicineController.getOneMedicine);
router.post('/delete-medicine/:id',medicineController.getDeleteMedicine);
router.get('/get-master-category',medicineController.getMasterCategory);
router.post('/add-master-category',medicineController.getAddMasterCategory);
router.post('/update-master-category/:id',medicineController.getUpdateMasterCategory);
router.post('/delete-master-category/:id',medicineController.getdeleteMasterCategory);
router.get('/get-one-master-category/:id',medicineController.getOneMasterCategory);
router.get('/get-one-infomedicine/:id',medicineController.getOneInfoMedicine);

// prescription conroller path
router.get('/get-all-prescription/:id', prescriptionController.getAllPrescription);
router.get('/get-all-prescription-patient/:id', prescriptionController.getAddPrescriptionPatient);
router.post('/add-prescription', prescriptionController.getAddPrescription);
router.post('/update-prescription/:id', prescriptionController.getUpdatePrescription);
router.get('/get-one-prescription/:id',prescriptionController.getOnePrescription);
router.post('/delete-prescription/:id',prescriptionController.getDeletePrescription);
router.get('/get-one-info-prescription/:id',prescriptionController.getOneinfoPrescription);

// health report conroller path
router.post('/add-health-report/:id', healthreportController.getAddHealthReport);
router.post('/update-health-report/:id', healthreportController.geteUpdateHealthReport);
router.get('/get-all-health-report/:id', healthreportController.getAllHealthReport);
router.get('/get-one-health-report/:id',healthreportController.getOneHealthReport);
router.get('/get-one-infohealth-report/:id',healthreportController.getOneInfoHealthReport);
router.post('/delete-health-report/:id',healthreportController.getDeleteHealthReport);
router.get('/patient-health-report/:id',healthreportController.getPatientHealthReport);
router.get('/get-ipdOpd-healthreport/:id',healthreportController.getIpdOpdHealthReport);
// consent conroller path
router.post('/add-consent', consentController.getAddConsent);
router.post('/update-consent/:id', consentController.geteUpdateConsent);
router.get('/get-all-consent/:id', consentController.getAllConsent);
router.get('/get-one-consent/:id',consentController.getOneConsent);
router.get('/get-one-info-consent/:id',consentController.getOneInfoConsent);
router.post('/delete-consent/:id',consentController.getDeleteConsent);

// death report conroller path
router.post('/add-death-report/:id', deathreportController.getAddDeathReport);
router.post('/update-death-report/:id', deathreportController.geteUpdateDeathReport);
router.get('/get-all-death-report/:id', deathreportController.getAllDeathReport);
router.get('/get-one-death-report/:id',deathreportController.getOneDeathReport);
router.get('/get-one-infodeath-report/:id',deathreportController.getOneInfoDeathReport);
router.post('/delete-death-report/:id',deathreportController.getDeleteDeathReport);
router.get('/patient-death-report/:id',deathreportController.getDeathHealthReport);
router.get('/get-ipdOpd-Deathreport/:id',deathreportController.getIpdOpdDeathReport);
// Appoinment controller path
router.post('/add-appointment', appointmentController.getAddAppointment);
router.post('/update-appointment/:id', appointmentController.getUpdateAppointment);
router.get('/get-all-appointment/:id', appointmentController.getAllAppointment);
router.get('/get-one-appointment/:id',appointmentController.getOneAppointment);
router.post('/delete-appointment/:id',appointmentController.getDeleteAppointment);
router.get('/get-master-appointment-status',appointmentController.getMasterAppointmentStatus);
router.get('/get-master-appointment-slots',appointmentController.getMasterAppointmentSlots);
router.get('/get-all-patient-name/:id',appointmentController.getAllPatientName);
router.get('/get-all-todays-appointment/:id',appointmentController.getAllTodaysAppointment);
router.get('/get-all-upcoming-appointment/:id',appointmentController.getAllUpcomingAppointment);
router.get('/get-one-info-appointment/:id',appointmentController.getOneInfoAppointment);
router.get('/todays-appointment-count/:id',appointmentController.getTodaysAppointmentCount);
router.get('/appointment-date-slot',appointmentController.getAppointmentDateSlot);

//Bed Controler path

router.post('/addbed',bedController.getAddbed);
router.post('/updatebed/:id',bedController.getUpdateBed);
router.get('/get-all-Bed/:id',bedController.getAllBed); 
router.get('/get-Bed-Data/:id',bedController.getBedData); 
router.get('/get-one-Bed/:id',bedController.getOneBed);
router.post('/delete-Bed/:id',bedController.getDeleteBed);
// router.get('/getmaster-bedid', bedController.getMasterBedId)
router.get('/get-cageid/:id',bedController.getAllCageId);
router.get('/get-totalava-bednumber/:id',bedController.getTotalAvabednumber);
router.post('/get-openclose-bednumber/:id',bedController.getOpenClosebednum);
router.get('/get-wardnumber/:id',bedController.getWardnumber);

router.post('/addbedcategory',bedController.getAddbedCategory);
router.get('/get-one-bed-category/:id',bedController.getOneBedCategory);
router.get('/get-master-bed-category/:id',bedController.getMasterBedCategory);
router.post('/update-bed-category/:id',bedController.getUpdateBedCategory);
router.post('/delete-bed-category/:id',bedController.getDeleteBedCategory);

router.post('/addbedallotment',bedController.getAddbedAllotment);
router.post('/delete-bed-allotment/:id',bedController.getDeleteBedAllotment);
router.get('/get-All-bed-allotment',bedController.getAllBedAllotment);
router.get('/get-one-bed-allotment/:id',bedController.getOneBedAllotment);
router.post('/update-All-bed-allotment/:id',bedController.getUpdateAllbedallotment);
router.get('/get-master-wardnumber',bedController.getMsaterWardNumber);
//case manager path
router.post('/addcase',caseManagerController.getCaseManager);
router.post('/updatecase/:id',caseManagerController.getUpdateCase);
router.get('/get-all-case/:id',caseManagerController.getAllCase);
router.get('/get-one-case/:id',caseManagerController.getOneCaseId);
router.post('/delete-addcase/:id',caseManagerController.getDeleteAddcase);
router.get('/get-one-info-case/:id',caseManagerController.getOneInfoCaseId);

//Documents path
router.post('/adddocuments',documentsController.getAddDocuments);
router.post('/updatedocuments/:id',documentsController.getUpdateDocuments);
router.get('/get-all-documents/:id',documentsController.getAllDocuments);
router.get('/get-one-document/:id',documentsController.getOneDocument);
router.post('/delete-document/:id',documentsController.getDeleteDocument);

//images route
router.post('/upload',imageUploader.upload.single('profile'),imageController.upload);
router.post('/addProduct', fileuploadController.upload , fileuploadController.addProduct);
router.post('/uploadS3', fileuploadController.upload , fileuploadController.uploadS3);
router.post('/uploadmultiple/:id', fileuploadController.uploadmultiple , fileuploadController.uploadMultiple);
router.post('/adddoctor', fileuploadController.uploaddoctor , fileuploadController.addDoctor);
router.post('/add-patient', fileuploadController.uploadpatient , fileuploadController.getAddPatient);
router.post('/add-user-profile/:id', fileuploadController.uploadUserProfile , fileuploadController.getAddUserProfile);
router.post('/add-user-doctor-profile/:id', fileuploadController.uploadUserDoctorProfile , fileuploadController.getAddUserDoctorProfile);
// router.post('/add-user-profile/:id', fileuploadController.uploadUserProfile , fileuploadController.getAddUserProfile);

router.post('/update-doctor-demo/:id',fileuploadController.uploadDoctorProfile,fileuploadController.getUpdateDoctor);
router.post('/update-patient-demo/:id',fileuploadController.uploadPatientProfile,fileuploadController.getUpdatepatient);
router.post('/addOpdimg/:id', fileuploadController.uploadOpdimg , fileuploadController.addOpdmg);
router.post('/addIpdimg/:id', fileuploadController.uploadIpdimg , fileuploadController.addIpdmg);
router.post('/get-add-upload-report/:id',fileuploadController.uploadReport, fileuploadController.getAddUploadReport); 
 
router.post('/add-usermanagment',userManagment.getAddNewUserManagment);
router.post('/update-usermanagment/:id',userManagment.getUpdateUserManagment);
router.get('/getone-usermanagment/:id',userManagment.getOneUserManagment);
router.get('/getall-usermanagment/:id',userManagment.getAllUserManagment);
router.post('/delete-usermanagment/:id',userManagment.getDeleteUserManagment);
router.get('/master-userrole',userManagment.getmasterUserRole);
router.get('/clinic-hospital-usermanagment/:id',userManagment.getClinicHosUserM);
router.post('/update-clinichos-usermanagment/:id',userManagment.getUpdateclinichosMan);
router.get('/get-all-doctor-user/:id',userManagment.getAllDoctorUser);


router.post('/add-clinicmanagment',clinicManagment.getAddclinicManagment);
router.post('/update-clinicmanagment/:id',clinicManagment.getUpdateclinicManagment);
router.get('/getone-clinicmanagment/:id',clinicManagment.getOneclinicManagment);
router.get('/getall-clinicmanagment',clinicManagment.getAllclinicManagment);
router.post('/delete-clinicmanagment/:id',clinicManagment.getDeleteclinicManagment);

module.exports = router;