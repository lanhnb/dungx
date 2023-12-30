const mongoose = require("mongoose");

const xkldSchema = new mongoose.Schema(
  {
    namex: { type: String, required: true },
    categoryx: { type: String, required: true },
    companyx: { type: String, required: false },
    descriptionx: { type: String, required: true },
    reviewsx: { type: Number, required: false },
    timex: { type: Date, required: false },
    starsx: { type: Number, required: false },
    salaryx: { type: String, required: false },
    infox: { type: String, required: true },
    image: { type: Object, required: false },
    video:{type:Object, required: false},
   
  },
  { timestamps: true }
);

const Xkld = mongoose.model("Xkld", xkldSchema);

exports.Xkld = Xkld;
