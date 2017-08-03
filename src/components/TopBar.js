import React, { Component } from 'react';

class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="custom-navbar">
                <img onClick={()=>this.props.openMenu()} className="hamburger" src="./assets/list.png" alt="Menu Icon"/>
                {this.props.language.language === "EN" &&
                <div className="language-switcher-container">
                    <img onClick={()=>this.props.setLanguage('TH')} className="language-flag" src="./assets/thailand.png" alt="Thai Flag"/>
                </div>
                }
                {this.props.language.language === "TH" &&
                <div className="language-switcher-container">
                    <img onClick={()=>this.props.setLanguage('EN')} className="language-flag" src="./assets/united-states.png" alt="Thai Flag"/>
                </div>
                }
            </div>
        );
    }
}

export default TopBar;
