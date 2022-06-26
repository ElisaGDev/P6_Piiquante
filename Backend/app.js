//Requires
const express = require("express");
const mongoose = require("mongoose");

//Lancement d'express
const app = express();

//Connexion à MongoDB
mongoose
  .connect(
    "mongodb+srv://Lili10:MangoEli10@cluster0.iae4dcv.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//En-tête CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Intercepte toutes les requêtes qui contiennent du JSON pour le mettre à disposition sur l'objet requête dans req.body
//Remplace body parser
app.use(express.json());

module.exports = app;
