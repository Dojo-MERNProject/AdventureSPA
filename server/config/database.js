const mongoose = require("mongoose");

mongoose
// Connect to local MongoDB client
  .connect("mongodb://localhost/AdventureSPA", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Established a connection to the database"))
  .catch((err) =>
    console.log("Something went wrong when connecting to the database", err)
  );

  // Load Models
require("../models/Adventure");
require("../models/Stop");
