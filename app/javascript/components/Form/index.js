
import React, { Component } from "react";
import './Form.css';


const Form = props => {
  const { handleFormSubmit, boardSize, handleInputChange } = props;

  return (
    <div className="form">
      <form onSubmit={handleFormSubmit.bind(this)}>
      	<input
      	  type="text"
      	  name="userName"
      	  className="form-control input-element"
      	  placeholder="Enter a User name > eg: John Doe"
      	  aria-label="userName"
      	  aria-describedby="basic-addon1"
      	  onChange={handleInputChange.bind(this)}
      	/>

      	<div className="input-selector">
      	  <label className="input-label">Choose a board size :</label>

      	  <select name="boardSize"
      	    className="input-element" value={boardSize} onChange={handleInputChange.bind(this)}>
      	    <option value="4"> 4 x 4</option>
      	    <option value="5"> 5 x 5 </option>
      	    <option value="6"> 6 x 6</option>
      	  </select>
      	</div>

        <button onClick={handleFormSubmit.bind(this)}>START GAME</button>
       </form>
    </div>
  );
};

export default Form;