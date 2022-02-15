import React, { Component } from 'react';
import './App.css';
import Counters from './components/counters';
import NavBar from './components/navbar';

class App extends Component {
      state = { counters : [
        {value : 2, id :1},
        {value : 0,  id :2},
        {value : 1,  id :3},
        {value : 5,  id :4}
      ] } 

    handleReset = () => {
      const counters =  this.state.counters.map(m => {m.value = 0;
            return m;})
        this.setState({counters});
    }

    handleIncrement = (counter) => {
      const counters = [...this.state.counters];
      const index = counters.indexOf(counter);
      counters[index].value++;
      this.setState({counters});
    }

    handleDecrement = (counter) => {
      const counters = [...this.state.counters];
      const index = counters.indexOf(counter);
      if(counters[index].value > 0 ) counters[index].value--;
      this.setState({counters});
    }

    handleDelete = (counterId) => {
        const counters = this.state.counters.filter(c => c.id !== counterId)
        this.setState({counters});
    };

   

    render() {
  return (
    <div className="App">
       <NavBar totalCounters = {this.state.counters.filter(m => m.value>0).length}/>
       <main className='container'>
       <Counters
       counters = {this.state.counters}
       onReset ={this.handleReset}
       onDelete = {this.handleDelete}
       onIncrement = {this.handleIncrement}
       onDecrement = {this.handleDecrement}
      
       />
       </main>
    </div>
  );
 }
}

export default App;
