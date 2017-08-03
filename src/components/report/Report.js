import React, { Component } from 'react';
import { reportOrder, getProduct } from '../../services/Network';
import OrderTab from './OrderTab';
import ReportTab from './ReportTab';
import KpiTab from './KpiTab';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            orderMonth: 0,
            orderDataSource: [],
            reportDataSource: [],
            loadingOrder: true,
            nodata: false,
            reportLoading: false,
            loadingOrder: true,
            nodata: false,
            dataKpi: null
        };
    }

    componentWillMount(){
        this.changeMonth(0);
        this.fetchProduct();
    }

    setAnyState(key,value){
        this.setState({
            [key]: value
        })
    }

    fetchProduct(){
        getProduct(((res,status)=>{
            if(status){
                this.props.stateUpdate('productDataSource','set',res)
            }
        }))
    }

    changeTab(index){
        this.setState({tabIndex: index})
    }
    
    changeMonth(index){
        let month = 1;
        if(index > 0){
            month = index * 3
        }
        this.setState({orderMonth: index,loadingOrder: true, nodata: false})
        reportOrder(((res,status)=>{
            if(status){
                res = res.reverse();
                this.setState({orderDataSource: res,loadingOrder: false})
            }else{
                this.setState({loadingOrder: false, nodata: true})
            }
        }),localStorage.getItem('customerToken'),month)
    }

    setReportDataSource(data){
        this.setState({
            reportDataSource: data
        })
    }
    
    setDataKpi(data){
        this.setState({
            dataKpi: data
        })
    }

    render() {
        this.btnActive = (value) => {
            switch(value){
                case 0:
                    if(this.state.tabIndex === 0){
                        return 'report-tab report-tab-active'
                    }else{
                        return 'report-tab'
                    }
                case 1:
                    if(this.state.tabIndex === 1){
                        return 'report-tab report-tab-active'
                    }else{
                        return 'report-tab'
                    }
                case 2:
                    if(this.state.tabIndex === 2){
                        return 'report-tab report-tab-active'
                    }else{
                        return 'report-tab'
                    }
                default:
            }
        }
        return (
            <div className="container-fluid global-container-bottom-padding">
                <div className="report-tab-container">
                    <button onClick={()=>this.changeTab(0)} className={this.btnActive(0)}>{this.props.language.reports}</button>
                    <button onClick={()=>this.changeTab(1)} className={this.btnActive(1)}>{this.props.language.orders}</button>
                    <button onClick={()=>this.changeTab(2)} className={this.btnActive(2)}>{this.props.language.kpis}</button>
                </div>
                <br/>
                {this.state.tabIndex === 0 &&
                <ReportTab language={this.props.language} customerData={this.props.customerData} reportDataSource={this.state.reportDataSource} setReportDataSource={this.setReportDataSource.bind(this)} setAnyState={this.setAnyState.bind(this)} reportLoading={this.state.reportLoading}/>
                }
                {this.state.tabIndex === 1 &&
                <OrderTab language={this.props.language} productDataSource={this.props.productDataSource} changeMonth={this.changeMonth.bind(this)} orderMonth={this.state.orderMonth} loadingOrder={this.state.loadingOrder} nodata={this.state.nodata} orderDataSource={this.state.orderDataSource} />
                }
                {this.state.tabIndex === 2 &&
                <KpiTab language={this.props.language} customerData={this.props.customerData} dataKpi={this.state.dataKpi} setDataKpi={this.setDataKpi.bind(this)}/>
                }
            </div>
        );
    }
}

export default Report;
