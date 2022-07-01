// Importation de mongoose
const mongoose = require("mongoose");

//Création d'un schéma de données d'une sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String },
  description: { type: String },
  mainPepper: { type: String },
  imageUrl: { type: String },
  heat: { type: Number, min: 1, max: 10 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array },
  usersDisliked: { type: Array },
});

//Exportation du modèle
module.exports = mongoose.model("sauce", sauceSchema);
