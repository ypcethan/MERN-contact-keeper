const request = require('supertest')
const app = require('../server')
const User = require('../models/User')


const userOne =  {
    name:'Adam',
    email:'adam@gmail.com',
    password:'123123'
}
beforeEach(async () => {
    await User.deleteMany()
})
// }
// test('Should signup a new user' , async()=>{
//     await request(app)
//         .post('/api/users')
//         .send({
//             name:'EthanChen',
//             email:'erere@gmail.com',
//             password:'123123'
//         })
//         .expect(200)
// })

test('User model hashs password before save', async () => {
    const user = new User(userOne).save()
    expect(user.password)
        .not.toBe(userOne.password)
})