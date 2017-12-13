var express = require('express');
var router = express.Router();

var analizModel = require('../models/analizModel');

var GunAnalizSonuclari;
var AyAnalizSonuclari;

router.get('/', (req, res, next) => {
  analizModel.getGunAnaliz((err, GunAnaliz) => {
    if (err) {
      res.send(err);
    } else {
      GunAnalizSonuclari = GunAnaliz;
    }

    analizModel.getAyAnaliz((err, AyAnaliz) => {
      if (err) {
        res.send(err);
      } else {
        AyAnalizSonuclari = AyAnaliz;
      }
      console.log("GunAnaliz:" , GunAnalizSonuclari);
      console.log("AyAnaliz",AyAnalizSonuclari);
      res.render('analiz', {
        GunAnalizSonuclari,
        AyAnalizSonuclari
      });
    })
  })

})

module.exports = router;