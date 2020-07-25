import React, { Component, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home";
import Show from "./components/Show";
import BlindDate from "./components/BlindDate";
import Registration from "./components/Registration";
import Login from "./components/LogIn";

// import NavMenu from "./components/NavMenu.jsx";

const baseURL = "http://localhost:3003";

class App extends Component {
  state = {
    user: null,
    users: [],
    redirect: false,
    bookSearch: "",
    goTo: "",
  };

  handleSearch = (title) => {
    console.log("nadling..");
    this.setState({ bookSearch: title, redirect: true, goTo: "/book" });
  };

  resetRedirect = () => {
    this.setState({ redirect: !this.state.redirect, goTo: "" });
  };

  handleSubmit = (event, username, password) => {
    event.preventDefault();
    console.log("submit ran");
    fetch(baseURL + "/users", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())

      .catch((error) => console.error({ Error: error }));
  };

  // toBlindDate = () => {
  //   this.setState({ redirect: true, goTo: "/date" })
  // }

  // for users in API post auth -----------------

  // componentDidMount(){
  //   this.getUsers();
  // }

  // handleAddUser = (user) => {
  //   const copyUsers = [...this.state.users];
  //   copyUsers.unshift(user);
  //   this.setState({
  //     users: copyUsers,
  //     username: "",
  //     password: "",
  //     read: [],
  //     toRead: [],
  //     genres: [],
  //   });
  // };

  // getUsers = () => {
  //   fetch(baseURL + "/users")
  //     .then(
  //       (data) => {
  //         return data.json();
  //       },
  //       (err) => console.log(err)
  //     )
  //     .then(
  //       (parsedData) => this.setState({ users: parsedData }),
  //       (err) => console.log(err)
  //     );
  // };

  // deleteUser = (id) => {
  //   fetch(baseURL + "/users/" + id, {
  //     method: "DELETE",
  //     body: JSON.stringify({}),
  //     headers: {
  //         'Content-Type': 'application/json'
  //     }
  //     }).then(() => {
  //       this.componentDidMount();
  //     })
  //     .catch((error) => console.error({ Error: error }));
  // };

  // end of user section ----------------------

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  redirect={this.state.redirect}
                  goTo={this.state.goTo}
                  baseURL={baseURL}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact
              path="/users"
              render={() => (
                <Registration
                  baseURL={baseURL}
                  handleSubmit={this.handleSubmit}
                  user={this.state.user}
                />
              )}
            />

            <Route
              exact
              path="/"
              render={() => (
                <Home
                  redirect={this.state.redirect}
                  goTo={this.state.goTo}
                  baseURL={baseURL}
                  handleSearch={(title) => this.handleSearch(title)}
                  toBlindDate={() => this.toBlindDate}
                />
              )}
            />
            <Route
              exact
              path="/book/"
              render={() => (
                <Show
                  bookSearch={this.state.bookSearch}
                  resetRedirect={() => this.resetRedirect()}
                />
              )}
            />
            <Route
              exact
              path="/date/"
              render={() => (
                <BlindDate
                  handleSearch={(title) => this.handleSearch(title)}
                  resetRedirect={() => this.resetRedirect()}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
