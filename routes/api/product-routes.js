const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
     /* TODO: 
          [x]: find all products
          [x]: be sure to include its associated Category and Tag data */
     try {
          const productData = await Product.findAll({
               include: [{ model: Category }, { model: Tag }],
          });
          res.status(200).json(productData);
     } catch (err) {
          res.status(500).json(err);
     }
});

// get one product
router.get("/:id", async (req, res) => {
     /* TODO: 
          [x]: find a single product by its `id`
          [x]: be sure to include its associated Category and Tag data */
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

// create new product
router.post("/", async (req, res) => {
     /* TODO: 
          // [x]: Make this async
          // [x]: Can't make more than one of the same product_name
          // [x]: Ensure product_name, price, stock ins't null
          // [x]: Check to see if leaving category and tagIds blank works
          // [x]: check README for requirements regarding this ^ */

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

// update product
router.put("/:id", async (req, res) => {
     /* TODO: 
          // [x]:  Make this async
          // [x]: Check to see if one thing can be updated per item, leaving out the rest
          // [x]: check README for requirements regarding this ^
          // [x]: Can't change the name of a product to one that already exists
          req.body should look like this...
          {
            product_name: "Basketball",
            price: 200.00,
            stock: 3,
            tagIds: [1, 2, 3, 4]
            category_id: 1
          } */

     // update product data
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

router.delete("/:id", async (req, res) => {
     /* TODO: 
          [x]: delete one product by its `id` value */
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

module.exports = router;
