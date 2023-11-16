const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    if (products.length === 0) {
      return res.status(404).json({ message: "ERROR; No products found!" });
    }
    const productNames = products.map(product => product.product_name);
    res.status(200).json({
      products: products,
      message: `Products: [${productNames.join(', ')}] found! [${productNames.length}]`,
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR Products not found!" });
  }
});

// get a product
router.get("/:id", async (req, res) => {
  try {
    const productID = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    !productID
      ? res.status(404).json({ message: "ERROR Product ID not found!" })
      : res.status(200).json({product: productID, message: `Product ${productID.product_name} found!`});
  } catch (err) {
    res.status(500).json({ message: "ERROR Product ID not found!" });
  }
});

// post new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIds = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIds);
    }
    res.status(200).json({product: product, message: `Product ${product.product_name} Created!`});
  } catch (err) {
    res.status(400).json({ message: "ERROR creating new product!" });
  }
});

// put/update existing product 
router.put('/:id', async (req, res) => {
  try {
    const [numOfUpdatedRows, product] = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    if (numOfUpdatedRows === 0) {
      return res.status(404).json({ message: "ERROR; Product and/or ID not found!" });
    }
    const updatedProduct = await Product.findByPk(req.params.id); // query the updated product separately
    if (!updatedProduct) {
      return res.status(404).json({ message: "ERROR; Updated product not found!" });
    }
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }));
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }
    res.status(200).json({
      product: updatedProduct,
      message: `Product ${updatedProduct.product_name} Updated!`,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// delete existing product
router.delete("/:id", async (req, res) => {
  try {
    const productToDelete = await Product.findByPk(req.params.id);
    if (!productToDelete) {
      return res.status(404).json({ message: "ERROR ID not found!" });
    }
    await Product.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      product: productToDelete,
      message: `Product: ${productToDelete.product_name} deleted!`,
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR Failed to delete product!" });
  }
});

module.exports = router;
