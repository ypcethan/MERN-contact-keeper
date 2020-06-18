const request = require('supertest')
const app = require('../server')
const {userOne ,userOneId, setupDatebase} = require('./fixture/db')
beforeEach(setupDatebase)

test('Should be able to login', async()=> {
    await request(app)
        .post('/api/auth')
        .send({
            email:userOne.email ,
            password: userOne.password
        })
        .expect(200)
})

test('Should be able to see contacts once login' , async () => {
    const response =  await request(app)
        .post('/api/auth')
        .send({
            email:userOne.email ,
            password: userOne.password
        })
        .expect(200)

    const token = response.body.token
    const res = await request(app)
        .get('/api/contacts/')
        .set('x-auth-token' , token)
        .expect(200)

    console.log(res.body)

})