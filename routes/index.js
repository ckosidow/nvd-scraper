const express = require('express');
const router = express.Router();

var http = require('https');
var fs = require('fs');
var AdmZip = require('adm-zip');

router.get("/", function (req, res, next) {
    res.render("index", {title: "Gro"});

    var file = fs.createWriteStream("out.json.zip");
    var request = http.get("https://static.nvd.nist.gov/feeds/json/cve/1.0/nvdcve-1.0-recent.json.zip", function(response) {
        response.pipe(file);

        response.on("end", function() {
            var zip = new AdmZip("./out.json.zip");

            zip.extractAllTo("./out", true);
        });
    });
});

router.get("/showUpdates", function (req, res, next) {
    fs.readFile('./out/nvdcve-1.0-recent.json', 'utf8', function (err,data) {
        if (err) {
            res.write(err);
        }

        res.write(data);
        res.end();
    });
});

router.get("/:name", function (req, res, next) {
    res.render(req.params.name, {title: "DepWatch"});
});

router.get("/partials/:name", function (req, res) {
    res.render("partials/" + req.params.name);
});

module.exports = router;