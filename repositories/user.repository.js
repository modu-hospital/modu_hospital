class UserRepository {
    constructor(UserModel) {
        this.userModel = UserModel
    }

    signup = async (name, phone, loginId, password, idNumber) => {
        return await this.userModel.create({name, phone, loginId, password, idNumber})
    }

    findUser = async (loginId) => {
        return await this.userModel.findAll({where: {loginId}})
    }

}

module.exports = UserRepository;