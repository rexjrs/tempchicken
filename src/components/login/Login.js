import React, { Component } from 'react';
import { loginUser, getCustomerData } from '../../services/Network';
import { links } from '../GlobalHelpers';
import Spinner from '../Spinner.js';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorHidden: true,
            loggingIn: false,
            height: "100vh"
        };
    }

    loadingTrigger(boolean){
        this.setState({loadingHidden: boolean})
    }

    errorTrigger(boolean){
        this.setState({errorHidden: boolean})
    }

    loggingIn(boolean){
        this.setState({loggingIn: boolean})
    }

    login(){
        this.loggingIn(true)
        loginUser(((res,status)=>{
            if(status){
                let href = res.customer.href
                //  .replace("hydra","hydra")
                localStorage.setItem("customerHref",href)
                localStorage.setItem("customerToken",res.token)
                //   Get customer data and save to local
                getCustomerData(((res,status)=>{
                    if(status){
                        localStorage.setItem("customerData",JSON.stringify(res));
                        this.props.loginSuccess()
                        this.setState({height: 0})
                    }else{
                        localStorage.clear()
                        this.errorTrigger(false)
                        this.loadingTrigger(true)
                        this.loggingIn(false)
                    }
                }),localStorage.getItem("customerToken"),localStorage.getItem("customerHref"))
            }else{
                localStorage.clear()
                this.errorTrigger(false)
                this.loadingTrigger(true)
                this.loggingIn(false)
            }
        }),this.state.username,this.state.password)
    }

    render() {
        return (
            <div className="login-page" style={{height: this.state.height}}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col"></div>
                        <div className="col-6">
                            <img src="./assets/logo_new.png" className="img-fluid login-logo" alt="logo unicity"/>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="login-form-container">
                        <div className="row">
                            <div className="col">
                                <p className="no-margin">{this.props.language.username}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="text" className="login-inputs" onChange={(username) => this.setState({username: username.target.value})}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="no-margin" style={{marginTop: 20}}>{this.props.language.password}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <input type="password" className="login-inputs" onChange={(password) => this.setState({password: password.target.value})}/>
                            </div>
                        </div>
                        {!this.state.loggingIn &&
                        <div className="row">
                            <div className="col">
                                <button onClick={this.login.bind(this)} className="login-btn">{this.props.language.login}</button>
                            </div>
                        </div>
                        }
                        {this.state.loggingIn &&
                         <div className="row">
                            <div className="col text-center">
                                <br/>
                                <Spinner />
                            </div>
                        </div> 
                        }
                        <div className="row">
                            <div className="col text-center">
                                <img onClick={()=>this.props.setLanguage('TH')} className="language-flag login-flag" src="./assets/thailand.png" alt="Thai Flag"/>
                                <img onClick={()=>this.props.setLanguage('EN')} className="language-flag login-flag" src="./assets/united-states.png" alt="Thai Flag"/>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: 10}}>
                            <div className="col text-center">
                                <a href={links.signUp} target="_blank">{this.props.language.sign_up}</a> | <a href={links.forgotPass} target="_blank">{this.props.language.forgot_pass}</a>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: 10}}>
                            <div className="col text-center">
                                <a href={links.facebook} target="_blank"><img className="social-login" src="./assets/facebook.png" width="30px" alt="social pin"/></a>
                                <a href={links.line} target="_blank"><img className="social-login" src="./assets/line.png" width="30px" alt="social pin"/></a>
                                <a href={links.instagram} target="_blank"><img className="social-login" src="./assets/instagram.png" width="30px" alt="social pin"/></a>
                                <a href={links.youtube} target="_blank"><img className="social-login" src="./assets/youtube.png" width="30px" alt="social pin"/></a>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: 10}}>
                            <div className="col text-center" style={{fontSize: 12}}>
                                © 2017 Copyright Unicity International
                            </div>
                        </div>
                        <div className="row" hidden={this.state.errorHidden}>
                            <div className="col">
                                <p className="no-margin wrong-user">{this.props.language.incorrect_username_password}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
