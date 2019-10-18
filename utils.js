const wordMap = require('./words.json');
const languages = require('./languages.json');

const getRandomSentence = (length) => {
    const words = Object.keys(wordMap);
    const totalWords = words.length;

    let sentence = '';
    for (let i = 0; i < length; i += 1) {
        const randomIndex = Math.floor(Math.random() * totalWords);
        sentence += words[randomIndex] + ',';
    }
    return sentence.split(',').join(' ');
};

const getRandomNumber = (min, max) => Math.floor(
    (
        Math.random() * (max - min)
    ) + min
);

const getRandomLanguage = () => {
    const randomIndex = Math.floor(Math.random() * languages.length);
    return languages[randomIndex];
}

const getRandomContentType = () => {
    const types = ['STORY', 'POEM', 'ARTICLE'];
    return types[Math.floor(Math.random() * 3)];
}

const getMockContent = () => {
    /**
     * id: {
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
        enum: languages
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
     */

    const id = getRandomNumber(10000000000, 100000000000);
    const authorId = getRandomNumber(1000000000, 10000000000);
    const language = 'ENGLISH';
    const type = getRandomContentType();
    const title = getRandomSentence(4);
    const summary = getRandomSentence(30);
    const isActive = true;

    return {
        id,
        authorId,
        language,
        type,
        title,
        summary,
        isActive,
    }
}

module.exports = {
    getRandomSentence,
    getRandomNumber,
    getRandomLanguage,
    getMockContent
};
