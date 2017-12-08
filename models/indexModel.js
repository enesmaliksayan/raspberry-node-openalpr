const mongoose = require('mongoose');
const request = require('request');

var GelenArac = require('./gelenArac');
var GidenArac = require('./gidenArac');

let ObjectId = require('mongodb').ObjectID;

// Son 24 saatte gelen araçlar
module.exports.getSon24SaatGirisler = function (callback) {
    GelenArac.find({
        _id: {
            $gt: ObjectId.createFromTime(Date.now() / 1000 - 24 * 60 * 60)
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 24 saatte çıkan araçlar
module.exports.getSon24SaatCikislar = function (callback) {
    GidenArac.find({
        _id: {
            $gt: ObjectId.createFromTime(Date.now() / 1000 - 24 * 60 * 60)
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 haftada gelen araçlar
module.exports.getSon1HaftaGirisler = function (callback) {
    GelenArac.find({
        _id: {
            $gt: ObjectId.createFromTime(Date.now() / 1000 - 24 * 60 * 60*7)
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 haftada çıkan araçlar
module.exports.getSon1HaftaCikislar = function (callback) {
    GidenArac.find({
        _id: {
            $gt: ObjectId.createFromTime(Date.now() / 1000 - 24 * 60 * 60*7)
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 Ayda giren araçlar
module.exports.getSon1AyGirisler = function (callback) {
    GelenArac.find({
        _id: {
            $gt: ObjectId.createFromTime(Date.now() / 1000 - 24 * 60 * 60*30)
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 Ayda çıkan araçlar
module.exports.getSon1AyCikislar = function (callback) {
    GidenArac.find({
        _id: {
            $gt: ObjectId.createFromTime(Date.now() / 1000 - 24 * 60 * 60*30)
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Gelen tüm araçlar
module.exports.getHepsiGiris = function (callback) {
    GelenArac.find(callback).sort([['tarih','descending']]);
}

// Giden tüm araçlar
module.exports.getHepsiCikis = function (callback) {
    GidenArac.find(callback).sort([['tarih','descending']]);
}