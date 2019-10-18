const mongoose = require('mongoose');

const connect = (uri) => new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    
    mongoose.connection.on('error', (err) => {
        console.error(err);
        console.error('MongoDB connection error. Please make sure MongoDB is running.');
        process.exit();
    });
    
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
        .then(() => {
            console.info('MongoDB connected successfully');
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
});

module.exports = { connect };
