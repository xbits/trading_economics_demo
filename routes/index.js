var express = require('express');
var Futures = require('futures');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Financial Plot Demo' });
});

/**
 * Unused
 * This would be the thing to use if the requests to trading economics were done on the server side
 * Since it was not explicitly requested I went with a simpler client side communication
 */
router.get('/tradingeconomicsproxy',function(req,res,next){
    var buffer = '';
    var sequence = Futures.sequence();//not sure if this was needed to handle async
    var headers = {
        'Accept': 'Application/xml',
        'Authorization': 'OAuth2 YOUR_TOKEN_VALUE'
    };
    var options = {
        host: 'api.tradingeconomics.com',
        port: 80,
        path: '/country/united%20states?c=guest%3Aguest',
        headers: headers
    };
    sequence
        .then(function(next, d) {
            http.get(options, function(result) {
                console.log('hello first')
                result.on('data', function (chunk) {
                    buffer += chunk;
                });
                result.on('end', function () {
                    res.send(buffer)
                    next(result, d);
                });

            });
        })
        .then(function(next, result, d) {
            //get more data
        })
})

module.exports = router;

