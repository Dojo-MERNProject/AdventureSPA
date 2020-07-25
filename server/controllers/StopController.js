const mongoose = require("mongoose");
const Stop = mongoose.model("Stop");

module.exports = {
  index: (req, res) => {
    console.log("Stop Index pinggg-ed");
    res.json({
      // Our response to this function being called
      message: "Hello Stop",
    });
  },
};
