const config = require('config')
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { check, validationResult } = require('express-validator/check')
const User = require('../models/User')


const router = express.Router()


router.post('/', [
    check('name', 'name is required').notEmpty(),
    check('email', 'Please include email').isEmail(),
    check('password', 'Please enter password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body
    try {
        const userDoc = await User.findOne({ email })

        if (userDoc) {
            return res.status(400).json({ msg: 'User already exist' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
        await user.save()
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
        res.status(500).send('Server error')
    }
})

module.exports = router