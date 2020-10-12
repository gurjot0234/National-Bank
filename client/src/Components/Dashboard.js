import React, { useEffect, Component } from "react";
import Header from "./Header";
import M from "materialize-css";
import { connect } from "react-redux";
import {
  fetchAccounts,
  fetchTransactions,
  fetchPayeeList
} from "../redux/actions/rootActions";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredRows: [],
      selectedAccount: "",
      currentAccBalance: 0
    };
  }
  componentDidMount() {
    let elems = document.querySelectorAll(".dropdown-trigger");
    M.Dropdown.init(elems, { inDuration: 200, outDuration: 225 });
    if (this.props.accounts && this.props.accounts.length == 0) {
      this.props.fetchAccounts();
    }
    if (this.props.transactions && this.props.transactions.length == 0) {
      this.props.fetchTransactions();
    }
  }
  objectsAreSame = (x, y) => {
    var objectsAreSame = true;
    for (var propertyName in x) {
      if (x[propertyName] !== y[propertyName]) {
        objectsAreSame = false;
        break;
      }
    }
    return objectsAreSame;
  };
  //   componentDidUpdate(prevProps) {

  //   }
  selectAccountDetails = (accNumber, accBalance) => {
    var transaction = this.props.transactions.filter(
      item => item.fromAccount === accNumber
    );
    this.setState({
      ...this.state,
      filteredRows: transaction,
      selectedAccount: accNumber,
      currentAccBalance: accBalance
    });
  };
  displayTable = () => {
    const tableRows = this.state.filteredRows.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.type}</td>
          <td>{row.toAccount}</td>
          <td>{row.amount}</td>
          <td>{row.transactionDate}</td>
        </tr>
      );
    });

    if (this.state.filteredRows.length > 0) {
      return (
        <div>
          <div className="row">
            <h5>
              <span>{this.state.selectedAccount}</span> Account's Current
              Balance : $ {this.state.currentAccBalance}
            </h5>
          </div>
          <div className="table-container">
            <table className="striped centeredb">
              <thead>
                <tr>
                  <th>Transaction Type</th>
                  <th>To Account</th>
                  <th>Amount</th>
                  <th>Transaction Date</th>
                </tr>
              </thead>

              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
      );
    } else if (this.state.accountSelected) {
      return <h3>No records found</h3>;
    }
  };

  render() {
    var list;
    if (this.props.accounts) {
      list = this.props.accounts.map((item, index) => {
        return (
          <li
            key={index}
            className="drop-down-li"
            onClick={() => {
              this.selectAccountDetails(item.accNumber, item.accBalance);
            }}
          >
            {item.type} | {item.accNumber}
          </li>
        );
      });
    }

    return (
      <div>
        <Header />
        <div>
          <h3 className="center">Transactions summary </h3>
        </div>
        <div className="container padding-all-20">
          <h5 className="left">
            Select the Account to view the transaction history
          </h5>
          <div>
            <span
              className="drop-down dropdown-trigger btn"
              href="#"
              data-target="dropdown1"
            >
              Accounts
            </span>
            <ul id="dropdown1" className="dropdown-content drop-down-ul-width">
              {list}
            </ul>
          </div>
          {this.displayTable()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userName: state.userName,
    accounts: state.accounts,
    transactions: state.transactions
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchAccounts: () => dispatch(fetchAccounts()),
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchPayeeList: () => dispatch(fetchPayeeList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
