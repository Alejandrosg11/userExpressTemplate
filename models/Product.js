const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    desc: String,
    price: String,
    photos:[String],
    user:Schema.Types.ObjectId,
    comments:[Schema.Types.ObjectId]

},  {
    timestamps:{
        createdAt:"created_at",
        updatedAt:"updates_at"
    }
});

module.exports = mongoose.model("Product", productSchema);