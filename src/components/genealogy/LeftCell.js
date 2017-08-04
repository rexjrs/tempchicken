import React, { Component } from 'react';

class LeftCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let showItems = true;
        let shorter = this.props.data.customer.metricsProfileHistory.items;
        if(!this.props.showAll){
            if(
                shorter[0].value.pv === 0 && shorter[0].value.tv === 0 && shorter[0].value.ov === 0 &&
                shorter[1].value.pv === 0 && shorter[1].value.tv === 0 && shorter[1].value.ov === 0 &&
                shorter[2].value.pv === 0 && shorter[2].value.tv === 0 && shorter[2].value.ov === 0
            ){
                showItems = false;
            }
        }
        let lastCSS = "";
        if(this.props.last){
            lastCSS = "lastCSS";
        }
        return (
            showItems &&
            <div className={"row no-padding no-margin left-cell-row "+lastCSS}>
                <div className="col-4 no-padding">
                    <div className="left-cell lvl-cell">
                        <div className="vertical-mid">{this.props.data.treeDepth}</div>
                    </div>
                </div>
                <div className="col-8 no-padding overscroll">
                    <div className="left-cell lvl-cell">
                        <div className="vertical-mid">{this.props.data.customer.humanName.fullName}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftCell;
