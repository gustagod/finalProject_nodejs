const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

beforeAll(async()=>{
    const credentials={
        email:"test@gmail.com",
        password:"12345",
    }
    const res= await request(app).post('/users/login').send(credentials);
    token=res.body.token;

})

test('GET /products obtiene todos los productos', async () => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
});

test("POST /products debe agregar un producto", async () => {
    const newProduct = {
        title: "test",
        description: "tennis",
        brand: "Nike",
        price:100,
    }
    const res = await request(app)
    .post('/products')
    .send(newProduct)
    .set('Authorization',`Bearer ${token}`);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe(newProduct.title);
});

test("GET /products/:id debe traer un producto por id", async () => {
    const res = await request(app).get(`/products/${id}`);
    expect(res.status).toBe(200);
});

test("PUT /products/:id debe actualizar un producto", async () => {
    const product = {
        title: "Test",
    }
    const res = await request(app)
    .put(`/products/${id}`)
    .send(product)
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(product.title);
})

test("DELETE /products/:id debe eliminar un producto", async () => {
    const res = await request(app)
    .delete(`/products/${id}`)
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(204);
});
