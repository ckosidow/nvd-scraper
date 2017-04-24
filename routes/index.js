const express = require('express');
const router = express.Router();

router.get("/", function (req, res, next) {
    res.render("index", {title: "Gro"});
});

router.get("/:name", function (req, res, next) {
    res.render(req.params.name, {title: "Gro"});
});

router.get("/partials/:name", function (req, res) {
    res.render("partials/" + req.params.name);
});

module.exports = router;