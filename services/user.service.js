const UserRepository = require('../repositories/user.repository.js')
const {User} = require('../models')
const bcrypt = require("bcrypt")

class UserService {
    userRepository = new UserRepository(User)

    signup = async (name, phone, loginId, password, idNumber, role) => {
        const existUser = await this.userRepository.findUser(loginId)
        
        if (existUser[0]) {
            return{message: "이미 존재하는 아이디 입니다"}
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        await this.userRepository.findUserRole(role)

        await this.userRepository.signup(name, phone, loginId, hashedPassword, idNumber, role)
        return {message:"회원가입이 완료되었습니다"}
    }

    login = async (loginId, password) => {
        const userCheck = await this.userRepository.findUser(loginId)

        const passwordCheck = await bcrypt.compare(password, userCheck[0].password)

        if (!userCheck || !passwordCheck) {
            return res.status(400).json({message: '이메일 또는 비밀번호가 틀렸습니다'})
        }

        // const cookie = jwt.sign({
        //     loginId: userCheck[0].loginId,
        // },
        // jwt)



    }



    //role = 서비스 관리자일 때"manager" , 환자일 때"customer",  승인대기 파트너 일 때?"waiting", 승인완료 파트너 일 때?"partner"
    //message만 다르게 주면 되나? role에 manager인지 환자인지 데이터 create하고



    // login = async (loginId, password) => {
    //     const user = await this.userRepository.findUser(loginId)

    //     const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
    // }
    
}

module.exports = UserService;