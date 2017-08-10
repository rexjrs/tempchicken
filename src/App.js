import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from "./History";
// Helpers
import moment from 'moment';
import 'moment/locale/th';
import './App.css';
import { appConfig } from './config';
import { checkToken, getCustomerData } from './services/Network';
import { initialLanguage, translationsEN, translationsTH } from './components/GlobalHelpers';
// Components
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Genealogy from './components/genealogy/Genealogy';
import Success from './components/success/Success';
import News from './components/news/News';
import Media from './components/media/Media';
import Feedback from './components/feedback/Feedback';
import Seminar from './components/seminar/Seminar';
import Profile from './components/profile/Profile';
import Report from './components/report/Report';
import Commission from './components/commission/Commission';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    // Setup App
    getInitialState = () => {
        const initialState = {
            menuWidth: 0,
            isOpen: false,auth: false,hideLogin: false,
            customerData: {},
            newsDataSource: [],
            mediaDataSource: [],
            productDataSource: [],
            language: translationsEN
        };
        return initialState;
    }
    // Language Control
    setInitialLanguage(){
        if(!localStorage.getItem('language')){
            localStorage.setItem('language', initialLanguage);
            moment.locale(initialLanguage.toLowerCase());
        }else{
            if(localStorage.getItem('language') === "TH"){
                moment.locale('th');
                this.setState({language: translationsTH})
            }else{
                moment.locale('en');
            }
        }
    }
    setLanguage(language){
        localStorage.setItem('language',language);
        switch(language){
            case 'TH':
                moment.locale('th');
                this.setState({language: translationsTH});
                break;
            case 'EN':
                moment.locale('en');
                this.setState({language: translationsEN});
                break;
            default:
                moment.locale('en');
                this.setState({language: translationsEN})
                break;
        }
    }
    //  Life Cycle =======================================================================
    componentWillMount(){
        this.checkAuth();
        this.setInitialLanguage();
    }
    //  Navigators =======================================================================
    openMenu(){
        if(!this.state.isOpen){
            this.setState({menuWidth: "100%",isOpen: !this.state.isOpen});
        }else{
            this.setState({menuWidth: 0,isOpen: !this.state.isOpen});
        }
    }
    //  State Handlers ===================================================================
    searchStateArray(callback,key,prop){
        this.state[prop].map((b,i)=>{
            if(b.key === key){
                return callback(i)
            }else{
                return false
            }
        })
    }
    stateUpdate(stateKey,type,value,key){
        if(type === "add"){
            let tempObj = this.state[stateKey];
            tempObj[key] = value;
            this.setState({[stateKey]: tempObj});
        }else if(type === "set"){
            this.setState({
                [stateKey]: value
            })
        }else if(type === "edit"){
            let tempObj = this.state[stateKey];
            tempObj[key] = value;
            this.setState({[stateKey]: tempObj});
        }
    }
    setInitialState(){
        let data = JSON.parse(localStorage.getItem("customerData"));
        this.setState({customerData: data})
    }
    //  Auth =============================================================================
    checkAuth(){ //Check if user Authenticated on refresh
        let checkValue = localStorage.getItem('customerHref');
        if(checkValue){
            this.setState({auth: true,hideLogin: true});
            this.setInitialState();
            checkToken(((res,status)=>{
                if(status){ 
                    if(res.loginTokenSecondsLeft < 86400){ // Less than 24 hours
                        this.logout();
                        alert('Session has expired. Please log in again');
                    }
                    getCustomerData(((res,status)=>{
                        if(status){
                            this.setState({
                                customerData: res
                            });
                            localStorage.setItem("customerData",JSON.stringify(res));
                        }
                    }),localStorage.getItem("customerToken"),localStorage.getItem("customerHref"));
                }else{
                    this.logout();
                    alert('Could not authenticate with server');
                }
            }),localStorage.getItem('customerToken'))
        }
    }
    loginSuccess(){
        this.setState(this.getInitialState()); //Reset State
        this.setInitialState()
        this.setInitialLanguage();
        this.setState({auth: true})
        setTimeout(() => {
            this.setState({hideLogin: true})
        }, 500)
    }
    logout(){
        let tempLang = localStorage.getItem('language');
        localStorage.clear();
        localStorage.setItem('language',tempLang);
        this.openMenu();
        this.setState({auth: false,hideLogin: false})
    }
    //  Scene ============================================================================
    render() {
        return (
            <div className="App">
                {!this.state.hideLogin &&
                    <Login language={this.state.language} setLanguage={this.setLanguage.bind(this)} loginSuccess={this.loginSuccess.bind(this)} />
                }
                {this.state.auth &&
                <Router history={history}>
                    <div>
                        <TopBar language={this.state.language} setLanguage={this.setLanguage.bind(this)} openMenu={this.openMenu.bind(this)} />
                        <SideBar language={this.state.language} openMenu={this.openMenu.bind(this)} logout={this.logout.bind(this)} history={history} menuWidth={this.state.menuWidth} />
                        <Route exact path={appConfig.appPath+"/"} render={()=>
                            <Home 
                                language={this.state.language}
                                stateUpdate={this.stateUpdate.bind(this)}
                                customerData={this.state.customerData}
                                newsDataSource={this.state.newsDataSource}
                            />
                        }/>
                        <Route exact path={appConfig.appPath+"/genealogy"} render={()=>
                            <Genealogy 
                                language={this.state.language}
                                searchStateArray={this.searchStateArray.bind(this)}
                                stateUpdate={this.stateUpdate.bind(this)}
                                customerData={this.state.customerData}
                            />
                        }/>
                        <Route exact path={appConfig.appPath+"/success"} render={()=>
                            <Success 
                                language={this.state.language}
                                searchStateArray={this.searchStateArray.bind(this)}
                                stateUpdate={this.stateUpdate.bind(this)}
                                customerData={this.state.customerData}
                            />
                        }/>
                        <Route exact path={appConfig.appPath+"/commission"} render={()=>
                            <Commission
                                language={this.state.language}
                                stateUpdate={this.stateUpdate.bind(this)}
                                customerData={this.state.customerData}
                            />
                        }/>
                        <Route exact path={appConfig.appPath+"/news"} render={()=>
                            <News 
                                language={this.state.language}
                                stateUpdate={this.stateUpdate.bind(this)}
                                newsDataSource={this.state.newsDataSource}
                            />
                        }/>
                        <Route exact path={appConfig.appPath+"/media"} render={()=>
                            <Media 
                                language={this.state.language}
                                stateUpdate={this.stateUpdate.bind(this)}
                                mediaDataSource={this.state.mediaDataSource}
                            />
                        }/>
                        <Route exact path={appConfig.appPath+"/feedback"} render={()=>
                            <Feedback 
                                language={this.state.language}
                                stateUpdate={this.stateUpdate.bind(this)}
                                customerData={this.state.customerData}
                            />
                        }/>
                        <Route exact path={appConfig.appPath+"/seminar"} render={()=>
                            <Seminar 
                                language={this.state.language}
                                stateUpdate={this.stateUpdate.bind(this)}
                                customerData={this.state.customerData}
                                seminarData={this.state.seminarData}
                            />
                        }/>
                        <Route exact path={appConfig.appPath+"/profile"} render={()=>
                            <Profile 
                                language={this.state.language}
                                stateUpdate={this.stateUpdate.bind(this)}
                                customerData={this.state.customerData}
                                logout={this.logout.bind(this)}
                            />
                        }/>
                        <Route exact path={appConfig.appPath+"/report"} render={()=>
                            <Report 
                                language={this.state.language}
                                stateUpdate={this.stateUpdate.bind(this)}
                                customerData={this.state.customerData}
                                productDataSource={this.state.productDataSource}
                            />
                        }/>
                    </div>
                </Router>
                }
            </div>
        );
    }
}

export default App;
