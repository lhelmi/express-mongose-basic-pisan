const mongoose = require('mongoose');
mongoose.connect('mongodb://turambar:123321@127.0.0.1:27017/latihan?authSource=admin', {
    //syudah tidak support di mongo6 6
    //-----\-------------/------
    // useNewUrlParser : true,
    // useUnifiedTopology : true,
    // useCreateIndex : true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error :'));
db.once('open', () => {
    console.log('server connect');
});
