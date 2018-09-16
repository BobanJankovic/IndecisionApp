import React from 'react';
import {Option} from './option';
export const Options = (props) => {
  let index=0;
 
  return (
    <div>
    {props.options.length===0 && <p>Please add an option</p>}
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
