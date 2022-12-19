require("dotenv").config({ path: "../.env" });
const { connectDatabase } = require("./connect");

const { UserModel } = require("./model/user");

const managers = require("./managers.json");

const members = require("./members.json");

const connectToDB = async (connectionString) => {
    try {
        await connectDatabase(connectionString);
        await UserModel.deleteMany();

        const createManagers = await UserModel.create(managers);

        members.map((member) => {
            for (let i in createManagers) {
                if (member.branch == createManagers[i].branch) {
                    member.managerId = createManagers[i].id;
                }
            }
        });

        await UserModel.create(members);

        const findUser = await UserModel.find();
        console.log(findUser);

        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectToDB(process.env.CONNECTION_STRING);
