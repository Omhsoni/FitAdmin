const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    age: Number,
    height: Number,
    weight: Number,
    membership_period: Number,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;