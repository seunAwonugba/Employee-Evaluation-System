const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validator = require("validator");

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "FirstName is required"],
        },
        lastName: {
            type: String,
            required: [true, "LastName is required"],
        },
        email: {
            type: String,
            required: [true, "Email address is required"],
            validate: [validator.default.isEmail, "Invalid email address"],
            unique: true,
            uniqueCaseInsensitive: true,
        },
        gender: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        address: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [6, "password must be at least 6 characters long"],
        },
        role: {
            type: String,
            enum: {
                values: ["member", "manager"],
                message: "{value} is not a valid role ",
            },
        },
        managerId: {
            type: mongoose.Types.ObjectId,
            default: null,
            ref: "UserModel",
        },
    },
    { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
    message: "'{VALUE}', already exist",
});

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = { UserModel };
