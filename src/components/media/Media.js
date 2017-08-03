import React, { Component } from 'react';
import { serviceGetMedia } from '../../services/Network';

class Media extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        this.getMedia();
    }

    getMedia(){
        serviceGetMedia((res)=>{
            this.props.stateUpdate('mediaDataSource','set',res)
        });
    }

    render() {
        var MediaCards = this.props.mediaDataSource.map((b,i)=>{
            return(
                <div key={i} style={{marginBottom: 10}} className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <a href={b.link} target="_blank" rel="noopener noreferrer">
                    <img src={b.image} className="img-fluid" alt="News Images"/>
                    </a>
                </div>
            )
        })
        return (
            <div className="container-fluid global-container-bottom-padding">
                <div className="row">
                    <div className="home-seperator">
                        <p className="no-margin text-center">
                            {this.props.language.media}
                        </p>
                    </div>
                </div>
                <div className="row" style={{marginTop: 10}}>
                    {MediaCards}
                </div>
            </div>
        );
    }
}

export default Media;
