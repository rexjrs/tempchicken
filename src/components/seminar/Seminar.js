import React, { Component } from 'react';
import { links } from '../GlobalHelpers';
import { getSeminarData } from '../../services/Network';

class Seminar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            points: 0
        };
    }

    componentWillMount(){
        this.getSeminar();
    }

    getSeminar(){
        if(this.props.seminarData){
            this.setState({points: this.props.seminarData[4]})
        }else{
            getSeminarData(((res,status)=>{
                if(status){
                    console.log(res.length)
                    if(res.length > 0){
                    let data = JSON.parse(res);
                    this.props.stateUpdate('seminarData','set',data)
                    this.setState({points: data[4]})
                    }
                }
            }),this.props.customerData.unicity)
        }
    }

    render() {
        return (
            <div className="container-fluid global-container-bottom-padding">
                <div className="row">
                    <div className="home-seperator">
                        <p className="no-margin text-center">
                            Unicity Leadership Seminar - London 2017
                        </p>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="global-font-size-45">{this.props.language.points} {this.state.points}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 text-right">
                        <a target="_blank" href={links.seminarQualifications}><button className="global-button global-button-active seminar-button">{this.props.language.qualification}</button></a>
                    </div>
                    <div className="col-6 text-left">
                        <a target="_blank" href={links.seminarBrochure}><button className="global-button global-button-active seminar-button">{this.props.language.brochure}</button></a>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col col-md-8 offset-md-2">
                        <p className="global-font-size-45">{this.props.language.remark}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-8 offset-md-2">
                        <ul>
                            <li>{this.props.language.li1}</li>
                            <li>{this.props.language.li2}</li>
                            <li>{this.props.language.li3}</li>
                            <li>{this.props.language.li4}</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-md-6 offset-md-3">
                        <img className="img-fluid" src={links.seminarImage} alt="Siminar london"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Seminar;
