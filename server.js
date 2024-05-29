const express = require("express");


const app = express();
const db=require('./db');
const MenuItem= require('./models/MenuItem');
const Person =require('./models/Person');
const bodyParser = require("body-parser");
const passport= require('passport');
const LocalStrategy=require('passport-local').Strategy;
// const Person =require('./')

app.use(bodyParser.json());

const logRequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleDateString()} Request Made to: ${req.originalUrl}`);
    next();
}


passport.use(new LocalStrategy(async(Username,password, done)=>{
    try{
        console.log("recieved credential:", Username, password);
        const user=await Person.findOne({username:Username});
        if(!user){
            return done(null, false,{message:"Incorrect Username"});
        }

        const isPasswordMatch=user.password===password?true:false;

        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null, false,{message:"Incorrect Username"});
        }
    }catch(err){
        return done(err);
    }
}))
app.use(passport.initialize());

const PORT = 3000;
const localAuthMiddleware= passport.authenticate('local', {session: false});
app.get('/', localAuthMiddleware,(req, res) => {
    res.send('welcone to my hotel');
});



const personRoutes=require('./routes/personRoutes');
app.use('/person',localAuthMiddleware,personRoutes);

const menuRoutes=require('./routes/menuItemRoutes');
app.use('/menu',menuRoutes);

app.listen(PORT, () => console.log(`Server Started at Port${PORT}`));