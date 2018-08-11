var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.


let db = require("../models");

// Each of the below routes just handles the HTML page that the user gets sent to.

// index route loads view.html
router.get("/", function (req, res) {
  res.render("index");

  console.log("you got here");
});

router.get("/api/burgers", function (req, res) {
  console.log("dbBurgers:", db.Burgers);

  db.Burgers.findAll({}).then(function (burgerObject) {
    console.log(burgerObject);
    res.json(burgerObject);
  })
});


router.post("/api/burgers/:name", function (req, res) {
  console.log("req.params", req.params.name);
  db.Burgers.create({
    burger_name: req.params.name
  }).then(function (dbPost) {
    res.status(200).end();
  })
});


router.put("/api/burgers/:id", function (req, res) {
  db.Burgers.update({
    devoured: true
  }, {
    where: {
      id: req.params.id,
    }
  }).then(function (dbUpdate) {
    res.json(dbUpdate);
  });

});


// Export routes for server.js to use.
module.exports = router;