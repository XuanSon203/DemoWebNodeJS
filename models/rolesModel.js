const mongoose = require("mongoose");



const Schema = mongoose.Schema;

const rolesSchema = new Schema(
    {
        title: String,
        description: String,
        permisstion: {
            type: Array,
            default: []
        },
        deleted: { type: Boolean, default: false },
        deleteAt: Date,
    },
    {
        timestamps: true,
    }
);
const Role = mongoose.model("roles", rolesSchema);
module.exports = Role;
