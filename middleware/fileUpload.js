const multer = require('multer')
const fs = require('fs');
const path = require('path')

const imageStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        const filepath = path.join(__dirname,'..','public');

        if(fs.existsSync(filepath)){
            cb(null,filepath)
        }
        else {
            fs.mkdirSync(filepath)
            cb(err,filepath)
        }
    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req,file,cb) => {
        if(file.mimetype.split('/')[1] == 'png' || file.mimetype.split('/')[1] == 'PNG' || file.mimetype.split('/')[1] == 'jpg' || file.mimetype.split('/')[1] == 'JPG' || file.mimetype.split('/')[1] == 'jpeg' || file.mimetype.split('/')[1] == 'JPEG') {
            cb(null)
        }
        else {
            cb("Only Image type (png,jpg) is allowed to upload")
        }
    }
})

module.exports = { imageUpload }