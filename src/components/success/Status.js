import React, { Component } from 'react';
import moment from 'moment';
import { rankList } from '../GlobalHelpers';

class Status extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            selectedPreset: 0
        };
    }

    setPeriod(){
        this.setState({
            monthOne: this.props.customerData.metricsProfileHistory.items[0].period,
            monthTwo: this.props.customerData.metricsProfileHistory.items[1].period,
            monthThree: this.props.customerData.metricsProfileHistory.items[2].period
        })
    }
    
    switchMetricPeriod(value){
        this.props.switchMetricPeriod(value);
    }

    render() { 
        var presets = [
            {pv: 100,tv: 1000,leg1: false,leg2: false,leg3: false,rank: rankList[this.props.language.language].Mgr, img1: '03-click.png',img2: '03-manager.png'},
            {pv: 100,tv: 1000,leg1: 1000,leg2: false,leg3: false,rank: rankList[this.props.language.language].SrM, img1: '04-click.png',img2: '04-senior-manager.png'},
            {pv: 100,tv: 1000,leg1: 3000,leg2: 1000,leg3: false,rank: rankList[this.props.language.language].ExM, img1: '05-click.png',img2: '05-executive-manager.png'},
            {pv: 100, tv: 1000,leg1: 5000,leg2: 1000,leg3: 3000,rank: rankList[this.props.language.language].Dir, img1: '06-click.png',img2: '06-drector.png'},
            {pv: 100, tv: 1000,leg1: 10000,leg2: 2000,leg3: 5000,rank: rankList[this.props.language.language].SrD, img1: '07-click.png',img2: '07-senior-director.png'},
            {pv: 100, tv: 1000,leg1: 20000,leg2: 5000,leg3: 10000,rank: rankList[this.props.language.language].ExD, img1: '08-click.png',img2: '08-executive-director.png'},
            {pv: 100, tv: 1000,leg1: 40000,leg2: 10000,leg3: 20000,rank: rankList[this.props.language.language].PrD, img1: '09-click.png',img2: '09-presidential-director.png'},
            {pv: 100, tv: 1000,leg1: 80000,leg2: 20000,leg3: 40000,rank: rankList[this.props.language.language].PrS, img1: '10-click.png',img2: '10-presidential-sapphire.png'},
            {pv: 100, tv: 1000,leg1: 160000,leg2: 40000,leg3: 80000,rank: rankList[this.props.language.language].PrR, img1: '11-click.png',img2: '11-presidential-ruby.png'},
            {pv: 100, tv: 1000,leg1: 320000,leg2: 80000,leg3: 160000,rank: rankList[this.props.language.language].DIA, img1: '12-click.png',img2: '12-presidential-diamond.png'}
        ]
        let data = this.props.customerData.metricsProfileHistory.items;
        this.btnActive = (value) => {
            switch(value){
                case '0':
                    if(this.props.metricPeriod === 0){
                        return 'global-connected-button-left global-connected-button-active'
                    }else{
                        return 'global-connected-button-left'
                    }
                case '1':
                    if(this.props.metricPeriod === 1){
                        return 'global-connected-button-middle global-connected-button-active'
                    }else{
                        return 'global-connected-button-middle'
                    }
                case '2':
                    if(this.props.metricPeriod === 2){
                        return 'global-connected-button-right global-connected-button-active'
                    }else{
                        return 'global-connected-button-right'
                    }
                default:
                    if(this.props.metricPeriod === 0){
                        return 'global-connected-button-left global-connected-button-active'
                    }else{
                        return 'global-connected-button-left'
                    }
            }
        }
        var Pins = presets.map((b,i)=>{
            let img = b.img2
            if(i === this.state.selectedPreset){
                img = b.img1
            }
            return(
                <div key={i} onClick={()=>this.setState({selectedPreset: i})} className="col no-padding">
                    <img src={"./assets/pins/"+img} className="img-fluid" alt="pins"/>
                </div>
            )
        })
        this.calc = (typeReal,type) =>{
            let percent =  (data[this.props.metricPeriod].value[typeReal]/presets[this.state.selectedPreset][type])*100
            if(isNaN(percent)){
                percent = 0
            }
            if(percent>100){
                percent = 100
            }
            return percent+"%"
        }
        return (
            <div>
                <br/>
                <div className="row home-row-buttons">
                    <div className="col text-center">
                        <button onClick={() => this.switchMetricPeriod(0)} className={this.btnActive('0')}>{ moment(this.state.monthOne).format('MMM YYYY') }</button>
                        <button onClick={() => this.switchMetricPeriod(1)} className={this.btnActive('1')}>{ moment(this.state.monthTwo).format('MMM YYYY') }</button>
                        <button onClick={() => this.switchMetricPeriod(2)} className={this.btnActive('2')}>{ moment(this.state.monthThree).format('MMM YYYY') }</button>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col text-center">
                        <p className="no-margin">{this.props.language.rank_achievements}</p>
                    </div>
                </div>
                <hr/>
                <div className="row" style={{paddingLeft: 10, paddingRight: 10}}>
                    { Pins }
                </div>
                <div className="row" style={{marginTop: 10}}>
                    <div className="col text-center">
                        <p className="no-margin">{ presets[this.state.selectedPreset].rank }</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="no-margin">PV ({presets[this.state.selectedPreset].pv})</p>
                    </div>
                    <div className="col text-right">
                        <p className="no-margin">{data[this.props.metricPeriod].value.pv}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="success-progress-bar">
                            <div className="success-progress-bar-inner" style={{width: this.calc('pv','pv')}}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <p className="no-margin">TV ({presets[this.state.selectedPreset].tv})</p>
                    </div>
                    <div className="col text-right">
                        <p className="no-margin">{data[this.props.metricPeriod].value.tv}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="success-progress-bar">
                            <div className="success-progress-bar-inner" style={{width: this.calc('tv','tv')}}>
                            </div>
                        </div>
                    </div>
                </div>
                {presets[this.state.selectedPreset].leg1 &&
                <div>
                    <div className="row">
                        <div className="col">
                            <p className="no-margin">Leg 1 ({presets[this.state.selectedPreset].leg1})</p>
                        </div>
                        <div className="col text-right">
                            <p className="no-margin">{data[this.props.metricPeriod].value.ov_leg1}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="success-progress-bar">
                                <div className="success-progress-bar-inner" style={{width: this.calc('ov_leg1','leg1')}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                {presets[this.state.selectedPreset].leg2 &&
                <div>
                    <div className="row">
                        <div className="col">
                            <p className="no-margin">Leg 2 ({presets[this.state.selectedPreset].leg2})</p>
                        </div>
                        <div className="col text-right">
                            <p className="no-margin">{data[this.props.metricPeriod].value.ov_leg2}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="success-progress-bar">
                                <div className="success-progress-bar-inner" style={{width: this.calc('ov_leg2','leg2')}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
                {presets[this.state.selectedPreset].leg3 &&
                <div>
                    <div className="row">
                        <div className="col">
                            <p className="no-margin">Leg 3 ({presets[this.state.selectedPreset].leg3})</p>
                        </div>
                        <div className="col text-right">
                            <p className="no-margin">{data[this.props.metricPeriod].value.ov_leg3hc_pv_excluded}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="success-progress-bar">
                                <div className="success-progress-bar-inner" style={{width: this.calc('ov_leg3hc_pv_excluded','leg3')}}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default Status;