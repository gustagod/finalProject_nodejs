const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

test("POST /users debe agregar un usuario", async () => {
    const newUser = {
        firstName: "test",
        lastName: "user",
        email: "test2@gmail.com",
        password:"12345",
        phone:"123456789"
    }
    const res = await request(app).post('/users').send(newUser);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(newUser.firstName);
});

test('post /users/login un usuario se conecta', async () => {
    const credentials = {
        email: "test2@gmail.com",
        password:"12345",
    }
    const res= await request(app).post('/users/login').send(credentials)
    token=res.body.token
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
});

test('GET /users obtiene todos los usuarios', async () => {
    const res = await request(app)
    .get('/users')
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});



test("PUT /users/:id debe actualizar un usuario", async () => {
    const user = {
        firstName: "Test",
    }
    const res = await request(app)
    .put(`/users/${id}`)
    .set('Authorization',`Bearer ${token}`)
    .send(user);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
})

test("DELETE /users/:id debe eliminar un usuario", async () => {
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(204);
});
