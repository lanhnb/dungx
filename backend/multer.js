const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})

//file validation

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true)
    }
    else{
        //orevent the upload
        cb({message:"Khong phai dinh dang file"}, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {fieldSize: 1024 * 1024},
    fileFilter:fileFilter
})
module.exports = upload;