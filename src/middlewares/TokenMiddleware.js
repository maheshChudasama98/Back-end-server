const jwt = require('jsonwebtoken');
require('dotenv').config();
const secureKey = process.env.TOKEN_SECURE_KEY;

const db = require('../api/models')
const UserModel = db.UserModel

module.exports = async (req, res, next) => {
    const token = req.headers['authorization']
    if (token !== undefined) {
        jwt.verify(token, secureKey, async (err, decoded) => {
            if (err) {
                res.status(401).json({ status: false, msg: "Token is not valid!" })
                throw err
            }
            else {
                UserModel.findByPk(decoded.userId).then((data) => {
                    if (data) {
                        req.user = data;
                        next();
                        return;
                    }
                    res.status(403).send({
                        message: 'Unauthorized!',
                    });
                })
            }
        })
    }
    else {
        res.status(403).json({ status: false, msg: "No token provided!" })
    }
}