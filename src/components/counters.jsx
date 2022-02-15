import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
   

    render() {  
        const {onReset, onDelete, onIncrement, onDecrement} = this.props;
        return (
            <div>
                <button className="btn btn-primary sm-2"
                onClick = {onReset}>Reset</button>

                {this.props.counters.map(counter => (
                    <Counter key = {counter.id} 
                     counter = {counter}
                     onDelete = {onDelete}
                     onIncrement = {onIncrement}
                     onDecrement = {onDecrement}
                     />
                ))}

            </div>
        );
    }
}
 
export default Counters;