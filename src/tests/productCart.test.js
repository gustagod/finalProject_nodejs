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



test('GET /cart obtiene todas las producto del carro', async () => {
    const res = await request(app)
    .get('/cart')
    .set('Authorization',`Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)

});



test("POST /cart debe agregar una producto del carro", async () => {

    const newCart = {
        quantity: 4,
    }
    const res = await request(app)
    .post('/cart')
    .send(newCart)
    .set('Authorization',`Bearer ${token}`)
    id = res.body.id;
    console.log(id);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.quantity).toBe(newCart.quantity);
});



test("PUT /cart/:id debe actualizar una producto del carro", async () => {
    const cart = {
        quantity: 6,
    }
    const res = await request(app)
    .put(`/cart/${id}`)
    .set('Authorization',`Bearer ${token}`)
    .send(cart);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cart.quantity);
})

test("DELETE /cart/:id debe eliminar una producto del carro", async () => {
    const res = await request(app)
    .delete(`/cart/${id}`)
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(204);
});
