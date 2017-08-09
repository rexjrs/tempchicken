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
            let noRemove = true;
            this.props.removeLeg.map((f,e)=>{
                if(f === b.customer.id.unicity){
                    noRemove = false;
                }
                return false;
            })
            return(
                noRemove &&
                <Row key={i} showAll={this.props.showAll} hide={this.props.hide} data={b}/>
            )
        });
        return (
            <table className="genealogy-table">
                <thead>
                    <tr>
                        <th className="top-thead" colSpan={3} style={{paddingLeft: 20}} hidden={this.props.hide}>
                        </th>
                        <th className="top-thead linearBG" colSpan={3}>2017-08</th>
                        <th className="top-thead linearBG" colSpan={3}>2017-07</th>
                        <th className="top-thead linearBG" colSpan={3}>2017-06</th>

                    </tr>
                    <tr>
                        <th onClick={()=>this.props.sortData('id')} hidden={this.props.hide}>
                            ID 
                            {this.props.sortType === "id" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('rank')} hidden={this.props.hide}>
                            {this.props.language.title_rank}
                            {this.props.sortType === "rank" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('fsb')} hidden={this.props.hide}>
                            VIP
                            {this.props.sortType === "fsb" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('pv',0)}>
                            PV
                            {this.props.sortType === "pv0" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('tv',0)}>
                            TV
                            {this.props.sortType === "tv0" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('ov',0)}>
                            OV
                            {this.props.sortType === "ov0" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('pv',1)}>
                            PV
                            {this.props.sortType === "pv1" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('tv',1)}>
                            TV
                            {this.props.sortType === "tv1" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('ov',1)}>
                            OV
                            {this.props.sortType === "ov1" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('pv',2)}>
                            PV
                            {this.props.sortType === "pv2" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('tv',2)}>
                            TV
                            {this.props.sortType === "tv2" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
                            }
                        </th>
                        <th onClick={()=>this.props.sortData('ov',2)}>
                            OV
                            {this.props.sortType === "ov2" &&
                                <i className={"fa "+(this.props.orderType === "asc" ? 'fa-chevron-up' : 'fa-chevron-down')} aria-hidden="true" style={{fontSize: 8}}></i>
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
