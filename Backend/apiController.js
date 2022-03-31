const check = require("check-types");
const jwt = require("jsonwebtoken");
module.exports = (config) => {
  return {
    signUp: async (req, res) => {
      var fields = {
        name: req.body.name,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
        role: req.body.role,
      };

      await models.User.create(fields)
        .then(() => {
          res.status(201).send("success");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send("error");
        });
    },
    login: async (req, res) => {
      const userDetails = await models.User.findOne({
        where: { userName: req.body.userName, password: req.body.password },
      });

      if (check.nonEmptyObject(userDetails)) {
        const token = jwt.sign({ email: userDetails.email }, config.secretKey, {
          expiresIn: "3h",
        });

        res.status(200).send({
          ...userDetails.dataValues,
          token: token,
        });
      } else {
        res.status(404).send("User not found! Please sign up  ");
      }
    },
    getCategoryList: async (req, res) => {
      try {
        const category = await models.Category.findAll();
        res.status(200).send(category);
      } catch (err) {
        console.log(err);
        res.status(400).send("error");
      }
    },
    addCategoryItem: async (req, res) => {
      try {
        const categoryId = await models.Category.findOne({
          where: {
            categoryName: {
              [Op.like]: "%" + req.body.category.toLowerCase() + "%",
            },
          },
          attributes: ["categoryID"],
        });
        var fields = {
          categoryID: categoryId.categoryID,
          imageName: req.body.imgName,
          imageURL: req.body.img,
          contributorID: req.user.id,
        };
        console.log(fields)
        await models.ImageDetails.create(fields)
          .then(() => {
            res.status(201).send("success");
          })
          .catch((err) => {
            console.log(err);
            res.status(400).send("error");
          });
      } catch (err) {
        console.log(err);
        res.status(400).send("error");
      }
    },
    getAllCategories: async (req, res) => {
      var filter = JSON.parse(req.query.filter);

      const categroyList = await models.Category.findAll({
        attributes: ["categoryName"],
      });
      req.query.pagination = req.query.pagination
        ? req.query.pagination - 1
        : 0;
      filter = check.nonEmptyArray(filter)
        ? filter
        : categroyList.map((category) => category.categoryName);

      try {
        const categroyList = await models.ImageDetails.findAll({
          offset: req.query.pagination * 3,
          limit: 3,
          include: [
            {
              model: models.User,
              attributes: ["name"],
              where: {
                role: "contributor",
              },
            },
            {
              model: models.Category,
              attributes: ["categoryName"],
              where: {
                categoryName: filter,
              },
            },
          ],
        });
        categroyList.forEach(async (category) => {
          category = category.dataValues;
          category.name = category.user.name;
          category.categoryName = category.categories[0].categoryName;
          delete category.user;
          delete category.categories;

          return category;
        });

        res.status(200).send(categroyList);
      } catch (err) {
        res.status(400).send(err);
      }
    },
    getContributorCategory: async (req, res) => {
      try {
        req.query.pagination = req.query.pagination
          ? req.query.pagination - 1
          : 0;
        const categroyList = await models.ImageDetails.findAll({
          where: {
            contributorID: req.user.id,
          },
          attributes: ["id", "imageName", "downloads"],
          offset: req.query.pagination * 5,
          limit: 5,
          include: [
            {
              model: models.Category,
              attributes: ["categoryName"],
            },
          ],
        });
        categroyList.forEach(async (category) => {
          category = category.dataValues;
          category.categoryName = category.categories[0].categoryName;
          delete category.categories;

          return category;
        });
        res.status(200).send(categroyList);
      } catch (err) {
        console.log(err);
        res.status(400).send("error");
      }
    },
    increaseDownloads: async (req, res) => {
      await models.ImageDetails.update(
        {
          downloads: req.body.downloads,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )
        .then((data) => {
          console.log(data);
          res.status(200).send("updated successfully");
        })
        .catch((err) => {
          console.log(err);
          res.status(400).status("Update error");
        });
    },
  };
};
