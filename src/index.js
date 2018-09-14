import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class IndecisionApp extends React.Component {
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


//STATELESS functional component
const Header = (props) => {
  return (
      <div>
        <h1>{props.title}</h1>
        { props.subtitle  && <h3>{props.subtitle}</h3>}
      </div>
    );
};


//Default props
Header.defaultProps = {
  title: "Indecision Bobko"
};

//STATELESS functional component
const Action = (props) => {
  return (
    <div>
      <h2>
        Izaberite opciju randoomly
      </h2>

      <button 
        onClick={props.handlePick} 
        type="button" 
        disabled={!props.handlePickOption}
        >Pick Option
      </button>
    
      <button onClick={props.handleDeleteOption}>Delete All!</button>
      
    </div>  
  );
};

//STATELESS functional component
const Options = (props) => {
  let index=0;
 
  return (
    <div>
     {  props.options.map(element => {
        return <Option
                key={index++}
                optionText={element}
                arr={props.options} 
                duzina2={props.options.length} 
                handleDeleteOneOption={props.handleDeleteOneOption} 
              />     
  })
  }
    </div>
  );
};

//STATELESS functional component
const Option = (props) => {
  return (
    <div>
    <span>{props.optionText}</span>
      
      <button 
      onClick={(e)=>{props.handleDeleteOneOption(props.optionText)} }
      >delete one element</button>
    </div>
  );
};



class AddOption extends React.Component {
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
    e.target.elements.option.value='';
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



//const Example= (props) => {
//  return (
//<div>
//<p>Zdravo ja sam {props.name}</p>
//</div>
//  );
//}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
















/*
---------------------------------------------------

Kada pisemo funkciju konstruktor, a kada nije potrebna?

const Header = (props) => {
  return (
      <div>
        <h1>{this.props.title}</h1>
        <h3>{this.props.subtitle}</h3>
      </div>
    );
};


-----------------------------------------
handleAdd(e){
   e.preventDefault();
    let vrednost = e.target.elements.option.value; 
    if(!vrednost) {
       alert("1.slucaj nema nista")
     } else if (this.state.options.indexOf(vrednost)>-1){
       alert("2.slucaj ima u areju")
     };
    
   
    if (vrednost && !(this.state.options.indexOf(vrednost)>-1) ) {
   //ili metod contact
   //https://stackoverflow.com/questions/26253351/correct-modification-of-state-arrays-in-reactjs
   this.setState(prevState => ({
  options: [...prevState.options, vrednost]
}))
   
    };
    e.target.elements.option.value='';
  };

err(e){
    let vrednost = e.target.elements.option.value; 
    if (!vrednost) {
      alert("napisi nesto")
    } else if (this.props.stejt.indexOf(vrednost)>-1) {
        alert ("nalazi se u areju");
      } 
    };
  



The recommended approach in later React versions is to use an updater function 
when modifying states to prevent race conditions:

this.setState(prevState => ({
  arrayvar: [...prevState.arrayvar, newelement]
}))
spread operator [...arr]
----------------------------------------------------------

const onFormSubmit = (e) => {
    e.preventDefault();
    let vrednost = e.target.elements.option.value; 
    if (vrednost) {
      this.props.arr.push(vrednost);
      alert(this.props.arr);
      
      e.target.elements.option.value='';
      
    }
  }  


  -----------------------------------------------
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



-------------------------------------------------------------------



class IndecisionApp extends React.Component {
 render() {
   const title = "Indecision" ;
   const subtitle = "Put your life in the hands of computer";
   const options = ['thing one', 'thing two', 'thing three'];
   return (
     <div>
      <Header title={title} subtitle={subtitle} />
      <Action />
      <Options arr={options} duzina={options.length} />
      <AddOption arr={options}/>
      
    </div>
   );
 }
}



class Header extends React.Component {
 render() {
   return (
    <div>
      <h1>{this.props.title}</h1>
      <h3>{this.props.subtitle}</h3>
    </div>
   );
 }


}
class Action extends React.Component {
  handlePick(){
   alert("HandlePicking")
  };
 render() {
   return (
     <div>
      <h2>
        Zdravo ja sam Action
      </h2>
      <button onClick={this.handlePick}>Pick Option</button>
    </div>  
   );
 }


}



class Options extends React.Component {
  //ovoradimo da ne bi morali da stalno kada pozivamo event hendler na onClick 
  //da pisemo .bind(this)
  constructor(props){
    super(props);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  };
  //ovde se this odnosi na instancu objekta tako je u es6
  //handleRemoveAll=()=>{
   //alert(this.props.arr);
  //}
   //ovde se this odnosi na global scope i ne vidi se kaze da je this undefined
   //i onda moramo da koristimo bind(this) da bi mu set context to instance object
   handleRemoveAll(){
   alert(this.props.arr);
   }
  
  
 render() {
   
    console.log(this.props);
    let index=0;
     
   let func=this.props.arr.map(element => {
      //mozda najboje resenje za key
      return <li key={index++}>{element}</li>
    });
console.log(func);

 
   return (
     <div>
    <button onClick={this.handleRemoveAll}>
      Remove all
    </button>
     
    <Option arr2={this.props.arr} duzina2={this.props.duzina} func1={func}/>
    
    </div>
   );
 }


}


class Option extends React.Component {
 render() {
   console.log(this.props);

  

   return (
    <div>
      <h2>
        Ovo je arej:
        {this.props.arr2}
        
      </h2>
      <h4>
        Ovo je duzina Areja> {this.props.duzina2}
      </h4>
      <p>Option :{this.props.func1}</p>
    </div>

   );
 }


}



// 1. Setup the form with text input and submit button
// 2. Wire up onSubmit
// 3. handleAddOption -> fetch the value typed -> if value, then alert

class AddOption extends React.Component {
 render() {

  const onFormSubmit = (e) => {
    e.preventDefault();
  
    let vrednost = e.target.elements.option.value; 
    
    if (vrednost) {
      this.props.arr.push(vrednost);
      alert(this.props.arr);
      e.target.elements.option.value='';
      
    }
  }  

   return (
    <div>
      <h2>
        Zdravo ja sam AddOption
      </h2>
      <form onSubmit={onFormSubmit}>
      <input type="text" name="option" ></input>
      <button >Add option</button>
      </form>
    </div>
   );
 }


}



ReactDOM.render(<IndecisionApp />, document.getElementById('app'));


------------------------------------------------------------------------------


class Person {
  constructor (name="Anonymous",age=0) {
    this.name=name;
    this.age=age;
   
    
  }

  sayHi(){
    return "Hello i'm " + this.name + " i have " +this.age;
  }
  
}
class Traveler extends Person {
  constructor (name,age,homeLocation,grad) {
    super(name,age);
    this.homeLocation=homeLocation;
    this.grad=grad;
    
    
  }

  hasHomeLocation(){
   return this.homeLocation= !!this.homeLocation;
  }
  sayHi(){
    let description=super.sayHi();
    description += " im traveler svetski putnik iz " + this.grad ;
    console.log(description);
    return description;
  }
  
}

var boki = new Person("Boban",26)
console.log(boki.name);
boki.sayHi();


var putnik = new Traveler("Boban",101,"Nju jork", "Filadelfija");
console.log(putnik);
putnik.sayHi();

var kris = new Person("Aca",32)
kris.sayHi();
var anonimus = new Person()
anonimus.sayHi();


function hello() {
    console.log("Hi" + ${this.name});
  }

-----------------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



let func;
const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: []
};

const onFormSubmit = (e) => {
  e.preventDefault();
 
  let vrednost = e.target.elements.option.value; 
  
  if (vrednost) {
    app.options.push(vrednost);
    e.target.elements.option.value='';
    
  }
  let index=0;
  

  func=app.options.map(element => {
    //mozda najboje resenje za key
 return <li key={index++}>{element}</li>
});

  rend();
}



const removeFunction = () => {
  console.log("klik na remove");
  app.options=[];
  func=[];
  rend();
}

const makeDecision = () => {
  let option= Math.floor(Math.random()*app.options.length);
  alert(app.options[option]);
}
let broj=0;
let visibility=false;

const toogleVisibility = () => {
    visibility=!visibility;
    console.log("bokimoki");
  rend();
  }

 
/////////////////////////////////////////////////////////////////////////////
// VisibilityToggle - render, constructor, handleToggleVisibility
//visibility-> false
//togle visibility with this.state

class VisibilityToggle extends React.Component {
  constructor(props){
    super(props);

    this.state={
      visibility:false
    }
    this.handleToggleVisibility=this.handleToggleVisibility.bind(this);
    
  }
  handleToggleVisibility(){
    
   this.setState(()=> {
     return {
       visibility:!this.state.visibility
     }
   })

   }
  
  
 render() {
   return (
     <div>
     {this.state.visibility && <h2>Show something</h2>}
    
      <button onClick={this.handleToggleVisibility}>Show something</button>
      
    </div>  
   );
 }


}



const appRoot = document.getElementById('app');

ReactDOM.render(<VisibilityToggle />, appRoot);

/////////////////////////////////////////////////////////////////////////////

function rend(){
  const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
     <p>Duzina areja je : {app.options.length}</p>
     
    <ol>
     {func}
      
      {visibility && 
      <div>
      <p>Boki moki je pravi developer</p>
      </div>
      }
     
     
      
    </ol>
    <button onClick={removeFunction}>Remove All</button>
    <button id={"dugme"} onClick={toogleVisibility} >{visibility ? "Hide sth" : "View sth"}</button>
    <button disabled = {app.options.length === 0} onClick={makeDecision}>What should i do?</button>
    <form onSubmit={onFormSubmit}>
    <input type="text" name="option" ></input>
    <button >Add option</button>
    </form>
  </div>
);

const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
};







rend();







/*
--------------------------------------------------------
Second way of doing rendering pure JS
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



let func;
const app = {
  title: 'Indecision App',
  subtitle: 'Put your life in the hands of a computer',
  options: []
};

const onFormSubmit = (e) => {
  e.preventDefault();
 
  let vrednost = e.target.elements.option.value; 
  
  if (vrednost) {
    app.options.push(vrednost);
    e.target.elements.option.value='';
    
  }
  let index=0;
  

  func=app.options.map(element => {
    //mozda najboje resenje za key
 return <li key={index++}>{element}</li>
});

  rend();
}



const removeFunction = () => {
  console.log("klik na remove");
  app.options=[];
  func=[];
  rend();
}

const makeDecision = () => {
  let option= Math.floor(Math.random()*app.options.length);
  alert(app.options[option]);
}
let broj=0;


const toogleVisibility = () => {
    broj++;
    if (broj%2!==0) {
      var kontejner=document.getElementById('app');
      var node = document.createElement("P");

      node.setAttribute("id", "paragraf");

      var textnode = document.createTextNode("Boban je pravi web developer");
      node.appendChild(textnode);
      kontejner.appendChild(node);
    } else {
        var parent = document.getElementById('app');
        var child = document.getElementById("paragraf");
        parent.removeChild(child);
    };
    
    
    console.log(broj);
    
  rend();
  }

function rend(){
  const template = (
  <div>
    <h1>{app.title}</h1>
    {app.subtitle && <p>{app.subtitle}</p>}
    <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
     <p>Duzina areja je : {app.options.length}</p>
     
    <ol>
     {func}
      
    </ol>
    <button onClick={removeFunction}>Remove All</button>
    <button id={"dugme"} onClick={toogleVisibility} >{broj%2!==0 ? "Hide sth" : "View sth"}</button>
    <button disabled = {app.options.length === 0} onClick={makeDecision}>What should i do?</button>
    <form onSubmit={onFormSubmit}>
    <input type="text" name="option" ></input>
    <button >Add option</button>
    </form>
  </div>
);

const appRoot = document.getElementById('app');

ReactDOM.render(template, appRoot);
};

rend();


---------------------------------------------------------------------------------


Exercise:

const user = {
  name: 'Andrew',
  age: 26,
  location: 'Philadelphia'
};

const templateThree = (
  <div>
    <h1>{user.name ? user.name : 'Anonymous'}</h1>
    {(user.age && user.age >= 18) && <p>Age: {user.age}</p>}
    {getLocation(user.location)}
  </div>
);

let click = 0;
const handleClick = () => {
  click += 1;
  console.log(click);
  rend();
}
const handleMinus = () => {
  click -= 1;
  console.log(click);
  rend();
}
const handleReset = () => {
  click = 0;
  
  rend();
}


function rend(){

  const templateTwo = (
    <div>
      <h1>Count: {click}</h1>
      <button id="my-id0" className="button" onClick={handleClick}>+1</button>
      <button id="my-id1" className="button" onClick={handleMinus}>-1</button>
      <button id="my-id2" className="button" onClick={handleReset}>reset</button>
    </div>
  );

  ReactDOM.render(templateTwo, appRoot);

}


const fullName = "Boban Jankovic";
const getFirstName = (fullName) => Boolean(fullName) ? fullName.split(" ")[0] : "nema imena" ; 
//console.log(getFirstName(fullName));
const appRoot = document.getElementById('app');

rend();
 */