const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

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

    const accessToken = jwt.sign({ loginId: user }, JWT_SECRET_KEY, { expiresIn: '30m' });

    const refreshToken = jwt.sign({}, JWT_SECRET_KEY, { expiresIn: '7d' });

    if (!accessToken) {
        return res.status(400).json * { message: 'accessToken 존재 안함' };
    }
    if (!refreshToken) {
        return res.status(400).json * { message: 'refreshToken 존재 안함' };
    }

    // const validateAccessToken =
};

module.exports = authMiddleware;
