import React, { Component } from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import API from '../api/api';

class ReportObject extends Component {

    constructor() {
        super();
        this.state = {
            reportId: '',
            embedUrl: '',
            accessToken: ''
        };
    }

    componentDidMount() {
        let basicReportUrl = '/basic';
        API.get(basicReportUrl)
            .then(res => {
                //console.log(res.data);
                this.setState({
                    reportId: res.data.ReportId,
                    embedUrl: res.data.EmbedUrl,
                    accessToken: res.data.EmbedToken
                });
            });
        // fetch(basicReportUrl)
        //     .then(response => response.json())
        //     .then(res => {
        //         this.setState({
        //             reportId: res.ReportId,
        //             embedUrl: res.EmbedUrl,
        //             accessToken: res.EmbedToken
        //         });
        //     })
        //     .catch(err => console.log(err));
    }

    render() {

        return (

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

        )
    }
}

export default ReportObject;
