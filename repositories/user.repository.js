class UserRepository {
    constructor(UserModel, HospitalModel, DoctorModel, RefreshTokenModel) {
        this.userModel = UserModel;
        this.hospitalModel = HospitalModel;
        this.doctorModel = DoctorModel;
        this.refreshTokenModel = RefreshTokenModel;
    }

    findUserById = async (userId) => {
        const user = await this.userModel.findOne({
            where: { userId: userId },
        });
        return user;
    };

    editUserProfile = async (userId, address, phone, name) => {
        const editedProfile = await this.userModel.update(
            {
                address: address,
                phone: phone,
                name: name,
            },
            {
                where: { userId: userId },
            }
        );
        return editedProfile;
    };

    signup = async (name, loginId, password, phone, idNumber, role) => {
        return await this.userModel.create({ name, loginId, password, phone, idNumber, role });
    };

    findUser = async (loginId) => { 
        return await this.userModel.findOne({ where: { loginId } });
    };

    findUserRole = async (role) => {
        return await this.userModel.findAll({ where: { role } });
    };

    findAllUser = async () => { 
        return await this.userModel.findAll({});
    };

    // 회원삭제
    userDeleteOne = async (userId) => {
        return await this.userModel.destroy({ where: { userId } });
    };

    // 의사삭제
    doctorDeleteOne = async (doctorId) => {
        return await this.doctorModel.destroy({ where: { doctorId } });
    };

    //계정검사
    emailPasswordCheck = async (loginId) => {
        return await this.userModel.findAll({ where: { loginId } });
    };

    //토큰 저장
    tokenSave = async (userId, token) => {
        return await this.refreshTokenModel.create({ userId, token });
    };

    // 병원삭제
    HospitalDeleteOne = async (userId) => {
        return await this.hospitalModel.destroy({ where: { userId } });
    };

    userRoleUpdate = async (userId, role) => {
        const userRoleUpdate = await this.userModel.update(
            {
                role: role,
            },
            {
                where: { userId },
            }
        );
        return userRoleUpdate;
    };

    PaginationByAll = async (limit, offset, type) => {
        let users;
        const tabType = { offset, limit };
        if (type === 'customer') {
            users = await this.userModel.findAndCountAll({
                ...tabType,
                where: {
                    role: 'customer',
                },
            });
        } else if (type === 'partner') {
            users = await this.userModel.findAndCountAll({
                ...tabType,
                where: {
                    role: 'partner',
                },
            });
        } else if (type === 'waiting') {
            users = await this.userModel.findAndCountAll({
                ...tabType,
                where: {
                    role: 'waiting',
                },
            });
        } else {
            users = await this.userModel.findAndCountAll({
                offset,
                limit,
            });
        }
        return users;
    };

    PaginationByRole = async (limit, offset, role, type) => {
        let users;
        const tabType = { offset, limit };
        users = await this.userModel.findAndCountAll({
            ...tabType,
            where: { role },
        });
        return users;
    };

    emailPasswordCheck = async (loginId) => {
        return await this.userModel.findAll({ where: { loginId } });
    };

    //userId로 refreshtoken 찾기
    findToken = async (userId) => {
        return await this.refreshTokenModel.findAll({where: {userId}})
    }

    //token 수정
    updateToken = async (userId, token) => {
        return await this.refreshTokenModel.update({token}, {where: {userId}})
    }
}

module.exports = UserRepository;
