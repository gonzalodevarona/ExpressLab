import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    username: String,
    identification: {
        type: String,
        number: Number,
    },
    password: String,
    active: Boolean,
})

const User = mongoose.model('User', userSchema)

export default User;
