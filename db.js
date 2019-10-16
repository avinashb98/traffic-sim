const mongoose = require('mongoose');

const connect = () => new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    let uri = 'mongodb://localhost:27017/traffic-sim';
    
    mongoose.connection.on('error', (err) => {
        logger.error(err);
        logger.error('MongoDB connection error. Please make sure MongoDB is running.');
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
