const { mongoose } = require("mongoose");
const { Schema, models, model } = require("mongoose");
const user_schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
    },
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "expenses",
      },
    ],
    budget: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = models?.users || model("users", user_schema);
