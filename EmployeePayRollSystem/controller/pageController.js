// Render Home Page
export const renderHomePage = (req, res) => {
    res.render('home', { employeeData });
};

// Render Add Employee Form
export const renderFormpage = (req, res) => {
    res.render('employeeForm');
};

// Render Edit Employee Page
export const renderEditPage = (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employeeData.find(emp => emp.id === id);
    if (!employee) {
        return res.status(404).send('Employee not found');
    }
    res.render('employeeEdit', { employee });
};

import {employeeData} from '../model/data.js';


// all users

export let showUser = (req,res) =>{
        res.json({
            message:"All Users",
            employeeData
        });
}


// create user

export let createUser = (req,res)=>{
    // destructuring
    const {name,email,department,basicSalary}=req.body;
    let newUser={id:employeeData.length+1,name:name,email:email,department:department,basicSalary:basicSalary}
    employeeData.push(newUser);

    res.json({
        message:"New User Created",
        newUser
    });
}



// delete user
export let deleteUser=(req,res)=>{
    const id=parseInt(req.params.id);
    const idx=employeeData.findIndex(s=>s.id===id);

    if(idx===-1){
      return  res.json({
            message:"User Not found"
        });
    }

    employeeData.splice(idx,1);
    res.json({
        message:"User Deleted"
    });

}

// update User
export let updateUser=(req,res)=>{
    const id=parseInt(req.params.id);

    const user=employeeData.find(s=>s.id===id);
    if(!user){
      return  res.json({
            message:"User Does not exist"
        });
    }
    user.name=req.body.name || user.name;
    user.email=req.body.email || user.email;
    user.department=req.body.department || user.department;
    user.basicSalary=req.body.basicSalary || user.basicSalary;

    res.json({
        message:"User updated",
        user
    });



}


// get salary count\

export let salaryCount=(req,res)=>{
    const id=parseInt(req.params.id);
    const user=employeeData.find(s=>s.id===id);
     if(!user){
      return  res.json({
            message:"User Does not exist"
        });
    }
    // console.log(employeeData)
    let basicSalary = employeeData[0].basicSalary;
    // console.log(basicSalary)
    let salary=(basicSalary + (basicSalary*0.2)+(basicSalary*0.1)-(basicSalary*0.05));
    console.log(salary);
    res.json({
        message:"User Total Salary",
        salary
    });

}