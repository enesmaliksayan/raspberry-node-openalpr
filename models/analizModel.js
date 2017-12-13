const mongoose = require('mongoose');
const request = require('request');

var GelenArac = require('./gelenArac');
var GidenArac = require('./gidenArac');

var mongo = require('mongodb').MongoClient;
var url = "mongodb://iot:123456@ds137530.mlab.com:37530/iotdb";

var GunAnaliz = {
    pazartesi: 0,
    sali: 0,
    carsamba: 0,
    persembe: 0,
    cuma: 0,
    cumartesi: 0,
    pazar: 0
};

var AyAnaliz = {
    ocak: 0,
    subat: 0,
    mart: 0,
    nisan: 0,
    mayis: 0,
    haziran: 0,
    temmuz: 0,
    agustos: 0,
    eylul: 0,
    ekim: 0,
    kasim: 0,
    aralik: 0
}

// Gün bazlı gelen 
module.exports.getGunAnaliz = function (callback) {
    // Options objesi
    let o = {};
    // Map işlemi - Giriş Tarih gününü haftanın yedi gününe göre haritalama yapıyoruz.
    o.map = function () {
        emit(this.tarih.getDay() + 1, 1);
    };
    // Reduce Fonksiyonu - getDate ile gruplara göre tüm sonuçlardan tek sonuç objesi çıkarıyoruz.
    o.reduce = function (key, values) {
        return values.length;
    }

    // Map reduce işlemi ile güne ait toplam girişlerin sayıları bir array'e aktarılıyor. Big data çözümü burada somutlaşır.
    GelenArac.mapReduce(o, function (err, results) {
        for (var i = 0; i < results.length; i++) {
            switch (results[i]._id) {
                case 1:
                    GunAnaliz.pazartesi = results[i].value;
                    break;
                case 2:
                    GunAnaliz.sali = results[i].value;
                    break;
                case 3:
                    GunAnaliz.carsamba = results[i].value;
                    break;
                case 4:
                    GunAnaliz.persembe = results[i].value;
                    break;
                case 5:
                    GunAnaliz.cuma = results[i].value;
                    break;
                case 6:
                    GunAnaliz.cumartesi = results[i].value;
                    break;
                case 7:
                    GunAnaliz.pazar = results[i].value;
                    break;
            }
        }
        callback(err, GunAnaliz);
    })
}

// Ay Bazlı Gelen
module.exports.getAyAnaliz = function (callback) {
    // Options objesi
    let o = {};
    // Map işlemi - Giriş Tarihini aylara göre haritalama yapıyoruz.
    o.map = function () {
        emit(this.tarih.getMonth() + 1, 1);
    };
    // Reduce Fonksiyonu - getMonth ile gruplara göre tüm sonuçlardan tek sonuç objesi çıkarıyoruz.
    o.reduce = function (key, values) {
        return values.length;
    }

    // Map reduce işlemi ile aya ait toplam girişlerin sayıları bir array'e aktarılıyor. Big data çözümü burada somutlaşır.
    GelenArac.mapReduce(o, function (err, results) {
        for (var i = 0; i < results.length; i++) {
            switch (results[i]._id) {
                case 1:
                    AyAnaliz.ocak = results[i].value;
                    break;
                case 2:
                    AyAnaliz.subat = results[i].value;
                    break;
                case 3:
                    AyAnaliz.mart = results[i].value;
                    break;
                case 4:
                    AyAnaliz.nisan = results[i].value;
                    break;
                case 5:
                    AyAnaliz.mayis = results[i].value;
                    break;
                case 6:
                    AyAnaliz.haziran = results[i].value;
                    break;
                case 7:
                    AyAnaliz.temmuz = results[i].value;
                    break;
                case 8:
                    AyAnaliz.agustos = results[i].value;
                    break;
                case 9:
                    AyAnaliz.eylul = results[i].value;
                    break;
                case 10:
                    AyAnaliz.ekim = results[i].value;
                    break;
                case 11:
                    AyAnaliz.kasim = results[i].value;
                    break;
                case 12:
                    AyAnaliz.aralik = results[i].value;
                    break;
            }
        }
        callback(err, AyAnaliz);
    })
}