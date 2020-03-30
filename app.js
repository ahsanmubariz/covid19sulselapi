const request = require('request-promise')
const express = require("express")
const port = process.env.PORT || 3000;
const cron = require('node-cron')
const app = express()

app.listen(port, () => {
 console.log("Server running on port 3000, created by ahsan mubariz");
});

let datayya, ODP, pdp, positif, rujukan,positifWafat,pdpWafat

 
cron.schedule('0 */4 * * *', () => {
    request({
        url: 'https://covid19.sulselprov.go.id/',
        "rejectUnauthorized": false
    }).then(function(data) {     
        datayya = JSON.parse(data.match(/var odp =.*?\n/gm).toString().replace('var odp = ','').replace(/'/g,'').replace(/;/g,''));
        ODP = JSON.parse(data.match(/var ODP =.*?\n/gm).toString().replace('var ODP = ','').replace(/'/g,'').replace(/;/g,''));
        pdp = JSON.parse(data.match(/var PDP =.*?\n/gm).toString().replace('var PDP = ','').replace(/'/g,'').replace(/;/g,''));
        positif = JSON.parse(data.match(/var POSITIF =.*?\n/gm).toString().replace('var POSITIF = ','').replace(/'/g,'').replace(/;/g,''));
        rujukan = JSON.parse(data.match(/var rujukan =.*?\n/gm).toString().replace('var rujukan = ','').replace(/'/g,'').replace(/;/g,''));
        positifWafat = JSON.parse(data.match(/var mmm =.*?\n/gm).toString().replace('var mmm = ','').replace(/'/g,'').replace(/;/g,''));
        pdpWafat = JSON.parse(data.match(/var PDPMeninggal =.*?\n/gm).toString().replace('var PDPMeninggal = ','').replace(/'/g,'').replace(/;/g,''));     
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
    positifWafat = JSON.parse(data.match(/var mmm =.*?\n/gm).toString().replace('var mmm = ','').replace(/'/g,'').replace(/;/g,''));
    pdpWafat = JSON.parse(data.match(/var PDPMeninggal =.*?\n/gm).toString().replace('var PDPMeninggal = ','').replace(/'/g,'').replace(/;/g,''));
}, function(err) {
    console.log(err);
});


    

app.get("/", (req, res, next) => {
    res.json({createdby:"2020- ahsan mubariz",datasource:'https://covid19.sulselprov.go.id/',documentation:'read https://github.com/ahsanmubariz/covid19sulselapi.git'});
});
app.get("/datakab", async (req, res, next) => {
    await res.json({result:datayya});
});
app.get("/datasebaran", async (req, res, next) => {
    await res.json({odp:ODP,pdp:pdp,positif:positif,positifWafat:positifWafat});
});
app.get("/rujukan", async (req, res, next) => {
    await res.json({rujukan:rujukan});
});
app.get("/about", async (req, res, next) => {
    await res.json({copyright:"2020, ahsan mubariz",datasource:'https://covid19.sulselprov.go.id/'});
});

app.get("/statistik", async (req, res, next) => {
    var positifCount = {},e;
    for (var i = 0,l=positif.length; i < l; i++) { 
        e = positif[i];
        positifCount[e.properties.title] = (positifCount[e.properties.title] || 0) + 1;
    }
    var odpCount = {},e;
    for (var i = 0,l=ODP.length; i < l; i++) { 
        e = ODP[i];
        odpCount[e.properties.title] = (odpCount[e.properties.title] || 0) + 1;
    }
    var pdpCount = {},e;
    for (var i = 0,l=pdp.length; i < l; i++) { 
        e = pdp[i];
        pdpCount[e.properties.title] = (pdpCount[e.properties.title] || 0) + 1;
    }
    await res.json({odp:odpCount,positif:{dirawat:positif.length,wafat:positifWafat.length},pdp:pdpCount})
});
