import React, { Component } from 'react';
import { serviceGetNews } from '../../services/Network';

class CommissionTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex:0
        };
    }

    render() {

        return (
            <div className="container-fluid global-container-bottom-padding">

            </div>
        );
    }
}

export default CommissionTab;
