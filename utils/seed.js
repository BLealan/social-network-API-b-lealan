const connection = require('../config/connection');
const { User } = require('../models');
const userData = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('===== SEED CONNECTED =====');
    // let thoughtCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
    // if (thoughtCheck.length) {
    //     await connection.dropCollection('thought');
    // }

    await User.insertMany(userData);
    // await Thought.insertMany(thought);

    console.table(userData);
    // console.table(thought);
    console.info('===== DATA SEEDED =====');
    process.exit(0);
});