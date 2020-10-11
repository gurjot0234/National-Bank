 const transactions= [
    {
      type: "One time",
      fromAccount: "SV10002",
      toAccount: "HS10002",
      toUser: "Tom",
      transactionDate: "05/24/20202",
      amount: "1000"
    },
    {
      type: "One time",
      fromAccount: "SV10002",
      toAccount: "TestAccount",
      transactionDate: "05/24/20202",
      amount: "1000"
    },

    {
      type: "One time",
      fromAccount: "SV10002",
      toAccount: "HS10001",
      toUser: "Sam",
      transactionDate: "06/12/20202",
      amount: "1200"
    },

    {
      type: "Automatic",
      fromAccount: "SV10001",
      toAccount: "HS10023",
      toUser: "Car Dealer",
      transactionDate: "06/01/20202",
      amount: "1500"
    },

    {
      type: "Automatic",
      fromAccount: "SV10002",
      toAccount: "HS10043",
      toUser: "Jassica",
      transactionDate: "06/01/20202",
      amount: "2000"
    }
  ];

  module.exports = transactions;