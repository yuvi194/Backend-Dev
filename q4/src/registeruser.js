import fs from "fs"
function registeruser(name,email,password,){
    try{
        let user = [];
        let ob = {
            id : new Date(),name,email,password,todo:[],    //for the first time the todo is given key and value for fisrt time will be an empty array same the id will be set here
        }
        if(fs.existsSync("todo.json")){
            let data = JSON.parse(fs.readFileSync("todo.json","utf-8"))
            let isUser = data.some((value)=>value.name === name)
            if (isUser){
                return "user exits"
            }
            user = data;
        }
        user.push(ob)
        fs.writeFileSync("todo.json",JSON.stringify(user,null,2))
        console.log("user create");
    }
    catch(error){
        console.log(error);
    }
}
export default registeruser