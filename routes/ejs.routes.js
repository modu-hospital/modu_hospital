const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const auth = require('../middleware/auth.middleware');
const { v4: uuidv4 } = require('uuid');

// 메인페이지
router.get('/', auth, (req, res) => {
    if (!req.cookies.accessToken && !req.cookies.wrapperExecuted) {
        let userRole = null;

        res.cookie('wrapperExecuted', 'first');
        return res.render('index.ejs', {
            components: 'main',
            user: userRole,
            isOpen: true,
        });
    } else if (!req.cookies.accessToken && req.cookies.wrapperExecuted) {
        let userRole = null;
        res.cookie('wrapperExecuted', 'second');
        return res.render('index.ejs', {
            components: 'main',
            user: userRole,
            isOpen: false,
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
            user: res.locals.user.role
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
router.get('/users/resetpassword/:token', (req, res) => {
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
            userId: res.locals.user.userId
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
            userId:  res.locals.user.userId,
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

router.get('/chat',(req, res) => {
    res.render('test.ejs')
});

router.post('/create-room', (req, res) => {
    const roomId = uuidv4();
    const userId = req.body.userId;
    const hospitalId = req.body.hospitalId;

    // roomId, userId, hospitalId 정보를 이용하여 새로운 룸을 생성
    const rooms=[]
    const newRoom = {
        id: roomId,
        users: [userId, hospitalId],
        messages: []
    };
     // 방 정보를 저장
     // rooms.push(newRoom);
     rooms[roomId] = newRoom;


    // 생성된 룸의 ID를 클라이언트에게 반환
    res.send({roomId});
});

router.post('/hospital', (req, res) => {
    const hospitalId = req.body.hospitalId;
    console.log(hospitalId)
    // 병원 ID를 이용하여 해당 병원에 속한 룸 리스트를 검색
    const rooms = rooms.filter(room => room.users.includes(hospitalId));
    const roomIds = rooms.map(room => room.id);
    // 클라이언트에게 해당 병원의 룸 리스트 전송
    res.send({ roomIds });
  });

module.exports = router;
