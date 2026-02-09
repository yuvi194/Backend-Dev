import fs from "fs"
function member(name,membershipType){
    try{
        let user = [];
        let ob = {
            memberid : new Date(),name,membershipType,members:[],    //for the first time the todo is given key and value for fisrt time will be an empty array same the id will be set here
        }
        if(fs.existsSync("member.json")){
            let data = JSON.parse(fs.readFileSync("member.json","utf-8"))
            let isUser = data.some((value)=>value.name === name)
            if (isUser){
                return "member found"
            }
            user = data;
        }
        user.push(ob)
        fs.writeFileSync("member.json",JSON.stringify(user,null,2))
        console.log("member created");
    }
    catch(error){
        console.log(error);
    }
}
export default member