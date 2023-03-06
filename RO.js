const mongoose = require('mongoose');

const roSchema = mongoose.Schema({
    userName:{
        type: String,
        default: "dummy"
    },
    phno: {
        type: String,
        default: "0000000000"
    },
    reason:{
        type: String,
        default: "nothing"
    },
    trust: {
        type: Boolean,
        default: false
    },
    feedback: {
        type: String,
        default: "nothing"
    },
    isVerified: {
        type:Boolean,
        default: false
    }
})

module.exports = mongoose.model('Return', roSchema);