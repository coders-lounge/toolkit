import mongoose from 'mongoose'

const settings = mongoose.Schema({
    serverID: { type: String, required: true },
})

export default mongoose.model('settings', settings)