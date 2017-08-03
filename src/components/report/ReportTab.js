import React, { Component } from 'react';
import { getPeriod, hydraRequestByUrl } from '../../services/Network';
import { marketZone } from '../GlobalHelpers';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {StartFromMonth} from './DatePickerStart';
import {EndYearMonthForm, EndFromMonth} from './DatePickerEnd';

class ReportTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportTypes: [
                {type: 'metricsProfile_pv=top 20', name: 'Top 20 PV'},
                {type: 'metricsProfile_tv=top 20', name: 'Top 20 TV'},
                {type: 'metricsProfile_rankShort', name: 'Rank Advance'},
                {type: 'metricsProfile_newba', name: 'New Enrollment'},
            ],
            selectMonth: [],
            noData: true,
            noDataMsg: false,
            selectedType: "metricsProfile_pv=top 20",
            selectedLevel: 5,
            selectedMonth: "",
            hide: "hide",
            animate: "fadeIn",
            dateType: 'start',
            startDate: new Date(),
            endDate: new Date(),
            startMonth: new Date(),
            endMonth: new Date()
        };
    }

    componentWillMount(){
        this.getPeriodOptions();
    }

    getPeriodOptions(){
        getPeriod(((res,status)=>{
            if(res.status === 200){
                let tempArray = [];
                res.message.map((b,i)=>{
                    let year = b.substr(0,4);
                    let month = b.substr(-2);
                    let combined = year+'-'+month
                    tempArray.push(combined)
                    return false;
                });
                this.setState({selectMonth: tempArray, noDataMsg: false, noData: false, selectedMonth: tempArray[0]});
            }else{
                this.setState({noDataMsg: true})
            }
        }),this.props.customerData.unicity,marketZone);
    }

    generateReport(){
        let url;
        switch(this.state.selectedType){
            case 'metricsProfile_pv=top 20':
                url = 
                    localStorage.getItem('customerHref') + '/sponsoredCustomersTreePreOrder?maxTreeDepth='+this.state.selectedLevel+'&'+this.state.selectedType+'&metricsProfile_period='+this.state.selectedMonth;
                break;
            case 'metricsProfile_tv=top 20':
                url = 
                    localStorage.getItem('customerHref') + '/sponsoredCustomersTreePreOrder?maxTreeDepth='+this.state.selectedLevel+'&'+this.state.selectedType+'&metricsProfile_period='+this.state.selectedMonth;
                break;
            case 'metricsProfile_rankShort':
                url = 
                    localStorage.getItem('customerHref') + '/sponsoredCustomersTreePreOrder?maxTreeDepth='+this.state.selectedLevel+'&'+this.state.selectedType+'=>metricsProfile.rankShort&metricsProfile_period='+this.state.selectedMonth;
                break;
            case 'metricsProfile_newba':
                url = 
                    localStorage.getItem('customerHref') + '/sponsoredCustomersTreePreOrder?maxTreeDepth='+this.state.selectedLevel+'&limit=2000&joinDate=['+this.state.startDate+';'+this.state.endDate+']';
                break;
            default:
                return false;
        }
        hydraRequestByUrl(((res,status)=>{
            console.log(status)
            console.log(res)
        }),localStorage.getItem('customerToken'),url);
    }

    datePick(type,date){
        this.setState({animate: "fadeOut",[type+"Date"]: date});
        setTimeout(() => {
            this.setState({hide: "hide"})
        }, 800);
    }

    openModal(type){
        this.setState({hide: "",animate: "fadeIn",dateType: type})
    }
    
    closeModal(){
        this.setState({animate: "fadeOut"});
        setTimeout(() => {
            this.setState({hide: "hide"})
        }, 800);
    }

    handleStartYearMonthChange = startMonth => {
        this.setState({ startMonth });
    };

    handleEndYearMonthChange = endMonth => {
        this.setState({ endMonth });
    };

    render() {
        let levels = [];
        for(var i = 1; i < 13; i++){
            levels.push(
            <option key={i} value={i}>{i}</option>
            );
        }
        var reportTypes = this.state.reportTypes.map((b,i)=>{
            return(
                <option key={i} value={b.type}>{b.name}</option>
            );
        });
        var selectMonth = this.state.selectMonth.map((b,i)=>{
            return(
                <option key={i} value={b}>{moment(b).format('MMMM YYYY')}</option>
            );
        });
        return (
            <div>
                <div className="row">
                    <div className="col text-right">
                        <p className="report-select-text">{this.props.language.select_report}</p>
                        {this.state.selectedType === "metricsProfile_newba" &&
                        <div>
                        <p className="report-select-text">Start Date</p>
                        <p className="report-select-text">End Date</p>
                        </div>
                        }
                        {this.state.selectedType !== "metricsProfile_newba" &&
                        <p className="report-select-text">{this.props.language.select_month}</p>
                        }
                        <p className="report-select-text">{this.props.language.select_level}</p>
                    </div>
                    <div className="col">
                        <select value={this.state.selectedType} onChange={(event)=>this.setState({selectedType: event.target.value})} className="report-select">
                            { reportTypes }
                        </select>
                        {this.state.selectedType === "metricsProfile_newba" &&
                        <div>
                            <button onClick={()=>this.openModal('start')} type="button" className="report-select">{moment(this.state.startDate).format('DD/MM/YYYY')}</button>
                            <button onClick={()=>this.openModal('end')} type="button" className="report-select" data-toggle="modal" data-target="#myModal">{moment(this.state.endDate).format('DD/MM/YYYY')}</button>
                        </div>
                        }
                        {this.state.selectedType !== "metricsProfile_newba" &&
                        <select value={this.state.selectedMonth} onChange={(event)=>this.setState({selectedMonth: event.target.value})} className="report-select">
                            { selectMonth }
                        </select>
                        }
                        <select value={this.state.selectedLevel} onChange={(event)=>this.setState({selectedLevel: event.target.value})} className="report-select">
                            { levels }
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        {!this.state.noData &&
                        <button onClick={this.generateReport.bind(this)} className="global-button global-button-active" style={{width: 100}}>{this.props.language.submit}</button>
                        }
                        {this.state.noDataMsg &&
                            <p>{this.props.language.no_data}</p>
                        }
                    </div>
                </div>                           
                <div className={"report-modal-container animated "+this.state.hide+' '+this.state.animate}>
                    <div className="report-modal">
                        <div className="report-modal-top">
                            <button onClick={this.closeModal.bind(this)} className="global-button global-button-active close-modal-btn">Cancel</button>
                        </div>
                        <div className="report-modal-content">
                            {this.state.dateType === "start" &&
                            <DayPicker 
                                month={this.state.startMonth}
                                fromMonth={StartFromMonth}
                                selectedDays={this.state.startDate} 
                                onDayClick={(date)=>this.datePick('start',date)}
                                captionElement={
                                    <EndYearMonthForm onChange={this.handleStartYearMonthChange} />
                                }
                            /> 
                            }
                            {this.state.dateType === "end" &&
                            <DayPicker 
                                month={this.state.endMonth}
                                fromMonth={EndFromMonth}
                                selectedDays={this.state.endDate} 
                                onDayClick={(date)=>this.datePick('end',date)}
                                captionElement={
                                    <EndYearMonthForm onChange={this.handleEndYearMonthChange} />
                                }
                            /> 
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReportTab;
