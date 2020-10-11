const express = require('express');
const router = express.Router();
const payeeList= require('../../data/payee') 


//@route GET api/payees
//@desc Get All payees
//@access Public


router.get('/',(req,res)=>{
   
    res.json(payeeList)
});

module.exports = router;