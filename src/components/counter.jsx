import React, { Component } from 'react';

class Counter extends Component {

    render() { 
        const{counter} = this.props;
        return (
            <div className='row'>
                <div className='col-1'>
                <span className='badge bg-primary m-2'>{(counter.value > 0 ? counter.value : "Zero")}</span>
                </div>

                <div className='col'>
                
                <button className='btn btn-sm bg-success m-2' 
                onClick = {() => this.props.onIncrement(counter)}>+</button>

                <button className="btn btn-sm bg-secondary"
                onClick = {() => this.props.onDecrement(counter)}
                disabled = {counter.value === 0 ? "disabled": ""}
                >-</button>

                <button className="btn btn-danger m-2 btn-sm" 
                onClick = {() => this.props.onDelete(counter.id)}>x</button>
                </div>

            </div>
        );
    }
}
 
export default Counter;