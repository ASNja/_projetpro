const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
const app = express()
const mysql = require('mysql')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "_projetpro"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");


    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(upload.array())
    app.use(express.json())

    // EMPLOYES //

    // Liste tous les employes
    app.get('/employes', function(req, res) {
        // con.query('SELECT * from employe INNER JOIN conges ON conges.id_employe = employe.id', function(err, result) {
        // con.query('SELECT `employe`.*, `conges`.* FROM `employe` LEFT JOIN `conges` ON `conges`.`id_employe` = `employe`.`id`', function(err, result) {
        // con.query('SELECT * FROM employe, conges LEFT JOIN conges on employe.id = conges.id_employe', function(err, result) {
        // con.query('SELECT * FROM employe, conges LEFT JOIN conges on conges.id_employe = employe.id', function(err, result) {
        con.query('SELECT * FROM employe', function(err, result) {
            if (err) return res.json(err);
            return res.json(result);
        });
    })

    // Cree un employe
    app.post('/employe', function(req, res) {
        con.query('INSERT INTO employe (nom, prenom, age, adresse, localisation, service, poste, mail, telephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [req.body.nom, req.body.prenom, req.body.age, req.body.adresse, req.body.localisation, req.body.service, req.body.poste, req.body.mail, req.body.telephone], function(err, result) {
            if (err) return res.json(err);
            return res.json(result);
        });
    })

    // Affiche 1 employe et ses conges
    app.get('/employe/:id', function(req, res) {
        con.query('SELECT * FROM employe WHERE id = ?', [req.params.id], function(err, result) {
            if (err) return res.json(err);
            return res.json(result);
        });
    })

    // update un employe
    app.put('/employe/:id', function(req, res) {
        con.query('UPDATE employe SET nom = ?, prenom = ?, age = ?, adresse = ?, localisation = ?, service = ?, poste = ?, mail = ?, telephone = ? WHERE id = ?', [req.body.nom, req.body.prenom, req.body.age, req.body.adresse, req.body.localisation, req.body.service, req.body.poste, req.body.mail, req.body.telephone, req.params.id], function(err, result) {
            if (err) return res.json(err);
            return res.json(result);
        });
    })

    // supprime un employe
    app.delete('/employe/:id', function(req, res) {
        con.query('DELETE FROM employe WHERE id = ?', [req.params.id], function(err, result) {
            if (err) return res.json(err);
            return res.json(result);
        });
    })

    // CONGES //

    // TOUT CONGES
    app.get('/conges', function(req, res) {
        con.query('SELECT * FROM conges', function(err, result) {
            if (err) return res.json(err);
            return res.json(result);
        });
    })

    // Creation d'un conge 
    app.post('/employe/:id/conges', function(req, res) {
        con.query('INSERT INTO conges (id_employe, debut, fin) VALUES (?, ?, ?)', [req.params.id, req.body.debut, req.body.fin], function(err, result) {
            if (err) return res.json(err);
            return res.json(result);
        });
    })

    // update d'un conges
    app.put('/employe/:id/conges/:id_conges', function(req, res) {
        con.query('UPDATE conges SET debut = ?, fin = ? WHERE id = ?', [req.body.debut, req.body.fin, req.params.id_conges], function(err, result) {
            if (err) return res.json(err);
            return res.json(result);
        });
    })

    // supprimer un congés 
    app.delete('/employe/:id/conges/:id_conges', function(req, res) {
        con.query('DELETE FROM conges WHERE id = ?', [req.params.id_conges], function(err, result) {
            if (err) return res.json(err);
            return res.json(result);
        });
    })

    // JOIN

    // // Liste tous les employes
    // app.get('/employe/:id/details', function(req, res) {
    //         // con.query('SELECT * from employe INNER JOIN conges ON conges.id_employe = employe.id', function(err, result) {
    //         // con.query('SELECT `employe`.*, `conges`.* FROM `employe` LEFT JOIN `conges` ON `conges`.`id_employe` = `employe`.`id`', function(err, result) {
    //         // con.query('SELECT * FROM employe, conges LEFT JOIN conges on employe.id = conges.id_employe', function(err, result) {
    //         // con.query('SELECT * FROM employe, conges LEFT JOIN conges on conges.id_employe = employe.id', function(err, result) {
    //         // con.query('SELECT * FROM employe', function(err, result) {
    //         if (err) return res.json(err);
    //         return res.json(result);
    //     });
    // })

    app.listen(3000, function() {
        console.log('Gestion de personnel app listening on port 3000!')
    })

});