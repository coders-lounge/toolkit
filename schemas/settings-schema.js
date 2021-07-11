const mongoose = require('mongoose')
const settings = mongoose.Schema({
    serverID: { type: String, required: true },
})
module.exports = mongoose.model('settings', settings)