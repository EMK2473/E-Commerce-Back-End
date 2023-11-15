const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "ERROR Products not found!" });
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    const productID = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    !productID
      ? res.status(404).json({ message: "ERROR Product ID not found!" })
      : res.status(200).json(productID);
  } catch (err) {
    res.status(500).json({ messag: "ERROR Product ID not found!" });
  }
});

// create new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds.length) {
      const productTagIds = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIds);
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "ERROR creating new category!" });
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    // Update product data
    const [numOfUpdatedRows, product] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true, // Return the updated product
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      // Find existing product tags
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });

      // Create filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }));

      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    res.json({ numOfUpdatedRows, product});
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedID = await Product.destroy({
      where: { id: req.params.id },
    });
    !deletedID
      ? res.status(404).json({ message: "ERROR ID not found!" })
      : res.status(200).json(deletedID);
  } catch (err) {
    res.status(500).json({ message: "ERROR Failed to delete product!" });
  }
});

module.exports = router;
