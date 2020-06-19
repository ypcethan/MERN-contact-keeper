const express = require('express')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const { check, validationResult } = require('express-validator')
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

        const user = new User({
            name,
            email,
            password
        })
        await user.save()
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload,JWT_SECRET, {
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