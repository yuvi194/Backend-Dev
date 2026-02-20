const express=require('express');
const app=express();

app.use((req,res,next)=>{
    const start=Date.now();
    res.on("finish",()=>{
        const end=Date.now();
        const time=end-start;
        console.log(`${req.method},${req.url} took ${time} ms`);

    })
    next();
})
app.get('/',(req,res)=>{
    res.send('hello');
})
app.get('/userpage',(req,res)=>{
    res.send('userpage');
})
app.listen(3000,()=>{
    console.log('server is running');
})