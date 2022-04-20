const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: "You need to provide a pizza name!",
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: String,
      required: true,
      // enum: stands for enumerable, a popular term in web development that refers to a set of data that can be iterated over
      enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
      default: "Large",
    },
    toppings: [],
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`:
    id: false,
  }
);

PizzaSchema.virtual("commentCount").get(function () {
  // using the .reduce() method to tally up the total of every comment with its replies. In its basic form, .reduce() takes two parameters, an accumulator and a currentValue. Here, the accumulator is total, and the currentValue is comment. As .reduce() walks through the array, it passes the accumulating total and the current value of comment into the function, with the return of the function revising the total for the next iteration through the array.
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
