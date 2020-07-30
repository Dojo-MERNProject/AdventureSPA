const AdventureController = require("../controllers/AdventureController");
const StopController = require("../controllers/StopController");

module.exports = function (app) {
  app.get("/api/Adventure", AdventureController.index); //Works
  app.get("/api/Stop", StopController.index); // Works
};
