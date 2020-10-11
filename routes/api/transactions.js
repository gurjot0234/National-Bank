const express = require('express');
const router = express.Router();
const transactions= require('../../data/transactions') 


//@route GET api/transactions
//@desc Get All Transactions
//@access Public


router.get('/',(req,res)=>{
    res.json(transactions)
});

module.exports = router;