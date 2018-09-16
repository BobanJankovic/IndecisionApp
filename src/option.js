
import React from 'react';

export const Option = (props) => {
  return (
    <div>
    <span>{props.optionText}</span>
      <button onClick={(e)=>{props.handleDeleteOneOption(props.optionText)} }>
        delete one element
      </button>
    </div>
  );
};
