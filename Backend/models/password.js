const passwordValidator = require("password-validator");

//Créer un schéma
const pwdSchema = new passwordValidator();

//Ajoute des propriétés pour le mot de passe
pwdSchema
  .is()
  .min(8) // Minimum 8 caractères
  .is()
  .max(100) // Maximum 100 caractères
  .has()
  .uppercase() // Doit avoir au moins une lettre majuscule
  .has()
  .lowercase() // Doit avoir au moins une lettre minuscule
  .has()
  .digits() // Doit avoir au moins un chiffre
  .has()
  .not()
  .spaces() // Ne doit pas contenir d'espaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "123", "1234", "azerty"]); // Blacklister ses valeurs

// Exporter le schema du pwd
module.exports = pwdSchema;
