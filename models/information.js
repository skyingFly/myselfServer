const mongoose = require('mongoose')
const Schema = mongoose.Schema

let infoSchema =new Schema({
    name: "string",
    sex: "string",
    age: "number",
    school: "string",
    education: "string"
})

module.exports = mongoose.model('info', infoSchema)