const mongoose = require('mongoose');

const db = async () => {
    try {
        const respone = await mongoose.connect(`${process.env.MONGODB_LINKS}`);
        console.log("Connected Succesfully");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = db;


