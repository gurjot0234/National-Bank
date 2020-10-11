const express = require('express');
const router = express.Router();
const userAccounts= require('../../data/accounts') 


//@route GET api/payees
//@desc Get All payees
//@access Public


router.get('/',(req,res)=>{
   
    res.json(userAccounts)
});

module.exports = router;