const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UsersSchema = new Schema({
        name: {
                type: String,
                required: true
        },
        password : {
                type: String,
                required: true
        }
}, {timestamps: true})

const UsersAuth = mongoose.model('UsersAuth', UsersSchema)

module.exports = UsersAuth