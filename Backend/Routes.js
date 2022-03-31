module.exports = (app) => {
  const jwt = require("jsonwebtoken");
  const config = require("./config/config.json");

  const verifyToken = async (req, res, next) => {
    var token = null;
    if (
      req.header("Authorization") &&
      req.header("Authorization").split(" ").length > 1
    )
      token = req.header("Authorization").split(" ")[1];

    if (!token) {
      res.status(403).send("auth token required");
    } else {
      try {
        const decoded = jwt.verify(token, config.secretKey);
        const userDetails = await models.User.findOne({
          where: { email: decoded.email },
        });
        req.user = userDetails;
        return next();
      } catch (err) {
        console.log(err);
        res.status(401).send("invalid token");
      }
    }
  };

  const apiController = require("./apiController")(config);

  app.post("/signUp", apiController.signUp);
  app.post("/login", apiController.login);
  app.get("/getCategoryList", [verifyToken, apiController.getCategoryList]);
  app.post("/addCategory", [verifyToken, apiController.addCategoryItem]);
  app.get("/getAllCategories", [verifyToken, apiController.getAllCategories]);
  app.get("/getContributorCategory", [verifyToken, apiController.getContributorCategory]);
  app.put("/increaseDownloads", [verifyToken, apiController.increaseDownloads]);
};
