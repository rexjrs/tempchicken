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
                <Row key={i} showAll={this.props.showAll} data={b}/>
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
                        <th onClick={()=>this.props.sortData('id')}>
                            ID 
                            {this.props.sortType === "id" &&
                                this.props.orderType === "asc" &&
                                <i className="fa fa-chevron-up" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                            {this.props.sortType === "id" &&
                                this.props.orderType === "desc" &&
                                <i className="fa fa-chevron-down" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th>Rank</th>
                        <th>Vip</th>
                        <th onClick={()=>this.props.sortData('pv0')}>
                            PV
                            {this.props.sortType === "pv0" &&
                                this.props.orderType === "asc" &&
                                <i className="fa fa-chevron-up" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                            {this.props.sortType === "pv0" &&
                                this.props.orderType === "desc" &&
                                <i className="fa fa-chevron-down" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('tv0')}>
                            TV
                            {this.props.sortType === "tv0" &&
                                this.props.orderType === "asc" &&
                                <i className="fa fa-chevron-up" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                            {this.props.sortType === "tv0" &&
                                this.props.orderType === "desc" &&
                                <i className="fa fa-chevron-down" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('ov0')}>
                            OV
                            {this.props.sortType === "ov0" &&
                                this.props.orderType === "asc" &&
                                <i className="fa fa-chevron-up" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                            {this.props.sortType === "ov0" &&
                                this.props.orderType === "desc" &&
                                <i className="fa fa-chevron-down" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('pv1')}>
                            PV
                            {this.props.sortType === "pv1" &&
                                this.props.orderType === "asc" &&
                                <i className="fa fa-chevron-up" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                            {this.props.sortType === "pv1" &&
                                this.props.orderType === "desc" &&
                                <i className="fa fa-chevron-down" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('tv1')}>
                            TV
                            {this.props.sortType === "tv1" &&
                                this.props.orderType === "asc" &&
                                <i className="fa fa-chevron-up" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                            {this.props.sortType === "tv1" &&
                                this.props.orderType === "desc" &&
                                <i className="fa fa-chevron-down" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('ov1')}>
                            OV
                            {this.props.sortType === "ov1" &&
                                this.props.orderType === "asc" &&
                                <i className="fa fa-chevron-up" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                            {this.props.sortType === "ov1" &&
                                this.props.orderType === "desc" &&
                                <i className="fa fa-chevron-down" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('pv2')}>
                            PV
                            {this.props.sortType === "pv2" &&
                                this.props.orderType === "asc" &&
                                <i className="fa fa-chevron-up" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                            {this.props.sortType === "pv2" &&
                                this.props.orderType === "desc" &&
                                <i className="fa fa-chevron-down" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('tv2')}>
                            TV
                            {this.props.sortType === "tv2" &&
                                this.props.orderType === "asc" &&
                                <i className="fa fa-chevron-up" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                            {this.props.sortType === "tv2" &&
                                this.props.orderType === "desc" &&
                                <i className="fa fa-chevron-down" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('ov2')}>
                            OV
                            {this.props.sortType === "ov2" &&
                                this.props.orderType === "asc" &&
                                <i className="fa fa-chevron-up" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                            {this.props.sortType === "ov2" &&
                                this.props.orderType === "desc" &&
                                <i className="fa fa-chevron-down" aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
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
