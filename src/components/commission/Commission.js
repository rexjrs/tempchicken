import React, { Component } from 'react';
import { serviceGetNews } from '../../services/Network';
import CommissionTab from './CommissionTab';
import LSBTab from './LSBTab';

class Commission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex:0
        };
    }

    changeTab(value){
        this.setState({
            tabIndex:value
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
                    <CommissionTab/>
                }
                {this.state.tabIndex === 1 &&
                    <LSBTab/>
                }
            </div>
        );
    }
}

export default Commission;
