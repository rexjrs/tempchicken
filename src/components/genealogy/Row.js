import React, { Component } from 'react';

class LeftCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let showItems = true;
        let shorter = this.props.data.customer.metricsProfileHistory.items;
        if(!this.props.showAll){
            if(
                shorter[0].value.pv === 0 && shorter[0].value.tv === 0 && shorter[0].value.ov === 0 &&
                shorter[1].value.pv === 0 && shorter[1].value.tv === 0 && shorter[1].value.ov === 0 &&
                shorter[2].value.pv === 0 && shorter[2].value.tv === 0 && shorter[2].value.ov === 0
            ){
                showItems = false;
            }
        }
        return (
            showItems &&
            <tr>
                <td>{this.props.data.customer.id.unicity}</td>
                <td>{this.props.data.customer.cumulativeMetricsProfile.highestRankShort}</td>
                <td></td>
                <td>{this.props.data.customer.metricsProfileHistory.items[0].value.pv}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[0].value.tv}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[0].value.ov}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[1].value.pv}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[1].value.tv}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[1].value.ov}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[2].value.pv}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[2].value.tv}</td>
                <td>{this.props.data.customer.metricsProfileHistory.items[2].value.ov}</td>
            </tr>
        );
    }
}

export default LeftCell;
