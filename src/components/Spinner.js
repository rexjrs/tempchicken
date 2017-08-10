import React, { Component } from 'react';

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
        <div className="sk-circle">
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
        </div>
        )
        // return(
        //     <div className="spinner"></div>
        // )
        // return (
        //     <div className="sk-cube-grid">
        //         <div className="sk-cube sk-cube1"></div>
        //         <div className="sk-cube sk-cube2"></div>
        //         <div className="sk-cube sk-cube3"></div>
        //         <div className="sk-cube sk-cube4"></div>
        //         <div className="sk-cube sk-cube5"></div>
        //         <div className="sk-cube sk-cube6"></div>
        //         <div className="sk-cube sk-cube7"></div>
        //         <div className="sk-cube sk-cube8"></div>
        //         <div className="sk-cube sk-cube9"></div>
        //     </div>
        // );
    }
}

export default Spinner;
