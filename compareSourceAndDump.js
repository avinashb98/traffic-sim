const source = require('./exports/contents.json');
const dump = require('./exports/contents-dump.json');

if (source.length !== dump.length) {
    throw new Error('No of records not equal');
}

const equal = (a, b) => (
        a.isActive === b.isActive &&
        a.id === b.id &&
        a.authorId === b.authorId &&
        a.language === b.language &&
        a.type === b.type &&
        a.title === b.title &&
        a.summary === b.summary
    );

for (let i = 0; i < source.length; i++) {
    if (!equal(source[i], dump[i])) {
        console.log(source[i], dump[i]);
        throw new Error('Discrepancy in the source and dump document');
    }
}

console.log('Source and Dump are equal');