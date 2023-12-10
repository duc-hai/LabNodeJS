const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hbs = require('express-handlebars');
const router = require('./src/routes');
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const rateLimit = require('express-rate-limit')

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Quá nhiều request tới website, vui lòng thử lại sau'
})

app.use(limiter)
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser('secret key'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.engine('hbs',
  hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
  })
)

app.set('views', './src/views')
app.set('view engine', 'hbs')

//middleware get root path
app.use((req, res, next) => {
  req.root = __dirname
  next()
})

app.use('/', router);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ 'message': err.message });
  return;
});

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`)
});