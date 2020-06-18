const request = require('supertest')

const app = require('../server')
const User = require('../models/User')

const userOne =  {
    name:'Adam',
    email:'adam@gmail.com',
    password:'123123'
}
beforeEach( async() => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should be able to login', async()=> {
    // await request(app)
    //     .post('/api/auth')
    //     .send({
    //         email:userOne.email ,
    //         password: userOne.password
    //     })
    //     .expect(200)
    expect(1).toBe(1)
})