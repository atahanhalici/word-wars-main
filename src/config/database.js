const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODBCONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true, useFindAndModify: false//aa
})
    .then(() => console.log('veritabanına bağlanıldı'))
    .catch(hata => console.log(`veritabanı baglantı hatası ${hata}`))
