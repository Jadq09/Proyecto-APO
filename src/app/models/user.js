const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { use } = require('passport/lib');

const userSchema = new mongoose.Schema({
    local: {
        user: String,
        email: String,
        password: String
    },

    facebok: {
        email: String,
        password: String,
        id: String,
        token: String
    },

    Twitter: {
        email: String,
        password: String,
        id: String,
        token: String
    },

    Google: {
        email: String,
        password: String,
        id: String,
        token: String
    },
});

userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)