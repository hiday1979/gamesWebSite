var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'GamesWebSite' });
});

/* GET users table page. */
/*
router.get('/initDb', function(req, res, next) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
            return res.render('error', {
                error: err,
                message: err.message
            });
        }
        var SQL = "CREATE TABLE users(id SERIAL UNIQUE, userName TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL)";
        client.query(SQL, function(err, result) {
            if (err) {
                return res.render('error', {
                    error: err,
                    message: err.message
                });
            }
            done();
            res.render('index', { title: "succeesfully added users table" });
        });
    });
});
*/

/* POST Add Users page. */
router.post('/addUser', function(req, res, next) {
    //
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;


    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
            return res.render('error', {
                error: err,
                message: err.message
            });
        }
        var SQL = "INSERT INTO users(firstName, lastName, email, password) VALUES($1, $2, $3, $4);";
        client.query(SQL, [firstName, lastName, email, numOfChild], function(err, result) {
            if (err) {
                return res.render('error', {
                    error: err,
                    message: err.message
                });
            }
            done();
            res.render('login', {
                title: "succeesfully added user",
                users: result.rows

            });
        });
    });
});
module.exports = router;