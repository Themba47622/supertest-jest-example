const request = require('supertest');

describe('api tests: regres api', () => {

    let baseUrl = 'https://reqres.in';

    test('should return all users', async () => {
        const res = await request(baseUrl)
            .get('/api/users')
        expect(res.ok).toBe(true);
        expect(res.statusCode).toBe(200);
        expect(res.body.data[0].id).toBe(1);
    });

    test('should return a single user', async () => {
        const res = await request(baseUrl)
            .get('/api/users/1')
        expect(res.statusCode).toBe(200);
        expect(res.body.data.first_name).toBe("George");
    });

    test('should create a new user', async () => {
        const res = await request(baseUrl)
            .post('/api/users')
            .send({
                "name": "zotho",
                "job": "qa engineer"
            })
            .expect(201);
        expect(res.body.name).toBe("zotho");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("createdAt");
        console.log(res.body);
    });

    test('should update a new user', async () => {
        const res = await request(baseUrl)
            .put('/api/users')
            .send({
                "name": "zethe",
                "job": "sdet"
            })
            .expect(200);
        expect(res.body.job).toBe("sdet");
        expect(res.body).toHaveProperty("updatedAt");
        console.log(res.body);
    });

    test('should delete a user', async () => {
        await request(baseUrl)
            .delete('/api/users/1')
            .expect(204);
    });

});