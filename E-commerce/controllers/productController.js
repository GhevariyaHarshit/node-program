// const Product = require("../models/productModel")

// const products = async(req,res)=>{
//     const products = await Product.find()
//     res.status(200).json({message:"Show all products",products})
// }

// const createProduct = async(req,res)=>{
//     const BodyData = req.body;
//     console.log(req.body)
//     if (req.file && req.file.filename) {
//         req.body.image = req.file.filename ;
//     }
//     const product = await Product.create(BodyData);
//     res.status(201).json({
//         message : "Product created !",
//         product
//     })
//     console.log("bodyB",BodyData)
// }

// const product = async(req,res)=>{
//     const product = await Product.findById(req.params.id)
//     res.status(200).json(product)
// }

// const updateProduct = async(req,res)=>{
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//         return res.status(404).json({ message: "Product id not found" });
//     }
//     // If a new image is uploaded, delete the old one from the local folder
//     if (req.file && req.file.filename) {
//         if (product.image) {
//             const oldImagePath = path.join(__dirname, '../assets/products', product.image);
//             fs.unlink(oldImagePath, (err) => {
//                 if (err) {
//                     console.error("Error deleting old image:", err);
//                 }
//             });
//         }
//         // Assign the new image filename to req.body.image
//         req.body.image = req.file.filename;
//     }
//     const productData = await Product.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {new:true}
//     )
//     res.json({message:"successfully record update",productData})
// }

// const deleteProduct = async(req,res)=>{
//     const product = await Product.findById(req.params.id)
//     if(!product){
//         res.status(404).json({message:"Product not found"})
//     }
//     if (product.image) {
//         const oldImagePath = path.join(__dirname, '../assets/products', product.image);
//         fs.unlink(oldImagePath, (err) => {
//             if (err) {
//                 console.error("Error deleting old image:", err);
//             }
//         });
//     }
//     await Product.deleteOne(product)
//     res.status(200).json({message:"successfully record delete",product})
// }

// module.exports = {products,createProduct,product,updateProduct,deleteProduct}