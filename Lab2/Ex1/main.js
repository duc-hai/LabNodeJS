var http = require('http')
var url = require('url')
// var fs = require('fs')

const hostname = 'localhost'
const port = 8080

var server = http.createServer((req, res) => {
    var path = url.parse(req.url, true).pathname
    if (path == '/') {
        // fs.readFile('index.html', function (err, data) {
        //     res.writeHead(200, {
        //         'Content-Type': 'text/html'
        //     })
        //     res.write(data)
        //     res.end()
        // })
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(`
        <head>
            <meta charset="UTF-8">
            <title>Ex1</title>
        </head>
        
        <body>
            <form action="result">
                <label for="a">Số hạng 1</label>
                <input type="text" name="a" id="a"><br>
                <label for="b">Số hạng 2</label>
                <input type="text" name="b" id="b"><br>
                <label for="">Phép tính</label>
                <select name="op" id="op">
                    <option value="" selected>Chọn phép tính</option>
                    <option value="add">Cộng</option>
                    <option value="minus">Trừ</option>
                    <option value="multi">Nhân</option>
                    <option value="divi">Chia</option>
                </select><br>
                <input type="submit" value="Tính">
            </form>
        </body>
        `)
        res.end()
    }
    else if (path == '/result') {
        var a = url.parse(req.url, true).query.a
        var b = url.parse(req.url, true).query.b
        var op = url.parse(req.url, true).query.op
        if (checkData(a, b, op) != "No error") {
            res.writeHead(400, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write(checkData (a, b, op))
            res.end()
        }
        a = Number (a)
        b = Number (b)
        switch (op) {
            case 'add':
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.write(a + " + " + b + " = " + "<b>" + (a+b) + "</b>")
                res.end()
                break
            case 'minus':
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.write(a + " - " + b + " = " + "<b>" + (a-b) + "</b>")
                res.end()
                break
            case 'multi':
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.write(a + " * " + b + " = " + "<b>" + (a*b) + "</b>")
                res.end()
                break
            case 'divi':
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                res.write(a + " / " + b + " = " + "<b>" + (a/b) + "</b>")
                res.end()
                break
        }
    }
  
    else {
        res.writeHead(400, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.write("Đường dẫn không hợp lệ")
        res.end()   
    }
})

function checkData (a, b, op) {
    if (a == "" || b == "") {
        return "Bạn nhập thiếu đối số"
    } 
    if (op == "") {
        return "Bạn chưa chọn phép toán"
    } 
    if (op == "divi" && b == "0") {
        return "Đối số thứ 2 không được bằng 0"
    }
    return "No error"
}

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})