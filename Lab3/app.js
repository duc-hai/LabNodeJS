const express = require('express')
const path = require('path')
const app = express()
const port = 8081
const session = require('express-session')
const multer = require('multer')
const expressHandlebars = require('express-handlebars')
const url = require('url')

require("dotenv").config() //Config enviroment

var products = new Map () //Storage list products
var keyArr = [] //Contain primary keys of list products

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, 'static/images'); //Place to storage image file
    }, 
    filename: function (req, file, cb) { 
       cb(null , file.originalname); //Don't rename image file
    }
 });
app.set('views', __dirname + '/static/views');

const hostname = 'localhost'
const upload = multer({ 
    storage: storage,
    limits : {fileSize : 1000000} //Limited file size
})

app.use(session({
    secret: 'keyboard_password', //secret key
}))
app.use(express.static(__dirname + "/static"))
app.use(express.urlencoded({extended :  true}))
app.use(express.json())
//Use view engine is handlebars
app.engine('handlebars', expressHandlebars.engine({

}))
app.set('view engine', 'handlebars')

app.get('/login', (req, res) => {
    if (req.session.email !== undefined) {
        return res.redirect('/')
    }
    res.sendFile(path.join(__dirname, '/static/views/login.html'))
})

app.post('/login', (req, res) => {
    var data = req.body
    if (data.email == "")
        return res.send({status: 1, message: "Vui lòng nhập email"})
    if (data.pwd == "")
        return res.send({status: 1, message: "Vui lòng nhập mật khẩu"})
    if (data.email === process.env.EMAIL && data.pwd === process.env.PASSWORD) {
        req.session.email = data.email
        return res.send({status: 0, message: "Login Successfully"})
    }
    return res.send({status: 1, message: "Sai tên đăng nhập hoặc mật khẩu"})
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect ('login')
})

app.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/views/add.html'))
})

app.post("/add", upload.array("file"), addProduct)

function addProduct (req, res) {
    //req.body.description is an optional
    if (req.body.name == "" || req.body.price == "") {
        return res.send({status: 1, message: "Nhập thiếu thông tin"})
    }
    //console.log(req.files)

    //Create primary key by random method
    let key = Math.floor(Math.random() * 1000000) //Random key
    while (keyArr.includes(key) == true) {
        key = Math.floor(Math.random() * 1000000) //Random again until not duplicate key
    }
    keyArr.push(key)
    products.set(key, {name: req.body.name, price: req.body.price, description: req.body.description, file: req.files[0].filename, id: key}) 
    return res.send({status: 0, message: "Thêm sản phẩm thành công"})
}

app.get("/product", (req, res) => {
    var list = Array.from(products.values())
    return res.send (JSON.stringify({status: 0, message: "Lấy danh sách thành công", data : list}))
})

app.post("/delete", (req, res) => {
    if (products.has(req.body.idProduct) == false) {
        res.send({status: 1, message: "Đã xảy ra lỗi. Sản phẩm không có trong danh sách trên server !!!"})
    }
    else {
        products.delete(req.body.idProduct)
        res.send({status: 0, message: `Xóa thành công sản phẩm ${req.body.idProduct}`})
    }
})

app.get("/delete", (req, res) => {
    res.sendFile(path.join(__dirname, '/static/views/delete.html'))
})

app.get("/edit/:id", (req, res) => {
    res.render ("edit", {layout: false, data: products.get(Number(req.params.id)), id: req.params.id}) 
})

app.post("/edit", upload.array("file"), editProduct)

function editProduct (req, res) {
    //req.body.description is an optional
    if (req.body.name == "" || req.body.price == "") {
        return res.send({status: 1, message: "Nhập thiếu thông tin"})
    }
    let id = Number(req.body.id)
    if (req.files.length == 0) {
        //File is not updated
        let temp = products.get(id)
        products.set(id, {name: req.body.name, price: req.body.price, description: req.body.description, file: temp.file, id: id})
        return res.send({status: 0, message: "Cập nhật thông tin thành công"})
    }
    products.set(id, {name: req.body.name, price: req.body.price, description: req.body.description, file : req.files[0].filename, id: id})
    return res.send({status: 0, message: "Cập nhật thông tin thành công"})
}

app.get('/detail/:id', (req, res) => {
    if (products.has(Number(req.params.id)) == false) {
        return res.render("404", {layout: false})
    }
    else {
        return res.render("detail", {layout: false, id: req.params.id, data: products.get(Number(req.params.id))})
    }
})

app.use('/', (req, res) => {
    if (req.session.email == undefined) {
        res.redirect('login')
    }
    else {
        // console.log(req)
        // console.log(req.headers.referer)
        res.render ("index", {layout: false, message: req.headers.referer})
        //res.sendFile(path.join(__dirname, '/static/views/index.html'))
    }
})

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})