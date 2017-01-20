var express = require('express');
var router = express.Router();
var pg = require('pg');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', {
        title: 'GamesWebSite'
    });
});

/* GET index page. */
/*
router.get('/index', function(req, res, next) {
    res.render('index', {
        title: 'GamesWebSite'
    });
});
*/

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
/*
router.post('/login', function(req, res, next) {
 
    var userName = req.body.lg_username;
    var password = req.body.lg_password;

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
            return res.render('error', {
                error: err,
                message: err.message
            });
        };
        var SQL = "SELECT userName, password FROM users WHERE userName=$1;";
        client.query(SQL, [userName], function(err, result) {

            return res.json(result);
            
            if (err) {
                return res.render('error', {
                    error: err,
                    message: err.message
                })
            };
            done();
           if (userName == "" || password == "") {
                return res.render('error', {
                    error: err,
                    message: "You forgat the username or password"
                })
            }
            
          else  if (userName == 1 && password == 1){
            res.render('index', {
                title: result.rows[0].email
             })
           } 
           
           else {res.render('index', {
                  title: result.rows[0]
             })
           }             
    
    });
  });
});
*/

router.post('/login', function(req, res, next) {
 
    var userName = req.body.lg_username;
    var password = req.body.lg_password;

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
            return res.render('error', {
                error: err,
                message: err.message
            });
        };
        //var SQL = "SELECT /*userName, password FROM users WHERE userName=$1;";
        var SQL = "SELECT username,password FROM users WHERE username=$1";
        client.query(SQL,[userName],  function(err, result) {

           /* return res.json(result);*/
            if (err) {
                return res.render('error', {
                    error: err,
                    message: err.message
                })
            };
            done();
           if (userName == "" || password == "") {
                return res.render('login', {
                    title: "You forgat the username or password"
                })
            }
            
         // else  if (userName == result.rows.username && password == result.rows[1]){
            res.render('index', {
                title: "Wellcame"+ result.rows.username
             })
           } 
)})});

module.exports = router;