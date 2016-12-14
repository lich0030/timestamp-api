var express = require('express')
var app = express()
var moment = require('moment')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/public', express.static(process.cwd() + '/public'))
app.get('/:query', function(req, res) {
    var date = req.params.query
    var unix = null
    var natural = null
    
    
    if (+date >= 0) {
        unix = +date
        natural = moment.unix(+date).format("MMMM D, YYYY")
    }
    
    if (isNaN(+date) && moment(date, "MMMM D, YYYY").isValid()) {
        unix = moment(date, "MMMM D, YYYY").format("X")
        natural = moment.unix(unix).format("MMMM D, YYYY")
    }
    
    var dateObj = {
        "unix": unix,
        "natural": natural
    }
    
    res.send(dateObj)
})





app.listen(8080, function() {
    console.log("listening on 8080")
})