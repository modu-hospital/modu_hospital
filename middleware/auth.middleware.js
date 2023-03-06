const jwt = require('jsonwebtoken');
const UserController = require('../controllers/user.controller');
const { JWT_SECRET_KEY } = process.env;
const {User} = require('../models/user')

const authMiddleware = async (req, res, next) => {

    let tokenObject = {}

    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) next() //return res.status(400).json({"message":"refreshToken 없음"})
    if (!accessToken) next() //return res.status(400).json({"message":"accessToken 없음"})

    const accessTokenValidate = validateAccess(accessToken)
    const refreshTokenValidate = validateRefresh(refreshToken)

    console.log(accessTokenValidate)
    console.log(refreshTokenValidate)

    if(!refreshTokenValidate) return res.status(419).json({"message":"refresh토큰이 만료됨"})

    if (!accessTokenValidate) {
        const accessTokenId = tokenObject[refreshToken]
        if(!accessTokenId) return res.status(419).json({"message":"refresh 토큰 없음"})

        //accessToken이 있다면 refresh 재발급
        const newAccessToken = jwt.sign({accessTokenId}, JWT_SECRET_KEY,{expiresIn: '7d'})
        res.cookies('accessToken', newAccessToken)
        return res.json({"message":"accessToken 새로 발급함"})

    }

    const {id} = getAccessTokenPayload(accessToken)
    return res.json({"message":`${id}의 payload를 가진 token 인증 완료`})

    // const accessTokenValidate = validateAccess(accessToken)
    // const refreshTokenValidate = validateRefresh(refreshToken)

    function validateAccess(accessToken) {
        try{
            jwt.verify(accessToken, JWT_SECRET_KEY)
            return true
        } catch(err) {
            return false
        }
    }

    function validateRefresh(refreshToken) {
        try{
            jwt.verify(refreshToken, JWT_SECRET_KEY)
            return true
        } catch(err) {
            return false
        }
    }

    function getAccessTokenPayload(accessToken) {
        try{
            const payload = jwt.verify(accessToken, JWT_SECRET_KEY) //jwt에서 payload를 가져옴
            return payload //닉네임이 담겨있음
        } catch(error) {
            return null
        }
    }

    // return
};

module.exports = authMiddleware;


