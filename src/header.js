import React from 'react';

export const Header = (props) => {
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
