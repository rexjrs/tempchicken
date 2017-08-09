import React, { Component } from 'react';
import moment from 'moment';
import Status from './Status';

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() { 
        return (
            <div className="container-fluid global-container-bottom-padding">
                <Status customerData={this.props.customerData}/>
            </div>
        );
    }
}

export default Success;