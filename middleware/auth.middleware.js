const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const {User} = require('../models/user')

const authMiddleware = async (req, res, next) => {

    // try {
    //     const { accessToken } =req.cookies

    //     if (!accessToken) {
    //         return next()
    
    //     }

    //     const {loginId} = jwt.verify(accessToken, JWT_SECRET_KEY)

    //     const user = await User.findOne({where: loginId})

    //     if(!user){
    //         throw new Error("존재하지 않는 계정입니다")
    //     }

    //     res.locals.user = user
    //     next()
    // } catch(err) {
    //     res.clearCookie()
    //     next(err)
    // }





};

module.exports = authMiddleware;


