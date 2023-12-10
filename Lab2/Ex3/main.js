const http = require('http')
const url = require('url')
const queryString = require('querystring')

var students = new Map ()
var pattern = /\/students\/[a-zA-Z0-9]+\/*$/ig
const port = 8081
const hostname = 'localhost'

var server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type' : 'application/json'
    })
    var path = url.parse(req.url, true).pathname
    if (path == '/students') {
        if (req.method == "POST") {
            return addStudent(req, res)
        }
        if (req.method == "GET") {
            return getAllStudents (req, res)
        }
        return res.end ({code: 3, message: "Phương thức này không được hỗ trợ"})
    }
    //http://localhost/students/{id}
    if (path.match(pattern)) {
        var studentId = path.match(/[a-zA-Z0-9]+\/*$/ig)[0].replace(/\/*$/ig,'')
        if (req.method == "GET") {
            return getInformation (req, res, studentId)
        }
        if (req.method == "PUT") {
            return updateStudent (req, res, studentId)
        }
        if (req.method == "DELETE") {
            return removeStudent (req, res, studentId)
        }
        return res.end ({code: 3, message: "Phương thức này không được hỗ trợ"})
    }
    return res.end ({code: 2, message: "Đường dẫn không hợp lệ"})
})

function addStudent(req, res) {
    var body = ''
    req.on('data', d => body += d.toString())
    req.on('end', () => {
        let input = queryString.decode(body)
        if (!input.id || !input.fullname|| !input.gender) {
            return res.end (JSON.stringify({code: 1, message: "Thiếu thông tin sinh viên"}))
        }
        // if (input.gender)
        if (students.has(input.id)) {
            return res.end (JSON.stringify({code: 1, message: "Mã số sinh viên đã tồn tại"}))
        }
        students.set(input.id, input)
        return res.end (JSON.stringify({code: 0, message: "Thêm sinh viên thành công"}))
    })
}

function getAllStudents (req, res) {
    if (students.size == 0) {
        return res.end (JSON.stringify({code: 4, message: "Chưa có sinh viên nào trong danh sách"}))
    } 
    var list = Array.from(students.values())
    return res.end (JSON.stringify({code: 0, message: "Lấy danh sách sinh viên thành công", data: list}))

}

function getInformation (req, res, studentId) {
    if (!students.has(studentId)) {
        return res.end (JSON.stringify({code: 2, message: "Không tìm thấy sinh viên"}))
    }
    return res.end (JSON.stringify({code: 0, message: "Tìm thấy sinh viên thành công", data: students.get(studentId)}))
}

function updateStudent (req, res, studentId) {
    if (!students.has(studentId)) {
        return res.end (JSON.stringify({code: 2, message: "Không tìm thấy sinh viên"}))
    }

    var body = ''
    req.on('data', d => body += d.toString())
    req.on('end', () => {
        let input = queryString.decode(body)
        let info = {id: studentId, fullname: "", gender: ""}
        if (input.fullname) {
            info.fullname = input.fullname
        }   
        else {
            info.fullname = students.get(studentId).fullname
        }
        if (input.gender) {
            info.gender = input.gender
        }
        else {
            info.gender = students.get(studentId).gender
        }
        students.set(studentId, info)
        return res.end (JSON.stringify({code: 0, message: "Cập nhật thông tin sinh viên thành công"}))
    })
}

function removeStudent (req, res, studentId) {
    if (!students.has(studentId)) {
        return res.end (JSON.stringify({code: 2, message: "Không tìm thấy sinh viên"}))
    }
    students.delete(studentId)
    return res.end (JSON.stringify({code: 0, message: "Xóa sinh viên " + studentId + " thành công"}))
}

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})