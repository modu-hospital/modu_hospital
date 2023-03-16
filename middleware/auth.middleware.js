const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;
const { User, RefreshToken } = require('../models');

const authMiddleware = async (req, res, next) => {
    //문제가 뭐였냐면 로그인이 안된 유저들이 로그인이 된걸로 적용되었음
    //auth의 역할: 로그인 검증이랑 user확인(현재 로그인이 되어 있는 유저 확인 가능하게끔)
    //유저가 존재하는지, 발행한 토큰이맞는지, 유효한지 확인
    //토큰이 없다면 컨트롤러로 가는게 아니라 다시 로그인 버튼을 누르게끔
    //next() => 미들웨어에서 컨트롤러로 가게끔 만들어주는 역할

    //미들웨어란
    // 로그인을 해서 로그인이 유지되어 있는 페이지에 접속하고
    // 로그인이 유지되고 있는 동안에만 동작해야하는 페이지들이 있는데, 로그인 유지를 확인하고 요청을 보내야 한다.
    // 어떻게 해야하나
    // 미들웨어란 간단하게 클라이언트에게 요청이 오고 그 요청을 보내기 위해 응답하는 중간(미들)에 목적에 맞게 처리해주는 중간단계 통과하는 미들웨어 함수이다.
    // 요청의 응답에 도달하기 위해서 미들웨어를 통과해야지 응답까지 도달할 수 있다.
    // 중간에 문지기 얘의 허락을 맡아야 지나갈수 있다. 엑세스 권한
    // req(요청)객체, res(응답) 객체, next()함수를 이용해서 통과 요청을 넘길수 있다.
    // 너지나가 = next();
    // 문지기 통과 next지나가세요
    // 요청을 처리하기전에 중간에 기능을 동작시켜주는 애

    //쿠키를 가져온다
    let { accessToken, refreshToken } = req.cookies;

    //토큰 존재 확인
    //토큰이 없으면 로그인 되면 안됨 다시 로그인 버튼 누르게끔
    if (!accessToken || !refreshToken) {
        return next();
        // return {message:"로그인 다시 해주세요"}
    }

    //accessToken 검증
    const accessTokenValidate = validateAccess(accessToken);
    function validateAccess(accessToken) {
        try {
            const vertify = jwt.verify(accessToken, JWT_SECRET_KEY);
            return vertify;
        } catch (err) {
            return false;
        }
    }

    //refreshToken 검증
    const refreshTokenValidate = validateRefresh(refreshToken);

    function validateRefresh(refreshToken) {
        try {
            const vertify = jwt.verify(refreshToken, JWT_SECRET_KEY);
            return vertify;
        } catch (err) {
            return false;
        }
    }

    // refreshToken 만료시
    if (!refreshTokenValidate) {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(400).json({ message: 'refreshToken 만료' });
    }

    // access 검증 후, expired 만료시
    // 만료가 되면 재발급
    if (!accessTokenValidate) {
        //accessToken만료시

        return res.status(400).json({ message: 'accessToken 만료' });
        //만료시 에러를 받고
        //프론트에서 accessToken토큰만료에러시 토큰 API로 newAccessToken 발급
        //리프래시 토큰이 있다면...위에서 이미 없다면 재로그인 하게끔해둠

        // const token = await RefreshToken.findAll({ where: { userId: user.userId } })
        // //refreshToken에서 해당userId 찾기=> 로 token.token
        // //userId를 어디서 가져올껀지
        // //발급된 refreshToken의 조건으로 token를 찾는 그래서 그 해당하는 토큰의 id값과 userId 등..다 가지고 올 수 있는거

        // console.log("token :", token)
        // console.log("#####token", token[0].token)

        //refreshToken 유효 여부 검증 한 후  (db에서 찾은)
        //payload가 잘 들어갔는지 확인하고 싶음 userId.loginId값 확인하고 싶음

        // const refreshTokenV = jwt.verify(token[0].token, process.env.JWT_SECRET_KEY)
        // if(refreshTokenV) {
        //     accessToken = jwt.sign({}, process.env.JWT_SECRET_KEY)//accessToken 새로 만들기
        //     //(저장된 refreshToken을 조회해서 유효성 검사 후 유효하다면 재발급)
        // }
        //return next()
    }

    //현재로그인이 된 아이디 값과 refreshToken에 들어있는 아이디 값은 refreshToken
    const { userId } = accessTokenValidate;
    console.log(accessTokenValidate);

    const user = await User.findByPk(userId);

    res.locals.user = user;

    next();
};
module.exports = authMiddleware;
