import React, { Component } from 'react';

class LeftCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let tv = [];
        for(var i = 0;i<3;i++){
            if(this.props.data.customer.metricsProfileHistory.items[0].value.gv > -1){
                tv.push(this.props.data.customer.metricsProfileHistory.items[0].value.gv);
            }else{
                tv.push(this.props.data.customer.metricsProfileHistory.items[0].value.tv);
            }
        }
        let showItems = true;
        let shorter = this.props.data.customer.metricsProfileHistory.items;
        if(!this.props.showAll){
            if(
                shorter[0].value.pv === 0 && tv[0] === 0 && shorter[0].value.ov === 0 &&
                shorter[1].value.pv === 0 && tv[1] === 0 && shorter[1].value.ov === 0 &&
                shorter[2].value.pv === 0 && tv[2] === 0 && shorter[2].value.ov === 0
            ){
                showItems = false;
            }
        }
        return (
            showItems &&
            <tr>
                <td>{this.props.data.customer.id.unicity}</td>
                <td>{this.props.data.customer.cumulativeMetricsProfile.highestRankShort}</td>
                <td>{this.props.data.customer.FSB === "VIP" && <i className="fa fa-check-square-o" aria-hidden="true"></i>}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[0].value.pv}</td>
                <td>{tv[0]}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[0].value.ov}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[1].value.pv}</td>
                <td>{tv[1]}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[1].value.ov}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[2].value.pv}</td>
                <td>{tv[2]}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[2].value.ov}</td>
            </tr>
        );
    }
}

export default LeftCell;
