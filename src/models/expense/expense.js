const { mongoose } = require("mongoose");
const { Schema, models, model } = require("mongoose");
const user_schema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    expense_title: {
      type: String,
      required: true,
    },
    emoji: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

export const Expense = models?.expenses || model("expenses", user_schema);
