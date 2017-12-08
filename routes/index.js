var express = require('express');
var router = express.Router();

var indexModel = require('../models/indexModel');

var son24SaatGirisler;
var son24SaatCikislar;
//var son1HaftaGirisler;
var son1HaftaCikislar;
var son1AyGirisler;
var son1AyCikislar;
var hepsiGiris;
var hepsiCikis;

router.get('/', (req,res,next) => {

  indexModel.getSon24SaatGirisler((err, gelen) => {
    if(err) res.send(err)
    son24SaatGirisler = gelen.length;
  })

  indexModel.getSon24SaatCikislar((err, gelen) => {
    if(err) res.send(err)
    son24SaatCikislar = gelen.length;
  })

  indexModel.getSon1HaftaGirisler((err, gelen) => {
    if(err) res.send(err)
    son1HaftaGirisler = gelen.length;
  })

  indexModel.getSon1HaftaCikislar((err, gelen) => {
    if(err) res.send(err)
    son1HaftaCikislar = gelen.length;
  })

  indexModel.getSon1AyCikislar((err, gelen) => {
    if(err) res.send(err)
    son1AyCikislar=gelen.length;
  })

  indexModel.getSon1AyGirisler((err, gelen) => {
    if(err) res.send(err)
    son1AyGirisler=gelen.length;
  })

  indexModel.getHepsiGiris((err,gelen) => {
    if(err) res.send(err)
    hepsiGiris = gelen.length;
  })

  indexModel.getHepsiCikis((err,gelen) => {
    if(err) res.send(err)
    hepsiCikis = gelen.length;
  })

  let iceridekiAracSayisi = parseInt(hepsiGiris - hepsiCikis);

  res.render('index', {
    son24SaatGirisler
    ,son24SaatCikislar
    ,son1HaftaGirisler
    ,son1HaftaCikislar
    ,son1AyGirisler
    ,son1AyCikislar
    ,hepsiGiris
    ,hepsiCikis
    ,iceridekiAracSayisi
  })
})

module.exports = router;
