const express = require('express')
const userRouter = require('./routes/users')
const contactRouter = require('./routes/contacts')
const authRouter = require('./routes/auth')
const connectDB = require('./db/db')

connectDB()
const app = express()


app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
    res.json({
        msg: 'Hello'
    })
})

app.use('/api/users', userRouter)
app.use('/api/contacts', contactRouter)
app.use('/api/auth', authRouter)

module.exports = app