var http = require ('http')
var url = require ('url')
var fs = require ('fs')
var path = require('path')
var queryString = require('querystring');  

const hostname = 'localhost'
const port = 8080

var server = http.createServer ((req, res) => {
    var pathname = url.parse(req.url, true).pathname
    if (pathname == '/') {
        var index = fs.readFileSync (path.join(__dirname, 'index.html'))
        res.writeHead (200, {
            'Context-Type' : 'text/html'
        })
        res.write(index)
        res.end()
    }
    else if (pathname == '/login') {
        if (req.method != "POST") {
            res.writeHead (400, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write("Phương thức " + req.method + " không được hỗ trợ")
            return res.end()
        }
        var body = ''
        req.on('data', d => body += d.toString())
        req.on('end', () => {
            var input = queryString.decode(body)
            var mess = checkData(input.email, input.password)
            if (mess !== "Successful") {
                res.writeHead (400, {
                    'Content-Type': 'text/html; charset=utf-8'
                })
                res.write(mess)
                res.end()
            }
            else {
                res.writeHead (200, {
                    'Content-Type': 'text/html; charset=utf-8'
                })
                res.write("Đăng nhập thành công")
                res.end()
            }
        })
    }

    else {
        res.writeHead(400, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.write("Đường dẫn không hợp lệ")
        res.end()   
    }
})

function checkData (email, pwd) {
    if (email === "" || pwd === "") {
        return "Vui lòng nhập đầy đủ thông tin"
    }
    if (pwd.length < 6) 
        return "Mật khẩu phải có ít nhất 6 kí tự"
    if (email === "admin@gmail.com" && pwd === "123456") {
        return "Successful" 
    }
    if (email === "admin@gmail.com" && pwd !== "123456")
        return "Mật khẩu không hợp lệ"
    return "Email hoặc mật khẩu không chính xác"
}

server.listen (port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})