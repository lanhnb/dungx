const { Orderx } = require("../models/orderx");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require("moment");
const { Xkld } = require("../models/xkld");
const router = require("express").Router();


//GET ORDER

router.get("/", isAdmin, async(req,res)=>{
  const query = req.query.new

  try{
    const ordersx = query ? await Orderx.find().sort({id:-1}).limit(4):
    await Orderx.find().sort({_id:-1});

    res.status(200).send(ordersx);
  }catch(err){
    console.log(err)
    res.status(500).send(err)
  }

})

router.post("/", async (req, res) => {
  const newOrderx = new Orderx({
    fullName: req.body.fullName,
    address: req.body.address,
    phoneN: req.body.phoneN,
    mesX: req.body.mesX,
    namex: req.body.namex,
    companyx: req.body.companyx,
    categoryx: req.body.categoryx,
    
  });

  try {
    const savedOrderx = await newOrderx.save();
    res.status(200).send(savedOrderx);
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE Order
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const updatedOrderx = await Orderx.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrderx);
  } catch (err) {
    res.status(500).send(err);
  }
});


//DELETE
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deleteOrdersX = await Orderx.findByIdAndDelete(req.params.id);
    res.status(200).send(deleteOrdersx);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", isUser, async (req, res) => {
  try {
    const ordersx = await Orderx.find({ userId: req.params.userId });
    res.status(200).send(ordersx);
  } catch (err) {
    res.status(500).send(err);
  }
});


//GET AN ORDERS
router.get("/findOne/:id", auth, async (req, res) => {
  try {
    const orderx = await Orderx.findById(req.params.id);
    if (orderx) {
      res.send(orderx);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  
    
  } catch (err) {
    res.status(500).send(err);
    console.log(err)
  }
});
  router.get('/:id', auth, async (req, res) => {
      const orderx = await Orderx.findById(req.params.id);
      if (orderx) {
        res.send(orderx);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    }
  );
module.exports = router;
