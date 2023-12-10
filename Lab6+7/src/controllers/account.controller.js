// Define your controllers here
const { check, validationResult } = require('express-validator')
const accountRepo = require('../repositories/account.repository')
const bcrypt = require('bcrypt');
const fs = require('fs')
const express = require('express')
const fileService = require('../services/file.service')
//GET /
async function home(req, res, next) {
    if (req.session.login || req.session.email) {
        req.session.login = false //If user isn't click to remember, after them login, set session login is false (use one time login only)
        let data
        if (req.session.folderData) {
            data = req.session.folderData
            req.session.folderData = ''
        }
        else {
            data = await fileService.getFiles(null, req.root, req.session.idUser)
        }
        // console.log(data)
        
        //Sort by folders order first, files next
        let folders = []
        let files = []
        data[0].forEach(function (file, index) { 
            if (file.isDirectory) {
                folders.push(file)
            }
            else {
                files.push(file)
            }
        })

        const breadscrum = req.session.folder
        if (req.session.saveFolder == false) {
            req.session.folder = ''
        }
        else {
            req.app.use(express.static(req.root + '/src/static/' + req.session.idUser + '/' + req.session.folder))
            req.session.saveFolder = false
        }
        return res.render('index', {layout: false, name: req.session.name, files: folders.concat(files), breadscrum})
    }
    return res.redirect('/account/login')
}

//GET /account/register
function getRegister(req, res, next) {
    let msg = req.flash('msg')
    let name = req.flash('name')
    let email = req.flash('email')
    let password = req.flash('password')
    res.render('register', { layout: false, msg, name, email, password })
}

//POST /account/register
async function register(req, res, next) {
    const { name, email, password } = req.body
    let result = validationResult(req)
    //Check validator
    if (result.errors.length !== 0) {
        result = result.mapped()
        let msg
        for (i in result) {
            msg = result[i].msg
            break
        }
        req.flash('msg', msg)
        req.flash('name', name)
        req.flash('email', email)
        req.flash('password', password)
        return res.redirect('/account/register')
    }
    //Check whether email is valid
    const checkEmail = await accountRepo.login(email)
    if (checkEmail.length !== 0) {
        req.flash('msg', 'Email đã tồn tại')
        req.flash('name', name)
        req.flash('email', email)
        req.flash('password', password)
        return res.redirect('/account/register')
    }

    //Validation fields here
    const hash = bcrypt.hashSync(password, 10)
    try {
        const results = accountRepo.saveAccount(name, email, hash)
        results.then((rel) => {
            if (rel.affectedRows === 0) {
                req.flash('msg', rel.info)
                req.flash('name', name)
                req.flash('email', email)
                req.flash('password', password)
                return res.redirect('/account/register')
            }
            //Register successfully     
            const root = req.root
            fs.mkdir(`${root}/src/static/${rel.insertId}`, () => {
                return res.redirect('/account/login')
            })
        })
    }
    catch (err) {
        next(err)
    }
}

//GET /account/login
function getLogin(req, res, next) {
    let msg = req.flash('msg')
    let email = req.flash('email')
    let password = req.flash('password')
    res.render('login', { layout: false, msg, email, password })
}

//POST /account/login
function login(req, res, next) {
    const { email, password } = req.body
    let result = validationResult(req)
    //Check validator
    if (result.errors.length !== 0) {
        result = result.mapped()
        let msg
        for (i in result) {
            msg = result[i].msg
            break
        }
        req.flash('msg', msg)
        req.flash('email', email)
        req.flash('password', password)
        return res.redirect('/account/login')
    }

    //Validation fields here
    const results = accountRepo.login(email)
    results.then((rel) => {
        if (rel.length === 0) {
            req.flash('msg', 'Tên đăng nhập hoặc mật khẩu không đúng')
            req.flash('email', email)
            req.flash('password', password)
            return res.redirect('/account/login')
        }
        //console.log(rel[0])
        const checkPassword = bcrypt.compareSync(password, rel[0].password)
        //console.log(checkPassword)
        if (checkPassword) {
            if (req.body.remember) {
                req.session.email = rel[0].email
                req.session.name = rel[0].name
            }
            delete rel[0].password
            req.session.idUser = rel[0].id
            req.session.login = true
            req.session.folder = ''
            //
            req.app.use(express.static(req.root + '/src/static/' + req.session.idUser))
            return res.redirect('/')
        }
        else {
            req.flash('msg', 'Tên đăng nhập hoặc mật khẩu không đúng')
            req.flash('email', email)
            req.flash('password', password)
            return res.redirect('/account/login')
        }
    })
}

function logout(req, res, next) {
    //req.session.email = null
    req.session.destroy()
    res.redirect('/account/login')
}

//Validation for login
const checkValidatorLogin = [
    check('email').exists().withMessage('Vui lòng nhập email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ'),

    check('password').exists().withMessage('Vui lòng nhập mật khẩu')
        .notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 kí tự'),
]

//Validator for register
const validator = [
    check('name').exists().withMessage('Vui lòng nhập tên người dùng')
        .notEmpty().withMessage('Tên người dùng không được để trống')
        .isLength({ min: 2 }).withMessage('Tên người dùng quá ngắn'),

    check('email').exists().withMessage('Vui lòng nhập email')
        .notEmpty().withMessage('Email không được để trống')
        .isEmail().withMessage('Email không hợp lệ'),

    check('password').exists().withMessage('Vui lòng nhập mật khẩu')
        .notEmpty().withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 kí tự'),

    check('confirmPassword').exists().withMessage('Vui lòng nhập mật khẩu xác nhận')
        .notEmpty().withMessage('Mật khẩu xác nhận không được để trống')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Mật khẩu xác nhận không đúng');
            }
            return true
        })
]

module.exports = {
    getLogin, login, checkValidatorLogin, validator, logout, getRegister, register, home
};