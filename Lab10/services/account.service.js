var Account = require('../models/account');
var bcrypt = require('bcrypt');
var { sign } = require('jsonwebtoken');
const saltRounds = 10;

const generateToken = async (payload, secretSignature, tokenLife) => {
	try {
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch (error) {
		console.log(`Error in generate access token:  + ${error}`);
		return null;
	}
};

async function login({ email, plainTextPassword }) {
  try {
    const user = await Account.findOne({ email });

    if (!user) {
      throw new Error(`User does not exist`);
    }

    const matched = await bcrypt.compare(plainTextPassword, user.hashed_password);
    
    if(!matched) {
      throw new Error(`Password is incorrect`);
    }

    const signingKey = process.env.JWT_SIGNING_KEY;
    const expiredIn = process.env.ACCESS_TOKEN_EXPIRED_IN;

    const accessToken = await generateToken(user.id, signingKey, expiredIn);
    return { accessToken };

  } catch (err) {
    throw new Error(`Service: Cannot get account due to ${err}`);
  }
}

async function register({ email, fullName, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    var newAccount = new Account({
      full_name: fullName,
      email,
      hashed_password: hashedPassword
    })

    newAccount = await newAccount.save();

    return newAccount.id

  } catch (err) {
    throw Error(err.message);
  }
}

module.exports = {
  login,
  register,
}