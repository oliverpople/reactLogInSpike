import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import AppBar from "material-ui/AppBar";
// import RaisedButton from "material-ui/RaisedButton";
// import TextField from "material-ui/TextField";
import axios from "axios";
import UploadScreen from "./UploadScreen";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: "",
      pass_code: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.user_name);
  }

  handleClick(event) {
    var apiBaseUrl = "http://localhost:3001/api/users";
    var self = this;
    var payload = {
      user_name: this.state.user_name,
      pass_code: this.state.pass_code
    };
    axios
      .post(apiBaseUrl + "login", payload)
      .then(function(response) {
        console.log(response);
        if (response.data.code == 200) {
          console.log("Login successfull");
          var uploadScreen = [];
          uploadScreen.push(
            <UploadScreen appContext={self.props.appContext} />
          );
          self.props.appContext.setState({
            loginPage: [],
            uploadScreen: uploadScreen
          });
        } else if (response.data.code == 204) {
          console.log("Username and password do not match");
          alert("username and password do not match");
        } else {
          console.log("Username does not exist");
          alert("Username does not exist");
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
          Login
          <form>
            Enter your Username:{" "}
            <input
              type="text"
              name="username"
              onChange={(event, newValue) =>
                this.setState({ user_name: newValue })
              }
            />
            <br />
            Enter your Password:{" "}
            <input
              type="text"
              name="password"
              onChange={(event, newValue) =>
                this.setState({ pass_code: newValue })
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
export default Login;
