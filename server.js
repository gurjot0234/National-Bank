const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const transactions = require('./routes/api/transactions')
const app = express();
const routerTransactions = require('./routes/api/transactions');
const routerAccounts = require('./routes/api/accounts');
const routerPayeeList = require('./routes/api/payee');

//BodyParser middleware

app.use(bodyParser.json());
app.use(cors());
const PORT = 5000;

//Use Routes

const r = express.Router();


app.use('/api/transactions',routerTransactions)
app.use('/api/accounts',routerAccounts)
app.use('/api/payeeList',routerPayeeList)

app.listen(PORT,()=>{});
