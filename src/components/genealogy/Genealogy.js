import React, { Component } from 'react';
import GenealogyComponent from './GenealogyComponent';

class Genealogy extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className="container-fluid global-container-bottom-padding genealogy-page-wrapper">
                <GenealogyComponent 
                    language={this.props.language}
                    searchStateArray={this.props.searchStateArray}
                    stateUpdate={this.props.stateUpdate}
                    customerData={this.props.customerData}
                />
            </div>
        );
    }
}

export default Genealogy;
