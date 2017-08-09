import React, { Component } from 'react';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: "hide",
            animate: "slideInUp",
            modalOpen: false
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.modalOpen !== this.state.modalOpen){
            if(nextProps.modalOpen){
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
        this.props.hideModal();
        this.setState({ animate: "slideOutDown" });
    }

    digDown(){
        this.closeModal();
        this.props.digDown();
    }

    openDetails(){
        console.log('test')
        this.closeModal();
        this.props.openDetails();
    }

                     //   <br/>
                     //   <button className="global-button global-button-active genealogy-modal-button">{this.props.language.preview_downline}</button>

    render() {
        return (
            <div className={"genealogy-option-modal animated " + this.state.hide + ' ' + this.state.animate}>
                <div onClick={this.closeModal.bind(this)} className="genealogy-option-modal-top">

                </div>
                <div className="genealogy-option-modal-bottom">
                    <div className="report-modal-top">
                        <button onClick={this.closeModal.bind(this)} className="global-button global-button-active close-modal-btn">{this.props.language.cancel}</button>
                    </div>
                    <div className="text-center">
                        <button onClick={this.openDetails.bind(this)} className="global-button global-button-active genealogy-modal-button">{this.props.language.view_ba}</button>
                        <br/>
                        <button onClick={this.digDown.bind(this)} className="global-button global-button-active genealogy-modal-button">{this.props.language.dig_down}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
