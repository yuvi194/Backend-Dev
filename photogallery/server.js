import express from'express'
import fs from 'fs';

const app=express();

app.set("view engine",'ejs');
app.use(express.static('public'));

app.get('/index',(req,res)=>{
    
    const files=fs.readdirSync('./public');

    const page=parseInt(req.query.page)||1;
    const limit=10;
    const totalpages=Math.ceil(files.length/limit);

    const startIdx=(page-1)*limit;
    const endIdx=page*limit;
    const paginationFiles=files.slice(startIdx,endIdx);


    res.render("index",{image:paginationFiles,currpage:page,totalpages});
     
});




app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});