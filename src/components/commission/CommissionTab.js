import React, { Component } from 'react';
import { getPeriod } from '../../services/Network';
import $ from 'jquery';
import { marketZone } from '../GlobalHelpers';
import moment from 'moment';
import Spinner from '../Spinner';

class CommissionTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            selectMonth: [],
            isLoadingCommission: true,
            selectedMonth: "",
            linkStatememt: "",
        };
    }
    componentWillMount() {
        this.locadCommsission();
        this.getPeriodOptions();
    }

    openStateMent() {
        var thisYear = moment(new Date()).format('YYYY');
        var mounthSelect = moment(this.state.selectedMonth).format('MM');
        console.log(thisYear);
        console.log(moment(this.state.selectedMonth).format('MM'))
        let customer_heaf = localStorage.getItem("customerHref").replace("https://hydra.unicity.net/v5/", "https://thdl1.unicity-easynet.com/v5/");
        var urlToOpentStateMent = customer_heaf + "?year=" + thisYear + "&month=" + mounthSelect + "&country=" + marketZone;
        this.setState({ linkStatememt: urlToOpentStateMent })

    }
    locadCommsission() {
        let that = this;
        let url = "https://hydra.unicity.net/v5/customers/me/commissionstatements";
        let customerToken = localStorage.getItem("customerToken");
        $.ajax({
            'type': 'GET',
            'headers': { 'Authorization': 'Bearer ' + customerToken },
            'url': url,
            'success': function (result) {
                result = result.items
                result = result.reverse()
                that.props.setDataCommission(result)
                that.setState({
                    isLoadingCommission: false
                }, that.test)
            },
            'error': function (result) {
                console.log("ERROR" + result)
            }
        })
    }
    setSelecyMounth(value) {
        this.setState({
            selectedMonth: value
        }, this.openStateMent.bind(this))
        console.log(this.state.selectedMonth)
    }
    getPeriodOptions() {
        getPeriod(((res, status) => {
            if (res.status === 200) {
                let tempArray = [];
                res.message.map((b, i) => {
                    let year = b.substr(0, 4);
                    let month = b.substr(-2);
                    let combined = year + '-' + month
                    tempArray.push(combined)
                    return false;
                });
                this.setState({ selectMonth: tempArray, selectedMonth: tempArray[0] }, this.openStateMent.bind(this));
            } else {
                // this.setState({ noDataMsg: true })
            }
        }), this.props.customerData.unicity, marketZone);
    }

    test() {
        console.log(this.state)
    }

    render() {
        let tableCommission = null;
        if (this.props.commissionData.length !== 0) {
            tableCommission = this.props.commissionData.map((b, i) => {
                return (

                    <tr key={i}>
                        <td>{b.period}</td>
                        <td>{b.paidAmount}</td>
                        <td>{b.withheld}</td>
                        <td>{b.earnings}</td>
                    </tr>

                );
            });
        }
        if (this.state.selectMonth) {
            var selectMonth = this.state.selectMonth.map((b, i) => {
                return (
                    <option key={i} value={b}>{moment(b).format('MMMM YYYY')}</option>
                );
            });
        }

        return (
            <div>
                {this.state.isLoadingCommission &&
                    <Spinner />
                }
                {!this.state.isLoadingCommission &&
                    <div className="form-horizontal">
                        <div className="">
                            <p style={{ textAlign: 'center',marginTop:"10px",marginBottom:"6px" }}>Please select month</p>
                            <select value={this.state.selectedMonth} 
                                onChange={(event) => this.setState({ selectedMonth: event.target.value }, 
                                this.setSelecyMounth.bind(this))} 
                                className="select-state" >

                                {selectMonth}

                            </select>
                            <button className="global-button global-button-active close-modal-btn button-select">
                                <a style={{ textDecoration: "none" ,color:"white"}} target="_blank" href={this.state.linkStatememt}>Open</a>
                            </button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="table-head">Commission Month</th>
                                    <th className="table-head">Earnings Amount</th>
                                    <th className="table-head">Withheld Tax</th>
                                    <th className="table-head">Net Earnings</th>
                                </tr>
                            </thead >
                            <tbody>
                                {tableCommission}
                            </tbody>

                        </table >
                    </div>
                }

            </div >
        );
    }
}

export default CommissionTab;
