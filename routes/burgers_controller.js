var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.


let db = require("../models");

// Each of the below routes just handles the HTML page that the user gets sent to.

// index route loads view.html
router.get("/", function (req, res) {
  res.render("index");
});

router.get("/api/burgers", function (req, res) {
  console.log("dbBurgers:", db.Burgers);

  db.Burgers.findAll({}).then(function (burgerObject) {
    res.json(burgerObject);
  })
});


router.post("/api/burgers/:name", function (req, res) {
  console.log("req.params", req.params.name);
  db.Burgers.create({
    burger_name: req.params.name
  }).then(function (dbPost) {
    res.json(dbPost);
  })
});


router.put("/api/burgers/:id", function (req, res) {
  db.Burgers.update({
    devoured: true
  }, {
    where: {
      id: req.params.id,
    },
    returning: true,
    plain: true
  }).then(function (dbUpdate) {
    res.json(dbUpdate);
  });

});

router.delete("/api/delete", function (req, res) {
  db.Burgers.destroy({
    where: {}
  }).then(function(dbDelete){
    res.json(dbDelete);
  })
});

router.delete("/api/delete:id", function (req, res) {
  db.Burgers.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbDelete){
    res.json(dbDelete);
  })
})


// Export routes for server.js to use.
module.exports = router;