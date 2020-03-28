var cheerio = require('cheerio')
var request = require('request-promise')
var express = require("express")
var port = process.env.PORT || 3000;
var app = express()

app.listen(port, () => {
 console.log("Server running on port 3000, created by ahsan mubariz");
});

let datayya, ODP, pdp, positif, rujukan
var cron = require('node-cron');
 
cron.schedule('59 23 * * *', () => {
    request({
        url: 'https://covid19.sulselprov.go.id/',
        "rejectUnauthorized": false
    }).then(function(data) {     
        datayya = JSON.parse(data.match(/var odp =.*?\n/gm).toString().replace('var odp = ','').replace(/'/g,'').replace(/;/g,''));
        ODP = JSON.parse(data.match(/var ODP =.*?\n/gm).toString().replace('var ODP = ','').replace(/'/g,'').replace(/;/g,''));
        pdp = JSON.parse(data.match(/var PDP =.*?\n/gm).toString().replace('var PDP = ','').replace(/'/g,'').replace(/;/g,''));
        positif = JSON.parse(data.match(/var POSITIF =.*?\n/gm).toString().replace('var POSITIF = ','').replace(/'/g,'').replace(/;/g,''));
        rujukan = JSON.parse(data.match(/var rujukan =.*?\n/gm).toString().replace('var rujukan = ','').replace(/'/g,'').replace(/;/g,''));
    
    }, function(err) {
        console.log(err);
    });
});

request({
    url: 'https://covid19.sulselprov.go.id/',
    "rejectUnauthorized": false
}).then(function(data) {     
    datayya = JSON.parse(data.match(/var odp =.*?\n/gm).toString().replace('var odp = ','').replace(/'/g,'').replace(/;/g,''));
    ODP = JSON.parse(data.match(/var ODP =.*?\n/gm).toString().replace('var ODP = ','').replace(/'/g,'').replace(/;/g,''));
    pdp = JSON.parse(data.match(/var PDP =.*?\n/gm).toString().replace('var PDP = ','').replace(/'/g,'').replace(/;/g,''));
    positif = JSON.parse(data.match(/var POSITIF =.*?\n/gm).toString().replace('var POSITIF = ','').replace(/'/g,'').replace(/;/g,''));
    rujukan = JSON.parse(data.match(/var rujukan =.*?\n/gm).toString().replace('var rujukan = ','').replace(/'/g,'').replace(/;/g,''));

}, function(err) {
    console.log(err);
});
app.get("/datakab", async (req, res, next) => {
    await res.json({result:datayya});
});
app.get("/datasebaran", async (req, res, next) => {
    await res.json({odp:ODP,pdp:pdp,positif:positif});
});
app.get("/rujukan", async (req, res, next) => {
    await res.json({rujukan:rujukan});
});
app.get("/about", async (req, res, next) => {
    await res.json({copyright:"2020, ahsan mubariz",datasource:'https://covid19.sulselprov.go.id/'});
});
