const AdventureController = require('../controllers/AdventureController');
const StopController = require('../controllers/StopController');

module.exports = function(app){
  // Stops
  app.get('/api/Stop',StopController.index); // Works

  // Adventures
  app.get('/api/Adventure',AdventureController.index); //Works
}