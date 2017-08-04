import React, { Component } from 'react';
import Row from './Row';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var row = this.props.dataSource.map((b,i)=>{
            return(
                <Row key={i} data={b}/>
            )
        });
        return (
            <table className="genealogy-table">
                <thead>
                    <tr>
                        <th className="top-thead" colSpan={3} style={{paddingLeft: 20}}>
                            <i onClick={()=>this.props.showSide()} className="fa fa-angle-double-right hide-box-inner" hidden={!this.props.hide} aria-hidden="true"></i>
                        </th>
                        <th className="top-thead linearBG" colSpan={3}>2017-08</th>
                        <th className="top-thead linearBG" colSpan={3}>2017-07</th>
                        <th className="top-thead linearBG" colSpan={3}>2017-06</th>

                    </tr>
                    <tr>
                        <th>ID</th>
                        <th>Rank</th>
                        <th>Vip</th>
                        <th>PV</th>
                        <th>TV</th>
                        <th>OV</th>
                        <th>PV</th>
                        <th>TV</th>
                        <th>OV</th>
                        <th>PV</th>
                        <th>TV</th>
                        <th>OV</th>
                    </tr>
                </thead>
                <tbody>
                    { row }
                </tbody>
            </table>
        );
    }
}

export default Table;
