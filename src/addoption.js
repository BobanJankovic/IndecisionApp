import React from 'react';

export class AddOption extends React.Component {
  constructor(props){
    super(props);
    this.handleAddd=this.handleAddd.bind(this);
    this.state={
      error:undefined
    }   
  }
    //The parent component binds the newly-defined method to the current instance of the component 
    //in its constructor.This ensures that when we pass the method to the child component, 
    //it will still update the parent component
  handleAddd(e){
    e.preventDefault();
    let vrednost = e.target.elements.option.value; 
    let check = this.props.handleAdd(vrednost);
    this.setState({error:check});
    if (!check) {
      e.target.elements.option.value='';
    } 
    
  };
   
  render() {
    return (
      <div>
        { this.state.error && <p>{this.state.error} -> Ovo je error ne mozes ovo napisati</p>}
        <h2>
          Zdravo ja sam AddOption
        </h2>
        <form onSubmit={this.handleAddd}>
          <input type="text" name="option" ></input>
          <button>Add option</button>
        </form>
      </div>
    );
  }
}