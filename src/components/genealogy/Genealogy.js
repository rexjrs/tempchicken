import React, { Component } from 'react';
import { getGenealogy, hydraRequestByUrl } from '../../services/Network';
import LeftCell from './LeftCell';
import Table from './Table';
import Spinner from '../Spinner';

class Genealogy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            dataSource: [],
            loading: true,
            maxWidth: null,
            column: "col-8",
            columnSm: "col-sm-9",
            hide: false,
            next: null,
            prev: null,
            inProgress: false
        };
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentWillMount(){
        this.fetchGenealogy();
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
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
            this.setState({
                dataSource: this.state.originalData,
                next: this.state.originalNext
            })
        }
    }

    fetchGenealogy(href,extraPage){
        this.setState({inProgress: true})
        href = localStorage.getItem('customerHref');
        if(!extraPage){
            this.setState({loading: true})
            getGenealogy((res,status)=>{
                if(status){
                    this.setState({
                        originalData: res.items,
                        originalNext: res.next,
                        dataSource: res.items,
                        loading: false,
                        next: res.next,
                        inProgress: false
                    });
                }
            },href,this.state.level,100,localStorage.getItem('customerToken'));
        }else{
            hydraRequestByUrl((res,status)=>{
                let tempArray = this.state.dataSource;
                let concatArray = tempArray.concat(res.items);
                this.setState({
                    next: res.next,
                    dataSource: concatArray,
                    inProgress: false
                })
            },localStorage.getItem('customerToken'),this.state.next);
        }
    }

    changeLevel(event){
        this.setState({
            level: event.target.value
        },this.fetchGenealogy)
    }

    hideSide(){
        this.setState({
            hide: true,
            column: "col-12",
            columnSm: "col-sm-12"
        });
    }

    showSide(){
        this.setState({
            hide: false,
            column: "col-8",
            columnSm: "col-sm-9"
        });
    }

    render() {
        var leftSide = this.state.dataSource.map((b,i)=>{
            let last = false;
            if(i === this.state.dataSource.length-1){
                last = true;
            }
            return(
                <LeftCell key={i} last={last} data={b}/>
            )
        });
        let levels = [];
        for (var i = 1; i < 13; i++) {
            levels.push(
                <option key={i} value={i}>{i}</option>
            );
        }
        return (
            <div className="container-fluid global-container-bottom-padding genealogy-page-wrapper">
                <br/>
                {this.state.loading &&
                <Spinner/>
                }
                {!this.state.loading &&
                <div>
                    <div className="row no-margin">
                        <div className="col no-padding">
                            <div className="genealogy-select-container">
                                <p className="no-margin select-level-text">Select Level:</p>
                                <select className="genealogy-select" value={this.state.level} onChange={(event)=>this.changeLevel(event)}>
                                    {levels}
                                </select>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row main-row">
                        <div className="col-4 col-sm-3 no-padding col-shadow" hidden={this.state.hide}>
                            <div className="row no-padding no-margin cool-background hide-box">
                                <i onClick={this.hideSide.bind(this)} className="fa fa-angle-double-left hide-box-inner" aria-hidden="true"></i>
                            </div>
                            <div className="row no-padding no-margin cool-background">
                                <div className="col-4 no-padding">
                                    <div className="left-cell lvl-cell">
                                        <div className="vertical-mid left-cell-font">LVL</div>
                                    </div>
                                </div>
                                <div className={"col-"+this.state.column+" no-padding overscroll"}>
                                    <div className="left-cell lvl-cell">
                                        <div className="vertical-mid left-cell-font">Name</div>
                                    </div>
                                </div>
                            </div>
                            { leftSide }
                        </div>
                        <div className={this.state.column+" "+this.state.columnSm+" no-padding genealogy-table-col"}>
                            <Table hide={this.state.hide} showSide={this.showSide.bind(this)} dataSource={this.state.dataSource}/>
                        </div>
                    </div>
                    <br/>
                    {this.state.inProgress &&
                    <Spinner/>
                    }
                </div>
                }
            </div>
        );
    }
}

export default Genealogy;
