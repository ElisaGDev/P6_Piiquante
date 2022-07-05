//Importation d'express
const express = require("express");

//Permets de créer des routes individuelles
const router = express.Router();

//Importation des dépendances nécessaires
const userCtrl = require("../controllers/user");
const validationPassword = require("../middleware/password");

//Routes pour signup et login
router.post("/signup", validationPassword, userCtrl.signup);
router.post("/login", userCtrl.login);

//Exportation du modèle
module.exports = router;
