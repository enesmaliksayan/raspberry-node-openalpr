const express = require('express');
const fs = require('fs');
const request = require('request');
var router = express.Router();
var gelenArac = require('../models/gelenArac');

/* GET home page. */
router.get('/', (req, res, next) => {
  gelenArac.getGelenAraclar((err, gelenAraclar) => {
    if(err) { res.send(err) }
    else {
      res.render('gelen', {
        title:'Tüm Gelen Araçlar',
        gelenAraclar
      })
    } 
  });
});

router.get('/filter/:startDate/:finishDate', (req,res,next) => {
  let startDate = req.params.startDate;
  let finishDate = req.params.finishDate;
  gelenArac.getGelenAraclarFilteredByDate(startDate,finishDate,(err, gelenAraclar) => {
    if(err) { res.send(err) }
    else {
      res.render('gelen', {
        title: 'Belirlenen tarihler arasında gelen araçlar',
        gelenAraclar
      })
    } 
  })
});

router.get('/filter/:plaka', (req,res,next) => {
  let plaka = req.params.plaka;
  gelenArac.getGelenAracFilteredByPlate(plaka, (err, gelenAraclar) => {
    if(err) {
      res.send(err);
    } else {
      res.render('gelen', {
        title: `${plaka} Plakasına Kayıtlı Girişler`,
        gelenAraclar
      })
    }
  })
})

router.get('/filter/:plaka/:startDate/:finishDate', (req,res,next) => {
  let startDate = req.params.startDate;
  let finishDate = req.params.finishDate;
  let plaka = req.params.plaka;
  console.log("sd",startDate);
  console.log("fd",finishDate);
  console.log("p",plaka);
  gelenArac.getGelenAracFilteredByPlateAndDate(plaka,startDate,finishDate,(err, gelenAraclar) => {
    if(err) {
      res.send(err);
    } else {
      res.render('gelen', {
        title: `${plaka} Plakasının Belirlenen Tarihler Arasında Giriş Bilgileri`,
        gelenAraclar
      })
    }
  })
})

router.post('/api', (req, res ,next) => {
  let plateData;
    if (!req.files){
      res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.sampleFile;

    sampleFile.mv('public/images/gelen/filename.jpg', function(err) {
      if (err){
        res.status(500).send(err);
      }

      var formData = {
        secret_key: 'sk_845db26d9d33d66bb2045418',
        country: 'eu',
        image: fs.createReadStream('public/images/gelen/filename.jpg')
      };

      request.post({url:'https://api.openalpr.com/v2/recognize', formData, json:true }, (err, res, body) => {
        if (err) {
          res.status(500).send("OpenALPR problemi var!")
        }
        if(body.error !== '') {
          plateData = body.results[0].plate;
          gelenArac.addArac(plateData, (err, arac => {
            if(err) { res.status(500).send("Plaka bulunamadı!"); }
            res.send("Plaka kayıt edildi!");
          }));
        }
      });
    });
});

module.exports = router;
