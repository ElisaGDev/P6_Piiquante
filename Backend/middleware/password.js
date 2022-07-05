//Importation du modèle password
const pwdSchema = require("../models/password");

//Vérification du schéma avec le mot de passe
module.exports = (req, res, next) => {
  if (!pwdSchema.validate(req.body.password)) {
    res.writeHead(
      400,
      "Mot de passe invalide: minimum 8 caractères, une majuscule, une minuscule, un chiffre, sans espace.",
      {
        "content-type": "application/json",
      }
    );
    res.end("Le format de votre mot de passe est incorrect");
  } else {
    next();
  }
};
