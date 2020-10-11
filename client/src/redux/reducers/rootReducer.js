import {
  ADD_USERNAME,
  ADD_TRANSACTION,
  UPDATE_AMOUNT,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_PAYEE_SUCCESS,
  FETCH_REQUEST_DATA,
  HANDLE_ERROR
} from "../types/rootTypes";
const initState = {
  userName: "Test",
  accounts: [],
  payeeList: [],
  transactions: [],
  loading: false,
  errorMessage: ""
  // accounts: [
  //   { type: "Savings", accNumber: "SV10002", accBalance: 20000 },
  //   { typeID: 1, type: "Savings", accNumber: "SV10001", accBalance: 15000 },
  //   { type: "Credit", accNumber: "CRD10008", accBalance: 20000 },
  //   { type: "Credit", accNumber: "CRD10009", accBalance: 20000 }
  // ],
  // payeeList:[{name:'Jack',accountNumber:'HS0012'},
  // {name:'Tom',accountNumber:'HS0015'},
  // {name:'Harry',accountNumber:'HS0002'},
  // {name:'Michal',accountNumber:'HS00001'}],
  // transactions: [
  //   {
  //     type: "One time",
  //     fromAccount: "SV10002",
  //     toAccount: "HS10002",
  //     toUser: "Tom",
  //     transactionDate: "05/24/20202",
  //     amount: "1000"
  //   },
  //   {
  //     type: "One time",
  //     fromAccount: "SV10002",
  //     toAccount: "TestAccount",
  //     transactionDate: "05/24/20202",
  //     amount: "1000"
  //   },

  //   {
  //     type: "One time",
  //     fromAccount: "SV10002",
  //     toAccount: "HS10001",
  //     toUser: "Sam",
  //     transactionDate: "06/12/20202",
  //     amount: "1200"
  //   },

  //   {
  //     type: "Automatic",
  //     fromAccount: "SV10001",
  //     toAccount: "HS10023",
  //     toUser: "Car Dealer",
  //     transactionDate: "06/01/20202",
  //     amount: "1500"
  //   },

  //   {
  //     type: "Automatic",
  //     fromAccount: "SV10002",
  //     toAccount: "HS10043",
  //     toUser: "Jassica",
  //     transactionDate: "06/01/20202",
  //     amount: "2000"
  //   }
  // ]
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_USERNAME:
     
      return { ...state, userName: action.payload };

    case ADD_TRANSACTION:
      let tranactionArr = [action.payload, ...state.transactions];
      return { ...state, transactions: tranactionArr };

    case UPDATE_AMOUNT:
      let updatedState = state;
      let account = updatedState.accounts.findIndex(
        a => a.accNumber === action.payload.selectedAccount
      );
      console.log(account);
      if (account >= 0) {
        console.log(action.payload.ammount);
        updatedState.accounts[account].accBalance = action.payload.ammount;
        console.log(updatedState);
        return updatedState;
      }
      return state;

    case FETCH_ACCOUNTS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        errorMessage: "",
        accounts: action.payload
      };

    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        transactions: action.payload
      };

    case FETCH_PAYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        payeeList: action.payload
      };

    case FETCH_REQUEST_DATA:
      console.log("req load")
      return {
        ...state,
        loading: true
      };

      case HANDLE_ERROR:
        return {
          ...state,
          loading:false,
          errorMessage:action.payload
        }

    default:
      return state;
  }
};

export default rootReducer;
