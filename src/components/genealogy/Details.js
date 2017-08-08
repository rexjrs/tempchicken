import React, { Component } from 'react';
import moment from 'moment';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: "hide",
            animate: "slideInUp",
            detailsOpen: false
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.detailsOpen !== this.state.detailsOpen){
            if(nextProps.detailsOpen){
                this.openModal();
            }else{
                this.closeModal();
            }
        }
    }

    openModal() {
        this.setState({hide: "hide", animate: "slideInUp"})
        this.setState({ hide: ""})
    }

    closeModal() {
        this.props.hideDetails();
        this.setState({ animate: "slideOutDown" });
    }

    render() {
        let data = this.props.detailsData;
        console.log(data)
        let name;
        if(data){
            name = data.humanName.fullName;
            if(this.props.language.language === "TH"){
                if(data.humanName['fullName@th']){
                    name = data.humanName['fullName@th']
                }
            }
        }
        return (
            data &&
            <div className={"genealogy-bookmark-modal animated " + this.state.hide + ' ' + this.state.animate}>
                <div onClick={()=>this.closeModal()} className="empty-modal-top"></div>
                <div className="genealogy-bookmark-modal-bottom">
                    <div className="report-modal-top">
                        <button onClick={this.closeModal.bind(this)} className="global-button global-button-active close-modal-btn">{this.props.language.cancel}</button>
                    </div>
                    <br/>
                        <div className="row">
                            <div className="col">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>{name}</td>
                                        </tr>
                                        <tr>
                                            <td>Nick Name</td>
                                            <td>
                                                {data.nickName}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Member ID</td>
                                            <td>{data.id.unicity}</td>
                                        </tr>
                                        <tr>
                                            <td>VIP Code</td>
                                            <td>
                                                {data.FSB}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>
                                                {data.email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Phone No.</td>
                                            <td>
                                                {data.homePhone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Enroller</td>
                                            <td>
                                                {data.enroller.unicity}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sponsor</td>
                                            <td>
                                                {data.sponsor.unicity}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Enrolled</td>
                                            <td>
                                                {moment(data.joinDate).format('DD MMM YYYY')}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td>
                                                {data.status} , {data.cumulativeMetricsProfile.highestRankShort}
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
                                        <th>{moment(data && data.metricsProfileHistory.items[0].period).format('MMM YYYY')}</th>
                                        <th>{moment(data && data.metricsProfileHistory.items[1].period).format('MMM YYYY')}</th>
                                        <th>{moment(data && data.metricsProfileHistory.items[2].period).format('MMM YYYY')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>PV</td>
                                        <td>{data && data.metricsProfileHistory.items[0].value.pv}</td>
                                        <td>{data && data.metricsProfileHistory.items[1].value.pv}</td>
                                        <td>{data && data.metricsProfileHistory.items[2].value.pv}</td>
                                    </tr>
                                    <tr>
                                        <td>TV</td>
                                        <td>{data && data.metricsProfileHistory.items[0].value.tv}</td>
                                        <td>{data && data.metricsProfileHistory.items[1].value.tv}</td>
                                        <td>{data && data.metricsProfileHistory.items[2].value.tv}</td>
                                    </tr>
                                    <tr>
                                        <td>OV</td>
                                        <td>{data && data.metricsProfileHistory.items[0].value.ov}</td>
                                        <td>{data && data.metricsProfileHistory.items[1].value.ov}</td>
                                        <td>{data && data.metricsProfileHistory.items[2].value.ov}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;
