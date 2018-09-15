import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Counter extends React.Component {
  constructor(props){
    super(props);

    this.state={
      count:0
    }
    this.handleMinus=this.handleMinus.bind(this);
    this.handleAdd=this.handleAdd.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
  }
  handleMinus(){
    
   this.setState({count:this.state.count-1});
  };
  handleAdd(){
   
   this.setState((prevState)=> {
     return {
       count:prevState.count+2
     }
   })
  };
  handleRemove(){
   
   this.setState({count:0});
  };
 render() {
   return (
     <div>
      <h2>
        Counter: {this.state.count}
      </h2>
      <button onClick={this.handleAdd}>+1</button>
      <button onClick={this.handleMinus}>-1</button>
      <button onClick={this.handleRemove}>Remove All</button>
    </div>  
   );
 }


}



const appRoot = document.getElementById('app');

ReactDOM.render(<Counter />, appRoot);
