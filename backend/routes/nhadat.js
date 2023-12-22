const { Nhadat } = require("../models/nhadat");
const { isAdmin, auth } = require("../middleware/auth");
const cloudinary = require("../utils/cloudinary");




const router = require("express").Router();

//CREATE
router.post("/created", isAdmin, async (req, res) => {
  const { named, categoryd, area, starsd, address, priced, priceOffd, reviewsx, huongd, image, video, info } = req.body;

  try {
    // if (image) {
    //   const uploadedResponse = await cloudinary.uploader.upload(image, {
    //     upload_preset: "lanhnb2",
    //   });
    if (image, video) {
      const nhadat = new Nhadat({
        named,
        categoryd,
        area,
        address,
        huongd,
        reviewsx,
        starsd,
        image,
        video,
        info,
        priced,
        priceOffd,

      });
      const savedNhadat = await nhadat.save();
      res.status(200).send(savedNhadat);
    }

  }
  catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});



  
//Edit product

router.post("/", isAdmin, async (req, res) => {
  

  if (req.body.nhadatImg) {
    try {


      const destroyResponse = await cloudinary.uploads.destroy(
        req.body.nhadat.image.public_id,
        req.body.nhadat.video.public_id
      );

      if (destroyResponse) {
        const uploadedResponse = await cloudinary.uploads.upload(
          req.body.nhadatImg, req.body.nhadatVideo,
          {
            upload_preset: "lanhnbxkld",
          }
        );

        if (uploadedResponse) {
          const updatedNhadat = await Nhadat.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...req.body.nhadat,
                image, video: uploadedResponse,



              },
            },
            { new: true }
          );
          res.status(200).send(updatedNhadat);
        }

      }
    }
    catch (err) {
      res.status(500).send(err);
    }

  }
  else {
    try {
      const updatedNhadat = await Nhadat.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.nhadat,
        },
        { new: true }
      );
      res.status(200).send(updatedNhadat);
    } catch (err) {
      res.status(500).send(err);
    }
  }

});


//DELETE

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Nhadat.findByIdAndDelete(req.params.id);
    res.status(200).send("Product has been deleted...");
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET ALL PRODUCTS

router.get("/", async (req, res) => {
  const qcategory = req.query.categoryd;
  try {
    let nhadats;

    if (qcategory) {
      nhadats = await Nhadat.find({
        categoryd: qcategory,
      });
    } else {
      nhadats = await Nhadat.find();
    }

    res.status(200).send(nhadats);
  } catch (error) {
    res.status(500).send(error);
  }
});

//GET PRODUCT

router.get("/find/:id", async (req, res) => {
  try {
    const nhadats = await Nhadat.findById(req.params.id);
    res.status(200).send(nhadats);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE product

router.put("/:id", isAdmin, async (req, res) => {
  if (req.body.nhadatImg) {
    try {
      const destroyResponse = await cloudinary.uploader.destroy(
        req.body.nhadat.image.public_id
      );
      if (destroyResponse) {
        const uploadedResponse = await cloudinary.uploader.upload(
          req.body.nhadatImg,
          {
            upload_preset: "lanhnbxkld",
          }
        );
        if (uploadedResponse) {
          const updatedNhadat = await Nhadat.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                ...req.body.nhadat,
                image: uploadedResponse,
              },
            },
            { new: true }
          );
          res.status(200).send(updatedNhadat);
        }
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    try {
      const updatedNhadat = await Nhadat.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.nhadat,
        },
        { new: true }
      );
      res.status(200).send(updatedNhadat);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = router;
