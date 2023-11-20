// COMMENT: imports required modules
const router = require("express").Router();
const { Category, Product } = require("../../models");

// COMMENT: The `/api/categories` endpoint file

// COMMENT: get all categories
router.get("/", async (req, res) => {
     try {
          const categoryData = await Category.findAll({
               include: [{ model: Product }],
          });
          res.status(200).json(categoryData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: get one category
router.get("/:id", async (req, res) => {
     try {
          const categoryData = await Category.findByPk(req.params.id, {
               include: [{ model: Product }],
          });
          if (!categoryData) {
               res.status(404).json({ message: "No category found with that id!" });
               return;
          }
          res.status(200).json(categoryData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: create a new category
router.post("/", async (req, res) => {
     try {
          const categoryName = req.body.category_name.toLowerCase();
          if (categoryName === "") {
               res.status(400).json({ message: "Please enter a category name!" });
               return;
          }
          const existingCategory = await Category.findOne({ where: { category_name: categoryName } });
          if (existingCategory) {
               res.status(400).json({ message: "Category name already exists!" });
               return;
          }
          const categoryData = await Category.create(req.body);
          res.status(201).json(categoryData);
     } catch (err) {
          res.status(400).json(err);
     }
});

// COMMENT: update a category by its `id` value
router.put("/:id", async (req, res) => {
     try {
          const categoryName = req.body.category_name.toLowerCase();
          if (categoryName === "") {
               res.status(400).json({ message: "Please enter a category name!" });
               return;
          }
          const existingCategory = await Category.findOne({ where: { category_name: categoryName } });
          if (existingCategory) {
               res.status(400).json({ message: "Category name already exists!" });
               return;
          }
          const categoryData = await Category.update(req.body, {
               where: {
                    id: req.params.id,
               },
          });
          if (!categoryData[0]) {
               res.status(404).json({ message: "No category found with that id!" });
               return;
          }
          res.status(200).json(categoryData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: delete a category by its `id` value
router.delete("/:id", async (req, res) => {
     try {
          const categoryData = await Category.destroy({
               where: {
                    id: req.params.id,
               },
          });
          if (!categoryData) {
               res.status(404).json({ message: "No category found with that id!" });
               return;
          }
          res.status(200).json(categoryData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: export router
module.exports = router;
