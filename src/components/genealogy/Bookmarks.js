import React, { Component } from 'react';

class Bookmarks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: "hide",
            animate: "slideInUp",
            bookMarkOpen: false
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.bookMarkOpen !== this.state.bookMarkOpen){
            if(nextProps.bookMarkOpen){
                this.openModal();
            }else{
                this.closeModal();
            }
        }
    }

    openModal() {
        this.setState({hide: "hide", animate: "slideInUp"})
        this.setState({ hide: ""})
    }

    closeModal() {
        this.props.hideBookmark();
        this.setState({ animate: "slideOutDown" });
    }

    chooseBa(href){
        this.closeModal();
        this.props.setNextHref(href);
    }

    render() {
        var list = this.props.favoriteList.map((b,i)=>{
            let name = b.customer.humanName.fullName;
            if(this.props.language.language === "TH"){
                if(b.customer.humanName['fullName@th']){
                    name = b.customer.humanName['fullName@th']
                }
            }
            if(b.customer.nickName){
                name = b.customer.nickName;
            }
            return(
                <div onClick={()=>this.chooseBa(b.customer.href)} key={i} className="col-12 col-sm-6">
                    <p className="bookmark-cells">{name}</p>
                </div>
            )
        });
        return (
            <div className={"genealogy-bookmark-modal animated " + this.state.hide + ' ' + this.state.animate}>
                <div onClick={()=>this.closeModal()} className="empty-modal-top"></div>
                <div className="genealogy-bookmark-modal-bottom">
                    <div className="report-modal-top">
                        <button onClick={this.closeModal.bind(this)} className="global-button global-button-active close-modal-btn">{this.props.language.cancel}</button>
                    </div>
                    <br/>
                    <div className="row">
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}

export default Bookmarks;
