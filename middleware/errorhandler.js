const CreateError = require('../lib/errors');

const errorHandler = (err, req, res, next) => {
    const createError = new CreateError();
    const makeFirstLetterLowerCase = (str) => {
        result = str[0].toLowerCase() + str.slice(1, str.length);
        return result;
    };
    // /* token expired */
    // if (err.name === 'TokenExpiredError') {
    //     return res.render('index.ejs', { components: 'main', user: null });
    // }

    // /* User Not Found */
    // if (err.name === 'UserNotFound') {
    //     return res.render('alert.ejs', { message: err.message, href: '/login' });
    // }

    // /* token error */
    // if (err.name === 'TokenNotFound') {
    //     return res.render('alert.ejs', { message: err.message, href: '/login' });
    // }

    // /* 관리자가 아님 */
    // if (err.name === 'NotAdmin') {
    //     return res.render('alert.ejs', { message: err.message, href: '/' });
    // }

    // /* 이미 로그인 된 회원 */
    // if (err.name === 'UserAlreadyLogined') {
    //     return res.render('alert.ejs', { message: err.message, href: '/' });
    // }

    /* Joi Validation Error */
    if (err.isJoi) {
        const joiErredKey = err.details[0].context.key;

        /* 빈칸 */
        if (err.details[0].type.includes('empty')) {
            return res.status(412).json({ message: '빈칸을 입력해주세요.' });
        }
        // Joi에서 검증하는 key값 : 한글로 표시할 값
        const keys = {
            name: '이름',
            phone: '전화번호',
            loginId: '아이디',
            email:'이메일',
            address: '주소',
            password: '비민번호',
            confirm: '비밀번호 확인',
            idNumber: '주민등록번호',
            url: '이미지 주소',
            date: '진료예약 시간',
            status: 'status',
            longitude: '경도',
            latitude: '위도',
            star: '별점',
            contents: '내용',
        };
        for (i = 0; Object.keys(keys).length; i++) {
            if (joiErredKey === Object.keys(keys)[i]) {
                return res
                    .status(412)
                    .json({ message: `${Object.values(keys)[i]}의 형식이 적절하지 않습니다.` });
            }
        }
        return res.status(412).json({message: '입력값의 형식이 적절하지 않습니다.'})
    }
    // key = 에러처리할 url, value = 알 수 없는 에러 시 반환할 메세지
    // 파라미터는 제거 후 입력 ex):userId
    const errorList = {
        '/api/users/mypage/cancel/': '예약 취소에 실패했습니다',
        '/api/users/mypage/editprofile/': '프로필 수정이 실패했습니다.',
        '/api/users/mypage/review/': '리뷰 작성이 실패했습니다.',
        '/api/users/mypage/': '마이페이지 불러오기에 실패했습니다.',
        '/api/users/email':'이메일 발송에 실패하였습니다.'

    };
    // lib/errors.js 에서 작성된 에러 먼저 출력, 그 후 errorList의 value 출력
    if (makeFirstLetterLowerCase(err.name) in createError) {
        return res.status(err.status).json({ message: err.message });
    }
    
    for (let i = 0; i < Object.keys(errorList).length; i++) {
        if (req.path.substr(0, Object.keys(errorList)[i].length) === Object.keys(errorList)[i]) {
            console.log(err)
                return res.status(500).json({ message: Object.values(errorList)[i] });   
        }
    }

    return res.status(500).json({ message: '알 수 없는 오류가 발생했습니다.' }), console.log(err)
};

module.exports = errorHandler;
