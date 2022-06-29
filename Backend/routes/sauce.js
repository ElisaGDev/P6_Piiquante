//Importation d'express
const express = require("express");
//Permets de créer des routes individuelles
const router = express.Router();

//Importation du controller sauce
const sauceCtrl = require("../controllers/sauce");
//Importation du middleware d'authentification à utiliser sur toutes les routes
const auth = require("../middleware/auth");
//Importation du middleware multer pour gestion enregistrement images, après 'auth'
const multer = require("../middleware/multer");

//Configuration des routes
//Ajout d'une sauce, obligation de s'authentifier + multer qui gère les images
router.post("/", auth, multer, sauceCtrl.createSauce);
//Affichage de toutes les sauces dans la base données
router.get("/", auth, sauceCtrl.getAllSauces);
//Affichage d'une sauce gràce à son id
router.get("/:id", auth, sauceCtrl.getOneSauce);
//Modification d'une sauce
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
//Suppression une sauce
router.delete("/:id", auth, sauceCtrl.deleteSauce);

module.exports = router;
