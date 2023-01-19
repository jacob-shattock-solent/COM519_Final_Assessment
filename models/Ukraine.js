const mongoose = require("mongoose");
const { Schema } = mongoose;
const ukraineSchema = new Schema(
    {
      equipment: String,
      model: String,
      losses_total: Number,
      captured: Number,
      destroyed: Number,
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Ukraine", ukraineSchema);