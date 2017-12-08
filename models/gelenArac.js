const mongoose = require('mongoose');
const request = require('request');

// Arac Schema
const gelenAracSchema = mongoose.Schema({
  plaka: {
    type: String
  },
  tarih: {
    type: Date
  }
});

const GelenArac = module.exports = mongoose.model('GelenArac', gelenAracSchema);

// Get Plates
module.exports.getGelenAraclar = function(callback){
    GelenArac.find(callback).sort([['tarih', 'descending']]);
}

// Get Plates Between Two Dates
module.exports.getGelenAraclarFilteredByDate = function(startDate, finishDate, callback) {
  GelenArac.find({
    tarih: { $gt: startDate, $lt: finishDate}
  },callback).sort([['tarih', 'descending']])
}

// Get Plates With Plate Between Two Dates
module.exports.getGelenAracFilteredByPlateAndDate = function(plaka, startDate, finishDate, callback) {
  GelenArac.find({
    tarih: { $gt: startDate, $lt: finishDate},
    plaka
  }, callback).sort([['tarih','descending']]);
}

// Get Plates With Plate
module.exports.getGelenAracFilteredByPlate = function(plaka, callback) {
  GelenArac.find({
    plaka
  }, callback).sort([['tarih','descending']]);
}

// Add Plate
module.exports.addArac = function(plaka, callback){
  let arac = {
    plaka,
    tarih:Date.now()
  }
  GelenArac.create(arac, callback);
}
