class UserRepository {
    constructor(UserModel) {
        this.userModel = UserModel
    }

    signup = async (name, phone, loginId, password, idNumber, role) => {
        return await this.userModel.create({name, phone, loginId, password, idNumber, role})
    }

    findUser = async (loginId) => {
        return await this.userModel.findOne({loginId})
    }

    findUserRole = async(role) => {
        return await this.userModel.findAll({where:{role}})
    }

}

module.exports = UserRepository;