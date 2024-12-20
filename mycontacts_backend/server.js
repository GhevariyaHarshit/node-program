const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const { connectDb } = require('./config/dbConnection');
const app = express();
const port = 5000;
connectDb();
app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`Server runnig on port ${port}`)
})