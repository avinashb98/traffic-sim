const Content = require('../models/content');

class DB {
    static async createContent(content) {
        return Content.create(content).then((newContent) => {
            const returnObj = { ...newContent._doc };
            delete returnObj._id;
            delete returnObj.__v;
            return returnObj;
        });
    }

    static async updateTitle(contentId, title) {
        return Content.findOneAndUpdate(
            { id: contentId },
            { title },
            { new: true, projection: { _id: 0, __v: 0 } }
        );
    }

    static async updateSummary(contentId, summary) {
        return Content.findOneAndUpdate(
            { id: contentId },
            { summary },
            { new: true, projection: { _id: 0, __v: 0 } }
        );
    }

    static async deleteContent(contentId) {
        return Content.findOneAndUpdate({ id: contentId }, { isActive: false }, { new: true });
    }
}

module.exports = DB;
