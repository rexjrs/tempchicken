import React, { Component } from 'react';
import { sendFeedback } from '../../services/Network';

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            thanks: false,
            issue: false
        };
    }

    submitFeedback(){
        if(this.state.input === ""){
            this.setState({empty: true})
        }else{
            sendFeedback(((res,status)=>{
                if(status){
                    this.setState({input: "",thanks: true})
                }else{
                    this.setState({issue: true})
                }
            }),this.state.input,this.props.customerData.email,this.props.customerData.unicity)
        }
    }

    render() {
        return (
            <div className="container-fluid global-container-bottom-padding">
                <div className="row">
                    <div className="home-seperator">
                        <p className="no-margin text-center">
                            {this.props.language.feedback}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <textarea 
                            className="feedback-box"
                            placeholder={this.props.language.tell_us}
                            value={this.state.input}
                            onChange={(input) => this.setState({input: input.target.value,thanks: false,issue: false,empty: false})}
                        /> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <button onClick={this.submitFeedback.bind(this)} style={{width: "50%"}} className="global-button global-button-active white-text">{this.props.language.submit}</button>
                        {this.state.thanks &&
                        <p style={{color: 'green'}}>{this.props.language.thank_you_feedback}</p>
                        }
                        {this.state.issue &&
                        <p style={{color: 'red'}}>{this.props.language.feedback_issue}</p>
                        }
                        {this.state.empty &&
                        <p style={{color: 'red'}}>{this.props.language.tell_us_something}</p>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Feedback;
