const config = require('../config');
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: config.KAFKA_BROKER_URL});
const consumer = new Consumer(
    client,
    [
        { topic: 'pratilipi-bus' }
    ],
    {
        groupId: 'trafic-consumer-test',
        autoCommit: true
    }
);
module.exports = consumer;
