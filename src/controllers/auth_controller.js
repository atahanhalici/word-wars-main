const Kelime = require("../model/kelime_model.js");
const User = require("../model/user_model.js");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const singlekelimegetir = async (req, res, next) => {
    const kelimeler = await Kelime.find();
    res.json(kelimeler);
}
const singlekelimeyolla = async (req, res, next) => {
    const eklenicek = new Kelime({
        icerik: req.body.icerik,
        sorusu: req.body.sorusu
    });
    await eklenicek.save();
    res.send('gonderildi');
}
const login = async(req, res, next) => {

  
   
       let girilenemail = req.body.email;
       let girilensifre = req.body.sifre;
    
       let userdata = await User.findOne({girilenemail:email})

       if (!userdata) {
          res.json({
            code:404,
            response:'Kayıtlı mail adresi bulunamadı.'
          })
       }else{
          if (!await bcrypt.compare(girilensifre, userdata.sifre)) {
            res.json({
                code:404,
                response:'Şifre hatalı.'
            })
          }else{
            res.json({
                code:200,
                response:userdata
            })
          }
       }



}



const register = async (req, res, next) => {

   
    // console.log(hatalarDizisi);


   


        try {
            const _user = await User.findOne({ email: req.body.email });

            if (_user && _user.emailAktif == true) {
               res.json({
                code:404,
                response:'Bu mail adresi zaten sistemlerimizde kayıtlı'
               })
            } else if ((_user && _user.emailAktif == false) || _user == null) {

                if (_user) {
                    await User.findByIdAndRemove({ _id: _user._id });
                }
               const newUser = new User({
                    email: req.body.email,
                    kullaniciadi:req.body.kullaniciadi,
                    sifre: await bcrypt.hash(req.body.sifre, 10)
                });
                await newUser.save();
               
   





                //jwt işlemleri 

                const jwtBilgileri = {
                    id: newUser.id,
                    mail: newUser.email
                };

                const jwtToken = jwt.sign(jwtBilgileri, process.env.CONFIRM_MAIL_JWT_SECRET, { expiresIn: '1d' });
                console.log(jwtToken);


                //MAIL GONDERME ISLEMLERI
                const url = process.env.WEB_SITE_URL + 'verify?id=' + jwtToken;
                console.log("gidilecek url:" + url);

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_SIFRE
                    }
                });

                await transporter.sendMail({

                    from: 'WordWars <wordwarsgame@gmail.com>',
                    to: newUser.email,
                    subject: "Emailiniz Lütfen Onaylayın",
                    text: "Emailinizi onaylamak için lütfen şu linki tıklayın: " + " " + url

                }, (error, info) => {
                    if (error) {
                        console.log("bir hata var" + error);
                    }
                    console.log("Mail gönderildi");
                    console.log(info);
                    transporter.close();
                });

                res.json({
                    code:200,
                    response:'Lütfen mail kutunuzu kontrol edin'
                })
          

            }
        } catch (err) {
            console.log("user kaydedilirken hata cıktı " + err);
        }
    





}
module.exports = {
    singlekelimegetir,
    singlekelimeyolla,
    login,
    register
}