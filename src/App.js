import React, { Component } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-upper">
          Colored Block Menu Using{" "}
          <a href="https://github.com/d3/d3-scale-chromatic">
            d3-scale-chromatic
          </a>
          <p className="App-upper-sub">Not Currently Mobile Friendly</p>
        </h1>
        <Menu />
        <h5 className="App-lower">2018 Connor Ingram</h5>
      </div>
    );
  }
}

export default App;
