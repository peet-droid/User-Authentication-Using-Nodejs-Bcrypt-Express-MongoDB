const express = require('express')
const fetch = require('node-fetch')
const mongoose = require('mongoose')

const UsersAuth = require('./models/Schema')

const axios = require('axios')

const app = express()

const bcrypt = require('bcrypt')

app.use(express.json())

const uri = 'mongodb://localhost:27017/mydb'
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })


// var users
// fetch('http://localhost:8088/users')
//                 .then(res => res.json())
//                 .then(json => users = json)

app.get('/', (req, res) => {
        res.json(users)
})

app.post('/users', async (req, res) => {
        var found = await UsersAuth.findOne({ name: req.body.name })
        console.log(found)
        if (found == null) {
                try {
                        const salt = await bcrypt.genSalt()
                        const hashPassword = await bcrypt.hash(req.body.password, salt)
                        console.log(salt)
                        console.log(hashPassword)
                        const newUser = new UsersAuth({
                                name: req.body.name, password: hashPassword
                        })

                        newUser.save()
                                .then(result => {
                                        console.log(result)
                                })
                                .catch(err => {
                                        console.log(err)
                                })
                }
                catch {
                        res.status(500).send()
                }
        }





        // var found = users.find(u => u.name === newUser.name && u.password === newUser.password)

        // if(found == null){
        //         users.push(newUser)

        //         axios.post('http://localhost:8088/users', newUser)
        //         .then(response => {
        //                 res.send(newUser)
        //         })
        //         .catch(err => {
        //                 res.send(err)
        //         })
        // }

        // else{
        //         res.send('user exists')
        // }


})

app.listen(3000, function () {
        console.log('listening on port 3000')
})