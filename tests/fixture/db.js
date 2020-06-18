const mongoose = require('mongoose')
const User = require('../../models/User')

const userOneId = new mongoose.Types.ObjectId()
const userOne =  {
    _id: userOneId,
    name:'Adam',
    email:'adam@gmail.com',
    password:'123123'
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo =  {
    _id: userTwoId,
    name:'Jane',
    email:'jane@gmail.com',
    password:'123123'
}

const unsavedUser =  {
    name:'somebody',
    email:'some@gmail.com',
    password:'12dfffd123'
}

const setupDatebase = async () =>{
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}


module.exports = {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    setupDatebase,
    unsavedUser
}