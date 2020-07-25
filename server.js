const Sequelize = require('sequelize-cockroachdb');
const Hapi = require('hapi');
const inert = require('inert');
const Path = require('path');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Op = Sequelize.Op

async function encryptPass(password)
{
  return new Promise((resolve,reject)=>{
  bcrypt.hash(password,saltRounds,function(err,hash){
    if(err)
    reject(Error(err));
    console.log(hash);
    resolve(hash);
  })
})
}


async function comparePassword(password,encrypted_password)
{
  return new Promise(function(resolve,reject){
    bcrypt.compare(password,encrypted_password,function(err,flag){
        if(err)
        reject(Error(err));
        else
        resolve(flag);
    });
  });
}


let init = async function()
{
  const sequelize = new Sequelize('assignments', 'maxroach', '', {
    dialect: 'postgres',
    port: 26257,
    logging: false
  });


 const server = new Hapi.Server({
   port:5050,
   host:'localhost',
   routes:{
     files:{
       relativeTo:Path.join(__dirname,'public')
     },
     cors:true
   }
  
 });


 let User = sequelize.define('users', {
  roll:{type:Sequelize.INTEGER,primaryKey:true},
  email: { type: Sequelize.STRING},
  name: { type: Sequelize.STRING}, 
  password: {type: Sequelize.STRING},
  phone:{type: Sequelize.INTEGER}
});

let Assignment = sequelize.define('assignments',{
  id:{type:Sequelize.STRING, primaryKey:true},
  name:{type:Sequelize.STRING},

})

let UserAssignment = sequelize.define('userassignments',{
  assignmentId:{type:Sequelize.STRING,references:{
    model:Assignment,
    key:'id'
  }},
  userRoll:{type:Sequelize.INTEGER,references:{
    model:User,
    key:'roll'
  }}
})

// let UserAssignment = sequelize.define('userassignments',{})

User.sync({
  force:false
})

Assignment.sync({
  force:false
})

UserAssignment.sync({
  force:false
})


// UserAssignment.sync({
//   force:false
// })

User.belongsToMany(Assignment, { through: UserAssignment });
Assignment.belongsToMany(User, { through: UserAssignment });

await server.register([inert]);


server.route({
  method:'GET',
  path:'/js/{param}',
  handler:function(req,h){
    return h.file('js/'+req.params.param);
  }
});

server.route({
  method:'GET',
  path:'/css/{param}',
  handler:function(req,h){
    return h.file('css/'+req.params.param);
  }
});




server.route({
  method:'POST',
  path:'/addAssignment',
  handler: async function(req,h){
     let payload = req.payload;
     //console.log(payload);
     let id = payload.id
     let name = payload.name;
     let x = Assignment.create({id:id,name:name})
     console.log(x) 
     console.log("Successfully inserted new record in Assignments table");           
     //write code to insert record into cockroachd
     return "Success";
   
  }
});


 server.route({
   method:'POST',
   path:'/register',
   handler: async function(req,h){
      let payload = req.payload;
      //console.log(payload);
      let roll = payload.roll
      let name = payload.name;
      let email = payload.email;
      let phoneNumber = payload.phone;
      let passwordUnencrypted = payload.password;
      let encrypted_password = "";
      try{
        encrypted_password = await encryptPass(passwordUnencrypted);
      }catch(err)
      {
        console.log(err);
      }
      User.create({roll:roll,name:name,email:email,phone:phoneNumber,password:encrypted_password}) 
      console.log("Successfully inserted new record in Users table");           
      //write code to insert record into cockroachd
      return "Success";
    
   }
 });


 server.route({
  method:'POST',
  path:'/login',
  handler:async function(req,h)
  {
    let payload = req.payload;
    let email = payload.email;
    let password = payload.password;
    //get record from db
    let returned_record = await User.findAll({
      where:{
        email:email

      }
    })
    console.log(returned_record);
    try{
      password_flag = await comparePassword(password,returned_record[0].dataValues.password);
      if(password_flag)
        return returned_record;
      else
        return "Wrong Password, Please try again";
    }catch(err){
      console.log(err);
      return "Error has occured";
    }
    // console.log(returned_record);
    
    //verify password
    //create session for user
  }
 });

 server.route({
  method:'POST',
  path:'/markcomplete',
  handler: async function(req,h){
     let payload = req.payload;
     console.log(payload);
     let roll = payload.roll
     let name = payload.name;
     let email = payload.email;
     let phoneNumber = payload.phone;
     let assignment_id = payload.assignment_id;
     let returned_record = await Assignment.findOne({
      where:{
        id:assignment_id
      }
    })
    // console.log(returned_record)
    let retUser = await User.findOne({
      where:{
        roll:roll

      }
    })
    // console.log(retUser)
    retUser.addAssignment(returned_record)
    // returned_record[0].addUser(retUser[0])
    // UserAssignment.create({assignment_id:'P1',roll:8})
    let response = h.response(retUser)
      response.header('Access-Control-Allow-Origin','http://localhost:8080')
     return response;
   
  }
});


server.route({
  method:'GET',
  path:'/getAssignmentList',
  handler:async function(req,h){

      let studentRoll = req.query.roll
      // console.log(studentRoll)
      const user = await User.findOne({
        where: { roll: studentRoll },
        include: Assignment
      });
      let completedAssignments = user.assignments.map((assignment)=>assignment.id)
      // console.log(completedAssignments)

      const assignments = await Assignment.findAll({
        where:{
            id:{
              [Op.notIn]:completedAssignments
            }
        }
      })
      // console.log(assignments)
      let response = h.response(assignments)
      response.header('Access-Control-Allow-Origin','http://localhost:8080')
      return response
  }

})

 

await server.start()
console.log("Server started at "+server.info.uri);

}


init();

