require("dotenv").config({ path: "../.env" });
const { connectDatabase } = require("./connect");

const { UserModel } = require("./model/user");

const managers = require("./managers.json");
let members = require("./members.json");

const connectToDB = async (connectionString) => {
    try {
        await connectDatabase(connectionString);
        const users = await UserModel.find();

        if (users.length) {
            console.log("DB already contains data");
            process.exit(0);
        }

        const insertManagers = await UserModel.insertMany(managers);

        members = members.map((member) => {
            const managerId = insertManagers.find((manager) => {
                return member.branch === manager.branch;
            })?.id;

            member.managerId = managerId;

            return member;
        });

        await UserModel.insertMany(members);
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectToDB(process.env.CONNECTION_STRING);

// await UserModel.deleteMany();
// await UserModel.create(userJson)

// const uzodinmaDocs = new UserModel({
//     firstName: "Uzodimma",
//     lastName: "Atanda",
//     email: "omolara39@isaac.gov.ng",
//     gender: "male",
//     phoneNumber: "2348122071541",
//     address: "97 Saheed Street 98258 ObiomaVille",
//     password: "uzodimma",
//     role: "manager",
// });

// const aladeDocs = new UserModel({
//     firstName: "Alade",
//     lastName: "Ehigiator",
//     email: "shalewa10@olubukola.org.ng",
//     gender: "234080141117",
//     phoneNumber: "2348122071541",
//     address: "30 Gbogboade Street 58 586 FunmilayoVille",
//     password: "ehigiator",
//     role: "manager",
// });

// const waleDocs = new UserModel({
//     firstName: "Wale",
//     lastName: "Adebayo",
//     email: "zbusari@elizabeth.net",
//     gender: "male",
//     phoneNumber: 2348113261748,
//     address: "90 Abodunrin Street 84324 ChukwuVille",
//     password: "adebayo",
//     role: "member",
// });

// const sekinatDocs = new UserModel({
//     firstName: "Sekinat",
//     lastName: "Onohinosen",
//     email: "funmilade.onohinosen@adeyemo.co",
//     gender: "female",
//     phoneNumber: 234080141117,
//     address: "86 Ajose-adeogun Street 46 153 FatimaVille",
//     password: "sekinat",
//     role: "member",
// });

// const chizobaDocs = new UserModel({
//     firstName: "Chizoba",
//     lastName: "Balogun",
//     email: "salami.obioma@hotmail.com",
//     gender: "female",
//     phoneNumber: 2348109942720,
//     address: "29 Obiageli Street 66047 AdeboyeVille",
//     password: "chizoba",
//     role: "member",
// });

// const omolaraDocs = new UserModel({
//     firstName: "Omolara",
//     lastName: "Latifat",
//     email: "omawunmi72@amaechi.biz",
//     gender: "female",
//     phoneNumber: 2348158046153,
//     address: "36 Adeyemo Street 95204 MusaVille",
//     password: "omolora",
//     role: "member",
// });

// const temitopeDocs = new UserModel({
//     firstName: "Temitope",
//     lastName: "David",
//     email: "titilayo24@lawal.com",
//     gender: "male",
//     phoneNumber: 2348053349516,
//     address: "25 Olaoluwa Street 43974 AbisolaVille",
//     password: "temitope",
//     role: "member",
// });

// const toluwaniDocs = new UserModel({
//     firstName: "Toluwani",
//     lastName: "Chibike",
//     email: "mohammed.ayobami@olubunmi.org",
//     gender: "female",
//     phoneNumber: 2348033869162,
//     address: "12 Samuel Street 36 953 JolayemiVille",
//     password: "toluwani",
//     role: "member",
// });

// //uzodima staffs
// waleDocs.managerId = uzodinmaDocs.id;
// sekinatDocs.managerId = uzodinmaDocs.id;
// chizobaDocs.managerId = uzodinmaDocs.id;

// //alade staffs
// omolaraDocs.managerId = aladeDocs.id;
// temitopeDocs.managerId = aladeDocs.id;
// toluwaniDocs.managerId = aladeDocs.id;

// await uzodinmaDocs.save();
// await aladeDocs.save();
// await waleDocs.save();
// await sekinatDocs.save();
// await chizobaDocs.save();
// await omolaraDocs.save();
// await temitopeDocs.save();
// await toluwaniDocs.save();
