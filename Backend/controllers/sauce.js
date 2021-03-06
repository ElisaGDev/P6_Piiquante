// Importation du modèle sauce
const Sauce = require("../models/sauce");
//Permet de modifier ou supprimer un fichier
const fs = require("fs");

//Création une sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  if (sauce.userId === req.auth.userId) {
    sauce
      .save()
      .then(() => res.status(201).json({ message: "La sauce a été créée !" }))
      .catch((error) => res.status(400).json({ error }));
    console.log("La sauce a été créee", sauce);
  } else {
    res.status(401).json({ error: "userId non correct" });
  }
};

//Affichage des sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//Affichage d'une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const sauceObject = req.file
        ? {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : { ...req.body };
      if (sauceObject.userId === sauce.userId) {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
          .catch((error) => res.status(400).json({ error }));
      } else {
        res
          .status(401)
          .json({ error: "vous n'êtes pas autorisé à modifier cette sauce" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId === req.auth.userId) {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() =>
              res.status(200).json({ message: "La sauce a été supprimée !" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        res.status(401).json({
          error: "Vous n'êtes pas autorisé à supprimer cette sauce !",
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//Like & dislike d'une sauce
exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;
  const sauceId = req.params.id;
  const like = req.body.like;

  Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      const values = {
        usersLiked: sauce.usersLiked,
        usersDisliked: sauce.usersDisliked,
      };
      switch (like) {
        case 1:
          values.usersLiked.push(userId);
          break;
        case -1:
          values.usersDisliked.push(userId);
          break;
        case 0:
          if (values.usersLiked.includes(userId)) {
            const index = values.usersLiked.indexOf(userId);
            values.usersLiked.splice(index, 1);
          } else {
            const index = values.usersDisliked.indexOf(userId);
            values.usersDisliked.splice(index, 1);
          }
          break;
      }
      values.likes = values.usersLiked.length;
      values.dislikes = values.usersDisliked.length;
      Sauce.updateOne({ _id: sauceId }, values)
        .then(() => res.status(200).json({ message: "La sauce a été notée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
