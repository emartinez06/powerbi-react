import React, { Component } from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
//import axios from 'axios';
import logo from '../logo.png';
import API from '../api/api';

class RLSReport extends Component {

    constructor() {
        super();
        this.state = {
            user: '',
            pass: '',
            loggedIn: false,
            reportId: '',
            embedUrl: '',
            accessToken: ''
        };
    }

    componentDidMount() {

    }

    handleInput = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    login = () => {

        this.setState({
            loggedIn: true
        });

        const user = {
            username: this.state.user,
            roles: "Hierarchical_Role"
        };

        API.post(`/rls`, user)
            .then(res => {
                //console.log(res.data);
                this.setState({
                    reportId: res.data.ReportId,
                    embedUrl: res.data.EmbedUrl,
                    accessToken: res.data.EmbedToken
                });
            });
    }

    logout = () => {
        this.setState({
            loggedIn: false
        });
    }

    render() {
        if (this.state.loggedIn) {

            return (
                <div>
                    <button type="submit" className="btn btn-danger btn-md" style={{ "width": "150px", "margin-bottom": "20px" }} onClick={this.logout}>Logout</button>
                    <PowerBIEmbed
                    embedConfig={{
                        type: 'report',   // Supported types: report, dashboard, tile, visual and qna
                        id: this.state.reportId,
                        embedUrl: this.state.embedUrl,
                        accessToken: this.state.accessToken,
                        tokenType: models.TokenType.Embed,
                        settings: {
                            panes: {
                                filters: {
                                    expanded: false,
                                    visible: false
                                }
                            }
                        }
                    }}

                    eventHandlers={
                        new Map([
                            ['loaded', function () { console.log('Report loaded'); }],
                            ['rendered', function () { console.log('Report rendered'); }],
                            ['error', function (event) { console.log(event.detail); }]
                        ])
                    }

                    cssClassName={"report_styles"}

                    getEmbeddedComponent={(embeddedReport) => {
                        this.report = embeddedReport;
                    }}
                />
                </div>
            )

        }
        else{
            return (
                <div className="row">
                    <div className="col-lg-3"></div>
                    <div className="col-lg-6">
                        <img src={logo} alt={"logo"} className="img-fluid" />
                        <div className="form-group">
                            <input type="text" name="user" className="form-control" placeholder="username" onBlur={this.handleInput} required />
                            <br />
                            <input type="password" name="pass" className="form-control" placeholder="password" onChange={this.handleInput} required />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-danger btn-md" style={{ "width": "150px" }} onClick={this.login}>Login</button>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            )
        }
    }
}

export default RLSReport;
