const express = require('express');
const router = express.Router();
//const accountRouter = require('./account');
const accountRouter = require('./account/index')
const fileRouter = require('./file');

router.get('/', accountRouter)
router.use('/account', accountRouter);
router.use('/file', fileRouter);
router.use('/', fileRouter);
router.get('/error', (req, res) => {
    res.send('<h1>404 Not Found</h1><h4>Không tìm thấy đường dẫn bạn yêu cầu, vui lòng thử lại !</h5> <a href="/">Về trang chủ</a>')
})
// router.use('/', (req, res) => {
//     res.redirect('/error')
// })


module.exports = router;