// COMMENT:imports the required modules
const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// COMMENT: The `/api/products` endpoint

// COMMENT: get all products
router.get("/", async (req, res) => {
     try {
          const productData = await Product.findAll({
               include: [{ model: Category }, { model: Tag }],
          });
          res.status(200).json(productData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: get one product
router.get("/:id", async (req, res) => {
     try {
          const productData = await Product.findByPk(req.params.id, {
               include: [{ model: Category }, { model: Tag }],
          });
          if (!productData) {
               res.status(404).json({ message: "No product found with that id!" });
               return;
          }
          res.status(200).json(productData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: create new product
router.post("/", async (req, res) => {
     try {
          // Check if all necessary properties are present and not empty
          if (!req.body.product_name || !req.body.price || !req.body.stock) {
               res.status(400).json({
                    message: "Please provide product_name, price, and stock in the following format encased in curly brackets. catergory_id and tagIds are optional.",
                    product_name: "Basketball",
                    price: 200.0,
                    stock: 3,
                    category_id: 1,
                    tagIds: [1, 2, 3, 4],
               });
               return;
          }
          const productName = req.body.product_name.toLowerCase();

          if (productName === "") {
               res.status(400).json({ message: "Please enter a product name!" });
               return;
          }
          const existingProduct = await Product.findOne({ where: { product_name: productName } });
          if (existingProduct) {
               res.status(400).json({ message: "Product already exists!" });
               return;
          }
          const product = await Product.create(req.body);
          // if there's product tags, we need to create pairings to bulk create in the ProductTag model
          if (req.body.tagIds && req.body.tagIds.length) {
               const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                         product_id: product.id,
                         tag_id,
                    };
               });
               const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
               return res.status(200).json(productTagIds);
          }
          // if no product tags, just respond
          res.status(200).json(`${productName} has been added to the database!`);
     } catch (err) {
          // console.log(err);
          res.status(400).json(err);
     }
});

// COMMENT: update a category by its `id` value
router.put("/:id", async (req, res) => {
     try {
          const existingProduct = await Product.findOne({ where: { product_name: req.body.product_name } });
          if (existingProduct) {
               res.status(400).json({
                    message: "Product name already exists!",
                    product_name: existingProduct.product_name,
                    id: existingProduct.id,
               });
               return;
          }

          const product = await Product.update(req.body, {
               where: {
                    id: req.params.id,
               },
          });
          if (req.body.tagIds && req.body.tagIds.length) {
               const productTags = await ProductTag.findAll({
                    where: { product_id: req.params.id },
               });

               // create filtered list of new tag_ids
               const productTagIds = productTags.map(({ tag_id }) => tag_id);
               const newProductTags = req.body.tagIds
                    .filter((tag_id) => !productTagIds.includes(tag_id))
                    .map((tag_id) => {
                         return {
                              product_id: req.params.id,
                              tag_id,
                         };
                    });

               // figure out which ones to remove
               const productTagsToRemove = productTags
                    .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                    .map(({ id }) => id);

               // run both actions
               await Promise.all([
                    ProductTag.destroy({ where: { id: productTagsToRemove } }),
                    ProductTag.bulkCreate(newProductTags),
               ]);
          }

          return res.json(product);
     } catch (err) {
          // console.log(err);
          res.status(400).json(err);
     }
});

// COMMENT: delete a category by its `id` value
router.delete("/:id", async (req, res) => {
     try {
          const productData = await Product.destroy({
               where: {
                    id: req.params.id,
               },
          });
          if (!productData) {
               res.status(404).json({ message: "No product found with that id!" });
               return;
          }
          res.status(200).json(productData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// COMMENT: Exports modules
module.exports = router;
