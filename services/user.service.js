const UserRepository = require('../repositories/user.repository.js')
const {User} = require('../models')
const bcrypt = require("bcrypt")

class UserService {
    userRepository = new UserRepository(User)

    signup = async (name, phone, loginId, password, idNumber) => {
        const existUser = await this.userRepository.findUser(loginId)

        console.log(existUser)
        
        if (existUser[0]) {
            return{message: "이미 존재하는 아이디 입니다"}
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        await this.userRepository.signup(name, phone, loginId, hashedPassword, idNumber)
        return {message:"회원가입이 완료되었습니다"}
    }

    // login = async (loginId, password) => {
    //     const user = await this.userRepository.findUser(loginId)

    //     const isPasswordCorrect = await bcrypt.compare(password, user[0].password)
    // }
    
}

module.exports = UserService;