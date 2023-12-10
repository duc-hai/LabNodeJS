// Define your controllers here
const fs = require('fs')
const fileService = require('../services/file.service')
const JSZip = require('jszip')
//const zip = new JSZip()
const { zip } = require('zip-a-folder');

async function get(req, res, next) {
    try {
        res.json({ success: 'okay' });
    } catch (err) {
        console.error('An error occurred when getting a file', err.message);
        next(err);
    }
}

function downloadZip (res, file) {
    res.download(file + '.zip')
    setTimeout (function () {
        removeFileZip(res, file)
    }, 3000)
}

function removeFileZip (res, file) {
    fs.rmSync(file + '.zip', { recursive: true, force: true })
}

async function download(req, res, next) {
    if (!req.session.folder) {
        req.session.folder = ''
    }
    const file = `${req.root}/src/static/${req.session.idUser}/${req.session.folder}/${req.params.name}`
    // console.log(file)
    if (req.params.name.includes('.')) {
        res.download(file)
    }
    else {
        await zip(file, file + '.zip')
        await downloadZip(res, file)
        
        // const zp = zip.folder(file)
        // zip.generateAsync({type:"blob"}).then(function(content) {
        //     // see FileSaver.js
        //     saveAs(content, "example.zip");
        // });

        //Zip folder by zip
        // const rel = zip.folder(file);
        // console.log(rel)
        // zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        // .pipe(fs.createWriteStream(file + 'sample.zip'))
        // .on('finish', function () {
        //     console.log("sample.zip written.");
        // });

        //Remove zip file after create and download
        // res.setHeader('Content-Disposition', 'attachment')
        // res.setHeader('Content-type', 'application/zip')
        // let fileStream = fs.createReadStream(file + '.zip')
        // fileStream.pipe(res)
        // fileStream.on('close', function () {
        //     fileStream.destroy();
        //     fs.unlink(file + '.zip');
        // });
    }
}

//file/remove/fileName
function remove(req, res, next) {
    const filePath = `${req.root}/src/static/${req.session.idUser}/${req.session.folder}/${req.params.fileName}`
    // fs.unlinkSync(filePath);
    fs.rmSync(filePath, { recursive: true, force: true })
    req.session.folder = ''
    req.session.saveFolder = false
    res.redirect('/')
}

function create(req, res, next) {
    // console.log(req.body )
    let { fileNameCreate, fileContentCreate } = req.body
    if (!fileNameCreate.includes('.')) {
        fileNameCreate += '.txt'
    }
    //console.log(fileNameCreate, fileContentCreate)
    const pathFile = `${req.root}/src/static/${req.session.idUser}/${req.session.folder}/${fileNameCreate}`
    // console.log(pathFile)
    fs.writeFile(pathFile, fileContentCreate, function (err) {
        if (err) throw err
        req.session.folder = ''
        req.session.saveFolder = false
        res.redirect('/')
    })
}

function rename(req, res, next) {
    // console.log(req.body)
    let { oldName, newName } = req.body
    // console.log(oldName, newName)

    //Check wheter file name has extension or not
    // if (!newName.includes('.txt')) {
    //     newName += '.txt'
    // }

    const pathFile = `${req.root}/src/static/${req.session.idUser}/${req.session.folder}/`
    fs.rename(pathFile + oldName, pathFile + newName, function (err) {
        if (err) console.log(err)
        req.session.folder = ''
        req.session.saveFolder = false
        res.redirect('/')
    })
}

function newFolder(req, res, next) {
    const pathFile = `${req.root}/src/static/${req.session.idUser}/${req.session.folder}/${req.params.name}`
    if (!fs.existsSync(pathFile)) {
        fs.mkdirSync(pathFile)
    }
    else {
        console.log('Folder already exists')
    }
    req.session.folder = ''
    req.session.saveFolder = false
    res.redirect('/')
}

async function folder(req, res, next) {
    if (!req.session.folder) {
        req.session.folder = ''
    }
    //console.log(req.session.folder)
    const pathFolder = req.session.folder + '/' + req.params.name
    let data = await fileService.getFiles(pathFolder, req.root, req.session.idUser)
    // console.log(data)
    req.session.folder += '/' + req.params.name
    req.session.saveFolder = true
    req.session.folderData = data
    res.redirect('/')
}

function uploadFile(req, res, next) {
    //console.log(req.file)
    req.session.folder = ''
    req.session.saveFolder = false
    res.json({ code: 0, message: 'Success' })
}

module.exports = {
    get, download, remove, create, rename, newFolder, folder, uploadFile
};