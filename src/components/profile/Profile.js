import React, { Component } from 'react';
import { rankList } from '../GlobalHelpers';
import { changePassword, changeEmail } from '../../services/Network';
import Spinner from '../Spinner';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            passwordConfirm: "",
            email: this.props.customerData.email,
            disabledEmail: true,
            loading: false,
            error: false
        };
    }

    changePass(){
        if(this.state.password !== "" && this.state.passwordConfirm !== "" && this.state.password === this.state.passwordConfirm){
            this.setState({
                loading: true,
                error: false
            });
            changePassword((res,status)=>{
                if(status){
                    alert('Password Changed');
                    this.props.logout();
                }
            },localStorage.getItem('customerHref'),localStorage.getItem('customerToken'),this.state.password)
        }else{
            this.setState({
                error: true
            })
        }
    }

    saveEmail(){
        if(this.state.email !== ""){
            this.setState({
                disabledEmail: true
            });
            changeEmail((res,status)=>{
                if(status){
                    console.log(status)
                    alert('Email Changed');
                }
            },localStorage.getItem('customerHref'),localStorage.getItem('customerToken'),this.state.email);
        }else{
            alert('Email cannot be empty');
        }
    }

    render() {
        return (
            <div className="container-fluid global-container-bottom-padding">
                <div className="row profile-top-header">
                    <div className="col text-center">
                        <img src="https://member-th.unicity.com/mobile/imgs/pin/12-presidential-diamond.png" className="img-fluid profile-rank-pin" alt="rank pin"/>
                        {!this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()] &&
                        <p className="white-text global-font-size-5 no-margin">{this.props.customerData.humanName.fullName}</p>
                        }
                        {this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()] &&
                        <p className="white-text global-font-size-5 no-margin">{this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()]}</p>
                        }
                        <p className="white-text global-font-size-4">{rankList[this.props.language.language][this.props.customerData.cumulativeMetricsProfile.highestRankShort]}</p>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col text-center">
                        <p className="no-margin text-center blue-text">
                            {this.props.language.general}
                        </p>
                    </div>
                </div>
                <div className="row profile-cell">
                    <div className="col-3 col-md-2 offset-md-4 text-center">
                        <img src="https://member-th.unicity.com/mobile/imgs/profile-editor/name.png" className="profile-cell-image" alt="profile man icon"/>
                    </div>
                    <div className="col col-md-4 global-flex-center-verticle">
                        {!this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()] &&
                        <p className="auto-margin left-margin-none global-font-size-4">{this.props.customerData.humanName.fullName}</p>
                        }
                        {this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()] &&
                        <p className="auto-margin left-margin-none global-font-size-4">{this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()]}</p>
                        }
                    </div>
                </div>
                <div className="row profile-cell">
                    <div className="col-3 col-md-2 offset-md-4 text-center">
                        <img src="https://member-th.unicity.com/mobile/imgs/profile-editor/phone.png" className="img-fluid profile-cell-image" alt="phone icon"/>
                    </div>
                    <div className="col col-md-4 global-flex-center-verticle">
                        <p className="auto-margin left-margin-none global-font-size-4">{this.props.customerData.mobilePhone}</p>
                    </div>
                </div>
                <div className="row profile-cell">
                    <div className="col-3 col-md-2 offset-md-4 text-center">
                        <img src="https://member-th.unicity.com/mobile/imgs/profile-editor/email.png" className="img-fluid profile-cell-image" alt="email icon"/>
                    </div>
                    <div className="col col-md-4 global-flex-center-verticle">
                        <input disabled={this.state.disabledEmail} className="profile-password-field" type="text" value={this.state.email} onChange={(event)=>this.setState({email: event.target.value})}/>
                        {this.state.disabledEmail && <button onClick={()=>this.setState({disabledEmail: false})} className="detail-save-btn">{this.props.language.edit}</button>}
                        {!this.state.disabledEmail && <button onClick={()=>this.saveEmail()} className="detail-save-btn">{this.props.language.save}</button>}
                    </div>
                </div>
                <div className="row profile-cell" style={{borderBottom: 0}}>
                    <div className="col-3 col-md-2 offset-md-4 text-center">
                        <img src="https://member-th.unicity.com/mobile/imgs/profile-editor/location.png" className="img-fluid profile-cell-image" alt="location icon"/>
                    </div>
                    <div className="col col-md-4 global-flex-center-verticle">
                        <p className="auto-margin left-margin-none global-font-size-3">{this.props.customerData.mainAddress.address1}, {this.props.customerData.mainAddress.address2}, {this.props.customerData.mainAddress.city}, {this.props.customerData.mainAddress.country}, {this.props.customerData.mainAddress.state}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="home-seperator">
                        <p className="no-margin text-center">
                            {this.props.language.password}
                        </p>
                    </div>
                </div>
                <div className="row profile-cell">
                    <div className="col-3 col-md-2 offset-md-4 global-flex-center-verticle">
                        <p className="auto-margin left-margin-none global-font-size-3">{this.props.language.password}</p>
                    </div>
                    <div className="col col-md-4 global-flex-center-verticle">
                        <input className="profile-password-field" type="password" value={this.state.password} onChange={(event)=>this.setState({password: event.target.value})}/>
                    </div>
                </div>
                <div className="row profile-cell">
                    <div className="col-3 col-md-2 offset-md-4 global-flex-center-verticle">
                        <p className="auto-margin left-margin-none global-font-size-3">{this.props.language.password_confirm}</p>
                    </div>
                    <div className="col col-md-4  global-flex-center-verticle">
                        <input className="profile-password-field" type="password" value={this.state.passwordConfirm} onChange={(event)=>this.setState({passwordConfirm: event.target.value})}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-4 offset-md-4 text-center">
                        {!this.state.loading &&
                            <button onClick={()=>this.changePass()} className="profile-change-password-btn">{this.props.language.submit}</button>
                        }
                        {this.state.loading &&
                        <div>
                            <br/>
                            <Spinner />
                        </div>
                        }
                        {this.state.error &&
                            <p style={{color: 'red'}}>Passwords do not match or field is empty</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
