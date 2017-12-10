var express = require('express');
var router = express.Router();

var indexModel = require('../models/indexModel');


router.get('/', (req, res, next) => {

  indexModel.getSon24SaatGirisler((err, gelen) => {
    if (err) res.send(err)
    son24SaatGirisler = gelen.length;

    indexModel.getSon24SaatCikislar((err, gelen) => {
      if (err) res.send(err)
      son24SaatCikislar = gelen.length;

      indexModel.getSon1HaftaGirisler((err, gelen) => {
        if (err) res.send(err)
        son1HaftaGirisler = gelen.length;


        indexModel.getSon1HaftaCikislar((err, gelen) => {
          if (err) res.send(err)
          son1HaftaCikislar = gelen.length;

          indexModel.getSon1AyCikislar((err, gelen) => {
            if (err) res.send(err)
            son1AyCikislar = gelen.length;

            indexModel.getSon1AyGirisler((err, gelen) => {
              if (err) res.send(err)
              son1AyGirisler = gelen.length;

              indexModel.getHepsiGiris((err, gelen) => {
                if (err) res.send(err)
                hepsiGiris = gelen.length;

                indexModel.getHepsiCikis((err, gelen) => {
                  if (err) res.send(err)
                  hepsiCikis = gelen.length;

                  iceridekiAracSayisi = parseInt(hepsiGiris - hepsiCikis);
                  res.render('index', {
                    son24SaatGirisler
                    , son24SaatCikislar
                    , son1HaftaGirisler
                    , son1HaftaCikislar
                    , son1AyGirisler
                    , son1AyCikislar
                    , hepsiGiris
                    , hepsiCikis
                    , iceridekiAracSayisi
                  })

                  console.log('son24SaatGirisler', son24SaatGirisler);
                  console.log('son24SaatCikislar', son24SaatCikislar)
                  console.log('son1HaftaGirisler', son1HaftaGirisler)
                  console.log('son1HaftaCikislar', son1HaftaCikislar)
                  console.log('son1AyCikislar', son1AyCikislar)
                  console.log('son1AyGirisler', son1AyGirisler)
                  console.log('hepsiGiris', hepsiGiris)
                  console.log('hepsiCikis', hepsiCikis);

                })
              })
            })
          })
        })
      })

    })


  })

})

module.exports = router;