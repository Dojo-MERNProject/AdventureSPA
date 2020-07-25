const mongoose = require("mongoose");

const AdventureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Adventure name must be at least 3 characters in length"],
    },
    stops: {}, // Nested array of Stop Subdocuments
  },
  { timestamps: true }
);

mongoose.model("Adventure",AdventureSchema);