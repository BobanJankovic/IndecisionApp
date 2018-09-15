import React from 'react';


export const Action = (props) => {
  return (
    <div>
      <h2>
        Izaberite opciju randomly
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