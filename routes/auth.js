const config = require('config')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')
const User = require('../models/User')


const router = express.Router()

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        res.status(500).send('Server error')
    }
})

router.post('/', [
    check('email', 'Please include email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ msg: 'Invalid credentials' })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({ msg: 'Invalid credentials' })
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })
    } catch (err) {
        console.log(err.message)
        console.log('err')
        res.status(500).send('Server error')
    }
})
module.exports = router