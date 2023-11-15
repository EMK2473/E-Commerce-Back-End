// req router for tag routes
// req tag model in
const router = require("express").Router();
const { TagModel, ProductModel } = require("../../models");

//get
router.get("/", async (req, res) => {
  try {
    const tagData = await TagModel.findAll({
      include: [{ model: ProductModel }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "ERROR Tag not found!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await TagModel.findByPk(req.params.id, {
      include: [{ model: ProductModel }],
    });
    if (!tagData) {
      res.status(404).json({ message: "ERROR Tag not found!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "ERROR Tag not found!" });
  }
});

//post
router.post("/", async (req, res) => {
  try {
    const tagData = await TagModel.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "ERROR Failed creating Tag!" });
  }
});

// put
router.put("/:id", async (req, res) => {
  try {
    const updated = await TagModel.update(req.body, {
      where: { id: req.params.id },
    });
    !updated[0]
      ? res.status(404).json({ message: "ERROR No Tag found!" })
      : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "ERROR Tag failed to update!" });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await TagModel.destroy({ where: { id: req.params.id } });
    !deleted
      ? res.status(404).json({ message: "ERROR No Tag found!" })
      : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "ERROR failed to delete Tag!" });
  }
});

module.exports = router;
