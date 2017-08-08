import React, { Component } from 'react';
import { getPeriod, hydraRequestByUrl, getVip, expandCustomer } from '../../services/Network';
import { marketZone } from '../GlobalHelpers';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { StartFromMonth } from './DatePickerStart';
import { EndYearMonthForm, EndFromMonth } from './DatePickerEnd';
import Spinner from '../Spinner';

class ReportTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportTypes: [
                { type: 'metricsProfile_pv=top 20', name: 'Top 20 PV' },
                { type: 'metricsProfile_tv=top 20', name: 'Top 20 TV' },
                { type: 'metricsProfile_rankShort', name: 'Rank Advance' },
                { type: 'metricsProfile_newba', name: 'New Enrollment' },
            ],
            selectMonth: [],
            originalNoData: true,
            noData: true,
            noDataMsg: false,
            selectedType: "metricsProfile_pv=top 20",
            selectedLevel: 5,
            selectedMonth: "",
            hide: "hide",
            animate: "slideInUp",
            dateType: 'start',
            startDate: new Date(),
            endDate: new Date(),
            startMonth: new Date(),
            endMonth: new Date(),
            viewUser: false,
            userData: {},
            dataComplete: 0
        };
    }

    componentWillMount() {
        this.getPeriodOptions();
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
                this.setState({ selectMonth: tempArray, noDataMsg: false, noData: false, selectedMonth: tempArray[0], originalNoData: false });
            } else {
                this.setState({ noDataMsg: true })
            }
        }), this.props.customerData.unicity, marketZone);
    }

    generateReport() {
        this.props.setAnyState('reportLoading', true);
        let url;
        switch (this.state.selectedType) {
            case 'metricsProfile_pv=top 20':
                url =
                    localStorage.getItem('customerHref') + '/sponsoredCustomersTreePreOrder?maxTreeDepth=' + this.state.selectedLevel + '&' + this.state.selectedType + '&metricsProfile_period=' + this.state.selectedMonth;
                break;
            case 'metricsProfile_tv=top 20':
                url =
                    localStorage.getItem('customerHref') + '/sponsoredCustomersTreePreOrder?maxTreeDepth=' + this.state.selectedLevel + '&' + this.state.selectedType + '&metricsProfile_period=' + this.state.selectedMonth;
                break;
            case 'metricsProfile_rankShort':
                url =
                    localStorage.getItem('customerHref') + '/sponsoredCustomersTreePreOrder?maxTreeDepth=' + this.state.selectedLevel + '&' + this.state.selectedType + '=>metricsProfile.rankShort&metricsProfile_period=' + this.state.selectedMonth;
                break;
            case 'metricsProfile_newba':
                url =
                    localStorage.getItem('customerHref') + '/sponsoredCustomersTreePreOrder?maxTreeDepth=' + this.state.selectedLevel + '&limit=2000&joinDate=[' + moment(this.state.startDate).format('YYYY-MM-DD') + ';' + moment(this.state.endDate).format('YYYY-MM-DD') + ']';
                break;
            default:
                return false;
        }
        hydraRequestByUrl(((res, status) => {
            this.props.setAnyState('reportLoading', false);
            if (status) {
                this.props.setReportDataSource(res.items);
            } else {
                this.props.setReportDataSource([]);
            }
        }), localStorage.getItem('customerToken'), url);
    }

    datePick(type, date) {
        this.setState({ animate: "slideOutDown", [type + "Date"]: date });
        setTimeout(() => {
            this.setState({ hide: "hide" })
        }, 800);
    }

    openModal(type) {
        this.setState({ hide: "", animate: "slideInUp", dateType: type })
    }

    closeModal() {
        this.setState({ animate: "slideOutDown" });
        setTimeout(() => {
            this.setState({ hide: "hide" })
        }, 800);
    }

    handleStartYearMonthChange = startMonth => {
        this.setState({ startMonth });
    };

    handleEndYearMonthChange = endMonth => {
        this.setState({ endMonth });
    };

    viewUser(data) {
        this.setState({
            userData: data,
            viewUser: true,
            dataComplete: 0
        });
        getVip(((res, status) => {
            let vip = res.FSB;
            if (!vip) {
                vip = "No";
            }
            data.vip = vip;
            let userData = this.state.userData;
            if (this.state.dataComplete === 4) {
                userData = data;
            }
            this.setState({
                dataComplete: this.state.dataComplete + 1,
                userData: userData
            });
        }), data.customer.id.unicity);
        hydraRequestByUrl(((res, status) => {
            data.hydraObj = res;
            let userData = this.state.userData;
            if (this.state.dataComplete === 4) {
                userData = data;
            }
            this.setState({
                dataComplete: this.state.dataComplete + 1,
                userData: userData
            });
            expandCustomer(((res, status) => {
                data.enroller = res;
                let userData = this.state.userData;
                if (this.state.dataComplete === 4) {
                    userData = data;
                }
                this.setState({
                    dataComplete: this.state.dataComplete + 1,
                    userData: userData
                });
            }), localStorage.getItem('customerToken'), res.enroller.id.unicity);
            expandCustomer(((res, status) => {
                data.sponsor = res;
                let userData = this.state.userData;
                if (this.state.dataComplete === 4) {
                    userData = data;
                }
                this.setState({
                    dataComplete: this.state.dataComplete + 1,
                    userData: userData
                });
            }), localStorage.getItem('customerToken'), res.sponsor.id.unicity);
        }), localStorage.getItem('customerToken'), data.customer.href);
        hydraRequestByUrl(((res, status) => {
                data.metrics = res;
                let userData = this.state.userData;
                if (this.state.dataComplete === 4) {
                    userData = data;
                }
                this.setState({
                    dataComplete: this.state.dataComplete + 1,
                    userData: userData
                });
        }), localStorage.getItem('customerToken'), data.customer.href+'/metricsProfileHistory');
    }

    selectReport(event) {
        let noData = true;
        if (event.target.value === "metricsProfile_newba") {
            noData = false;
        }
        if(!this.state.originalNoData){
            noData = false;
        }
        this.setState({
            selectedType: event.target.value,
            noData: noData,
            noDataMsg: noData
        });
    }

    render() {
        let levels = [];
        for (var i = 1; i < 13; i++) {
            levels.push(
                <option key={i} value={i}>{i}</option>
            );
        }
        var reportTypes = this.state.reportTypes.map((b, i) => {
            return (
                <option key={i} value={b.type}>{b.name}</option>
            );
        });
        var selectMonth = this.state.selectMonth.map((b, i) => {
            return (
                <option key={i} value={b}>{moment(b).format('MMMM YYYY')}</option>
            );
        });
        var reportResult = this.props.reportDataSource.map((b, i) => {
            return (
                <div onClick={() => this.viewUser(b)} key={i} className="row row-border-top-bottom">
                    <div className="col global-font-size-35 text-center">
                        {i + 1}
                    </div>
                    <div className="col-8 global-font-size-35">
                        <p className="no-margin report-tab-fullname">{b.customer.humanName.fullName}</p>
                        Member ID: {b.customer.id.unicity}
                        <br />
                        Enrollment Date: {moment(b.customer.joinDate).format('DD/MM/YYYY')}
                    </div>
                    <div className="col global-font-size-35">
                        Rank: {b.customer.cumulativeMetricsProfile.highestRankShort}
                    </div>
                </div>
            )
        })
        return (
            <div>
                {this.state.viewUser &&
                    <div>
                        <div className="row">
                            <div className="col">
                                <button onClick={() => this.setState({ viewUser: false })} className="global-button global-button-active">Back</button>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>{this.state.userData.customer.humanName.fullName}</td>
                                        </tr>
                                        <tr>
                                            <td>Nick Name</td>
                                            <td>
                                                {!this.state.userData.customer && <p className="no-margin report-loading-data">&nbsp;Loading data..</p>}
                                                {this.state.userData.customer.nickName && <p className="no-margin">&nbsp;{this.state.userData.customer.nickName}</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Member ID</td>
                                            <td>{this.state.userData.customer.id.unicity}</td>
                                        </tr>
                                        <tr>
                                            <td>VIP Code</td>
                                            <td>
                                                {!this.state.userData.vip && <p className="no-margin report-loading-data">&nbsp;Loading data..</p>}
                                                {this.state.userData.vip && <p className="no-margin">&nbsp;{this.state.userData.vip}</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>
                                                {!this.state.userData.hydraObj && <p className="no-margin report-loading-data">&nbsp;Loading data..</p>}
                                                {this.state.userData.hydraObj && <p className="no-margin">&nbsp;{this.state.userData.hydraObj.email}</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Phone No.</td>
                                            <td>
                                                {!this.state.userData.hydraObj && <p className="no-margin report-loading-data">&nbsp;Loading data..</p>}
                                                {this.state.userData.hydraObj && <p className="no-margin">&nbsp;{this.state.userData.hydraObj.homePhone}</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Enroller</td>
                                            <td>
                                                {!this.state.userData.hydraObj && <p className="no-margin report-loading-data">&nbsp;Loading data..</p>}
                                                {this.state.userData.hydraObj && <p className="no-margin">&nbsp;{this.state.userData.hydraObj.enroller.id.unicity}</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                {!this.state.userData.sponsor && <p className="no-margin report-loading-data">&nbsp;Loading data..</p>}
                                                {this.state.userData.sponsor && <p className="no-margin">&nbsp;{this.state.userData.enroller.items[0].humanName.fullName}</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sponsor</td>
                                            <td>
                                                {!this.state.userData.hydraObj && <p className="no-margin report-loading-data">&nbsp;Loading data..</p>}
                                                {this.state.userData.hydraObj && <p className="no-margin">&nbsp;{this.state.userData.hydraObj.sponsor.id.unicity}</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                {!this.state.userData.sponsor && <p className="no-margin report-loading-data">&nbsp;Loading data..</p>}
                                                {this.state.userData.sponsor && <p className="no-margin">&nbsp;{this.state.userData.sponsor.items[0].humanName.fullName}</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Enrolled</td>
                                            <td>
                                                {!this.state.userData.hydraObj && <p className="no-margin report-loading-data">&nbsp;Loading data..</p>}
                                                {this.state.userData.hydraObj && <p className="no-margin">&nbsp;{moment(this.state.userData.hydraObj.joinDate).format('DD MMM YYYY')}</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>
                                                {!this.state.userData.hydraObj && <p className="no-margin report-loading-data">&nbsp;Loading data..</p>}
                                                {this.state.userData.hydraObj && <p className="no-margin">&nbsp;{this.state.userData.hydraObj.status}, {this.state.userData.customer.cumulativeMetricsProfile.highestRankShort}</p>}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <table className="report-user-view-table">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>{moment(this.state.userData.metrics && this.state.userData.metrics.items[0].period).format('MMM YYYY')}</th>
                                            <th>{moment(this.state.userData.metrics && this.state.userData.metrics.items[1].period).format('MMM YYYY')}</th>
                                            <th>{moment(this.state.userData.metrics && this.state.userData.metrics.items[2].period).format('MMM YYYY')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>PV</td>
                                            <td>{this.state.userData.metrics && this.state.userData.metrics.items[0].value.pv}</td>
                                            <td>{this.state.userData.metrics && this.state.userData.metrics.items[1].value.pv}</td>
                                            <td>{this.state.userData.metrics && this.state.userData.metrics.items[2].value.pv}</td>
                                        </tr>
                                        <tr>
                                            <td>TV</td>
                                            <td>{this.state.userData.metrics && this.state.userData.metrics.items[0].value.tv}</td>
                                            <td>{this.state.userData.metrics && this.state.userData.metrics.items[1].value.tv}</td>
                                            <td>{this.state.userData.metrics && this.state.userData.metrics.items[2].value.tv}</td>
                                        </tr>
                                        <tr>
                                            <td>OV</td>
                                            <td>{this.state.userData.metrics && this.state.userData.metrics.items[0].value.ov}</td>
                                            <td>{this.state.userData.metrics && this.state.userData.metrics.items[1].value.ov}</td>
                                            <td>{this.state.userData.metrics && this.state.userData.metrics.items[2].value.ov}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
                {!this.state.viewUser &&
                    <div>
                        <div className="row">
                            <div className="col text-right">
                                <p className="report-select-text">{this.props.language.select_report}</p>
                                {this.state.selectedType === "metricsProfile_newba" &&
                                    <div>
                                        <p className="report-select-text">{this.props.language.start_date}</p>
                                        <p className="report-select-text">{this.props.language.end_date}</p>
                                    </div>
                                }
                                {this.state.selectedType !== "metricsProfile_newba" &&
                                    <p className="report-select-text">{this.props.language.select_month}</p>
                                }
                                <p className="report-select-text">{this.props.language.select_level}</p>
                            </div>
                            <div className="col">
                                <select value={this.state.selectedType} onChange={(event) => this.selectReport(event)} className="report-select">
                                    {reportTypes}
                                </select>
                                {this.state.selectedType === "metricsProfile_newba" &&
                                    <div>
                                        <button onClick={() => this.openModal('start')} type="button" className="report-select">{moment(this.state.startDate).format('DD/MM/YYYY')}</button>
                                        <button onClick={() => this.openModal('end')} type="button" className="report-select" data-toggle="modal" data-target="#myModal">{moment(this.state.endDate).format('DD/MM/YYYY')}</button>
                                    </div>
                                }
                                {this.state.selectedType !== "metricsProfile_newba" &&
                                    <select value={this.state.selectedMonth} onChange={(event) => this.setState({ selectedMonth: event.target.value })} className="report-select">
                                        {selectMonth}
                                    </select>
                                }
                                <select value={this.state.selectedLevel} onChange={(event) => this.setState({ selectedLevel: event.target.value })} className="report-select">
                                    {levels}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-center">
                                {this.props.reportLoading &&
                                    <Spinner />
                                }
                                {!this.state.noData &&
                                    !this.props.reportLoading &&
                                    <button onClick={this.generateReport.bind(this)} className="global-button global-button-active" style={{ width: 100 }}>{this.props.language.submit}</button>
                                }
                                {this.state.noDataMsg &&
                                    <p>{this.props.language.no_data}</p>
                                }
                            </div>
                        </div>
                        <br />
                        {reportResult}
                    </div>
                }
                <div className={"report-modal-container animated " + this.state.hide + ' ' + this.state.animate}>
                    <div onClick={()=>this.closeModal()} className="empty-modal-top"></div>
                    <div className="report-modal">
                        <div className="report-modal-top">
                            <button onClick={this.closeModal.bind(this)} className="global-button global-button-active close-modal-btn">{this.props.language.cancel}</button>
                        </div>
                        <div className="report-modal-content">
                            {this.state.dateType === "start" &&
                                <DayPicker
                                    month={this.state.startMonth}
                                    fromMonth={StartFromMonth}
                                    selectedDays={this.state.startDate}
                                    onDayClick={(date) => this.datePick('start', date)}
                                    captionElement={
                                        <EndYearMonthForm onChange={this.handleStartYearMonthChange} />
                                    }
                                />
                            }
                            {this.state.dateType === "end" &&
                                <DayPicker
                                    month={this.state.endMonth}
                                    fromMonth={EndFromMonth}
                                    selectedDays={this.state.endDate}
                                    onDayClick={(date) => this.datePick('end', date)}
                                    captionElement={
                                        <EndYearMonthForm onChange={this.handleEndYearMonthChange} />
                                    }
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReportTab;
