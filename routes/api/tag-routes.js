// COMMENT: imports the required modules
const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// COMMENT: The `/api/tags` endpoint

// COMMENT: get all tags
router.get("/", async (req, res) => {
     try {
          const tagData = await Tag.findAll({
               include: [{ model: Product }],
          });
          res.status(200).json(tagData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: get one tag by its `id` value
router.get("/:id", async (req, res) => {
     try {
          const tagData = await Tag.findByPk(req.params.id, {
               include: [{ model: Product }],
          });
          if (!tagData) {
               res.status(404).json({ message: "No tag found with that id!" });
               return;
          }
          res.status(200).json(tagData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: create a new tag
router.post("/", async (req, res) => {
     try {
          const tagName = req.body.tag_name.toLowerCase();
          if (tagName === "") {
               res.status(400).json({ message: "Please enter a tag name!" });
               return;
          }
          const existingTag = await Tag.findOne({ where: { tag_name: tagName } });
          if (existingTag) {
               res.status(400).json({ message: "Tag name already exists!" });
               return;
          }
          const tagData = await Tag.create(req.body);
          res.status(201).json(tagData);
     } catch (err) {
          res.status(400).json(err);
     }
});

// COMMENT: update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
     try {
          const tagName = req.body.tag_name.toLowerCase();
          if (tagName === "") {
               res.status(400).json({ message: "Please enter a tag name!" });
               return;
          }
          const existingTag = await Tag.findOne({ where: { tag_name: tagName } });
          if (existingTag) {
               res.status(400).json({ message: "Tag name already exists!" });
               return;
          }
          const tagData = await Tag.update(req.body, {
               where: {
                    id: req.params.id,
               },
          });
          if (!tagData[0]) {
               res.status(404).json({ message: "No tag found with that id!" });
               return;
          }
          res.status(200).json(tagData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: delete on tag by its `id` value
router.delete("/:id", async (req, res) => {
     try {
          const tagData = await Tag.destroy({
               where: {
                    id: req.params.id,
               },
          });
          if (!tagData) {
               res.status(404).json({ message: "No tag found with that id!" });
               return;
          }
          res.status(200).json(tagData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: export router
module.exports = router;
