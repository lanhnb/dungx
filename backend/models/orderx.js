const mongoose = require("mongoose");

const orderxSchema = new mongoose.Schema(
  
  { 
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phoneN:{type: String, required: true },
    mesX:{type: String, required: true },
    isCall: { type: Boolean, default: false },
    namex: { type: String, required: false },
    categoryx: { type: String, required: false },
    companyx: { type: String, required: false },
    },
  {
    timestamps: true,
  }
);

const Orderx = mongoose.model("Orderx", orderxSchema);

exports.Orderx = Orderx;
