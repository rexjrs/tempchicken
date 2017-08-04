import React, { Component } from 'react';

class LeftCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
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
