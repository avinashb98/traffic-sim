const consumer = require('./kafka/consumer');
const config = require('./config');
const db = require('./db');
const dbMethods = require('./services/db');

(async () => {
    try {
        const uri = `${config.MONGODB_URI}/traffic-sim-dump`;
        await db.connect(uri);
    } catch (error) {
        console.log(error);
    }

    const reflectChanges = async (message) => {
        const payload = JSON.parse(message.value);
        const {
            eventType,
            fields,
            payload: contentObj
        } = payload;
        const contentId = contentObj.id;
        console.log(eventType);

        const updateDbFieldMap = {
            'summary': dbMethods.updateSummary,
            'title': dbMethods.updateTitle
        }

        switch(eventType) {
            case 'CREATE':
                await dbMethods.createContent(contentObj);
                break;
            case 'UPDATE':
                {
                    for (let field of fields) {
                        const updatedField = contentObj[field];
                        await updateDbFieldMap[field](contentId, updatedField);
                    }
                }
                break;
            case 'DELETE':
                await dbMethods.deleteContent(contentId);
                break;
        }
    }

    consumer.on('message', reflectChanges);
})();