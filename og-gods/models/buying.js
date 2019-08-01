 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

 const buyingSchema = new Schema({
     title:{
         type: String,
         required: true
     },
     description:{
         type: String,
     },
     price:{
         type: Number,
     },
     quantity: {
         type: Number,
     },
     user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
 });

 module.exports = mongoose.model("Buying", buyingSchema);