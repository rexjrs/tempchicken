import React, { Component } from 'react';
import Spinner from '../Spinner';
import $ from 'jquery';

class KpiTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reuslt: "",
            loadingKpi: true,
            selectLevel: 1
        };
    }

    componentWillMount(){
        this.requestKpi();
    }

    requestKpi() {

        let that = this;
        that.setState({
             loadingKpi:true
        })
        var customer_href = localStorage.getItem("customerHref");
        var url = customer_href + '/sponsoredCustomersTreeSummary?maxTreeDepth=' + this.state.selectLevel + '&_httpHeaderAuthorization=Bearer robertwilliams:wzSa9z9RPeB9F8KMCfpW';
        $.ajax({
            'type': 'GET',
            'url': url,
            'success': function (result) {
                that.props.setDataKpi(result);
                that.setState({
                    loadingKpi:false
                })
            },
            'error': function (result) {

            }
        });
    }

    selectLevel(event){
        this.setState({
            selectLevel: event.target.value
        },this.requestKpi);
    }

    render() {
        let rankTableBody, reankTableLevel, tableHistory = null;
        // let reankTableLevel = null;

        if (this.props.dataKpi) {
            rankTableBody = this.props.dataKpi.downlineProfileHistoryByRank.items[0].values.map((b, i) => {
                return (
                    <tr key={i}>
                        <td>{b.achievement.rankDescription}</td>
                        <td>{b.metrics.advancedCustomers.count}</td>
                        <td>{b.metrics.qualifiedCustomers.count}</td>
                    </tr>
                )
            });

            reankTableLevel = this.props.dataKpi.downlineProfileHistoryByLevel.items[0].values.map((b, i) => {
                return (
                    <tr key={i}>
                        <td>{b.treeDepth}</td>
                        <td>{b.metrics.totalCustomers.count}</td>
                    </tr>
                )
            });

            tableHistory = this.props.dataKpi.metricsProfileHistory.items.map((b, i) => {
                return (
                    <tr key={i}>
                        <td>{b.period}</td>
                        <td>{b.value.cpv}</td>
                    </tr>
                )
            });

        }
        return (
            <div>
                {this.state.loadingKpi &&
                    <Spinner />
                }
                {!this.state.loadingKpi &&
                    <div>
                        <div className="row" style={{ marginTop: 10, marginBottom: 15 }}>
                            <div className="col-6" style={{ width: "50%" }}>
                                <div style={{ paddingTop: 5, textAlign: "right" }}>
                                    {this.props.language.select_level}
                        </div>
                            </div>
                            <div className="col-6" style={{ width: "50%" }}>
                                <div style={{ paddingTop: 5, textAlign: "center" }}>
                                    <select 
                                        onChange={(event)=>this.selectLevel(event)}
                                        value={this.state.selectLevel}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <table>
                            <thead style={{ width: "100%" }}>
                                <tr>
                                    <th className="kpi-table-header" colSpan="2"> {this.props.language.title_downline}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{this.props.language.DL_totalBa}</td>
                                    <td>{this.props.dataKpi && this.props.dataKpi.metricsProfile.totalCustomers.count}</td>
                                </tr>

                                <tr>
                                    <td>{this.props.language.DL_totalActive}</td>
                                    <td>{this.props.dataKpi && this.props.dataKpi.metricsProfile.activeCustomers.count}</td>
                                </tr>
                                <tr>
                                    <td>{this.props.language.DL_precentage}</td>
                                    <td>{this.props.dataKpi && this.props.dataKpi.metricsProfile.activeCustomers.percentage}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table>
                            <thead style={{ width: "100%" }}>
                                <tr>
                                    <th className="kpi-table-header">{this.props.language.title_perid}</th>
                                    <th className="kpi-table-header">{this.props.language.title_OV}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableHistory}
                            </tbody>
                        </table>

                        <table>
                            <thead style={{ width: "100%" }}>
                                <tr>
                                    <th className="kpi-table-header">{this.props.language.title_level}</th>
                                    <th className="kpi-table-header">{this.props.language.title_Ba}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reankTableLevel}
                            </tbody>
                        </table>

                        <table>
                            <thead style={{ width: "100%" }}>
                                <tr>
                                    <th className="kpi-table-header">{this.props.language.title_rank}</th>
                                    <th className="kpi-table-header">{this.props.language.title_Qualified}</th>
                                    <th className="kpi-table-header">{this.props.language.title_rank_advances}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rankTableBody}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        )
    }
}

export default KpiTab;
