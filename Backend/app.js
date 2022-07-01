//Requires
const express = require("express");
const mongoose = require("mongoose");

//Chemins des routes
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

//Importation de path, donne accès au chemin du système de fichiers
const path = require("path");

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

//Configuration des routes d'API
//Intercepte toutes les requêtes qui contiennent du JSON pour le mettre à disposition sur l'objet requête dans req.body
//Remplace body parser
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

//Exportation d'express pour y avoir accès depuis les autres fichiers
module.exports = app;
