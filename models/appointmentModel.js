const mongoose = require('mongoose')
const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    userInfo: {
        type: Object,
        required: true
    },
    doctorInfo: {
        type: Object,
        required: true
    },
    date: {
        type: Object,
        required: true
    },
    time: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        required: true, 
        default: "pending"
    },
}, {
    timestamps: true
})

const appointmentModel = mongoose.model("appointment", appointmentSchema)
module.exports = appointmentModel