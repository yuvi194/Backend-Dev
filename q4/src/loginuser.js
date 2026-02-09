import fs from "fs"
function loginuser (email,password){
    if(fs.existsSync("todo.json")){
                let data = JSON.parse(fs.readFileSync("todo.json","utf-8"))
                let isUser = data.some((value)=>value.email === email && value.password === password )
                if (isUser){
                    return "user exists"
                }
                else{
                    return "user not exists"
                }
            }
}
export default loginuser 