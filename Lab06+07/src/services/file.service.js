// Define your services here
const fs = require('fs')
const pathModule = require('path')

let fileType = {
    '': 'Folder',
    '.zip': 'Compressed file',
    '.rar': 'Compressed RAR file',
    '.txt': 'Text Document file',
    '.jpg': 'JPEG image',
    '.mp4': 'MP4 video',
    '.png': 'PNG image',
    '.pdf': 'PDF document',
}

let fileIcon = {
    '': '<i class="fa fa-folder"></i>',
    '.zip': '<i class="fas fa-file-archive"></i>',
    '.rar': '<i class="fa fa-file-archive"></i>',
    '.txt': '<i class="fa fa-file"></i>',
    '.jpg': '<i class="fa fa-file-image"></i>',
    '.mp4': '<i class="fa-solid fa-file-video"></i>',
    '.png': '<i class="fa fa-file-image"></i>',
    '.pdf': '<i class="fa fa-file-pdf"></i>',
}
function convertDate (input) {
    let inp = new Date(input.toString())
    return `${inp.getDate()}-${inp.getMonth() + 1}-${inp.getFullYear()}`
}

function formatBytes(bytes, decimals = 2) {
    //Source: Stack Overflow
    if (!+bytes) return '0 Byte'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

async function getFiles(folder = null, root, idUser) {
    try {
        return new Promise(function (resolve, reject) {
            let path = `${root}/src/static/${idUser}`
            if (folder !== null) {
                path += '/' + folder               
            }
            //console.log(path)

            fs.readdir(path, async (err, files) => {
                if (err) throw err
                let result = []
                files.forEach(file => {
                    let ext = pathModule.extname(file)
                    let information = fs.statSync(path + '/' + file)
                    result.push({
                        name: file,
                        type: fileType[ext] || 'File',
                        icon: fileIcon[ext] || '<i class="fa fa-file"></i>',
                        path: path + '/' + file,
                        isDirectory: information.isDirectory(),
                        size: formatBytes(information.size),
                        lastModified: convertDate(information.mtime),
                    })
                })
                let promiseArray = []
                promiseArray.push(new Promise((resolve, reject) => {
                    resolve(result)
                }))
                let temp = await Promise.all(promiseArray)
                resolve(temp)
            })
        })
    } catch (err) {
        throw new Error('Service: Cannot get files');
    }
}

module.exports = {
    getFiles
}