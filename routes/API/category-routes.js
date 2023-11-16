const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const category = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "ERROR; Category not found!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!category) {
      res.status(404).json({ message: "ERROR; ID not found!" });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: "ERROR finding ID!" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory, { message: "Category Created!"});
  } catch (err) {
    res.status(400).json({ message: "ERROR creating new category!" });
  }
});

// if update = no req.body where req.params.id exists,, then error, else return update as res.json object
// ternary expression for conditional
router.put("/:id", async (req, res) => {
  try {
    const updatedCat = await Category.update(req.body, {
      where: { id: req.params.id },
    });
    !updatedCat[0]
      ? res.status(404).json({ message: "ERROR; ID not found!" })
      : res.status(200).json(updatedCat && { message: "Category Updated!"});
  } catch (err) {
    res.status(500).json({ message: "ERROR updating Category ID!" });
  }
});

// if deletedCat doesn't exists = is not the target for destroy() using req.params.id, then error, else return promise of number of rows of deletedCat as res.json object
// ternary expression for conditional
router.delete("/:id", async (req, res) => {
  try {
    const deletedCat = await Category.destroy({
      where: { id: req.params.id },
    });
    !deletedCat
      ? res.status(404).json({ message: "ERROR ID not found!" })
      : res.status(200).json(deletedCat);
  } catch (err) {
    res.status(500).json({ message: "ERROR deleting category!" });
  }
});

module.exports = router;
