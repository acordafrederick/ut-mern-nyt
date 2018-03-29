var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HistorySchema = new Schema({
  topic: {
    type: String
  },
  url: {
  	type: String
  },
  date: {
    type: Date
  },
  dateSaved: {
  	type: Date
  }
});

var History = mongoose.model("History", HistorySchema);
module.exports = History;
