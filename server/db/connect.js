const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectDatabase = (connectionString) => {
    return mongoose.connect(connectionString);
};

module.exports = { connectDatabase };
