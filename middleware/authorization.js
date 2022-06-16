const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60})
}

const verifyToken = (req,res,next) => {
    const token = req.headers.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if(decoded.iat) {
        next();
    }
    else {
        next("Authorization fail")
    }
}

module.exports = { generateToken, verifyToken}