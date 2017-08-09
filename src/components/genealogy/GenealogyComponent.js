import React, { Component } from 'react';
import { getGenealogy, hydraRequestByUrl } from '../../services/Network';
import { rankListOrdered } from '../GlobalHelpers';
import LeftCell from './LeftCell';
import Table from './Table';
import Spinner from '../Spinner';
import Modal from './Modal';
import Bookmarks from './Bookmarks';
import Details from './Details';

class GenealogyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            dataSource: [],
            favoriteList: [],
            loading: true,
            maxWidth: null,
            column: "col-8",
            columnSm: "col-sm-9",
            hide: false,
            next: null,
            prev: null,
            inProgress: false,
            orderType: 'asc',
            sortType: 'no-sort',
            showAll: true,
            modalOpen: false,
            hrefHistory: [],
            bookMarkOpen: false,
            detailsOpen: false,
            detailsData: null
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount(){
        if(this.props.successPage){
            this.setState({
                level: this.props.legType
            },this.fetchGenealogy);
        }else{
            this.fetchGenealogy();
        }
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    sortDataCallback(){
        this.sortData(this.state.sortType,this.state.numeric,this.state.orderType)
    }

    sortData(type,numeric,overRideType){
        if(this.state.level > 1){
            return false;
        }
        let orderType;
        let sortType;
        if(this.state.orderType === "desc"){
            orderType = "asc";
        }else{
            orderType = "desc";
        }
        if(overRideType){
            orderType = overRideType;
        }
        let tempArray = this.state.dataSource;
        for(var i in tempArray){
            let tem = tempArray[i].customer.metricsProfileHistory;
            for(var e in tem.items){
                if(tem.items[e].value.gv > -1){
                    tem.items[e].value.tv = tem.items[e].value.gv;
                }
            }
        }
        if(type === "id"){
            sortType = 'id';
            tempArray.sort(function(a, b) {
                if(orderType === "desc"){
                    return b.customer.id.unicity - a.customer.id.unicity;
                }else{
                    return a.customer.id.unicity - b.customer.id.unicity;
                }
            });
        }else if(type === "reset"){
            sortType = "reset";
            tempArray = JSON.parse(JSON.stringify(this.state.originalData));
        }else if(type === "no-sort"){
            sortType = "no-sort";
        }else if(type === "rank"){
            sortType = 'rank';
            tempArray.sort(function(a, b) {
                if(orderType === "desc"){
                    return b.rankOrder - a.rankOrder;
                }else{
                    return a.rankOrder - b.rankOrder;
                }
            });
        }else if(type === "fsb"){
            sortType = 'fsb';
            tempArray.sort(function(a, b) {
                if(orderType === "desc"){
                    return b.fsbRank - a.fsbRank;
                }else{
                    return a.fsbRank - b.fsbRank;
                }
            });
        }else{
            type = type.substr(0,2);
            sortType = type+numeric
            tempArray.sort(function(a, b) {
                if(orderType === "desc"){
                    return b.customer.metricsProfileHistory.items[numeric].value[type] - a.customer.metricsProfileHistory.items[numeric].value[type];
                }else{
                    return a.customer.metricsProfileHistory.items[numeric].value[type] - b.customer.metricsProfileHistory.items[numeric].value[type];
                }
            });
        }      
        this.setState({
            dataSource: tempArray,
            orderType: orderType,
            sortType: sortType,
            numeric: numeric
        });
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            if(!this.state.inProgress){
                if(this.state.next){
                    this.fetchGenealogy(null,true);
                }
            }
        }
        if(window.pageYOffset === 0){
            // this.setState({
            //     dataSource: this.state.originalData,
            //     next: this.state.originalNext
            // })
        }
    }

    resetTable(){
        this.setState({
            hrefHistory: []
        });
        this.fetchGenealogy();
    }

    fetchGenealogy(href,extraPage){
        this.setState({inProgress: true})
        if(!href){
            href = localStorage.getItem('customerHref');
        }
        let levelSelected = this.state.level;
        if(isNaN(levelSelected)){
            if(this.state.level === "Leg 1"){
                href = this.props.customerData.achievementsHistory.items[1].metricsDetails.ov_leg1.customers[0].customer.href;
            }else if(this.state.level === "Leg 2"){
                href = this.props.customerData.achievementsHistory.items[1].metricsDetails.ov_leg2.customers[0].customer.href;
            }else{

            }
            levelSelected = 1;
        }
        href = href.replace("https://hydra.unicity.net/", "https://member-calls.unicity.com/");
        if(!extraPage){
            this.setState({loading: true})
            getGenealogy((res,status)=>{
                if(status){
                    res.items.map((b,i)=>{
                        b.rankOrder = rankListOrdered[b.customer.cumulativeMetricsProfile.highestRankShort];
                        if(b.customer.FSB === "VIP"){
                            b.fsbRank = 1;
                        }else{
                            b.fsbRank = 0;
                        }
                        return false;
                    });
                    this.setState({
                        originalData: JSON.parse(JSON.stringify(res.items)),
                        favoriteList: JSON.parse(JSON.stringify(res.favorites)),
                        originalNext: res.next,
                        dataSource: res.items,
                        loading: false,
                        next: res.next,
                        inProgress: false
                    },this.sortDataCallback);
                }
            },href,levelSelected,100,localStorage.getItem('customerToken'));
        }else{
            hydraRequestByUrl((res,status)=>{
                let tempArray = this.state.dataSource;
                let concatArray = tempArray.concat(res.items);
                concatArray.map((b,i)=>{
                    b.rankOrder = rankListOrdered[b.customer.cumulativeMetricsProfile.highestRankShort];
                    if(b.customer.FSB === "VIP"){
                        b.fsbRank = 1;
                    }else{
                        b.fsbRank = 0;
                    }
                    return false;
                });
                this.setState({
                    next: res.next,
                    dataSource: concatArray,
                    inProgress: false
                },this.sortDataCallback)
            },localStorage.getItem('customerToken'),this.state.next);
        }
    }

    changeLevel(event){
        this.setState({
            level: event.target.value,
        },this.fetchGenealogy)
    }

    hideSide(){
        this.setState({
            hide: !this.state.hide
        });
    }

    showSide(){
        this.setState({
            hide: false
        });
    }

    openModal(href,data){
        this.setState({
            modalOpen: true,
            nextHref: href,
            detailsData: data
        });
    }

    openDetails(){
        this.setState({
            detailsOpen: true
        });
    }

    hideDetails(){
        this.setState({
            detailsOpen: false
        });
    }

    hideModal(){
        this.setState({
            modalOpen: false
        });
    }

    hideBookmark(){
        this.setState({
            bookMarkOpen: false
        });
    }

    setNextHref(href){
        this.setState({
            nextHref: href
        },this.digDown)
    }

    digDown(){
        let found = false;
        this.state.hrefHistory.map((b,i)=>{
            if(b === this.state.nextHref){
                found = true;
            }else{
                found = false;
            }
            return false;
        });
        let newHref = this.state.hrefHistory;
        if(!found){
            if(this.state.nextHref !== localStorage.getItem('customerHref')){
                newHref = this.state.hrefHistory.concat([this.state.nextHref]);
            }
        }
        this.setState({
            modalOpen: false,
            hrefHistory: newHref
        });
        this.fetchGenealogy(this.state.nextHref);
    }

    backHistory(){
        this.fetchGenealogy(this.state.hrefHistory[this.state.hrefHistory.length-2]);
        let newHref = this.state.hrefHistory;
        newHref.pop();
        this.setState({
            hrefHistory: newHref
        });
    }

    favSet(id,data){
        let favoriteList = JSON.parse(JSON.stringify(this.state.favoriteList));
        if(!data){
            favoriteList.map((b,i)=>{
                if(b.customer.unicity === id){
                    favoriteList.splice(i,1);
                }
                return false;
            });
        }else{
            favoriteList.push({customer:data})
        }
        this.setState({
            favoriteList: favoriteList
        })
    }

    changeName(id,name){
        let tempArray = JSON.parse(JSON.stringify(this.state.dataSource));
        let favoriteList = JSON.parse(JSON.stringify(this.state.favoriteList));
        let detailsData = JSON.parse(JSON.stringify(this.state.detailsData));
        tempArray.map((b,i)=>{
            if(b.customer.unicity === id){
                b.customer.nickName = name;
            }
            return false;
        });
        favoriteList.map((b,i)=>{
            if(b.customer.unicity === id){
                b.customer.nickName = name;
            }
            return false;
        });
        detailsData.nickName = name;
        this.setState({
            dataSource: tempArray,
            detailsData: detailsData,
            favoriteList: favoriteList
        });
    }

    render() {
        // (For Success page)
        let legPeriod = 1;
        if(this.props.metricPeriod){
            legPeriod = this.props.metricPeriod;
        }
        // LEG Sorting INFO
        var removeLeg = [null,null,null];
        if(this.state.level === "Leg 3"){
            if(this.props.customerData.achievementsHistory.items[legPeriod].metricsDetails.ov_leg1.customers[0] !== undefined){
                removeLeg[0] = this.props.customerData.achievementsHistory.items[legPeriod].metricsDetails.ov_leg1.customers[0].customer.id.unicity;
            }else{
                removeLeg[0] = null;
            }
            if(this.props.customerData.achievementsHistory.items[legPeriod].metricsDetails.ov_leg2.customers[0] !== undefined){
                removeLeg[1] = this.props.customerData.achievementsHistory.items[legPeriod].metricsDetails.ov_leg2.customers[0].customer.id.unicity;
            }else{
                removeLeg[1] = null;
            }
            removeLeg[2] = this.props.customerData.id.unicity;
        }
        var aptCheck = this.props.customerData.achievementsHistory.items;
        for(var e in aptCheck){
            if(aptCheck[e].metricsDetails.apt){
                if(aptCheck[e].metricsDetails.apt.customers[0].customer.id.unicity){
                    removeLeg[3] = aptCheck[e].metricsDetails.apt.customers[0].customer.id.unicity;
                }
            }
        }
        // Left Cells LVL/Names
        var leftSide = this.state.dataSource.map((b,i)=>{
            let last = false;
            if(i === this.state.dataSource.length-1){
                last = true;
            }
            return(
                <LeftCell key={i} removeLeg={removeLeg} language={this.props.language} openModal={this.openModal.bind(this)} showAll={this.state.showAll} last={last} data={b}/>
            )
        });
        // Level Selection
        let levels = [];
        for (var i = 1; i < 13; i++) {
            levels.push(
                <option key={i} value={i}>{i}</option>
            );
        }
        levels.push(
            <option key="leg_1" value="Leg 1">{this.props.language.leg} 1</option>
        )
        levels.push(
            <option key="leg_2" value="Leg 2">{this.props.language.leg} 2</option>
        )
        levels.push(
            <option key="leg_3" value="Leg 3">{this.props.language.leg} 3</option>
        )
        this.showAllActive = (value) => {
            switch(value){
                case 0:
                    if(this.state.showAll){
                        return 'global-connected-button-left global-connected-button-active'
                    }else{
                        return 'global-connected-button-left'
                    }
                case 1:
                    if(!this.state.showAll){
                        return 'global-connected-button-right global-connected-button-active'
                    }else{
                        return 'global-connected-button-right'
                    }
                default:
            }
        }
        return (
            <div>
                <br/>
                {this.state.loading &&
                <Spinner/>
                }
                {!this.state.loading &&
                <div>
                    <div className="row no-margin">
                        <div className="col-4 no-padding">
                            {!this.props.successPage &&
                            <div className="genealogy-select-container">
                                <p className="no-margin select-level-text">{this.props.language.select_level}:</p>
                                <select className="genealogy-select" value={this.state.level} onChange={(event)=>this.changeLevel(event)}>
                                    {levels}
                                </select>
                            </div>
                            }
                        </div>
                        <div className="col-8 no-padding text-right">
                            <button onClick={()=>this.setState({showAll: true})} className={this.showAllActive(0)}>{this.props.language.show_all}</button>
                            <button onClick={()=>this.setState({showAll: false})} className={this.showAllActive(1)}>{this.props.language.show_less}</button>
                        </div>
                    </div>
                    <br/>
                    <div className="row no-margin">
                        <div className="col-4 no-padding">
                            {this.state.hrefHistory.length > 0 &&
                            <button onClick={this.backHistory.bind(this)} className="global-button global-button-active">{this.props.language.back}</button>
                            }
                        </div>
                        <div className="col-8 no-padding text-right">
                            <button onClick={()=>this.resetTable()} className="global-button global-button-active refreshBtn">{this.props.language.reset}</button>
                            {!this.props.successPage &&
                            <button onClick={()=>this.setState({bookMarkOpen: true})} className="global-button global-button-active">{this.props.language.bookmarks}</button>
                            }
                        </div>
                    </div>
                    <br/>
                    <div className="row main-row">
                        <div className="col-4 col-sm-3 no-padding col-shadow">
                            <div className="row no-padding no-margin cool-background hide-box">
                                {!this.state.hide &&
                                <i onClick={this.hideSide.bind(this)} className="fa fa-angle-double-left hide-box-inner" aria-hidden="true"></i>
                                }
                                {this.state.hide &&
                                <i onClick={this.hideSide.bind(this)} className="fa fa-angle-double-right hide-box-inner" aria-hidden="true"></i>
                                }
                            </div>
                            <div className="row no-padding no-margin cool-background">
                                <div onClick={()=>this.sortData('reset')} className="col-4 no-padding">
                                    <div className="left-cell lvl-cell">
                                        <div className="vertical-mid left-cell-font">LVL</div>
                                    </div>
                                </div>
                                <div className="col-8 no-padding">
                                    <div className="left-cell lvl-cell">
                                        <div className="vertical-mid left-cell-font">{this.props.language.name}</div>
                                    </div>
                                </div>
                            </div>
                            { leftSide }
                        </div>
                        <div className={"col-8 col-sm-9 no-padding genealogy-table-col"}>
                            <Table removeLeg={removeLeg} language={this.props.language} showAll={this.state.showAll} orderType={this.state.orderType} sortType={this.state.sortType} sortData={this.sortData.bind(this)} hide={this.state.hide} showSide={this.showSide.bind(this)} dataSource={this.state.dataSource}/>
                        </div>
                    </div>
                    {this.state.inProgress &&
                    <div>
                        <br/>
                        <Spinner/>
                    </div>
                    }
                </div>
                }
                <Details successPage={this.props.successPage} favSet={this.favSet.bind(this)} favoriteList={this.state.favoriteList} changeName={this.changeName.bind(this)} detailsData={this.state.detailsData} hideDetails={this.hideDetails.bind(this)} language={this.props.language} detailsOpen={this.state.detailsOpen}/>
                <Modal openDetails={this.openDetails.bind(this)} language={this.props.language} hideModal={this.hideModal.bind(this)} digDown={this.digDown.bind(this)} modalOpen={this.state.modalOpen}/>
                <Bookmarks setNextHref={this.setNextHref.bind(this)} favoriteList={this.state.favoriteList} language={this.props.language} hideBookmark={this.hideBookmark.bind(this)} bookMarkOpen={this.state.bookMarkOpen}/>
            </div>
        );
    }
}

export default GenealogyComponent;
