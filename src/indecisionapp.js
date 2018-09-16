import React from 'react';
import {Action} from './action';
import {Header} from './header';
import {Options} from './options';
import {AddOption} from './addoption';
export class IndecisionApp extends React.Component {
  constructor(props){
    super(props);
    this.state={
      options: ['thing one', 'thing two', 'thing three']
    }
    //The parent component binds the newly-defined method to the current instance of the component 
    //in its constructor.This ensures that when we pass the method to the child component, 
    //it will still update the parent component

    this.handleAdd=this.handleAdd.bind(this);
    this.handleDeleteOption=this.handleDeleteOption.bind(this);
    this.handlePick=this.handlePick.bind(this);
    this.handleDeleteOneOption=this.handleDeleteOneOption.bind(this);
  }

  componentDidMount(){
    try {
      const options = localStorage.getItem('options');
      const json=JSON.parse(options)
      if (json){
        this.setState({options:json});
      }
    } catch(e){
      console.log('Error cought')
    }
  };

  componentDidUpdate(prevProps, prevState){
    if (prevState.options.length !== this.state.options.length){
      const json=JSON.stringify(this.state.options)
      localStorage.setItem('options', json)
    };
  };

  componentWillUnmount(){
    console.log("unmount")
  };




  //treba mi funkcija koja vraca true ili false na osnovu sta je uneto u formu?
  //moze i da napravimo stejt koji je undefined i set state da menjamo samo
  //sta ce da pokrece funkciju?

  //ako je vrednost dobra vratice undefined jer nismo explicitno naglasili sta da vrati ako je true,
  //ako je false vratice jedno od ova 2 return-a

  handleAdd(vrednost){
    if (!vrednost){
      return "Error: There is no input"
    } else if (this.state.options.indexOf(vrednost)>-1) {
      return "Error: This option already exists"
    } 
    //ili metod contact
    //https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs

    this.setState(prevState => ({options: [...prevState.options, vrednost]}))
  }
  
  
   
  handlePick(){
    let rand=Math.floor(Math.random()*this.state.options.length);
    console.log(this.state.options[rand])
    alert(this.state.options[rand]);
  };


  handleDeleteOption(){
    this.setState({options:[]});
  };

  handleDeleteOneOption(element){

    this.setState((prevState)=> {
     return {
       //vraca arej svih onih reci koje se razlikuju od reci koje sam selektovao
       options:prevState.options.filter(word => word !== element)
     }
   })
    
  };

 render() {
   //ovo mi vise ne treba jer imam default i svkoj strani cu drugaciji title-default da stavljam
   //const title = "Indecision" ;
   const subtitle = "Put your life in the hands of computer";
  
    return (
      <div>
        
        <Header /*title={title}*/ subtitle={subtitle} />
        
        <Action 
          //Vraca vrednost true ili false
          handlePickOption={this.state.options.length>0}
          handleDeleteOption={this.handleDeleteOption}
          handlePick={this.handlePick}
          
        />

        <Options 
          options={this.state.options}  
          length={this.state.options.length} 
          handleDeleteOneOption={this.handleDeleteOneOption}
        />

        <AddOption 
          handleAdd={this.handleAdd}
          stejt={this.state.options}
        />

      </div>
    );
  }
}
