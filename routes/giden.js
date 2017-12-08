const express = require('express');
const fs = require('fs');
const request = require('request');
var router = express.Router();
var gidenArac = require('../models/gidenArac');

/* GET home page. */
router.get('/', (req, res, next) => {
  gidenArac.getGidenAraclar((err, gidenAraclar) => {
    if(err) { res.send(err) }
    else {
      res.render('giden', {
        title:'Tüm Giden Araçlar',
        gidenAraclar
      })
    } 
  });
});

router.get('/filter/:startDate/:finishDate', (req,res,next) => {
  let startDate = req.params.startDate;
  let finishDate = req.params.finishDate;
  gidenArac.getGidenAraclarFilteredByDate(startDate,finishDate,(err, gidenAraclar) => {
    if(err) { res.send(err) }
    else {
      res.render('giden', {
        title: 'Belirlenen tarihler arasında giden araçlar',
        gidenAraclar
      })
    } 
  })
});

router.get('/filter/:plaka', (req,res,next) => {
  let plaka = req.params.plaka;
  gidenArac.getGidenAracFilteredByPlate(plaka, (err, gidenAraclar) => {
    if(err) {
      res.send(err);
    } else {
      res.render('giden', {
        title: `${plaka} Plakasına Kayıtlı Çıkışlar`,
        gidenAraclar
      })
    }
  })
})

router.get('/filter/:plaka/:startDate/:finishDate', (req,res,next) => {
  let startDate = req.params.startDate;
  let finishDate = req.params.finishDate;
  let plaka = req.params.plaka;
  gidenArac.getGidenAracFilteredByPlateAndDate(plaka,startDate,finishDate,(err, gidenAraclar) => {
    if(err) {
      res.send(err);
    } else {
      res.render('giden', {
        title: `${plaka} Plakasının Belirlenen Tarihler Arasında Çıkış Bilgileri`,
        gidenAraclar
      })
    }
  })
})

router.post('/api', (req, res ,next) => {
  let plateData;
    if (!req.files)
      return res.status(400).send('No files were uploaded.');
       
    let sampleFile = req.files.sampleFile;

    sampleFile.mv('public/images/giden/filename.jpg', function(err) {
      if (err)
        return res.status(500).send(err);
          
      var formData = {
        secret_key: 'sk_845db26d9d33d66bb2045418',
        country: 'eu',
        image: fs.createReadStream('public/images/giden/filename.jpg')
      };

      request.post({url:'https://api.openalpr.com/v2/recognize', formData, json:true }, (err, res, body) => {
        if (err) {
          return console.error('upload failed:', err);
        } else {
          plateData = body.results[0].plate;
          gidenArac.addArac(plateData, (err, arac) => {
            if(err) console.log("ERR : ",err);
            return console.log("Successful! The plate has been added");
          });
        }
      });
    });
});

module.exports = router;
