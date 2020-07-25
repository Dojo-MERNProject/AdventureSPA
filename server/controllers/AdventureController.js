const mongoose = require("mongoose");
const Adventure = mongoose.model("Adventure");

module.exports = {
  index: (req, res) => {
    console.log("Adventure Index pinggg-ed");
    res.json({
      // Our response to this function being called
      message: "Hello Adventure",
    });
  },
};
