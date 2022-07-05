//Importation de jsonwebtoken, dotenv
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Exportation du middleware de vérification du token
module.exports = (req, res, next) => {
  try {
    //Récupération du token dans le header authorization
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
