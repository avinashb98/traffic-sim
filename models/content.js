const mongoose = require('mongoose');

const { Schema } = mongoose;

const ContentSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    authorId: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true,
        enum: [
            'HINDI',
            'ENGLISH',
            'BENGALI',
            'MARATHI',
            'TAMIL',
            'TELUGU',
            'KANNADA',
            'MALAYALAM',
            'GUJARATI',
            'URDU',
            'PUNJABI',
            'ODIA'
        ]
    },
    type: {
        type: String,
        required: true,
        enum: ['STORY', 'POEM', 'ARTICLE']
    },
    summary: String,
    title: String,
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('Content', ContentSchema);
