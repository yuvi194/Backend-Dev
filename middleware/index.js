import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./middleaware/route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/",router);

const port = process.env.PORT ||  8081;

app.listen(port,()=>{
    console.log("connect");
})  

  