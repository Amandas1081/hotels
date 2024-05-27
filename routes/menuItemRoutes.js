const express=require('express');

const router=express.Router();

const MenuItem=require('../models/MenuItem');

router.get('/', async (req, res) => {
    try{
        const data=req.body;
        
    
        const savemenu=await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(savemenu);
    
    
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'internal server error'});
        }
});

router.get('/:tasteType', async (req, res) => {
    try{
        const tasteType=req.params.tasteType;
        
        if(tasteType=="sweet"|| tasteType=="sour"|| tasteType=="spicy"){
            const TasteType=await MenuItem.find({taste:tasteType});
        console.log('data fetched');
        res.status(200).json(TasteType);
        }else{
            console.log("not there");
            res.status(404).json({error: 'not found'});
        }
        
    
    
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'internal server error'});
        }
});

// router.get('/:tasteType',async(req,res)=>{
//     try{
//         const workType=req.params.tasteType;
//         if(workType=='sweet'|| workType=='sour'|| workType=='spicy'){
//             const response= await MenuItem.find({taste:workType});
//             console.log('response fetched');
//             res.status(200).json(response);
//         }else{
//             res.status(404).json({error: 'invalid work error'})
//         }

//     }catch(err){
//         console.log(err);
//         res.status(500).json({error: 'internal server error'});
//     }
// })





router.post('/',async(req,res)=>{
    try{
    const data=req.body;
    const newMenu=new MenuItem(data);

    const saveMenu=await newMenu.save();
    console.log('data saved', saveMenu);
    res.status(200).json(saveMenu);


    }catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }

    
})
module.exports=router;