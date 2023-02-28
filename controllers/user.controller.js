const UserService = require('../services/user.service.js');

class UserController {
    userService = new UserService();

    getUserProfile = async (req, res) => {
        const userId = req.params
        console.log(userId.userId)
        const userProfile = await this.userService.makeUserProfile(userId.userId);

        return res.json({userProfile})
    };
}

module.exports = UserController;
