import React, { Component } from 'react';

class LeftCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let lastCSS = "";
        if(this.props.last){
            lastCSS = "lastCSS";
        }
        return (
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
