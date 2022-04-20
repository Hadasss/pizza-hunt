const { Pizza } = require("../models");

const pizzaController = {
  // the functions will go here as methods

  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      // To populate a field with the data we want, we chain the .populate() method onto the query, passing in an object with the key path and the value of the field we want populated.
      .populate({
        path: "comments",
        // select: The minus sign "-" in front of the field indicates that we don't want it to be returned. If we didn't have it, it would return **only** the __v field.
        select: "-__v",
      })
      .select("-__v")
      // to sort in DESC order by the _id value. This gets the newest pizza because a timestamp value is hidden in the MongoDB ObjectId.
      .sort({ _id: -1 })
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id
  // Instead of accessing the entire req, we've destructured params out of it
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza was found with this id" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create pizza
  // we destructure the body out of the Express.js req object because we don't need to interface with any of the other data it provides.
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.status(400).json(err));
  },

  // update pizza
  updatePizza({ params, body }, res) {
    // {new: true} will return the updated document. without it mongoose will return the original document.
    Pizza.findByIdAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza was found with this id" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete pizza
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza was found with this id" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
