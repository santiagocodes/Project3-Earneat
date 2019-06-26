const express = require('express');
const path = require('path');
const server = express();
const connection = require('./conf');
const bodyParser = require('body-parser');
//const sha1 = require('sha1'); //new
const port = process.env.PORT || 8000;


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
    })
);

server.set("port", port); // informar al serv que puerto se está usando

server.use('/', express.static(path.join(__dirname, '/build')));

//----------------------------- USER ----------------------------------------

server.get('/api', (req, res) => {
    res.write('GET    /api/users             List of users\n');
    res.write('GET    /api/users/:id     User details.\n');
    res.write('\n');
    res.write('POST   /api/login            Log in.\n');
    res.end();
})

server.get('/api/users', (req, res) => {
    connection.query('SELECT * from user', (err, results) =>{
        if (err) {
            console.log(err)
            res.status(500).send(err.message);
        } else {
            res.json(results);
        }
    });
});

server.get('/api/user/:id', (req, res) => {
    connection.query('SELECT * from user WHERE id= ?', [req.params.userid], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message);
        } else {
            res.json(results && results[0]);
        }
    });
})

server.post('/api/user', (req, res) => {
    const formData = req.body;
    // const salt = "0X(PkJ%49nm09 75NUN6I$2]]0m6h95x";
            // const data = {
            //     name: req.body.name,
            //     email: req.body.email,
            //     hash: 
            // }
    
    // {
    //     username: "bob@hola.com"
    //     hash: "l784hf78ao8a7w4g4ybsdf7"   --> sha1(password + salt) 
    // }
        connection.query('INSERT INTO user SET ?', formData, (err, results) => {
            if (err) {
                console.log(err);
                res.results(500).send('There is an error');
            } else {
                res.sendStatus(200);
            }
        });
});

server.patch('/api/user/:id', (req, res) => {

    //{email: password:}

    const idUser = req.params.id;
    const formData = req.body;
        connection.query('UPDATE user SET ? WHERE id = ?', [formData, idUser], err => {
            if (err) {
                console.log(err);
                res.status(500).send("Error");
            } else {
                res.sendStatus(200);
            }
        });
});


//---------------------------------- LOG IN/ LOG OFF -----------------------------------------

server.post('/api/login', (req, res) => {
    if (Math.random() > 0.5) {
        return res.sendStatus(200); // Login ok
    } else {
        return res.sendStatus(404); // Login error
    }
});

server.post('/api/logoff', (req, res) => {
    if (Math.random() > 0.5) {
        return res.sendStatus(200); // Logoff ok
    } else {
        return res.sendStatus(404); // Logoff error
    }
});


//------------------------------------ VOTE ----------------------------------------


server.post('/api/votos', (req, res) => {
    const formData = req.body;
        connection.query('INSERT INTO votos SET ?', formData, (err, results) => {
            if (err) {
                console.log(err);
                res.results(500).send('You can post your vote')
            } else {
                res.sendStatus(200);
            }
        });
});


//------------------------------- PREMIO ---------------------------------------------

server.get('/api/premios', (req, res) => {
    connection.query('SELECT * from premios', (err, results) => {
        if (err) {
            console.log(err)
            res.status(500).send(err.message);
        } else {
            res.json(results);
        }
    });
});

server.post('/api/premios', (req, res) => {
    const formData = req.body;
    connection.query('INSERT into premios SET ?', formData, (err, results) => {
        if (err) {
            console.log(err);
            res.results(500).send('Error');
        } else {
            res.sendStatus(200);
        }
    });
});

server.patch('api/premios/:id', (req, res) => {
    const idPremio = req.params.id;
    const formData = req.body;
        connection.query('UPDATE premio SET ? WHERE id = ?', [formData, idPremio], err => {
            if (err) {
                res.status(500).send('Error');
            } else {
                res.sendStatus(200);
            }
        });
});

server.on("error", (e) => console.log(e))

server.listen(port, () => { 
    console.log('This is on port ' + port);
})