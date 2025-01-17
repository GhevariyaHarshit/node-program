const Buy = require("../models/buyModel")

const buys = async(req,res)=>{
    const buy = await Buy.find()
    res.status(200).json({message:"All buys item",buy})
}

const productBuyCreate = async(req,res)=>{
    const { quantity, price, product_id, user_id } = req.body;
    if(!quantity||!price){
        res.status(400).json({message:"All fields are mandatory"})
    }
    const totalPrice = quantity * price;
    const buy = await Buy.create({
        quantity,
        price,
        product_id, user_id,
        totalPrice
    })
    res.status(201).json({message:"Buy created !",buy})
}
const productBuyUpdate = async(req,res)=>{
    const buy = await Buy.findById(req.params.id)
    if(!buy){
        res.status(404).json({message:"Buy not found"})
    }
    const totalPrice = req.body.quantity * req.body.price
    req.body.totalPrice = totalPrice
    const updateProductBuy = await Buy.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json({message:"successfully record update",updateProductBuy})
}
const buyProductDelete = async(req,res)=>{
    const buy = await Buy.findById(req.params.id)
    if(!buy){
        res.status(404).json({message:"buy id not found"})
    }
    await Buy.deleteOne(buy)
    res.status(200).json(buy)
}
module.exports = {buys,productBuyCreate,productBuyUpdate,buyProductDelete}