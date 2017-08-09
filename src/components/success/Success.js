import React, { Component } from 'react';
import Status from './Status';
import GenealogyComponent from '../genealogy/GenealogyComponent';

class Success extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metricPeriod: 0,
            legType: "Leg 1",
            displayTable: false
        }
    }

    switchMetricPeriod(value){
        this.setState({
            metricPeriod: value
        });
    }

    showLeg(leg){
        this.setState({
            legType: "Leg "+leg
        },this.showTable);
    }

    showTable(){
        this.setState({
            displayTable: true
        });
    }

    render() { 
        return (
            <div className="container-fluid global-container-bottom-padding">
                {!this.state.displayTable &&
                <Status switchMetricPeriod={this.switchMetricPeriod.bind(this)} language={this.props.language} metricPeriod={this.state.metricPeriod} customerData={this.props.customerData}/>
                }
                <br/>
                {!this.state.displayTable &&
                <div className="row">
                    <div className="col text-center">
                        <button onClick={()=>this.showLeg(1)} className="global-button global-button-active leg-choice">{this.props.language.leg} 1</button>
                        <button onClick={()=>this.showLeg(2)} className="global-button global-button-active leg-choice">{this.props.language.leg} 2</button>
                        <button onClick={()=>this.showLeg(3)} className="global-button global-button-active leg-choice">{this.props.language.leg} 3</button>
                    </div>
                </div>
                }
                {this.state.displayTable &&
                <div className="row">
                    <div className="col">
                        <button onClick={()=>this.setState({displayTable: false})} className="global-button global-button-active leg-choice">{this.props.language.back}</button>
                    </div>
                </div>
                }
                {this.state.displayTable &&
                <div className="success-table-container">
                <GenealogyComponent 
                    language={this.props.language}
                    customerData={this.props.customerData}
                    successPage={true}
                    metricPeriod={this.state.metricPeriod}
                    legType={this.state.legType}
                />
                </div>
                }
            </div>
        );
    }
}

export default Success;