const utils = require('./utils');
const db = require('./services/db');

const activeContents = [];

class Actions {

    getAllContentFields() {
        return {
            id: null,
            authorId: null,
            language: null,
            type: null,
            title: null,
            summary: null,
            isActive: null,
            createdAt: null,
            updatedAt: null
        }
    }

    getRandomFieldToUpdate() {
        const fields = ['summary', 'title'];
        return fields[Math.floor(Math.random() * 2)];
    }

    getRandomContent() {
        return activeContents[Math.floor(Math.random() * activeContents.length)];
    }

    create() {
        const content = utils.getMockContent();
        return db.createContent(content)
            .then((newContent) => {
                activeContents.push(newContent.id);
                const returnObj = {
                    actionType: 'CREATE',
                    fields: [
                        'id',
                        'authorId',
                        'language',
                        'type',
                        'title',
                        'summary',
                        'isActive',
                        'createdAt',
                        'updatedAt'
                    ],
                    payload: newContent,
                    id: newContent.id
                };
                return returnObj;
            });
    }

    update() {
        if (activeContents.length === 0) return;

        const field = this.getRandomFieldToUpdate();
        const contentId = this.getRandomContent();
        const updateObj = this.getAllContentFields();
        const randomSummary = utils.getRandomSentence(30);
        const randomTitle = utils.getRandomSentence(4);

        return field === 'summary'
            ? db.updateSummary(
                contentId,
                randomSummary
                ).then(() =>{
                    updateObj.summary = randomSummary;
                    const returnObj = {
                        actionType: 'UPDATE',
                        fields: [ 'summary' ],
                        payload: updateObj,
                        id: contentId
                    };
                    return returnObj;
                })
            : db.updateTitle(
                contentId,
                randomTitle
                ).then(() => {
                    updateObj.title = randomTitle;
                    updateObj.id = contentId;
                    const returnObj = {
                        actionType: 'UPDATE',
                        fields: [ 'title' ],
                        payload: updateObj,
                        id: contentId
                    };
                    return returnObj;
                });
    }

    delete() {
        if (activeContents.length === 0) return;

        const contentId = this.getRandomContent();
        const updateObj = this.getAllContentFields();

        return db.deleteContent(contentId)
            .then(() => {
                const index = activeContents.indexOf(contentId);
                activeContents.splice(index, 1);
            })
            .then(() => {
                updateObj.isActive = false;
                updateObj.id = contentId;
                const returnObj = {
                    actionType: 'DELETE',
                    fields: [ 'isActive' ],
                    payload: updateObj,
                    id: contentId
                };
                return returnObj;
            });
    }
}

module.exports = Actions;
