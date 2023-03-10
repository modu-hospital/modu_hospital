const { describe } = require('node:test');
const UserService = require('../../../services/user.service');
const CreateError = require('../../../lib/errors');
const createError = new CreateError();

const mockUserRepository = {
    findUserById: jest.fn(),
    editUserProfile: jest.fn(),
    signup: jest.fn(),
    findUser: jest.fn(),
};
const userService = new UserService();
userService.userRepository = mockUserRepository;

describe('User Service Unit Test', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    describe('getUserProfile', () => {
        it('should return proper properties', async () => {
            const userData = {
                userId: 1,
                loginId: 'user.loginId',
                name: 'user.name',
                phone: 'user.phone',
                address: 'user.address',
            };
            mockUserRepository.findUserById.mockResolvedValue(userData);
            const returnValue = await userService.getUserProfile()
            expect(returnValue).toMatchObject(userData)
        });
    });
    // describe('editUserProfile', () => {

    // })
});
