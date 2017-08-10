import React, { Component } from 'react';
import { serviceGetNews } from '../../services/Network';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount(){
        this.getNews();
    }

    getNews(){
        serviceGetNews((res)=>{
            this.props.stateUpdate('newsDataSource','set',res)
        });
    }

    render() {
        var NewsCards = this.props.newsDataSource.map((b,i)=>{
            return(
                <div key={i} style={{marginBottom: 10}} className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
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
                            {this.props.language.news}
                        </p>
                    </div>
                </div>
                <div className="row" style={{marginTop: 10}}>
                    {NewsCards}
                </div>
            </div>
        );
    }
}

export default News;
