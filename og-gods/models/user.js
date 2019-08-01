const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    permission: {
        type: String,
        enum: ["Amin","Guest"]
    },
    joined: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", userSchema)