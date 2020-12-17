import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import ReportObject from '../components/PowerBIReport';
import RLSReport from '../components/RLSReport';
import logo from '../logo2.png';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand" style={{"background-color": "#F2C811"}}>
                    <a href="/" className="navbar-brand">
                    <img src={logo} alt={"logo"} className="img-fluid" style={{"max-width":"20%"}} />
                        </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/basic-embedding"} className="nav-link">
                                Basic Embedding
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/row-level-security"} className="nav-link">
                                Row Level Security
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route path="/basic-embedding" component={ReportObject} />
                        <Route path="/row-level-security" component={RLSReport} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Navbar;