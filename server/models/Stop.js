const mongoose = require("mongoose");

// Single event within the adventure (itinerary)
const StopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      minlength: [3, "Type name must be at least 3 characters in length"],
    },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
  },
  { timestamps: true }
);
mongoose.model("Stop",StopSchema);