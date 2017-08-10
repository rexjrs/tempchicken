import React, { Component } from 'react';
import { rankList, links } from '../GlobalHelpers';
import moment from 'moment';
import { serviceGetNews } from '../../services/Network';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metricTriplePeriod: null,
            metricPeriod: 0,
        };
    }

    componentWillMount(){
        this.getNews();
    }

    getNews(){
        serviceGetNews((res)=>{
            this.props.stateUpdate('newsDataSource','set',res)
        });
    }

    switchMetricPeriod(value){
        this.setState({
            metricPeriod: value
        });
    }

    render() {
        this.btnActive = (value) => {
            switch(value){
                case '0':
                    if(this.state.metricPeriod === 0){
                        return 'global-connected-button-left global-connected-button-active'
                    }else{
                        return 'global-connected-button-left'
                    }
                case '1':
                    if(this.state.metricPeriod === 1){
                        return 'global-connected-button-middle global-connected-button-active'
                    }else{
                        return 'global-connected-button-middle'
                    }
                case '2':
                    if(this.state.metricPeriod === 2){
                        return 'global-connected-button-right global-connected-button-active'
                    }else{
                        return 'global-connected-button-right'
                    }
                default:
                    if(this.state.metricPeriod === 0){
                        return 'global-connected-button-left global-connected-button-active'
                    }else{
                        return 'global-connected-button-left'
                    }
            }
        }
        var NewsCards = this.props.newsDataSource.map((b,i)=>{
            return(
                b.hot === "yes" &&
                <div key={i} className="col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{marginBottom: 10}}>
                    <a href={b.link} target="_blank" rel="noopener noreferrer">
                    <img src={b.image} className="img-fluid" alt="News Images"/>
                    </a>
                </div>
            )
        })
        return (
            <div className="container-fluid global-container-bottom-padding">
                <div className="row">
                    <div className="col text-center">
                        {!this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()] &&
                        <p className="no-margin home-my-name">{this.props.customerData.humanName.fullName}</p>
                        }
                        {this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()] &&
                        <p className="no-margin home-my-name">{this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()]}</p>
                        }
                        <img src="https://member-th.unicity.com/mobile/imgs/pin/12-presidential-diamond.png" width="40" className="home-pin-image" alt="Rank Pin"/>
                        <p>{rankList[this.props.language.language][this.props.customerData.cumulativeMetricsProfile.highestRankShort]}</p>
                    </div>
                </div>
                <div className="row home-row-buttons">
                      <div className="col text-center">
                        <button onClick={() => this.switchMetricPeriod(0)} className={this.btnActive('0')}>{ moment(this.props.customerData.metricsProfileHistory.items[0].period).format('MMM YYYY') }</button>
                        <button onClick={() => this.switchMetricPeriod(1)} className={this.btnActive('1')}>{ moment(this.props.customerData.metricsProfileHistory.items[1].period).format('MMM YYYY') }</button>
                        <button onClick={() => this.switchMetricPeriod(2)} className={this.btnActive('2')}>{ moment(this.props.customerData.metricsProfileHistory.items[2].period).format('MMM YYYY') }</button>
                    </div>  
                </div>
                <br/>
                <div className="row">
                    <div className="col text-center">
                        <img src="https://member-th.unicity.com/mobile/imgs/icon/icon-pv.png" width="50" alt="Leg1"/>
                        <p className="no-margin">{this.props.customerData.metricsProfileHistory.items[this.state.metricPeriod].value.pv}</p>
                        <p>PV</p>
                    </div>
                    <div className="col text-center">
                        <img src="https://member-th.unicity.com/mobile/imgs/icon/icon-tv.png" width="50" alt="Leg2"/>
                        <p className="no-margin">{this.props.customerData.metricsProfileHistory.items[this.state.metricPeriod].value.pv}</p>
                        <p>TV</p>
                    </div>
                    <div className="col text-center">
                        <img src="https://member-th.unicity.com/mobile/imgs/icon/icon-ov.png" width="50" alt="Leg3"/>
                        <p className="no-margin">{this.props.customerData.metricsProfileHistory.items[this.state.metricPeriod].value.pv}</p>
                        <p>OV</p>
                    </div>
                </div>
                <div className="row">
                    <div className="home-seperator">
                        <p className="no-margin text-center">
                            {this.props.language.news}
                        </p>
                    </div>
                </div>
                <br/>
                <div className="row">
                    { NewsCards }
                </div>
                <div className="row">
                    <div className="home-seperator">
                        <p className="no-margin text-center">
                            {this.props.language.follow_us}
                        </p>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col">
                        <a href={links.facebook} target="_blank"><img src="./assets/facebook.png" className="img-fluid home-social-media-pins" alt="social media pin"/></a>
                    </div>
                    <div className="col">
                        <a href={links.line} target="_blank"><img src="./assets/line.png" className="img-fluid home-social-media-pins" alt="social media pin"/></a>
                    </div>
                    <div className="col">
                        <a href={links.youtube} target="_blank"><img src="./assets/youtube.png" className="img-fluid home-social-media-pins" alt="social media pin"/></a>
                    </div>
                    <div className="col">
                        <a href={links.instagram} target="_blank"><img src="./assets/instagram.png" className="img-fluid home-social-media-pins" alt="social media pin"/></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
