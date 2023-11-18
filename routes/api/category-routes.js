const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
     /* TODO: 
          [x]: find all categories
          [x]: be sure to include its associated Products */
     try {
          const categoryData = await Category.findAll({
               include: [{ model: Product }],
          });
          res.status(200).json(categoryData);
     } catch (err) {
          res.status(500).json(err);
     }
});

router.get("/:id", async (req, res) => {
     /* TODO: 
          [x]: find one category by its `id` value
          [x]: be sure to include its associated Products */
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

router.post("/", async (req, res) => {
     /* TODO: 
          [x]: create a new category */
     try {
          const categoryData = await Category.create(req.body);
          res.status(201).json(categoryData);
     } catch (err) {
          res.status(400).json(err);
     }
});

router.put("/:id", async (req, res) => {
     /* TODO: 
          [x]: update a category by its `id` value */
     try {
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

router.delete("/:id", async (req, res) => {
     /* TODO: 
          [x]: delete a category by its `id` value */
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

module.exports = router;
