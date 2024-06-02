const express = require('express');
const router= express.Router();
 const Person =require('./../models/Person');
const { generateToken } = require('../jwt');
const { json } = require('body-parser');


router.get('/', async (req, res) => {
    try{
        const data=req.body;
        
    
        const savedPerson=await Person.find();
        console.log('data fetched get person');
        res.status(200).json(savedPerson);
    
    
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'internal server error'});
        }
});
router.post('/signup',async(req,res)=>{
    try{
    const data=req.body;
    const newPerson=new Person(data);

    const response=await newPerson.save();
   const payload={
        id:response.id,
        username:response.username
    }
    console.log(JSON.stringify(payload));

    const token=generateToken(response.username); 
    console.log(token,"token");


    res.status(200).json({response:response, token:token});


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }

    
})

router.put('/:id', async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response=await Person.findByIdAndUpdate(personId, updatedPersonData,{
            new:true, //return the updated document
            runValidators:true, //run mongoose validation
        })
        if(!response){
            return res.status(404).json({error: 'person not found'})
        }
        console.log('data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})
//comment added
router.delete('/:id', async(req,res)=>{
    try{
        const personId=req.params.id;
        
        const response=await Person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({error: 'person not found'})
        }
        console.log('data deleted');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})
//new comment


router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef'|| workType=='manager'|| workType=='waiter'){
            const response= await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'invalid work error'})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})
module.exports=router;
