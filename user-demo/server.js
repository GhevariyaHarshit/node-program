const express = require("express");
const dotenv = require("dotenv").config();
const { connectDb } = require('./config/dbconnection');
const app = express();
const port = 6000;
connectDb();
app.use(express.json())
app.use("/api/users",require("./routes/userRoutes"))
app.listen(port,()=>{
    console.log(`Server runnig on port ${port}`)
})