const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema(
  {
    Id: {
      type: Number,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
    },
    identityNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(AutoIncrement, { inc_field: "Id" });

const User = mongoose.model("User", UserSchema);

module.exports = User;
