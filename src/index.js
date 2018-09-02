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
    <button id={"dugme"} onClick={toogleVisibility} >View sth</button>
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
const user = {
  name: 'Andrew',
  age: 26,
  location: 'Philadelphia'
};
 //<li>{app.options[1]}</li>
      <li>{app.options[2]}</li>
      //nijie dobro
      {app.options.forEach(element => {
        <li>{element}</li>
      })}

<li>{app.options.forEach(element => {element})}</li>
function getLocation(location) {
  if (location) {
    return <p>Location: {location}</p>;
  }
}

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