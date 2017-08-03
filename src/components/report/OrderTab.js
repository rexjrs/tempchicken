import React, { Component } from 'react';
import Spinner from '../Spinner';
import ShowOrder from './ShowOrder';
import { queryOrder } from '../../services/Network';

class OrderTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queryingOrder: false,
            showOrder: false,
            showOrderDataSource: []
        };
    }

    backButton(){
        this.setState({showOrder: false})
    }

    getOrder(orderUrl){
        this.setState({queryingOrder: true})
        queryOrder(((res,status)=>{
            if(status){
                this.setState({showOrderDataSource: res,queryingOrder: false,showOrder: true})
            }else{
                this.setState({queryingOrder: false})
            }
        }),localStorage.getItem('customerToken'),localStorage.getItem('customerHref'),orderUrl)
    }

    render() {
        this.monthBtnActive = (value) => {
            switch(value){
                case 0:
                    if(this.props.orderMonth === 0){
                        return 'global-connected-button-left global-connected-button-active'
                    }else{
                        return 'global-connected-button-left'
                    }
                case 1:
                    if(this.props.orderMonth === 1){
                        return 'global-connected-button-middle global-connected-button-active'
                    }else{
                        return 'global-connected-button-middle'
                    }
                case 2:
                    if(this.props.orderMonth === 2){
                        return 'global-connected-button-right global-connected-button-active'
                    }else{
                        return 'global-connected-button-right'
                    }
                default:
            }
        }
        var orderList = this.props.orderDataSource.map((b,i)=>{
            let borderTop = 0;
            if(i === 0){
                borderTop = 1;
            }
            return(
                <div key={i} onClick={()=>this.getOrder(b.href)} className="row report-order-listing" style={{borderTop: borderTop+"px solid #CCC"}}>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-6" style={{fontWeight: "bold"}}>
                                {this.props.language.order_number}
                            </div>
                            <div className="col-6">
                                <div className="report-pv-container text-center">
                                    <p className="white-text" style={{display: "inline"}}>PV</p>
                                    <div className="report-pv-box">{b.totalpv}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="global-font-size-5">{b.orderid}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p style={{fontWeight: "bold"}}>{this.props.language.order_date}</p>
                                <p>{b.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {!this.state.showOrder &&
                <div>
                    <div className="row">
                        <div className="col text-center">
                            <button onClick={()=>this.props.changeMonth(0)} className={this.monthBtnActive(0)}>1 {this.props.language.month}</button>
                            <button onClick={()=>this.props.changeMonth(1)} className={this.monthBtnActive(1)}>3 {this.props.language.months}</button>
                            <button onClick={()=>this.props.changeMonth(2)} className={this.monthBtnActive(2)}>6 {this.props.language.months}</button>
                        </div>
                    </div>
                    <br/>
                    {this.props.loadingOrder &&
<<<<<<< HEAD
                    <Spinner/>
=======
                        <Spinner/>
>>>>>>> lim
                    }
                    {!this.props.loadingOrder &&
                        orderList
                    }
                    {this.props.nodata &&
                    <div className="row">
                        <div className="col text-center">
                            {this.props.language.no_data}
                        </div>
                    </div>
                    }
                </div>
                }
                {this.state.showOrder &&
                    <ShowOrder language={this.props.language} backButton={this.backButton.bind(this)} productDataSource={this.props.productDataSource} showOrderDataSource={this.state.showOrderDataSource} />
                }
                {this.state.queryingOrder &&
                <div className="loading-overlay">
                    <Spinner />
                </div>
                }
            </div>
        );
    }
}

export default OrderTab;
