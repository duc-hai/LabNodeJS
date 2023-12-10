var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  displayName: String,
  email: String,
  googleId: String,
  firstName: String,
  lastName: String,
});

var Account = mongoose.model('Account', accountSchema);
module.exports = Account;