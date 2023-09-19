const express = require('express')
const router =  express.Router()
const user = require('../models/user')
const { createHash, isValidatePassword } = require('../../utils')


router.post ("/register", async(req, res) => {
    const {first_name, last_name, email, age, password } = req.body

    if(!first_name || !last_name || !email || !age || !password){
        return res.status(400).send({status: "error", payload: "missing data"})
    }
const hashedPassword =  createHash(password)

    const user = new user({
            first_name, last_name, email, age, 
            password: hashedPassword
        })

        res.send ({status: "success", payload: user})
        console.log ("usuario creado" + user)
    
})



module.exports = router