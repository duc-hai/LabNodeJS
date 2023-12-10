var service = require('../services/account.service');
var passport = require('passport')

exports.renderLoginPage = (req, res, next) => res.render('accounts/login', { layout: 'index' })

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { accessToken } = await service.login({ email, plainTextPassword: password });

    res.status(200).json({
      access_token: accessToken,
    });
  }
  catch (err) {
    console.log(err);
    return res.status(401).send(err.message);
  }
}

exports.renderRegisterPage = (req, res, next) => res.render('accounts/register', { layout: 'index' })

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const id = await service.register({ email, fullName, password });

    res.status(201).json({
      message: 'User registered',
      id,
    });
  } catch (err) {
    res.status(500).send('Something went wrong');
  }
}

exports.logout = async (req, res, next) => {
  try {
    // Handle logout
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/auth/login');
    });
  } catch (err) {
    next(err);
  }
}

exports.loginWithGoogle = passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })

exports.googleCallback = (req, res, next) => {
  res.redirect('/chat');
}