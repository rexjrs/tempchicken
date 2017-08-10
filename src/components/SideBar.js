import React, { Component } from 'react';

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    navigatePage(page){
        this.props.history.push(page);
        this.props.openMenu();
    }

    render() {
        return (
            <div className="menu-container" style={{width: this.props.menuWidth}}>
                <div className="menu-buttons">
                    <p onClick={()=>this.navigatePage('/')} className="linkSideBar">{this.props.language.home}</p>
                    <p onClick={()=>this.navigatePage('/genealogy')} className="linkSideBar">{this.props.language.genealogy}</p>
                    <a href="https://shop.unicity.com" target="_blank"><p className="linkSideBar">{this.props.language.shopping}</p></a>
                    <a href="https://enroll.unicity.com" target="_blank"><p className="linkSideBar">{this.props.language.enroll}</p></a>
                    <p onClick={()=>this.navigatePage('/success')} className="linkSideBar">{this.props.language.success}</p>
                    <p onClick={()=>this.navigatePage('/commission')} className="linkSideBar">{this.props.language.commission}</p>
                    <p onClick={()=>this.navigatePage('/report')} className="linkSideBar">{this.props.language.report}</p>
                    <p onClick={()=>this.navigatePage('/news')} className="linkSideBar">{this.props.language.news}</p>
                    <p onClick={()=>this.navigatePage('/media')} className="linkSideBar">{this.props.language.media}</p>
                    <p onClick={()=>this.navigatePage('/profile')} className="linkSideBar">{this.props.language.profile}</p>
                    <p onClick={()=>this.navigatePage('/seminar')} className="linkSideBar">{this.props.language.seminar}</p>
                    <p onClick={()=>this.navigatePage('/feedback')} className="linkSideBar">{this.props.language.feedback}</p>
                    <p onClick={()=>this.props.logout()} className="linkSideBar">{this.props.language.logout}</p>
                </div>
            </div>
        );
    }
}

export default SideBar;
