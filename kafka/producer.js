const config = require('../config');
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({kafkaHost: config.KAFKA_BROKER_URL});
const producer = new Producer(client);

producer.on('ready', () => {
    console.log('producer is ready');
});

producer.on('error', (err) => {
    console.log('Error in producer');
    console.log(err);
});

module.exports = producer;
