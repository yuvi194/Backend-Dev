import fs from "fs"
function book(title,author,price){
    try{
        let user = [];
        let ob = {
            bookid : new Date(),title,author,price,books:[],    //for the first time the todo is given key and value for fisrt time will be an empty array same the id will be set here
        }
        if(fs.existsSync("book.json")){
            let data = JSON.parse(fs.readFileSync("book.json","utf-8"))
            let isUser = data.some((value)=>value.title === title)
            if (isUser){
                return "book found"
            }
            user = data;
        }
        user.push(ob)
        fs.writeFileSync("book.json",JSON.stringify(user,null,2))
        console.log("book is there");
    }
    catch(error){
        console.log(error);
    }
}
export default book