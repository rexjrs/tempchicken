import React, { Component } from 'react';
import { serviceGetNews } from '../../services/Network';
import CommissionTab from './CommissionTab';
import LSBTab from './LSBTab';

class Commission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex:0,
            LSBData:{},
            commission: []
        };
    }

    changeTab(value){
        this.setState({
            tabIndex:value
        })
    }
    setDataLSB(value){
        this.setState({
            LSBData:value
        })
    }
    setDataCommission(value){
        this.setState({
            commission:value
        })
    }


    render() {
       this.btnActive = (value) => {
            switch(value){
                case 0:
                    if(this.state.tabIndex === 0){
                        return 'commission-tab commission-tab-active'
                    }else{
                        return 'commission-tab'
                    }
                case 1:
                    if(this.state.tabIndex === 1){
                        return 'commission-tab commission-tab-active'
                    }else{
                        return 'commission-tab'
                    }
                default:
            }
        }

        return (
            <div className="container-fluid global-container-bottom-padding">
               <div className="report-tab-container">
                    <button onClick={()=>this.changeTab(0)} className={this.btnActive(0)}>Commission</button>
                    <button onClick={()=>this.changeTab(1)} className={this.btnActive(1)}>LSB</button>
                </div>
                {this.state.tabIndex === 0 &&
                    <CommissionTab customerData={this.props.customerData} commissionData={this.state.commission} setDataCommission={this.setDataCommission.bind(this)}/>
                }
                {this.state.tabIndex === 1 &&
                    <LSBTab LSBData={this.state.LSBData} setDataLSB={this.setDataLSB.bind(this)} />
                }
            </div>
        );
    }
}

export default Commission;
