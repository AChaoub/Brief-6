const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

//-----------------------------------> Partie Hanane Kaaba

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/Accueil.html'))
})

app.get('/inscription', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/Inscription.html'))
})

app.post('/register', (req, res) => {
    let utilisateur = {
        Nom: req.body.lastName,
        Prenom: req.body.firstName,
        Cin: req.body.cin,
        Birth: req.body.BirthDate,
        Email: req.body.email,
        Password: req.body.password
    }

    var usersData = fs.readFileSync('InfoUtilisateur.json', 'utf-8');
    var arrayOfObjects = JSON.parse(usersData)
    arrayOfObjects.push(utilisateur)

    fs.writeFileSync('InfoUtilisateur.json', JSON.stringify(arrayOfObjects, null, 2))

    res.json('Vous avez inscrit avec succés');
})

//----------------------------------------------> Partie Achraf Chaoub

// Recuperation Questions -----> ouvrir Fichier Questions.
var data = fs.readFileSync('Questions.json');
var array = JSON.parse(data);

// Recuperation Service -----> ouvrir Fichier Service.
var data1 = fs.readFileSync('Service.json');
var array1 = JSON.parse(data1);

app.get('/service', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/Service.html'));
})

//Recuperer descp.
app.get("/displayDes", displayDes);
function displayDes(req, res) {
    res.send(array1);
}

//Remplir liste service.
app.get("/Remplir", RemplirListeService);
function RemplirListeService(req, res) {
    res.send(array1);
}
//ajouter des services a l'interface
app.get("/AjouterService", AjouterServiceInterf);
function AjouterServiceInterf(req, res) {
    res.send(array1);
}

// Cas de Methode GET
app.get('/stocker', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/Service.html'))
})

// Methode POST -----> Reception donnees 
app.post('/stocker', (req, res) => {
    // Recuperer la description d'un service choisi
    var Combo = req.body.ConBox;
    var x;
    for (var i = 0; i < data.length; i++) {
        if (Combo == i) {
            x = i;
            // des = data[i].description;
        }
    }
    console.log(x);
    //Ajout De Question
    array.push({
        "id": array.length + 1,
        "nom": Combo,
        "description": req.body.textZone

    });
    // Sauvgarde Dans un fichier JSON
    var arrayJson = JSON.stringify(array, null, 2);
    fs.writeFile("Questions.json", arrayJson, "utf-8", function (err) {
        if (err) throw err
        console.log("done");
    });
    // en cas de reussite;
    res.sendFile(path.resolve(__dirname, 'public/Service.html'));
})



//Sauvergarder un service dans Un JSOn
app.post('/stockerService', (req, res) => {
    //Ajout De Question
    array1.push({
        "id": array1.length + 1,
        "nom": req.body.NomS,
        "description": req.body.DesS

    });
    // Sauvgarde Dans un fichier JSON
    var arrayJson1 = JSON.stringify(array1, null, 2);
    fs.writeFile("Service.json", arrayJson1, "utf-8", function (err) {
        if (err) throw err
        console.log("done");
    });
    // en cas de reussite;
    res.sendFile(path.resolve(__dirname, 'public/Service.html'));
})


app.listen(7070, function () {
    console.log('Hello')
})