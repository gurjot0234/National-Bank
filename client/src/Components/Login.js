import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { addUser } from "../redux/actions/rootActions";
import { connect } from "react-redux";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
  }
  onChangeLoginInput = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  onSubmitLogin = e => {
    e.preventDefault();
    if (this.state.userName === "admin" && this.state.password === "admin") {
      this.props.addUser(this.state.userName);
      this.props.history.push("/dashboard");
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Login To National Bank</h2>
        <br />
        <form
          className="col md-12"
          onSubmit={e => {
            this.onSubmitLogin(e);
          }}
        >
          <div className="row">
            <div className="input-field col m6">
              <input
                placeholder="User Name"
                name="userName"
                type="text"
                onChange={e => this.onChangeLoginInput(e)}
              />
              <label htmlFor="username">User Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col m6">
              <input
                placeholder="password"
                name="password"
                type="password"
                onChange={e => this.onChangeLoginInput(e)}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = () => {};
const mapDispatchToProps = dispatch => {
  return {
    addUser: userName => dispatch(addUser(userName))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
