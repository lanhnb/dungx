const mongoose = require("mongoose");

const nhadatSchema = new mongoose.Schema(
  {
    named: { type: String, required: true },
    categoryd: { type: String, required: true },
    area: { type: String, required: false },
    address: { type: String, required: true },
    priced: { type: Number, required: false },
    priceOffd: { type: Number, required: false },
    reviewsd: { type: Number, required: false },
    starsd: { type: Number, required: false },
    huongd: { type: String, required: false },
    image: { type: Object, required: false },
    video:{type:Object, required: false},
    info: { type: String, required: true },
  },
  { timestamps: true }
);

const Nhadat = mongoose.model("Nhadat", nhadatSchema);

exports.Nhadat = Nhadat;
