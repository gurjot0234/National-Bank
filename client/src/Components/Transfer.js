import React, { Component, Fragment } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import {
  addTransaction,
  updateAmmount,
  fetchPayeeList,
  fetchAccounts
} from "../redux/actions/rootActions";
import * as moment from "moment";
import Header from "./Header";
class Transfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avilableBalance: 0,
      selectedAccount: "",
      selectedPayee: "",
      amountToTransfer: 0,
      transferType: "",
      dateOfTransfer: "",
      description: "",
      errorMessage: ""
    };
  }
  componentDidUpdate(prevProps) {
    this.loadMaterialize();
  }
  componentDidMount() {
    if (this.props.accounts && this.props.accounts.length == 0) {
      this.props.fetchAccounts();
    }
    if (this.props.payeeList && this.props.payeeList.length == 0) {
      this.props.fetchPayeeList();
    }
    this.loadMaterialize();
  }
  loadMaterialize = () => {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
    var datepicker = document.querySelectorAll(".datepicker");
    M.Datepicker.init(datepicker, {
      onSelect: data => {
       
      },
      autoClose: true,
      cancel: ""
    });
  };
  loadMatModal = () => {
    var modal = document.querySelectorAll(".modal");
    M.Modal.init(modal);
  };
  onCancelTransfer = e => {
    e.preventDefault();
    this.props.history.push("/dashboard");
  };
  onSubmitTransfer = e => {
    e.preventDefault();
    var err = this.validateFormData();
    this.loadMatModal();
    if (this.state.errorMessage.length == 0 && err) {
      var avlBalance = this.state.avilableBalance - this.state.amountToTransfer;
      this.setState({
        ...this.state,
        avilableBalance: avlBalance
      });
      const yourDate = new Date();
      const NewDate = moment(yourDate).format("DD/MM/YYYY");
      let transaction = {
        type: this.state.transferType,
        fromAccount: this.state.selectedAccount,
        toAccount: this.state.selectedPayee,
        toUser: "",
        transactionDate: NewDate,
        amount: this.state.amountToTransfer
      };
      let ammountObj = {
        ammount: avlBalance,
        selectedAccount: this.state.selectedAccount
      };
      this.props.addTransaction(transaction);
      this.props.updateAmmount(ammountObj);
      this.openSuccessPopUp();
    } else {
      this.openErrorPopUp();
    }
  };
  onStateChange = e => {
    var target = e.target;
    if (e.target.id === "selectedAccount") {
      var account = this.props.accounts.filter(
        a => a.accNumber == e.target.value
      );
      var avlBalance = account[0].accBalance;
      this.setState(state => {
        return {
          ...state,
          selectedAccount: target.value,
          avilableBalance: avlBalance
        };
      });
    } else {
      this.setState(state => {
        return { ...state, [target.id]: target.value };
      });
    }
  };
  validateFormData = () => {
    if (this.state.selectedAccount.length === 0) {
      this.setState({
        ...this.state,
        errorMessage: "Select an account to transfer"
      });
      return false;
    } else if (this.state.selectedPayee.length === 0) {
      this.setState({
        ...this.state,
        errorMessage: "Select a Payee to transfer"
      });
      return false;
    } else if (this.state.amountToTransfer < 100) {
      this.setState({
        ...this.state,
        errorMessage: "Minimum $100 can be transfered"
      });
      return false;
    } else if (this.state.amountToTransfer > this.state.avilableBalance) {
      this.state.errorMessage = this.setState({
        ...this.state,
        errorMessage: `Maximum ${this.state.avilableBalance}  can be transfered`
      });
      return false;
    } else if (
      this.state.transferType === "automatic" &&
      this.state.dateOfTransfer.length === 0
    ) {
      this.setState({
        ...this.state,
        errorMessage: "Select transfer date for automatic transaction."
      });
      return false;
    } else if (this.state.description.length > 100) {
      this.state.setState({
        ...this.state,
        errorMessage: "Description can be only 100 characters."
      });
      return false;
    } else {
      this.setState({
        ...this.state,
        errorMessage: ""
      });
      return true;
    }
  };
  openErrorPopUp = () => {
    var trigger = document.getElementById("triggerPopUp");
    trigger.click();
  };
  openSuccessPopUp = () => {
    var triggerSuccessEle = document.getElementById("triggerSuccessPopUp");
    triggerSuccessEle.click();
  };
  render() {
    var dataField =
      this.state.transferType === "automatic" ? (
        <div className="row">
          <div className="col s6 input-field">
            <input id="transactionDate" type="text" className="datepicker" />
            <label htmlfor="transactionDate">Select Date</label>
          </div>
          <div className="col s6"></div>
        </div>
      ) : null;
    var accountsList = this.props.accounts
      ? this.props.accounts.map((op, index) => {
          return (
            <option key={index} value={op.accNumber}>
              {" "}
              {op.accNumber}
            </option>
          );
        })
      : null;
    var payeeList = this.props.payeeList
      ? this.props.payeeList.map((op, index) => {
          return (
            <option key={index} value={op.accountNumber}>
              {" "}
              {op.accountNumber}
            </option>
          );
        })
      : null;
    const isLoading = this.props.loading;
    return isLoading ? (
      <h2>Loading</h2>
    ) : (
      <Fragment>
        <Header />
        <div className="container ">
          <a id="triggerPopUp" className="modal-trigger" href="#modal1"></a>

          <div id="modal1" className="modal">
            <div className="modal-content">
              <h4>Modal Header</h4>
              <p>{this.state.errorMessage}</p>
            </div>
            <div className="modal-footer">
              <a className="modal-close waves-effect waves-black btn-flat">
                Agree
              </a>
            </div>
          </div>
          <a
            id="triggerSuccessPopUp"
            className="modal-trigger"
            href="#modal2"
          ></a>
          <div id="modal2" className="modal">
            <div className="modal-content">
              <h4>Transfered</h4>
              <p>
                The amount {this.state.amountToTransfer} has succsfully
                transfered to {this.state.selectedPayee}
              </p>
            </div>
            <div className="modal-footer">
              <a className="modal-close waves-effect waves-black btn-flat">
                OK
              </a>
            </div>
          </div>
          <form
            onSubmit={e => {
              this.onSubmitTransfer(e);
            }}
          >
            <h4>Fund Transfer</h4>
            <div className="row">
              <div className="col s6">
                <div className="input-field">
                  <select
                    onChange={e => {
                      this.onStateChange(e);
                    }}
                    id="selectedAccount"
                  >
                    <option value="DEFAULT">Choose your option</option>
                    {accountsList}
                  </select>
                  <label>Select Account</label>
                </div>
              </div>
              <div className="col s6">
                <h6>Available Balance $ {this.state.avilableBalance} </h6>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <div className="input-field ">
                  <select
                    onChange={e => {
                      this.onStateChange(e);
                    }}
                    id="selectedPayee"
                  >
                    <option value="DEFAULT">Choose your option</option>
                    {payeeList}
                  </select>
                  <label>Select Payee</label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <h6>Amount to be Transfered</h6>
                <input
                  type="number"
                  min="1"
                  onChange={e => {
                    this.onStateChange(e);
                  }}
                  id="amountToTransfer"
                />
              </div>
            </div>
            <div className="row">
              <div
                className="col s6"
                onChange={e => {
                  this.onStateChange(e);
                }}
              >
                <h6>Transfer Type</h6>
                <p>
                  <label>
                    <input
                      id="transferType"
                      name="transferType"
                      type="radio"
                      value="One Time"
                    />
                    <span>One-Time Transfer</span>
                  </label>
                </p>
                <p>
                  <label>
                    <input
                      id="transferType"
                      name="transferType"
                      type="radio"
                      value="Automatic"
                    />
                    <span>Automatic Transfer</span>
                  </label>
                </p>
              </div>
            </div>
            {dataField}
            <div className="row">
              <div className="col s6">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  className="materialize-textarea"
                  onChange={e => {
                    this.onStateChange(e);
                  }}
                  id="description"
                ></textarea>
              </div>
            </div>
            <div className="row">
              <div className="col s6 right">
                <button
                  className="btn"
                  onClick={e => {
                    this.onCancelTransfer(e);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className=" margin-left-10 btn">
                  Transfer
                </button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    userName: state.userName,
    accounts: state.accounts,
    payeeList: state.payeeList,
    loading: state.loading,
    errorMessage: state.errorMessage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addTransaction: transaction => dispatch(addTransaction(transaction)),
    updateAmmount: amountObj => dispatch(updateAmmount(amountObj)),
    fetchPayeeList: () => dispatch(fetchPayeeList()),
    fetchAccounts: () => dispatch(fetchAccounts())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
