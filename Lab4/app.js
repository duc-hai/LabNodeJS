const express = require ('express')
const app = express()
const expressHandlebars = require ('express-handlebars')
const users = require('./users/index')
const url = require('url')

require("dotenv").config()
app.set('views', __dirname + '/public/views');
app.use(express.static("public"));

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
app.use(express.urlencoded())
app.use(express.json())

app.get('/add', (req, res) => {
    res.render ("add", {layout: false})
})

app.post('/add', async (req, res) => {
    // console.log(req.body)
    let data = await users.addUser(req.body)
    //console.log(data)
    if (data.code == 201) {
        res.redirect(url.format({
            pathname: '/',
            query: {
                "message": `Thêm thành công user với id: ${data.data.id}`
            }
        }))
    }
    else {
        res.render("add", {layout: false, message: data.data[0].field + " " + data.data[0].message, oldData: req.body})
    }
})

app.get('/', async (req, res) => {
    // console.log(req.query)
    var page = req.query.page
    if (page == undefined) {
        page = 1
    }
    let data = await users.getUsers(req.query.page)
    res.render('home', {layout: false, data: data.data, message: req.query.message})
})

app.delete('/public-api/users/:id', async (req, res) => {
    //console.log(req.params.id)
    let data = await users.deleteUser(req.params.id)
    if (data.code == 204) {
        res.json({code: 1, message: `Xóa người dùng với id ${req.params.id} thành công`})
    }
    else {
        res.json({code: 0, message: `Đã xảy ra lỗi`})
    }
})

app.get('/public-api/users/edit/:id', async (req, res) => {
    let data = await users.detailUser(req.params.id)
    //console.log(data)
    if (data.code != 200) {
        res.render('404', {layout: false, mess: data.data.message})
    }
    else {
        res.render('edit', {layout: false, data: data.data})
    }
})

app.put('/public-api/users/:id', async (req, res) => {
    // console.log(req.body)
    // console.log(req.params.id)
    let rel = await users.updateUser(req.params.id, req.body)
    //console.log(rel)
    if (rel.code == 200) {
        res.json({code: 0, message: `Cập nhật thành công user với id: ${req.params.id}`})
    }
    else {
        res.json({code: 1, message: "Đã xảy ra lỗi"})
        // res.json({code: 1, message: rel.data[0].field + " " + rel.data[0].message})
    }
})

app.get('/public-api/users/:id', async (req, res) => {
    // console.log(req.params.id)
    let data = await users.detailUser(req.params.id)
    // console.log(data)
    if (data.code != 200) {
        res.render('404', {layout: false, mess: data.data.message})
    }
    else {
        res.render('detail', {layout: false, data: data.data})
    }
})

app.listen(process.env.PORT, process.env.HOST, () => {    
    console.log(`Server is running at http://${process.env.HOST}:${process.env.PORT}`)
})

