const { Xkld } = require("../models/xkld");
const { isAdmin, auth } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");




const router = require("express").Router();

//CREATE
router.post("/create", isAdmin, async (req, res) => {
  const { namex, categoryx, companyx, starsx, descriptionx, timex, reviewsx, colorsx, salaryx, image, video, infox } = req.body;

  try {
    // if (image) {
    //   const uploadedResponse = await cloudinary.uploader.upload(image, {
    //     upload_preset: "lanhnb2",
    //   });
    if (image, video) {
      const xkld = new Xkld({
        namex,
        categoryx,
        companyx,
        descriptionx,
        salaryx,
        reviewsx,
        starsx,
        timex,
        image,
        video,
        infox,

      });
      const savedXkld = await xkld.save();
      res.status(200).send(savedXkld);
    }

  }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


//Edit product

router.post("/", isAdmin, async (req, res) => {
  // const { name, brand, desc, price, image } = req.body;

  if (req.body.xkldImg) {
    try {


      const destroyResponse = await cloudinary.uploads.destroy(
        req.body.xkld.image.public_id,
        req.body.xkld.video.public_id
      );

      if (destroyResponse) {
        const uploadedResponse = await cloudinary.uploads.upload(
          req.body.xkldImg, req.body.xkldVideo,
          {
            upload_preset: "lanhnbxkld",
          }
        );

        if (uploadedResponse) {
          const updatedXkld = await Xkld.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...req.body.xkld,
                image, video: uploadedResponse,



              },
            },
            { new: true }
          );
          res.status(200).send(updatedXkld);
        }

      }
    }
    catch (err) {
      res.status(500).send(err);
    }

  }
  else {
    try {
      const updatedXkld = await Xkld.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.xkld,
        },
        { new: true }
      );
      res.status(200).send(updatedXkld);
    } catch (err) {
      res.status(500).send(err);
    }
  }

});


//DELETE

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Xkld.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  const qcategory = req.query.categoryx;
  try {
    let xklds;

    if (qcategory) {
      xklds = await Xkld.find({
        categoryx: qcategory,
      });
    } else {
      xklds = await Xkld.find();
    }

    res.status(200).send(xklds);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const xkld = await Xkld.findById(req.params.id);
    res.status(200).send(xkld);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE product

router.put("/:id", isAdmin, async (req, res) => {
  if (req.body.xkldImg) {
    try {
      const destroyResponse = await cloudinary.uploader.destroy(
        req.body.xkld.image.public_id
      );
      if (destroyResponse) {
        const uploadedResponse = await cloudinary.uploader.upload(
          req.body.xkldImg,
          {
            upload_preset: "lanhnbxkld",
          }
        );
        if (uploadedResponse) {
          const updatedXkld = await Xkld.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...req.body.xkld,
                image: uploadedResponse,
              },
            },
            { new: true }
          );
          res.status(200).send(updatedXkld);
        }
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const updatedXkld = await Xkld.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.xkld,
        },
        { new: true }
      );
      res.status(200).send(updatedXkld);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = router;
