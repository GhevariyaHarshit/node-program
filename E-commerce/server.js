const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const dotenv = require("dotenv").config()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const buyRoutes = require("./routes/productBuyRoutes")
const cartRoutes = require("./routes/cartRoutes")
// const productRoutes = require("./routes/productRoutes")
const port = 4000;
const app = express();

dbConnect();
//middleware
app.use(express.json())

//routes
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/productBuy",buyRoutes)
app.use("/api/productCart",cartRoutes)
// app.use("/api/product",userRoutes)

//server port
app.listen(port,()=>{
    console.log(`Server runnig on port ${port}`)
})