const errorHandler = (err, req, res, next) => {
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
    }
    // if (req.path === '/apt/users/mypage/:userId'){
    //     if (false){
            
    //     }else{
    //         return res.status(500).json({ message: '마이페이지 불러오기에 실패했습니다.'})
    //     }
    // }
    // if (req.path === '/apt/users/mypage/editprofile/:userId'){
    //     if (false){
            
    //     }else{
    //         return res.status(500).json({ message: '프로필 수정이 실패했습니다.'})
    //     }
    // }

    if (req.path.substr(0, 25) === '/api/users/mypage/cancel/'){
        if (err.name === 'ReservationAlreadyDone'){
            return res.status(err.status).json({message : err.message})
        }else{
            return res.status(500).json({ message: '예약 취소에 실패했습니다.'})
        }
    }
    // if (req.path === '/apt/users//mypage/review/:id'){
    //     if (false){
            
    //     }else{
    //         return res.status(500).json({ message: '리뷰 작성이 실패했습니다.'})
    //     }
    // }

};

module.exports = errorHandler;
