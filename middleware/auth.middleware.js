const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const {User} = require('../models/user')

const authMiddleware = async (req, res, next) => {
    // const {authorization = ''} =req.headers

    // const [tokenType, token] = authorization.split('')

    // const isTokenValid = token && tokenType === 'Bearer'

    // if (!isTokenValid) {
    //     return res.status(401).json({
    //         message: '로그인 후 이용 가능한 기능입니다'
    //     })
    // }

    // try {
    //     const {loginId} = jwt.verify(token, JWT_SECRET_KEY)
    //     const user = await User.findOne({loginId})

    //     res.locals.currentUser = user
    //     next()
    // } catch (err) {
    //     res.status(401).json({
    //         message: '로그인 후 이용 가능한 기능입니다'
    //     })
    // }

    //user가 없으면 토큰을 생성해
    //user 값을 어떻게 가져와야되는지
    const user = await User.findOne({
        where: {
            loginId,
        }
    })

    if (!user) {
        res.status(403).json('유저 없음')
    } else {

        console.log(user)

        // const accessToken = jwt.sign({
        //     userId: user.userId,
        //     loginId: user.loginId,
        //     name: user.name,
        // }, JWT_SECRET_KEY, { expiresIn: '30m' });//issuer: 'me' 지정 해줘야되나

        // try{
            
        //     const accessToken = jwt.sign({
        //         userId: user.userId,
        //         loginId: user.loginId,
        //         name: user.name,
        //     }, JWT_SECRET_KEY, { expiresIn: '30m' });//issuer: 'me' 지정 해줘야되나

        // }

    }

        //accessToken 발급
        

        //refreshToken 발급
    //     const refreshToken = jwt.sign({
    //         userId: user.userId,
    //         loginId: user.loginId,
    //         name: user.name,
    //     }, JWT_SECRET_KEY, { expiresIn: '7d' });

    //     res.cookie("refresh", refreshToken, {maxAge: 24 * 60 * 60 * 1000 })

    //     return res.send(accessToken)

    // } else {
    //     return res.send("아이디 비밀번호 오류")
    // }




    

    // const refreshToken = jwt.sign({}, JWT_SECRET_KEY, { expiresIn: '7d' });

    // if (!accessToken) {
    //     return res.status(400).json * { message: 'accessToken 존재 안함' };
    // }
    // if (!refreshToken) {
    //     return res.status(400).json * { message: 'refreshToken 존재 안함' };
    // }

    // const validateAccessToken =
};

module.exports = authMiddleware;
