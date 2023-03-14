const supertest = require('supertest');
const app = require('../../app.js');

describe('Layered Architecture Pattern, Map Domain Integration Test', () => {
    let agent;
    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    afterAll((done) => {
        return app && app.close(done);
    });

    test('GET /api/hospitals/info API (searchHospitalInfo) Integration Test Success Case, Not Found Hospital Info Data', async () => {
        const response = await supertest(app).get(`/api/hospitals/info/3`);

        expect(response.status).toEqual(200);

        expect(response.body).toEqual({});
    });

    test('POST /api/hospitals/around API (findNearHospital) Integration Test', async () => {
        const requestBodyParams = {
            rightLongitude: 127.13245302025508,
            rightLatitude: 37.52700879612589,
            leftLongitude: 126.99344298385097,
            leftLatitude: 37.47504078291968,
        };
        const response = await agent.post(`/api/hospitals/around`).send(requestBodyParams);

        expect(response.status).toEqual(200);

        expect(response.body).toEqual({ hospitals: [] });
    });

    test('POST /api/hospitals/around/info API (findNearHospitalsInfo), Integration Test', async () => {
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

    test('POST /api/categories/search API (findHospitalsThatFitsDepartment), Integration Test', async () => {
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
    });
});
