const express = require('express')
const auth = require('../middleware/auth')
const { check, validationResult  } = require('express-validator/check')
const Contact = require('../models/Contact')

const router = express.Router()
//Get all  contacts
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json({ contacts })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})
// Add contact
router.post('/', 
    [auth,
        check('name', 'Name is required').notEmpty()],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { name, email, phone, type } = req.body
        try {
            const newContact = new Contact({
                name,
                phone,
                email,
                type,
                user: req.user.id
            })
            const contact = await newContact.save()
            res.json({ contact })
        } catch (error) {
            console.log(error.message)
            res.status(500).send('Server error')
        }
    })

// update contact
router.put('/:id', auth,async (req, res) => {
    const contactFields ={...req.body} 
    try {
        let contact = await Contact.findById(req.params.id) 
        if (!contact){
            res.status(404).json({msg: 'Contact not found'})
        }
        if (req.user.id !== contact.user.toString()){
            res.status(401).json({msg: 'Not authorized'})
        }
        contact = await Contact.findByIdAndUpdate(contact.id , 
            { $set: contactFields},
            {new:true})

        res.status(400).send({contact})
    } catch (error) {
        
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


router.delete('/:id',auth ,async(req, res) => {
    try {
        const contact = await Contact.findById(req.params.id) 
        if (!contact){
            res.status(404).json({msg: 'Contact not found'})
        }
        if (req.user.id !== contact.user.toString()){
            res.status(401).json({msg: 'Not authorized'})
        }
        await Contact.findByIdAndRemove(contact.id) 

        res.status(400).send({msg: 'Removed'})
    } catch (error) {
        
        console.log(error.message)
        res.status(500).send('Server error')
    }
})
module.exports = router