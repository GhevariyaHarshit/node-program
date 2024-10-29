const Cart = require("../models/cartModel")

const carts = async(req,res)=>{
    const cart = await Cart.find()
    res.status(200).json({message:"All carts item",cart})
}

const cartcreate = async(req,res)=>{
    const { quantity, price, product_id, user_id } = req.body;
    if(!quantity||!price){
        res.status(400).json({message:"All fields are mandatory"})
    }
    const totalPrice = quantity * price;
    const cart = await Cart.create({
        quantity,
        price,
        product_id, user_id,
        totalPrice
    })
    res.status(201).json({message:"Cart created !",cart})
}
const updateCart = async(req,res)=>{
    const cart = await Cart.findById(req.params.id)
    if(!cart){
        res.status(404).json({message:"Cart not found"})
    }
    // console.log("cart",cart)
    const totalPrice = req.body.quantity * req.body.price
    req.body.totalPrice = totalPrice
    const updatecart = await Cart.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json({message:"successfully record update",updatecart})
}
const deletecart = async(req,res)=>{
    const cart = await Cart.findById(req.params.id)
    if(!cart){
        res.status(404).json({message:"Cart not found"})
    }
    await Cart.deleteOne(cart)
    res.status(200).json(cart)
}
module.exports = {cartcreate,updateCart,deletecart,carts}