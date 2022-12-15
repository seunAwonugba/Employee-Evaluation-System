require("dotenv").config({ path: "../.env" });
const { connectDatabase } = require("./connect");

const { UserModel } = require("./model/user");

const userJson = require("./user.json");

const connectToDB = async (connectionString) => {
    try {
        await connectDatabase(connectionString);
        await UserModel.deleteMany();
        await UserModel.create(userJson);
        console.log("Data populated successfully");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectToDB(process.env.CONNECTION_STRING);
