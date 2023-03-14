const supertest = require('supertest');
const app = require('../../app.js');


describe('Layered Architecture Pattern, Map Domain Integration Test', () => {

    let agent;
    beforeEach((done) => {
        agent = supertest(app);
        done()
    });

    afterEach((done) => {
        return app && app.close(done);
    });

    // test('GET /api/hospitals/info API (searchHospitalInfo) Integration Test Success Case, Not Found Hospital Info Data', async () => {
    //     const response = await supertest(app).get(`/api/hospitals/info/`).query({id:3}).send({ id: 3 });

    //     // expect(response.status).toEqual(200);

    //     expect(response.body).toEqual({});
    // });

    test('POST /api/hospitals/around API (findNearHospital) Integration Test Success Case', async () => {
        // { rightLongitude, rightLatitude, leftLongitude, leftLatitude }
        const requestBodyParams = {
            rightLongitude: 127.13245302025508,
            rightLatitude: 37.52700879612589,
            leftLongitude: 126.99344298385097,
            leftLatitude: 37.47504078291968,
        };
        const response = await agent.post(`/api/hospitals/around`).send(requestBodyParams);

        expect(response.status).toEqual(200);

        expect(response.body).toEqual({ hospitals: [] });
        // expect(response.body).toMatchObject([])
    });

    test('POST /api/hospitals/around/info API (findNearHospitalsInfo)', async () => {
        // TODO: 여기에 코드를 작성해야합니다.
        const requestBodyParams = {
            rightLongitude: 127.13245302025508,
            rightLatitude: 37.52700879612589,
            leftLongitude: 126.99344298385097,
            leftLatitude: 37.47504078291968,
        };
        const response = await agent.post(`/api/hospitals/around/info`).send(requestBodyParams);

        expect(response.status).toEqual(200);

        expect(response.body).toEqual({ hospitals: [] });
    });

    test('POST /api/categories/search API (findHospitalsThatFitsDepartment)', async () => {
        // { rightLongitude, rightLatitude, leftLongitude, leftLatitude }
        const requestBodyParams = {
            rightLongitude: 127.13245302025508,
            rightLatitude: 37.52700879612589,
            leftLongitude: 126.99344298385097,
            leftLatitude: 37.47504078291968,
            department: '치과',
        };
        const response = await agent.post(`/api/hospitals/around`).send(requestBodyParams);

        expect(response.status).toEqual(200);

        expect(response.body).toEqual({ hospitals: [] });
        // expect(response.body).toMatchObject([])
    });
});

// afterAll(async () => {
//   // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화합니다.
//   if (process.env.NODE_ENV === 'test') await sequelize.sync({ force: true });
//   else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
// });
