const mongoose = require('mongoose');
const request = require('request');

var GelenArac = require('./gelenArac');
var GidenArac = require('./gidenArac');

let ObjectId = require('mongodb').ObjectID;

var today = new Date();
var son24 = new Date();
var son1Ay = new Date();
var son1Hafta = new Date();

// Son 24 saatte gelen araçlar
module.exports.getSon24SaatGirisler = function (callback) {
    son24.setDate(today.getDate() - 1);
    GelenArac.find({
        tarih: {
            $gt: son24 
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 24 saatte çıkan araçlar
module.exports.getSon24SaatCikislar = function (callback) {
    son24.setDate(today.getDate() - 1);
    GidenArac.find({
        tarih: {
            $gt: son24 
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 haftada gelen araçlar
module.exports.getSon1HaftaGirisler = function (callback) {
    son1Hafta.setDate(today.getDate() - 7);
    GelenArac.find({
        tarih: {
            $gt: son1Hafta
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 haftada çıkan araçlar
module.exports.getSon1HaftaCikislar = function (callback) {
    son1Hafta.setDate(today.getDate() - 7);
    GidenArac.find({
        tarih: {
            $gt: son1Hafta
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 Ayda giren araçlar
module.exports.getSon1AyGirisler = function (callback) {
    son1Ay.setMonth(today.getMonth() -1)
    GelenArac.find({
        tarih: {
            $gt: son1Ay
        }
    }, callback).sort([['tarih', 'descending']]);
}

// Son 1 Ayda çıkan araçlar
module.exports.getSon1AyCikislar = function (callback) {
    son1Ay.setMonth(today.getMonth() -1)
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