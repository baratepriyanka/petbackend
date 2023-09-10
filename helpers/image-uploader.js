const multer = require('multer');
// console.log(multer);
// console.log(multer.MulterError);

const path = require('path');

const storage =multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'./uploads');
    },
    filename: function (req,file,cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
const fileFilter =(req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }else {
        cb(new Error("unsupported file"),false);
    }
}
const upload =multer({
    storage:storage,
    limits:{
        fileSize: 1024*1024*10
    },
    fileFilter: fileFilter
});
// console.log(upload);
module.exports =
{ upload:upload
}