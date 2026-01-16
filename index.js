console.log("Node.js Backend Started") //use to print in js or display the output
console.error() // shows error with the message at error log
console.warn() // shows warning with message at the cosole
console.table() // shows the data in table form 
console.time()  // shows the time for how long the block or operation take time to execute
console.timeStamp() // shows marker of browswer performance on developer console
// Variables
let name = "Yuvika";  //string
let age = 20;         // number
const country = "India";   //constant
let isStudent = true;      //boolean
/*
three type of varible
let --- let is a block scope {} . use when the value needs to be change without affecting the rest of program.
var --- var is global scope . give hosting problem and suggested not to use .
const --- const is a block scope {} . use when data is not to be change or credential data is there so that no data can overwitten.
 */
console.log(name);
console.log(age);
console.log(country);
console,log(isStudent);

/*
string is the class in js 
.length() ,.index(),.tolow(),.toupp(),.lastindex(),.split(),split(rejex)
split use to split the string
rejex---[a-b],[az],(^ab)
*/
// data type
let score;   //undefined -- space is given to the variable but not the data . 
let data= null;  //null --- variable is defined but given data is null
 //always give the value never leave it defined only even if the value is null
console.log(score);  //undefined
console.log(data);   //null

//object
let user ={
    name:"yuvika",
    age:20,
    email:"yuvi20@gamil.com"
};
/*
object is the pair of key and value 
value can be overwrite 
key cant be overwrite a new key has to be made 
to find the key ----- object.key
to find value ---- object.value
*/
console.log(user); // give all the value of the user with key and pair
console.log(user.name); // give only user name

//Array
/* multiple value can be stored at a single variable
dynamic in size
index start at zero
array are object
array in js can take any datatype no restriction on datatype is there just symbol is not allowed
shift() delete the first the element of array
pop() delete the last element of array
push () add the first element of array
unshift() 
to distribute the data we use slice()(0--n-1)
to track  the data ------ [].fill(false)
*/ 
let number = [1,2,3,4,5];
let users=["yuvika","srishti","shruti","palak"]
//Operator
/*arthimetic operator are same as the mathematical operator
but the or and and are used differently
let a = 5 || 10 cl(a) ---- give 5 it check the first only and give that ignore the other so instead of || use ??
let a = 5 && 10 cl(a) ---- give 10 it check the whole statement and give the last value as answer
*/
let a= 10;
let b=  5;
console.log("Add:" , a+b);
console.log("Subtract:" , a-b);
console.log("Multiply:" , a*b);
console.log("Divide:" , a/b);

// Condition if-else
let loginage=18;
if (loginage>=18){
    console.log ("Allowed to login")
}
else{
    console.log("Is not allowed")
}

// loop for

for(let i =1;i<=5;i++){
    console.log("Loop Count:",i)
}

// function
/*
function--function is called
tophost is the fuction that can be called anywhere----function a(){ statement }
not the tophost ---- let a = function(){}
function reference--<> always called in react because it has dom property
function called--() always called in node because it don't have dom property 
map () -- is the function which call the other function known as top order function 
callback() -- is a function it gives result or error it is used to hold at a condition
*/
function add(x,y){
    return x+y;
}
let result=add(20,30);
console.log("function result:",result)

//simple Backend Login

const admin ={
    username:"admin",
    password:"1234"
};
function login(user,pass){
    if(user ===admin.username && pass===admin.password){
        console.log("login successful")
    }
    else{
        console.log("invalid username or password");
    }
}

login("admin","1234")