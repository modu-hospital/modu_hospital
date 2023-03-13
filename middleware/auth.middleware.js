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
    // 로그인을 해서 어서오세요 환영합니다 로그인이 유지되어 있는 페이지에 접속하고
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
    const { accessToken, refreshToken } = req.cookies;

    console.log(accessToken, refreshToken)
    //토큰 존재 확인
    if (!accessToken || !refreshToken) { //토큰이 없으면 로그인 되면 안됨 다시 로그인 버튼 누르게끔
        return next()//res.status(400).json({message:"토큰이 없음"})
        // return {message:"로그인 다시 해주세요"}
    }

    console.log("아무거나1111111")

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

    console.log("아무거나2222222")

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

    console.log("아무거나33333333")

        // refreshToken 만료시
    if (!refreshTokenValidate) { 
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        return res.status(400).json({message:"refreshToken 만료"})
    }

    console.log("아무거나33333333")

    // access 검증 후, expired 만료시
    // 만료가 되면 재발급
    if (!accessTokenValidate) { //accessToken만료시
        
        // refreshToken이 없으면 위에서 먼저 걸려줌
        //accessToken과 refreshToken 모두 만료 상태? => 로그인 다시하기
        if(!refreshTokenValidate) {
            res.clearCookie('accessToken')
            res.clearCookie('refreshToken')
            return next()
        }//이것도 위에서 걸러주는거 아닌가?

        console.log("아무거나@@@")
        return next()
    } else {

        //현재로그인이 된 아이디 값과과 refreshToken에 들어있는 아이디 값은 refreshToken
        const {userId} = jwt.verify(accessToken, JWT_SECRET_KEY)

        const user = await User.findByPk(userId) 

        if(user) {
            res.locals.user = user
            next()
        }else {
            return res.status(400).json({message: "회원가입하세요"})                                                                               
        }
        next()
    }


    // next() //accessToken이 살아있다면






    // if (!accessTokenValidate) { //accessToken만료시
        
    //     // refreshToken이 없으면 위에서 먼저 걸려줌
    //     //accessToken과 refreshToken 모두 만료 상태? => 로그인 다시하기
    //     if(!refreshTokenValidate) {
    //         res.clearCookie('accessToken')
    //         res.clearCookie('refreshToken')
    //         return next()
    //     }//이것도 위에서 걸러주는거 아닌가?
        
    //     // refreshToken payload loginId가져다가 없으면 쿠키 지우고 다시 로그인

    //     //이 코드가 왜 필요한지
    //     // //리프레시 토큰의 userId의 페이로드.loginId값
    //     // const getrefreshToken = await RefreshToken.findOne({where: {refreshToken}})
    //     // console.log("getrefreshToken", getrefreshToken)
        
    //     // //payload의loginId가 현재 로그인된 loginId

    //     // // console.log("아무거나44444444")

    //     // if(!getrefreshToken) {
    //     //     res.clearCookie('accessToken')
    //     //     res.clearCookie('refreshToken')
    //     //     return res.status(400).json({message:"access가 만료된 상태에서 토큰값을 불러오지 못함"})
    //     // }

      
    //     // if(getrefreshToken !== refreshToken) {
    //     //     res.clearCookie('accessToken')
    //     //     res.clearCookie('refreshToken')
    //     //     return res.status(400).json({message:"db에서 가져온 refreshToken이랑 cookie에 저장된 refreshToken이랑 다름"})
    //     // }

    //     console.log("아무거나@@@")
    //     //refreshToken이 있으면 accessTomen 재발급 api는 프론트에서 적용시켜준다


    //     //여기서 바로 token api로 작동시킬 수 있는지 
    //     //return ....token api 경로ㅊ
    //     re
    // } else {
    
    // try{
    //     //쿠키를 가져온다
    //     const { accessToken, refreshToken } = req.cookies;

    //     console.log(accessToken, refreshToken)
    //     //토큰 존재 확인
    //     if (!accessToken || !refreshToken) { //토큰이 없으면 로그인 되면 안됨 다시 로그인 버튼 누르게끔
    //         return res.status(400)({message:"토큰이 없음"})
    //         // return {message:"로그인 다시 해주세요"}
    //     }

    //     console.log("아무거나!!")

    //     //accessToken 검증
    //     const accessTokenValidate = validateAccess(accessToken);
    //     function validateAccess(accessToken) {
    //         try {
    //             const vertify = jwt.verify(accessToken, JWT_SECRET_KEY);
    //             return vertify;
    //         } catch (err) {
    //             return false;
    //         }
    //     }

    //     //refreshToken 검증
    //     const refreshTokenValidate = validateRefresh(refreshToken);

    //     function validateRefresh(refreshToken) {
    //         try {
    //             const vertify = jwt.verify(refreshToken, JWT_SECRET_KEY);
    //             return vertify;
    //         } catch (err) {
    //             return false;
    //         }
    //     }

    //      // refreshToken 만료시
    //     if (!refreshTokenValidate) { 
    //         res.clearCookie('accessToken')
    //         res.clearCookie('refreshToken')
    //         return res.status(400)({message:"refreshToken 만료"})
    //     }     

    //     // access 검증 후, expired 만료시
    //     // 만료가 되면 재발급
    //     if (!accessTokenValidate) { //accessToken만료시
            
    //         // refreshToken이 없으면 //accessToken과 refreshToken 모두 만료 상태? 
    //         // refreshToken payload loginId가져다가 없으면 쿠키 지우고 다시 로그인

    //         //리프레시 토큰의 userId의 페이로드.loginId값
    //         const getrefreshToken = await RefreshToken.findOne({where: {refreshToken}})
    //         console.log("getrefreshToken", getrefreshToken)
    //         //현재로그인이 된 아이디 값고 refreshToken에 들어있는 아이디 값은 refreshToken
    //         //payload의loginId가 현재 로그인된 loginId

    //         if(!getrefreshToken) {
    //             res.clearCookie('accessToken')
    //             res.clearCookie('refreshToken')
    //             return res.status(400)({message:"access가 만료된 상태에서 토큰값을 불러오지 못함"})
    //         }

    //         if(getrefreshToken !== refreshToken) {
    //             res.clearCookie('accessToken')
    //             res.clearCookie('refreshToken')
    //             return res.status(400)({message:"db에서 가져온 refreshToken이랑 cookie에 저장된 refreshToken이랑 다름"})
    //         }

    //         console.log("아무거나@@@")
    //         //refreshToken이 있으면 accessTomen 재발급 api는 프론트에서 적용시켜준다
    //     } else {
    //         const {loginId} = jwt.verify(accessToken, JWT_SECRET_KEY)

    //         const user = await User.findByPk(loginId)

    //         if(user) {
    //             res.locals.user = user
    //             next()
    //         }else {
    //             return res.status(400)({message: "회원가입하세요"})
    //         }
    //     }
    //     //있다면 payload를 출력해주는
    //     // const payload = jwt.verify(accessToken, JWT_SECRET_KEY);//안 찍힘
    //     // console.log('##############payload', payload);

    //     // const user = await User.findOne({ where: loginId });
    //     // console.log('유저유저유저유저user', user); //안 찍힘

    //     // console.log("@@@@@@@@@user.userId", user.userId) 
    //     // //안 찍힘

    //     // res.locals.user = user.userId;
    //     // console.log('res.locals.user', res.locals.user);

    //     next() //accessToken이 살아있다면
    // } catch(err) {
    //     res.cookie('accessToken', '')
    //     res.cookie('refreshToken', '')
    //     next(err)
    // }
}
module.exports = authMiddleware;
