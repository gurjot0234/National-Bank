import {
  ADD_USERNAME,
  ADD_TRANSACTION,
  UPDATE_AMOUNT,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_PAYEE_SUCCESS,
  HANDLE_ERROR,
  FETCH_REQUEST_DATA
} from "../types/rootTypes";
import axios from "axios";
export const addUser = userName => {
  return {
    type: ADD_USERNAME,
    payload: userName
  };
};

export const addTransaction = transaction => {
  return {
    type: ADD_TRANSACTION,
    payload: transaction
  };
};

export const updateAmmount = amount => {
  return {
    type: UPDATE_AMOUNT,
    payload: amount
  };
};
const fetchAccountSuccess = accounts => {
  return {
    type: FETCH_ACCOUNTS_SUCCESS,
    payload: accounts
  };
};
export const handleError = error => {
  return {
    type: HANDLE_ERROR,
    payload: error
  };
};

export const fetchRequestData = () => {
  return {
    type: FETCH_REQUEST_DATA
  };
};

export const fetchAccounts = () => {
  return dispatch => {
    dispatch(fetchRequestData());
    axios
      .get("http://localhost:5000/api/accounts")
      .then(res => {
        dispatch(fetchAccountSuccess(res.data));
      })
      .catch(error => {
        dispatch(handleError(error));
      });
  };
};

const fetchTransactionsSuccess = transactions => {
  return {
    type: FETCH_TRANSACTIONS_SUCCESS,
    payload: transactions
  };
};
export const fetchTransactions = () => {
  return dispatch => {
    dispatch(fetchRequestData());
    axios
      .get("http://localhost:5000/api/transactions")
      .then(res => {
        dispatch(fetchTransactionsSuccess(res.data));
      })
      .catch(error => {
        dispatch(handleError(error.message));
      });
  };
};

const fetchPayeeListSuccess = payeeList => {
  return {
    type: FETCH_PAYEE_SUCCESS,
    payload: payeeList
  };
};

export const fetchPayeeList = () => {
  return dispatch => {
    dispatch(fetchRequestData());
    axios
      .get("http://localhost:5000/api/payeeList")
      .then(res => {
        dispatch(fetchPayeeListSuccess(res.data));
      })
      .catch(error => {
        dispatch(handleError(error.message));
      });
  };
};
