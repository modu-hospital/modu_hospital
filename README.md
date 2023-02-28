# 프로젝트명: 모두의 병원
#### 팀원: 최준혁, 주민석, 김기민, 이희찬, 김범석 
---
## Description
내 주변 병원들을 손쉽게 찾을 수 있을 뿐만 아니라 리뷰를 통해 해당병원이 자신과 맞는지 알아볼 수 있는 플랫폼

## MVP(Minimum Viable Product)
1. 로그인 / 회원가입 / 마이페이지
- user CRUD
- JWT 발급과 이메일 인증을 통한 로그인
2. 병원, 약국 지도 페이지
- 카카오 맵 API를 활용한 병원 위치 조회
3. 사용자 마이페이지
- 진료 예약
- 병원 이용 리뷰 작성
4. 병원 상세 페이지
- 병원측과 환자측 간의 웹소켓을 이용한 실시간 채팅 상담

## Prerequisite
1. 패키지 설치
express, dotenv, joi, multer, jsonwebtoken, socket.io, cookie-parser, mysql2

2. sequelize 설정


3. models 수정


  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "nodemon app",
    "prettify" : "prettier --write *.js **/*.js"


      "dependencies": {
    "bcrypt": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "express": "^4.18.2",
    "joi": "^17.8.3",
    "jsonwebtoken": "^9.0.0",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^3.1.2",
    "sequelize": "^6.29.0",
    "socket.io": "^1.0.0"
  },
  "devDependencies": {
    "dotenv": "^16.0.3",
    "jest": "^29.4.3",
    "nodemon": "^2.0.20",
    "prettier": "^2.8.4",
    "sequelize-cli": "^6.6.0",
    "supertest": "^6.3.3"
  }


  ├── bcrypt@5.1.0
├── cookie-parser@1.4.6
├── dotenv@16.0.3
├── express@4.18.2
├── jest@29.4.3
├── joi@17.8.3
├── jsonwebtoken@9.0.0
├── multer@1.4.5-lts.1
├── mysql2@3.1.2
├── nodemon@2.0.20
├── prettier@2.8.4
├── sequelize-cli@6.6.0
├── sequelize@6.29.0
├── socket.io@4.6.1
└── supertest@6.3.3