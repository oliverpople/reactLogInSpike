import React, { Component } from "react";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import AppBar from "material-ui/AppBar";
// import RaisedButton from "material-ui/RaisedButton";
// import TextField from "material-ui/TextField";
import axios from "axios";
import Login from "./Login";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  }

  handleClick(event) {
    var apiBaseUrl = "http://localhost:4000/api/";
    console.log(
      "values",
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password
    );
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(apiBaseUrl + "/register", payload)
      .then(function(response) {
        console.log(response);
        if (response.data.code == 200) {
          //  console.log("registration successfull");
          var loginscreen = [];
          loginscreen.push(<Login parentContext={this} />);
          var loginmessage = "Not Registered yet.Go to registration";
          self.props.parentContext.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage,
            buttonLabel: "Register",
            isLogin: true
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div>
          <h2 title="Register" />
          <form>
            Enter your First Name:
            <input
              type="text"
              name="firstName"
              onChange={(event, newValue) =>
                this.setState({ first_name: newValue })
              }
            />
            <br />
            Enter your Last Name:
            <input
              type="text"
              name="lastName"
              onChange={(event, newValue) =>
                this.setState({ last_name: newValue })
              }
            />
            <br />
            Enter your Email:
            <input
              type="text"
              name="email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            Enter your Password:
            <input
              type="text"
              name="password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <input
              type="submit"
              value="Submit"
              primary={true}
              style={style}
              onClick={event => this.handleClick(event)}
            />
          </form>
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default Register;
