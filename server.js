const express = require('express')
const userRouter = require('./routes/users')
const contactRouter = require('./routes/contacts')
const authRouter = require('./routes/auth')
const connectDB = require('./config/db')
const app = express()
connectDB()

const PORT = process.env.PORT || 5000


app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
    res.json({
        msg: 'Hello'
    })
})

app.use('/api/users', userRouter)
app.use('/api/contacts', contactRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(
        `Server started on port ${PORT}`
    )
})