const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

// 메인페이지
router.get('/', auth, (req, res) => {
    if (!req.cookies.accessToken) {
        let userRole = null;
        return res.render('index.ejs', {
            components: 'main',
            user: userRole,
        });
    } else if (res.locals.user) {
        userRole = res.locals.user.role;

        return res.render('index.ejs', {
            components: 'main',
            user: userRole,
        });
    }
});

//유저 메인페이지
router.get('/users', auth, (req, res) => {
    if (res.locals.user.role === 'customer') {
        return res.render('index.ejs', {
            components: 'user',
            user: res.locals.user.role,
        });
    }
});

// 서비스관리자 페이지
router.get('/admin', auth, (req, res) => {
    if (res.locals.user.role === 'manager') {
        return res.render('index.ejs', {
            components: 'admin',
            user: res.locals.user.role,
        });
    }
});

// 예약페이지
router.get('/users/reservation/:hospitalId', auth, (req, res) => {
    if (!req.cookies.accessToken) {
        return;
    } else if (res.locals.user.role === 'customer') {
        return res.render('index.ejs', {
            components: 'reservation',
            user: res.locals.user.role,
        });
    } else if (res.locals.user.role === 'partner') {
        return res.send(
            '<script>alert("customer 계정으로만 예약하실 수 있습니다. "); window.location.href="/";</script>'
        );
    } else {
        return res.render('index.ejs', {
            components: 'main',
            user: res.locals.user.role,
        });
    }
});

// 마이페이지
router.get('/users/mypage', auth, (req, res) => {
    if (res.locals.user.role === 'customer') {
        return res.render('index.ejs', {
            components: 'mypage',
            user: res.locals.user.role,
        });
    }
});

//비밀번호 찾기 (이메일 발송) 페이지
router.get('/findmypassword', (req, res) => {
    let userRole = null;
    return res.render('index.ejs', {
        components: 'findmypassword',
        user: userRole,
    });
});

// 비밀번호 재설정 페이지
router.get('/users/resetpassword/:params', (req, res) => {
    let userRole = null;

    return res.render('index.ejs', {
        components: 'resetpassword',
        user: userRole,
    });
});

router.get('/map/hospitals', (req, res) => {
    res.render('hospital.map.ejs');
});

router.get('/map/pharmacies', (req, res) => {
    res.render('pharmacy.map.ejs');
});

//원장님의 공간
router.get('/hospital', auth, (req, res) => {
    if (res.locals.user.role === 'partner') {
        return res.render('index.ejs', {
            components: 'hospital',
            user: res.locals.user.role,
        });
    }
});

//병원정보 등록 페이지
router.get('/register', auth, (req, res) => {
    if (res.locals.user.role === 'partner') {
        return res.render('index.ejs', {
            components: 'hospitalRegister',
            user: res.locals.user.role,
        });
    }
});

//병원정보 수정 페이지
router.get('/edit', auth, (req, res) => {
    if (res.locals.user.role === 'partner') {
        return res.render('index.ejs', {
            components: 'hospitalEdit',
            user: res.locals.user.role,
        });
    }
});

//의사정보 등록 페이지
router.get('/doctorRegister', auth, (req, res) => {
    if (res.locals.user.role === 'partner') {
        return res.render('index.ejs', {
            components: 'doctorRegister',
            user: res.locals.user.role,
        });
    }
});

//의사한명 페이지
router.get('/doctorEdit', auth, (req, res) => {
    const doctorId = req.query.doctorId;
    if (res.locals.user.role === 'partner') {
        return res.render('index.ejs', {
            components: 'doctorEdit',
            user: res.locals.user.role,
        });
    }
});

//병원상세페이지
router.get('/hospitals/:hospitalId', auth, (req, res) => {
    if (!req.cookies.accessToken) {
        let userRole = null;
        return res.render('index.ejs', {
            components: 'hospitaldetail',
            user: userRole,
        });
    }

    if (res.locals.user) {
        userRole = res.locals.user.role;

        return res.render('index.ejs', {
            components: 'hospitaldetail',
            user: userRole,
        });
    }
});

//의사 시간 추가
router.get('/doctorTime', auth, (req, res) => {
    const doctorId = req.query.doctorId;
    if (res.locals.user.role === 'partner') {
        return res.render('index.ejs', {
            components: 'doctorTime',
            user: res.locals.user.role,
        });
    }
});

//page expired
router.get('/errors/expired', (req, res) => {
    res.status(403).render('expired');
});

//로그인
router.get('/login', (req, res) => {
    let userRole = null;
    if (res.locals.user) {
        userRole = res.locals.user.role;
    }
    res.render('index.ejs', {
        components: 'login',
        user: userRole,
    });
});

//회원가입
router.get('/signup', (req, res) => {
    let userRole = null;
    if (res.locals.user) {
        userRole = res.locals.user.role;
    }
    res.render('index.ejs', {
        components: 'signup',
        user: userRole,
    });
});

//파트너 회원가입
router.get('/partner/signup', (req, res) => {
    let userRole = null;
    if (res.locals.user) {
        userRole = res.locals.user.role;
    }
    res.render('index.ejs', {
        components: 'partner',
        user: userRole,
    });
});

module.exports = router;
