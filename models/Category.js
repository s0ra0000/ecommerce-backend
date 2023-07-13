const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        required: true,
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        required: true,
    },
});

module.exports = model("category", CategorySchema);
