const request = require('supertest')
const app = require('../server')
const { setupDatebase, unsavedUser } = require('./fixture/db')
const User = require('../models/User')
beforeEach(setupDatebase)

test('Should signup a new user', async () => {
    await request(app)
        .post('/api/users')
        .send({
            name: 'EthanChen',
            email: 'erere@gmail.com',
            password: '123123'
        })
        .expect(200)
})

test('User model hashs password before save', async () => {
    const user = new User(unsavedUser).save()
    expect(user.password)
        .not.toBe(unsavedUser.password)
})