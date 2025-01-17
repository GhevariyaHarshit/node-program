const express = require("express")
const verifyToken = require("../middlewares/authMiddlewares")
const authorizeRoles = require("../middlewares/roleMiddleware")
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Product = require("../models/productModel")
// const products  = require("./productRoutes")
// const {products,createProduct,product,updateProduct,deleteProduct} = require("../controllers/productController")
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/products')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  const upload = multer({ storage: storage })
//only admin can access this router
router.get("/admin/product",verifyToken,authorizeRoles("admin"),async(req,res)=>{
    // const product = await Product.find()
    // res.json({message:"Welcome admin",product});
    // console.log("hello",product)
    const ProductSearching = req.query.ProductSearching;
    const startPrice = parseFloat(req.query.startPrice);
    const endPrice = parseFloat(req.query.endPrice);
    const category = req.query.categorySearching;
    console.log(ProductSearching)
    try {
        let query = {};
        if (ProductSearching) {
            query.name = { $regex: ProductSearching, $options: 'i' };
        }
        if(category){
            query.name = {$regex: categorySearching, $options: 'i'};
        }
        if (!isNaN(startPrice) && !isNaN(endPrice)) {
            query.price = { $gte: startPrice, $lte: endPrice };
        }
        const products = await Product.find(query);
        res.json({ products });
        console.log("{}{}{}{}}{}",products)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})
router.post("/admin",verifyToken,authorizeRoles("admin"),upload.single("image"),async(req,res)=>{
    let BodyData = req.body;
    if (req.file && req.file.filename) {
        req.body.image = req.file.filename ;
    }
    const product = await Product.create(BodyData);
    res.status(201).json({
        message : "Product created !",
        product
    })
})
router.get("/admin/:id",verifyToken,authorizeRoles("admin"),async(req,res)=>{
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
})
router.put("/admin/update/:id",verifyToken,authorizeRoles("admin"),upload.single("image"),async(req,res)=>{
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product id not found" });
    }
    if (req.file && req.file.filename) {
        if (product.image) {
            const oldImagePath = path.join(__dirname, '../assets/products', product.image);
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error("Error deleting old image:", err);
                }
            });
        }
        req.body.image = req.file.filename;
    }
    const productData = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.json({message:"successfully record update",productData})
})
router.delete("/admin/delete/:id",verifyToken,authorizeRoles("admin"),async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        res.status(404).json({message:"Product not found"})
    }
    if (product.image) {
        const oldImagePath = path.join(__dirname, '../assets/products', product.image);
        fs.unlink(oldImagePath, (err) => {
            if (err) {
                console.error("Error deleting old image:", err);
            }
        });
    }
    await Product.deleteOne(product)
    res.status(200).json({message:"successfully record delete",product})
})
router.post("admin/upload",verifyToken,authorizeRoles("admin"),async(req,res)=>{
})
//onlu user can access this router
router.get("/user",verifyToken,authorizeRoles("admin","user"),async(req,res)=>{
    const products = await Product.find()
    res.status(200).json({message:"Welcome user",products})
})
module.exports = router