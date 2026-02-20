const express= require('express');
const app=express();
const data=[{
    id:1,
    name:"ritika"
},
{   id:2,
    name:"reshu"

},
{
    id:3,
    name:"vamika"
},{
    id:4,
    name:"pragati"
}];

app.get('/',(req,res)=>{
    res.send('hello');
});

app.get('/username',(req,res)=>{
    const uname=req.query.name;
    const result=data.filter((ele)=>ele.name.toLowerCase()==uname.toLowerCase());
    res.json(result)
})

app.listen(3000,()=>{
    console.log('server is running');
});