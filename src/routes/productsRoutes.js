const express = require('express');
const router = express.Router(); 
const productsController = require('../controllers/productsController');
// const { route } = require('./productsRoutes');
const path = require("path");
const productValidate = require ("../middlewares/productValidatorMiddleware")
const sequelize = require("sequelize");

//Multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'public/img/uploads')
  },
  filename: function (req, file, cb){
    cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });


//Cart
router.get("/productcart", productsController.cart);

//Detail
//router.get('/product/:id', productsController.detail);
router.get("/productDetail/:id", productsController.detail); //Esta ruta permite ver el product detail

//Edit-Delete
router.get("/products/edit/:id", productsController.productEdit);
router.put("/products/edit/:id",upload.single("image"),productValidate, productsController.productEdited);
router.delete("/products/delete/:id", productsController.productDelete);

//Create Products
router.get('/products/create', productsController.productCreate);
router.post('/products/create', upload.single("image"), productValidate, productsController.productAdd);

module.exports = router;
