class UserRepository {
    constructor(UserModel) {
        this.userModel = UserModel;
    }

    findUsers = async () => {
        const users = await this.userModel.findAll();
        return users;
    };
    // 여기에 함수 작성해주세요
}

module.exports = UserRepository;
