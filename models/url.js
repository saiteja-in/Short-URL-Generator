const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
  },
  {
    timestamps: true,
  }
);
const URL=mongoose.model('url',urlSchema); // here 'url is just the model name 
module.exports=URL;


// The urls collection in your short-url database is likely created by Mongoose when you define and use the URL model in your application. Mongoose automatically creates a collection in MongoDB based on the model name, and it pluralizes the name by default.