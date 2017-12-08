const mongoose = require('mongoose');
const request = require('request');

var GelenArac = require('./gelenArac');
var GidenArac = require('./gidenArac');

let ObjectId = require('mongodb').ObjectID;

// Son 24 saatte gelen araçlar
module.exports.getSon24SaatGirisler = function (callback) {
    var son24 = new Date();
    son24.setDate(son24.getDate() - 1);
    GelenArac.find({
        tarih: {
            $gt: son24
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 24 saatte çıkan araçlar
module.exports.getSon24SaatCikislar = function (callback) {
    var son24 = new Date();
    son24.setDate(son24.getDate() - 1);
    GidenArac.find({
        tarih: {
            $gt: son24
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 haftada gelen araçlar
module.exports.getSon1HaftaGirisler = function (callback) {
    var son1Hafta = new Date();
    son1Hafta.setDate(son1Hafta.getDate() - 7);
    GelenArac.find({
        tarih: {
            $gt: son1Hafta
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 haftada çıkan araçlar
module.exports.getSon1HaftaCikislar = function (callback) {
    var son1Hafta = new Date();
    son1Hafta.setDate(son1Hafta.getDate() - 7);
    GidenArac.find({
        tarih: {
            $gt: son1Hafta
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 Ayda giren araçlar
module.exports.getSon1AyGirisler = function (callback) {
    var son1Ay = new Date();
    son1Ay.setDate(son1Ay.getDate() - 30);
    GelenArac.find({
        tarih: {
            $gt: son1Ay
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 Ayda çıkan araçlar
module.exports.getSon1AyCikislar = function (callback) {
    var son1Ay = new Date();
    son1Ay.setDate(son1Ay.getDate() - 30);
    GidenArac.find({
        tarih: {
            $gt: son1Ay
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