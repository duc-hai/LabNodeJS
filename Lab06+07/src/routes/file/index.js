const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/file.controller');
const upload = require('../../middlewares/multer')

// Define your file routes here
// E.g:
//router.get('/', fileController.get);
router.get('/download/:name', fileController.download)
router.get('/remove/:fileName', fileController.remove)
router.post('/create', fileController.create)
router.post('/rename', fileController.rename)
router.get('/newFolder/:name', fileController.newFolder)
router.get('/folder/:name', fileController.folder)
router.post('/upload', upload.single('file'), fileController.uploadFile)

module.exports = router;