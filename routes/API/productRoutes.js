// req router for product routes
// req product model in
// req in all models to consolidate prodTagroutes and prodRoutes into one
const router = require("express").Router();
const {
  ProductModel,
  CategoryModel,
  TagModel,
  ProductTagModel,
} = require("../../models");

// get
router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.findAll({
      include: [{ model: CategoryModel }, { model: TagModel }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "ERROR Products not found!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const productID = await ProductModel.findByPk(req.params.id, {
      include: [{ model: CategoryModel }, { model: TagModel }],
    });
    !productID
      ? res.status(404).json({ message: "ERROR Product ID not found!" })
      : res.status(200).json(productID);
  } catch (err) {
    res.status(500).json({ messag: "ERROR Product ID not found!" });
  }
});

// post
router.post("/", async (req, res) => {
  try {
    const product = await ProductModel.create(req.body);
    if (req.body.tagIds.length) {
      const productTagIds = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTagModel.bulkCreate(productTagIds);
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: "ERROR creating new category!" });
  }
});

// finish put route**
// put
// router.put('/:id', async (req, res) =>{
//     try{
// if req.body.tags exists && if req.body.tags.length > 0 then
// await productTagModel to find all where product_id: contains req.params.id
// then map productTagIds to be tag_id => tag_id

// then, return newProdTag with req.body.tags
// and .filter the tag_id => !productTagIds.includes(tag_id) .map(tag_id) => returns { prodcut_id: req.params.id, tag_id}

//     const productTagsToRemove = productTags
//     .filter(({ tag_id }) => !req.body.tags.includes(tag_id))
//     .map(({ id }) => id);

//   await Promise.all([
//     ProductTag.destroy({ where: { id: productTagsToRemove } }),
//     ProductTag.bulkCreate(newProductTags),
//   ]);
//     }
// })

// delete
router.delete("/:id", async (req, res) => {
  try {
    const deletedID = await ProductModel.destroy({
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
