const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get a tag
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
      message: `Tags: [${tagNames.join(', ')}] found! [${tagNames.length}]`,
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR Tags not found!" });
  }
});

// get all tags
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "ERROR Tag not found!" });
      return;
    }
    res.status(200).json({tag: tagData, message: `Tag: ${tagData.tag_name} found!`});
  } catch (err) {
    res.status(500).json({ message: "ERROR Tag not found!" });
  }
});

// post new tag
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json({tags: tagData, message: `Tag ${tagData.tag_name} created!`});
  } catch (err) {
    res.status(400).json({ message: "ERROR Failed creating Tag!" });
  }
});

// put/update existing tag
router.put("/:id", async (req, res) => {
  try {
    const [numOfUpdatedRows] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (numOfUpdatedRows === 0) {
      return res.status(404).json({ message: "ERROR No Tag found!" });
    }
    const updatedTag = await Tag.findByPk(req.params.id);
    if (!updatedTag) {
      return res.status(404).json({ message: "ERROR Updated tag not found!" });
    }
    res.status(200).json({ tags: updatedTag, message: `Tag ${updatedTag.tag_name} Updated!` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "ERROR Tag failed to update!" });
  }
}); // requires updating tag AND THEN fetching the updated tag AFTER updating tag

// delete existing tag
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
