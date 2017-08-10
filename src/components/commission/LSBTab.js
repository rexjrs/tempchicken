import React, { Component } from 'react';
import $ from 'jquery';
import Spinner from '../Spinner';

class LSBTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            isLoadingLSB: true
        };
    }

    componentWillMount() {
        this.locadReportLSB();
    }

    locadReportLSB() {
        let that = this;
        that.setState({
            isLoadingLSB: true
        })


        var customer_href = localStorage.getItem("customerHref");
        customer_href = customer_href.replace("https://hydra.unicity.net", 'https://member-calls.unicity.com');
        let url = customer_href + "/lsb";

        $.ajax({
            'type': 'GET',
            'url': url,
            'success': function (result) {
                that.props.setDataLSB(result)
                that.setState({
                    isLoadingLSB: false
                })
            },
            'error': function (result) {
            }
        })
    }

    render() {
        let dataTable, entrys = null;
        if (this.props.LSBData.items) {
            dataTable = this.props.LSBData.items.map((b, i) => {
                entrys = b.entry.map((c, j) => {
                    return (
                        <tr key={j}>
                            <td>{c.amount}</td>
                            <td>{c.type}</td>
                            <td>{c.runingBalance}</td>
                        </tr>
                    )

                });

                return (
                    <div className="small-12 columns" key={i}>
                        <div className="table-responsive">
                            <table className="table table-bordered" >
                                <tbody>
                                    <tr>
                                        <td className="col-head-title">{this.props.language.period}</td>
                                        <td className="col-head-title">Start</td>
                                        <td className="col-head-title">Detail</td>
                                    </tr>
                                    <tr key={i}>
                                        <td>{b.period}</td>
                                        <td>{b.startingBalance}</td>
                                        <td style={{padding:0}}>
                                            <div className="table-responsive">
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        <tr>
                                                            <td className="col-head-title">{this.props.language.amount}</td>
                                                            <td className="col-head-title">Type</td>
                                                            <td className="col-head-title">Balance</td>
                                                        </tr>
                                                        {entrys}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                )
            })
        }

        return (

            <div >
                {this.state.isLoadingLSB &&
                    <div>
                        <br/>
                        <Spinner />
                    </div>
                }
                {!this.state.isLoadingLSB &&
                    <div style={{ marginTop: 20 }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="col-head-title">{this.props.language.name}</td>
                                    <td>{this.props.LSBData && this.props.LSBData.globalName}</td>
                                </tr>

                                <tr>
                                    <td className="col-head-title">{this.props.language.member_id}</td>
                                    <td>{this.props.LSBData && this.props.LSBData.id.unicity}</td>
                                </tr>
                                <tr>
                                    <td className="col-head-title">{this.props.language.country}</td>
                                    <td>{this.props.LSBData && this.props.LSBData.country}</td>
                                </tr>
                            </tbody>
                        </table>
                        {dataTable}

                    </div>
                }

            </div>
        );
    }
}

export default LSBTab;
