const mongoose = require('mongoose');
const request = require('request');

// Arac Schema
const gidenAracSchema = mongoose.Schema({
  plaka: {
    type: String
  },
  tarih: {
    type: Date
  }
});

const GidenArac = module.exports = mongoose.model('GidenArac', gidenAracSchema);

// Get Plates
module.exports.getGidenAraclar = function(callback){
    GidenArac.find(callback).sort([['tarih', 'descending']]);
}

// Get Plates Between Two Dates
module.exports.getGidenAraclarFilteredByDate = function(startDate, finishDate, callback) {
  GidenArac.find({
    tarih: { $gt: startDate, $lt: finishDate}
  },callback).sort([['tarih', 'descending']])
}

// Get Plates With Plate Between Two Dates
module.exports.getGidenAracFilteredByPlateAndDate = function(plaka, startDate, finishDate, callback) {
  GidenArac.find({
    tarih: { $gt: startDate, $lt: finishDate},
    plaka
  }, callback).sort([['tarih','descending']]);
}

// Get Plates With Plate
module.exports.getGidenAracFilteredByPlate = function(plaka, callback) {
  GidenArac.find({
    plaka
  }, callback).sort([['tarih','descending']]);
}

// Add Plate
module.exports.addArac = function(plaka, callback){
  let arac = {
    plaka,
    tarih:Date.now()
  }
  GidenArac.create(arac, callback);
}
