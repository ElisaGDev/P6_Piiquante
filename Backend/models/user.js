//Importation de mongoose, unique validator
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//Schéma pour l'email et le mot de passe avec email unique
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//Application d'uniqueValidator sur le schéma
userSchema.plugin(uniqueValidator);

//Exportation du modèle
module.exports = mongoose.model("User", userSchema);
