var express = require('express');
var router = express.Router();
var pg = require('pg');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        title: 'GamesWebSite'
    });
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
        var SQL = "CREATE TABLE users(id SERIAL UNIQUE, firstName TEXT, lastName TEXT, userName TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL)";
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
    var userName = req.body.userName;
    var email = req.body.email;
    var password = req.body.password;


    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
            return res.render('error', {
                error: err,
                message: err.message
            });
        }
        var SQL = "INSERT INTO users(firstName, lastName, userName, email, password) VALUES($1, $2, $3, $4, $5);";
        client.query(SQL, [firstName, lastName, userName, email, password], function(err, result) {
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

/* GET Users page. */
router.get('/users', function(req, res, next) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
            return res.render('error', {
                error: err,
                message: err.message
            });
        }
        var SQL = "SELECT * FROM users ORDER BY firstName";
        client.query(SQL, function(err, result) {
            if (err) {
                return res.render('error', {
                    error: err,
                    message: err.message
                });
            }

            done();
            // res.json({users:result.rows});
            res.render('users', {
                title: "Users List",
                users: result.rows
            });
        });
    });
});

/* log in*/
router.post('/login', function(req, res, next) {

            var email = req.body.email;
            var password = req.body.password;

            pg.connect(process.env.DATABASE_URL, function(err, client, done) {
                        if (err) {
                            return res.render('error', {
                                error: err,
                                message: err.message
                            });
                        }
                        var SQL = "SELECT email, password FROM users WHERE email=$1;";
                        client.query(SQL, [email], function(err, result) {
                            if (err) {
                                return res.render('error', {
                                    error: err,
                                    message: err.message
                                });
                            }
                            done();
                            /*
                            if (email == users: result.email || password == users: result.password) {
                                */
                            res.render('index', {
                                title: "succeesfully added user",
                                users: result.rows
                            });

                        });

                        module.exports = router;