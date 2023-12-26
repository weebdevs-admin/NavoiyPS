let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// post Model
let GallerySchema = require("../Models/Gallery");

router.get("/", async (req, res, next) => {
  try {
    const data = await GallerySchema.find().exec();
    res.json(data);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Statist.findById(clientId); 

    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
        
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.route("/create").post(async (req, res, next) => {
  try {
    const data = await GallerySchema.create(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});




// Update post
router.route("/update/:id").put(async (req, res, next) => {
  try {
    const data = await GallerySchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});


// Delete post
router.route("/delete/:id").delete(async (req, res, next) => {
  try {
    const data = await GallerySchema.findByIdAndDelete(req.params.id);
    if (data) {
      res.status(200).json({
        msg: "Post deleted successfully",
      });
    } else {
      res.status(404).json({
        msg: "Post not found",
      });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
