import React, { Component } from 'react';

class ShowOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var products = this.props.showOrderDataSource[3].map((b,i)=>{
            let link = ""
            for(var e in this.props.productDataSource){
                if(this.props.productDataSource[e].product_id === b.itemid){
                    link = this.props.productDataSource[e].image
                }
            }
            return(
                <div key={i} className="row">
                    <div className="col-4">
                        <img src={link} alt="This product could not be found" className="img-fluid" />
                    </div>
                    <div className="col">
                        {b.priceall} {this.props.language.currency}
                        <br/>
                        ID: {b.itemid} | QTY: {b.qty}
                        <br/>
                        {b.itemname}
                        <br/>
                        {b.pvall} PV
                    </div>
                </div>
            )
        })
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <button onClick={()=>this.props.backButton()} className="global-button global-button-active" style={{marginBottom: 10}}>{this.props.language.back}</button>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-6 text-right">
                        {this.props.language.order_date}
                        <br/>
                        {this.props.language.order_number}
                        <br/>
                        {this.props.language.period}
                        <br/>
                        {this.props.language.initial}
                    </div>
                    <div className="col-6">
                        {this.props.showOrderDataSource[0].invoicedate}
                        <br/>
                        {this.props.showOrderDataSource[0].invoiceid}
                        <br/>
                        {this.props.showOrderDataSource[0].pvdate}
                        <br/>
                        {this.props.showOrderDataSource[0].initial}
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-6">
                        {this.props.language.bill_to}
                        <br/>
                        {this.props.showOrderDataSource[1].name}
                        <br/>
                        {this.props.showOrderDataSource[1].address}
                        {this.props.showOrderDataSource[1].address2}
                        <br/>
                        {this.props.showOrderDataSource[1].city}
                        <br/>
                        {this.props.showOrderDataSource[1].country}
                        <br/>
                        {this.props.showOrderDataSource[1].zip}
                        <br/>
                        {this.props.showOrderDataSource[1].mobile}
                    </div>
                    <div className="col-6">
                        {this.props.language.ship_to}
                        <br/>
                        {this.props.showOrderDataSource[2].name}
                        <br/>
                        {this.props.showOrderDataSource[2].address}
                        {this.props.showOrderDataSource[2].address2}
                        <br/>
                        {this.props.showOrderDataSource[2].city}
                        <br/>
                        {this.props.showOrderDataSource[2].country}
                        <br/>
                        {this.props.showOrderDataSource[2].zip}
                        <br/>
                        {this.props.showOrderDataSource[2].mobile}
                    </div>
                </div>
                <hr/>
                {products}
                <hr/>
                <div className="row">
                    <div className="col-6 text-right">
                        PV
                        <br/>
                        {this.props.language.tax}
                        <br/>
                        {this.props.language.amount}
                        <br/>
                        {this.props.language.total_amount_due}
                        <br/>
                        {this.props.language.payment_type}
                        <br/>
                        {this.props.language.receipt_amount}
                    </div>
                    <div className="col-6 text-right">
                        {this.props.showOrderDataSource[4].pv}
                        <br/>
                        {this.props.showOrderDataSource[5].tax}
                        <br/>
                        {this.props.showOrderDataSource[5].cost}
                        <br/>
                        {this.props.showOrderDataSource[6].total}
                        <br/>
                        {this.props.showOrderDataSource[6].method}
                        <br/>
                        {this.props.showOrderDataSource[6].cost}
                    </div>
                </div>
            </div>  
        );
    }
}

export default ShowOrder;
