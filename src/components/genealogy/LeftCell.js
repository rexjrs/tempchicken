import React, { Component } from 'react';

class LeftCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let noRemove = true;
        this.props.removeLeg.map((b,i)=>{
            if(b === this.props.data.customer.id.unicity){
                noRemove = false;
            }
            return false;
        })
        let tv = [];
        for(var i = 0;i<3;i++){
            tv.push(this.props.data.customer.metricsProfileHistory.items[0].value.tv);
        }
        let showItems = true;
        let shorter = this.props.data.customer.metricsProfileHistory.items;
        if(!this.props.showAll){
            if(
                shorter[0].value.pv === 0 && tv[0] === 0 && shorter[0].value.ov === 0 &&
                shorter[1].value.pv === 0 && tv[1] === 0 && shorter[1].value.ov === 0 &&
                shorter[2].value.pv === 0 && tv[2] === 0 && shorter[2].value.ov === 0
            ){
                showItems = false;
            }
        }
        let lastCSS = "";
        if(this.props.last){
            lastCSS = "lastCSS";
        }
        let name = this.props.data.customer.humanName.fullName;
        if(this.props.language.language === "TH"){
            if(this.props.data.customer.humanName['fullName@th']){
                name = this.props.data.customer.humanName['fullName@th']
            }
        }
        if(this.props.data.customer.nickName){
            name = this.props.data.customer.nickName;
        }
        return (
            showItems && noRemove &&
            <div className={"row no-padding no-margin left-cell-row "+lastCSS}>
                <div className="col-4 no-padding">
                    <div className="left-cell lvl-cell">
                        <div className="vertical-mid">{this.props.data.treeDepth}</div>
                    </div>
                </div>
                <div onClick={()=>this.props.openModal(this.props.data.customer.href,this.props.data.customer)} className="col-8 no-padding overscroll">
                    <div className="left-cell lvl-cell">
                        <div className="vertical-mid left-name">{name}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftCell;
