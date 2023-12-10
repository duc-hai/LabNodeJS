const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `src/static/${req.session.idUser}/${req.session.folder}`);
    },
    filename: (req, file, cb) => {
        cb(null , file.originalname)
    },
    fileFilter: (req, file, cb) => {
        console.log(file)
        if (file.size > 5000000) {
            cb(null, false)
        }
        let ext = file.mimetype
        if (ext.includes('.exe') || ext.includes('.msi') || ext.includes('.sh')) {
            cb(null, false)
        }
        cb (null, true)
    }
})

var upload = multer({storage:storage})

module.exports = upload