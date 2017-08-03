import React, { Component } from 'react';
import { rankList } from '../GlobalHelpers';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
                    <div className="col-3">
                        <img src="https://member-th.unicity.com/mobile/imgs/profile-editor/name.png" className="img-fluid profile-cell-image" alt="profile man icon"/>
                    </div>
                    <div className="col global-flex-center-verticle">
                        {!this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()] &&
                        <p className="auto-margin left-margin-none global-font-size-4">{this.props.customerData.humanName.fullName}</p>
                        }
                        {this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()] &&
                        <p className="auto-margin left-margin-none global-font-size-4">{this.props.customerData.humanName['fullName@'+this.props.language.language.toLowerCase()]}</p>
                        }
                    </div>
                </div>
                <div className="row profile-cell">
                    <div className="col-3">
                        <img src="https://member-th.unicity.com/mobile/imgs/profile-editor/phone.png" className="img-fluid profile-cell-image" alt="phone icon"/>
                    </div>
                    <div className="col global-flex-center-verticle">
                        <p className="auto-margin left-margin-none global-font-size-4">{this.props.customerData.mobilePhone}</p>
                    </div>
                </div>
                <div className="row profile-cell">
                    <div className="col-3">
                        <img src="https://member-th.unicity.com/mobile/imgs/profile-editor/email.png" className="img-fluid profile-cell-image" alt="email icon"/>
                    </div>
                    <div className="col global-flex-center-verticle">
                        <p className="auto-margin left-margin-none global-font-size-4">{this.props.customerData.email}</p>
                    </div>
                </div>
                <div className="row profile-cell" style={{borderBottom: 0}}>
                    <div className="col-3">
                        <img src="https://member-th.unicity.com/mobile/imgs/profile-editor/location.png" className="img-fluid profile-cell-image" alt="location icon"/>
                    </div>
                    <div className="col global-flex-center-verticle">
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
                    <div className="col-3 global-flex-center-verticle">
                        <p className="auto-margin left-margin-none global-font-size-3">{this.props.language.password}</p>
                    </div>
                    <div className="col global-flex-center-verticle">
                        <input className="profile-password-field" type="text"/>
                    </div>
                </div>
                <div className="row profile-cell">
                    <div className="col-3 global-flex-center-verticle">
                        <p className="auto-margin left-margin-none global-font-size-3">{this.props.language.password_confirm}</p>
                    </div>
                    <div className="col global-flex-center-verticle">
                        <input className="profile-password-field" type="text"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <button className="profile-change-password-btn">{this.props.language.submit}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
