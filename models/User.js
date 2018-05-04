const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    username: String,
    profilePic:String,
    email: {
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER"
    },
    bio:String,
    products:[Schema.Types.ObjectId]

}, {
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updates_at"
    }
});
userSchema.plugin(PassportLocalMongoose, {usernameField:"email"});
module.exports = mongoose.model("User", userSchema);
