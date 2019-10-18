const db = require('./db');
const Actions = require('./actions');
const actionGenerator = new Actions();
const producer = require('./kafka/producer');

(async () => {
    try {
        const uri = `${config.MONGODB_URI}/traffic-sim`;
        await db.connect(uri);
    } catch (error) {
        console.log(error);
    }

    const actions = [
        actionGenerator.create,
        actionGenerator.update,
        actionGenerator.delete
    ];

    const getRandomAction = () => {
        return actions[Math.floor(Math.random() * actions.length)].bind(actionGenerator);
    }

    const trials = 10;

    for (let i = 0; i < trials; i += 1) {
        const message = await getRandomAction()();
        if (message) {
            const payload = [
                {
                    topic: 'pratilipi-bus',
                    messages: JSON.stringify({
                        eventType: message.actionType,
                        fields: message.fields,
                        payload: message.payload
                    }),
                    key: message.id
                }
            ];
            producer.send(payload, () => {});
        }
    }

})();
