const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });

    if (tagData.length === 0) {
      return res.status(404).json({ message: "ERROR; No tags found!" });
    }
    const tagNames = tagData.map(tag => tag.tag_name);
    res.status(200).json({
      tags: tagData,
      message: `Tags: ${tagNames.join(', ')} found!`,
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR Tags not found!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
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

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "ERROR Failed creating Tag!" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    !updated[0]
      ? res.status(404).json({ message: "ERROR No Tag found!" })
      : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "ERROR Tag failed to update!" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tagToDelete = await Tag.findByPk(req.params.id); 
    if (!tagToDelete) {
      return res.status(404).json({ message: "ERROR No Tag found!" });
    }
    await Tag.destroy({
      where: { id: req.params.id },
    });  
    res.status(200).json({
      tag: tagToDelete,
      message: `Tag ${tagToDelete.tag_name} deleted!`,
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR failed to delete Tag!" });
  }
});

module.exports = router;
