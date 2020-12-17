import React, {Component} from 'react';
import Navbar from './layout/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render(){
    return (
      <div className="App">
        <Navbar />
      </div>
    )
  }
}

export default App;